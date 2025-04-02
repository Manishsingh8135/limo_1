'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { GlobalStyle } from '@/components/ui/ClientGlobalStyles';
import { NavbarV1 } from '@/components/navbar/v1/Navbar';

export default function UIShowcase() {
  return (
    <>
      <GlobalStyle />
      <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
        <NavbarV1 />
        
        <main className="container mx-auto px-4 pt-40 pb-20">
          <h1 className="text-4xl font-serif font-medium text-foreground mb-8">Luxury UI Components</h1>
          
          <section className="mb-16">
            <h2 className="text-2xl font-serif text-foreground mb-6">Button Variants</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8 p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-foreground">Primary Button</h3>
                  <p className="text-muted-foreground mb-4">Our main call-to-action button with elegant glow effect and subtle animation.</p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="sm">Small Primary</Button>
                    <Button>Default Primary</Button>
                    <Button size="lg">Large Primary</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-foreground">Secondary Button</h3>
                  <p className="text-muted-foreground mb-4">A more subtle option that still maintains the luxury feel.</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="secondary" size="sm">Small Secondary</Button>
                    <Button variant="secondary">Default Secondary</Button>
                    <Button variant="secondary" size="lg">Large Secondary</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-foreground">Outline Button</h3>
                  <p className="text-muted-foreground mb-4">Elegant bordered button with hover fill effect.</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" size="sm">Small Outline</Button>
                    <Button variant="outline">Default Outline</Button>
                    <Button variant="outline" size="lg">Large Outline</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8 p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-foreground">Ghost Button</h3>
                  <p className="text-muted-foreground mb-4">Minimal button that reveals itself on hover.</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="ghost" size="sm">Small Ghost</Button>
                    <Button variant="ghost">Default Ghost</Button>
                    <Button variant="ghost" size="lg">Large Ghost</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-foreground">Glass Button</h3>
                  <p className="text-muted-foreground mb-4">Frosted glass effect for an ultra-modern look.</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="glass" size="sm">Small Glass</Button>
                    <Button variant="glass">Default Glass</Button>
                    <Button variant="glass" size="lg">Large Glass</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-foreground">Metallic Button</h3>
                  <p className="text-muted-foreground mb-4">Brushed metal effect for a premium industrial look.</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="metallic" size="sm">Small Metallic</Button>
                    <Button variant="metallic">Default Metallic</Button>
                    <Button variant="metallic" size="lg">Large Metallic</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-serif text-foreground mb-6">Button in Context</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-serif text-foreground mb-4">Book Your Luxury Experience</h3>
                <p className="text-muted-foreground mb-6 max-w-md">Experience the ultimate in luxury transportation with All American Limousine. Our professional chauffeurs and premium fleet await.</p>
                <Button size="xl">Book Now</Button>
              </div>
              
              <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-serif text-foreground mb-4">Explore Our Fleet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">Discover our extensive collection of luxury vehicles, from executive sedans to stretch limousines.</p>
                <div className="flex gap-4">
                  <Button variant="outline">View Fleet</Button>
                  <Button>Reserve Now</Button>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">Destructive Action</h2>
            
            <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <h3 className="text-xl font-medium text-foreground mb-4">Destructive Button</h3>
              <p className="text-muted-foreground mb-6">For critical actions that require attention.</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="destructive" size="sm">Cancel Reservation</Button>
                <Button variant="destructive">Delete Account</Button>
                <Button variant="destructive" size="lg">Confirm Deletion</Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
