'use client';

import React, { useState, useEffect } from 'react';

// Import our modular components
import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export function NavbarV1() {
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for transparent to solid background transition
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out"
      role="banner"
    >
      {/* Top bar with contact info (desktop only) */}
      {/* <TopBar /> */}
      
      {/* Main navigation bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-card/95 shadow-lg border-b border-border/50 rounded-b-2xl' 
            : 'bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-md rounded-b-2xl'
        }`}
      >
        <nav 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          aria-label="Main Navigation"
        >
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <DesktopNav />
            
            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
}
