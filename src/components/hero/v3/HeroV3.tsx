'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroConfig } from '../data/hero.data';
import { JourneyVisualizer } from './JourneyVisualizer';
import { QuickBookPanel } from './QuickBookPanel';
import { VehicleShowcase } from './VehicleShowcase';
import { BookingState } from './types';

const HeroV3 = () => {
  // Track the booking flow state
  const [bookingState, setBookingState] = useState<BookingState>({
    step: 'initial',
    pickupLocation: heroConfig.defaultPickupLocation,
    dropoffLocation: null,
    vehicle: heroConfig.vehicleOptions[0],
    date: new Date(),
    time: 'now',
    passengers: 2,
    luggage: 1,
    specialRequests: '',
  });

  // Track animations and interactions
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint after 3 seconds if user hasn't interacted
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowHint(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // Transition to the next step in the booking flow
  const goToStep = (step: BookingState['step'], data?: Partial<BookingState>) => {
    setHasInteracted(true);
    setShowHint(false);
    setBookingState(prev => ({
      ...prev,
      step,
      ...data
    }));
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        {/* Video Background with Overlay */}
        <div className="absolute inset-0 bg-gray-900/70 z-10"></div>
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          poster={heroConfig.backgroundImage}
        >
          <source src={heroConfig.backgroundVideo || ''} type="video/mp4" />
        </video>

        {/* Dynamic Lighting Effects */}
        <div className="absolute inset-0 z-20 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/40 to-purple-500/40 blur-[100px] animate-drift"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/30 to-primary/30 blur-[100px] animate-drift animation-delay-1000"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-30 container mx-auto min-h-screen flex flex-col items-center justify-center py-8">
        {/* Main Content Area */}
        <div className="w-full max-w-7xl flex flex-col items-center">
          {/* Optional Small Headline - can be hidden by setting showHeadline to false */}
          <AnimatePresence>
            {bookingState.step === 'initial' && (
              <motion.div 
                className="absolute top-8 text-center md:mb-2 max-w-xl opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-2xl md:text-3xl font-serif text-white leading-tight">
                  <span className="inline-block bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
                    Your Journey Begins with Elegance
                  </span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Journey Visualizer - Main component that handles the booking visualization */}
          <AnimatePresence mode="wait">
            {bookingState.step === 'initial' && (
              <JourneyVisualizer 
                bookingState={bookingState} 
                goToStep={goToStep}
                showHint={showHint}
              />
            )}
            
            {bookingState.step === 'selectVehicle' && (
              <VehicleShowcase
                bookingState={bookingState}
                goToStep={goToStep}
                vehicles={heroConfig.vehicleOptions}
              />
            )}
            
            {bookingState.step === 'quickBook' && (
              <QuickBookPanel
                bookingState={bookingState}
                goToStep={goToStep}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HeroV3;
