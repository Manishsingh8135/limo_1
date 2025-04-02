'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'; 
import { useState, useEffect, useRef } from 'react'; 
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; 
import { CheckCircle } from 'lucide-react'; 

import { navLinks } from '../data/navbar.data';
import type { } from '../types/navbar.types';

export function DesktopNav() {
  const pathname = usePathname();
  const { status } = useSession(); 
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  const prevStatusRef = useRef<string | undefined>(status);

  useEffect(() => {
    if (prevStatusRef.current === 'authenticated' && status === 'unauthenticated') {
      setShowSignOutAlert(true);
      const timer = setTimeout(() => {
        setShowSignOutAlert(false);
      }, 3000);
      return () => clearTimeout(timer); 
    }
    prevStatusRef.current = status;
  }, [status]);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' } 
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.98, 
      transition: { duration: 0.1, ease: 'easeIn' } 
    }
  };

  const menuItemVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.01 }
  };

  const underlineVariants = {
    rest: { width: 0, left: '50%', right: '50%' },
    hover: { width: '100%', left: 0, right: 0 }
  };

  return (
    <div className="hidden md:flex items-center gap-8">
      <nav className="flex items-center gap-8">
        {navLinks.map((link) => {
          if ('children' in link) {
            const isDropdownOpen = openDropdown === link.href;
            
            return (
              <div 
                key={link.href} 
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <motion.div 
                  className="flex items-center gap-1 cursor-pointer"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <span 
                    className={cn(
                      "relative text-sm font-serif tracking-wide py-2 px-1",
                      isActive(link.href) 
                        ? "text-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <motion.span 
                      className="absolute bottom-0 h-[1px] bg-primary/70"
                      variants={underlineVariants}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                  </span>
                  <ChevronDown 
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isDropdownOpen ? "rotate-180" : ""
                    )} 
                  />
                </motion.div>
                
                {isDropdownOpen && (
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-50 min-w-[280px]"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                  >
                    <div className="py-2 px-1 rounded-2xl bg-card/95 backdrop-blur-md border border-border/50 shadow-xl">
                      <div className="p-4 border-b border-border/30">
                        <Link 
                          href={link.href}
                          className="block group"
                        >
                          <div className="text-base font-serif text-foreground mb-1 group-hover:text-primary transition-colors">
                            All {link.label}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Browse our complete {link.label.toLowerCase()} collection
                          </p>
                        </Link>
                      </div>
                      
                      <div className="py-2">
                        {link.children.map((child) => (
                          <motion.div 
                            key={child.href}
                            variants={menuItemVariants}
                            initial="rest"
                            whileHover="hover"
                            className="px-4 py-2"
                          >
                            <Link 
                              href={child.href}
                              className={cn(
                                "block relative text-sm font-medium transition-colors",
                                isActive(child.href)
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          }
          
          return (
            <motion.div 
              key={link.href}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <Link 
                href={link.href}
                aria-label={link.ariaLabel}
                className={cn(
                  "relative text-sm font-serif tracking-wide py-2 px-1",
                  isActive(link.href) 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <motion.span 
                  className="absolute bottom-0 left-0 h-[1px] bg-primary/70"
                  variants={underlineVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-x-2"
      >
        {status === 'authenticated' ? (
          <Button
            variant="secondary" 
            size="sm"
            onClick={() => signOut({ callbackUrl: '/' })} 
          >
            Sign Out
          </Button>
        ) : (
          <Button variant="default" size="sm" asChild>
            <Link href="/login" aria-label="Sign In">
              Sign In
            </Link>
          </Button>
        )}
      </motion.div>

      {showSignOutAlert && (
        <Alert className="fixed bottom-5 right-5 w-auto z-50 bg-green-100 border-green-400 text-green-700">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            You have been successfully signed out.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
