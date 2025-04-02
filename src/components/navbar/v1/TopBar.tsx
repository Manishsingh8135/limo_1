'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import { contactInfo, socialLinks } from '../data/navbar.data';

export function TopBar() {
  return (
    <div className="hidden lg:block w-full bg-card/90 border-b border-border/50 py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Contact Information */}
        <div className="flex items-center gap-6">
          <a 
            href={`tel:${contactInfo.phone.replace(/[^0-9]/g, '')}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Call us at ${contactInfo.phone}`}
          >
            <Phone className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            <span>{contactInfo.phone}</span>
          </a>
          
          <a 
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Email us at ${contactInfo.email}`}
          >
            <Mail className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            <span>{contactInfo.email}</span>
          </a>
          
          <div 
            className="flex items-center gap-2 text-sm text-muted-foreground"
            aria-label="Our address"
          >
            <MapPin className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            <span>{contactInfo.address}</span>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={link.ariaLabel}
            >
              <span className="sr-only">{link.label}</span>
              {/* Replace with actual social icons */}
              <div className="h-4 w-4 rounded-full bg-muted"></div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
