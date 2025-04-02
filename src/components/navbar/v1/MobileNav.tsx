'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, Phone, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navLinks, contactInfo } from '../data/navbar.data';
import type { NavLink, NavLinkWithChildren } from '../types/navbar.types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function MobileNav() {
  const pathname = usePathname();
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  const prevStatusRef = useRef<string | undefined>(status);

  useEffect(() => {
    // Check if status changed from authenticated to unauthenticated
    if (prevStatusRef.current === 'authenticated' && status === 'unauthenticated') {
      setShowSignOutAlert(true);
      const timer = setTimeout(() => {
        setShowSignOutAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    prevStatusRef.current = status;
  }, [status]);

  const toggleDropdown = (href: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    hidden: { height: 0, opacity: 0, overflow: 'hidden' },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' } 
    },
  };

  const renderNavLink = (link: NavLink | NavLinkWithChildren, depth = 0) => {
    // Check if link has children (dropdown)
    if ('children' in link) {
      const isOpen = openDropdowns[link.href] || false;
      
      return (
        <motion.div key={link.href} className="w-full" variants={itemVariants}>
          <button
            onClick={() => toggleDropdown(link.href)}
            className={cn(
              "flex items-center justify-between w-full px-5 py-4 text-left",
              depth > 0 ? "pl-10" : "",
              isActive(link.href) 
                ? "text-primary font-medium" 
                : "text-muted-foreground hover:text-foreground"
            )}
            data-state={isOpen ? "open" : "closed"}
            data-controls={`dropdown-${link.href.replace(/\//g, '-')}`}
          >
            <span className="font-serif tracking-wide">{link.label}</span>
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                isOpen ? "rotate-180" : ""
              )} 
            />
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                id={`dropdown-${link.href.replace(/\//g, '-')}`}
                className="overflow-hidden"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
              >
                <div className="pl-5 border-l border-primary/20 ml-5 mt-1 mb-3 space-y-1 rounded-b-xl">
                  <motion.div variants={itemVariants}>
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center px-5 py-3 text-sm font-serif",
                        isActive(link.href) 
                          ? "text-primary font-medium" 
                          : "text-slate-400 hover:text-slate-50"
                      )}
                    >
                      <span className="mr-2 text-primary/70">•</span>
                      All {link.label}
                    </Link>
                  </motion.div>
                  
                  {link.children.map((child) => (
                    <motion.div key={child.href} variants={itemVariants}>
                      <Link 
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center px-5 py-3 text-sm",
                          isActive(child.href) 
                            ? "text-primary font-medium" 
                            : "text-slate-400 hover:text-slate-50"
                        )}
                      >
                        <span className="mr-2 text-primary/70">•</span>
                        {child.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }
    
    // Regular link without dropdown
    return (
      <motion.div variants={itemVariants} key={link.href}>
        <Link 
          href={link.href}
          onClick={() => setIsOpen(false)}
          className={cn(
            "flex items-center px-5 py-4 text-base font-serif tracking-wide",
            depth > 0 ? "pl-10" : "",
            isActive(link.href) 
              ? "text-primary font-medium" 
              : "text-slate-300 hover:text-slate-50"
          )}
          aria-label={link.ariaLabel}
        >
          {link.label}
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Open main menu"
            className="relative h-9 w-9"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-[85%] sm:w-[320px] pt-10 overflow-y-auto border-l border-primary/10 rounded-l-2xl bg-slate-950/95 backdrop-blur-md text-slate-50"
        >
          <SheetHeader className="mb-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-left text-xl font-serif tracking-wide text-slate-50">Menu</SheetTitle>
              <SheetClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-slate-50 transition-colors">
                <X className="h-4 w-4" />
              </SheetClose>
            </div>
          </SheetHeader>
          
          <motion.div 
            className="flex flex-col"
            initial="hidden"
            animate="visible"
            variants={listVariants}
          >
            {navLinks.map((link) => renderNavLink(link))}
          </motion.div>
          
          {/* Auth Controls (Login/Logout) */}
          <div className="mt-8 px-5 py-6 border-t border-border/30 rounded-t-xl">
            {status === 'loading' && (
              <Button size="lg" className="w-full opacity-50" disabled>
                Loading...
              </Button>
            )}
            {status === 'unauthenticated' && (
              <Button asChild size="lg" className="w-full">
                <Link href="/login" aria-label="Sign In" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
            )}
            {status === 'authenticated' && (
              <Button
                size="lg"
                variant="secondary" 
                className="w-full text-slate-300 hover:text-slate-50 hover:bg-slate-800"
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  setIsOpen(false);
                }}
                aria-label="Sign Out"
              >
                Sign Out
              </Button>
            )}
          </div>

          {contactInfo && (
            <div className="mt-6 px-5 rounded-xl">
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-serif text-slate-300">Contact Us</h3>
                <div className="flex items-center gap-2 text-sm text-slate-100">
                  <Phone className="h-4 w-4 text-primary/70" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-primary transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
                {contactInfo.email && (
                  <div className="flex items-center gap-2 text-sm text-slate-100">                    <svg className="h-4 w-4 text-primary/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Sign Out Success Alert */}
      <AnimatePresence>
        {showSignOutAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-auto z-[100]" // Ensure high z-index
          >
            <Alert className="bg-green-100 border-green-400 text-green-700 shadow-lg">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>You have been successfully signed out.</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
