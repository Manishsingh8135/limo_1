'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Car } from 'lucide-react';
import { Location } from '../types/hero.types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { popularLocations } from '../data/hero.data';
import { JourneyVisualizerProps } from './types';
// Explicitly importing components from the same directory
import { LocationSearch } from '@/components/hero/v3/LocationSearch';
import { JourneyMap } from '@/components/hero/v3/JourneyMap';
import { PulsatingDot } from '@/components/hero/v3/PulsatingDot';

export const JourneyVisualizer: React.FC<JourneyVisualizerProps> = ({
  bookingState,
  goToStep,
  showHint
}) => {
  const [activeSection, setActiveSection] = useState<'pickup' | 'dropoff' | null>(null);

  const handleLocationClick = (type: 'pickup' | 'dropoff') => {
    setActiveSection(activeSection === type ? null : type);
  };

  // Removed unused handlePopularLocationSelect function

  const handleLocationSelect = (type: 'pickup' | 'dropoff', location: Location) => {
    if (type === 'pickup') {
      goToStep('initial', { pickupLocation: location });
    } else {
      goToStep('initial', { dropoffLocation: location });
    }
    setActiveSection(null);
  };

  const handleContinue = () => {
    if (bookingState.pickupLocation && bookingState.dropoffLocation) {
      goToStep('selectVehicle');
    }
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        {/* Main Journey Visualization Container */}
        <motion.div 
          className="relative w-full max-w-6xl bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:min-h-[500px]"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Interactive Map Area - Takes 50% width on desktop and stretches to match form height */}
          <div className="h-80 md:h-[400px] lg:h-auto lg:flex-1 relative overflow-hidden lg:self-stretch">
            <JourneyMap 
              pickupLocation={bookingState.pickupLocation} 
              dropoffLocation={bookingState.dropoffLocation}
              isInteractive={true}
              onPickupClick={() => handleLocationClick('pickup')}
              onDropoffClick={() => handleLocationClick('dropoff')}
            />
            
            {/* Hint Overlay - Appears if user hasn't interacted */}
            <AnimatePresence>
              {showHint && (
                <motion.div 
                  className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center p-8">
                    <div className="inline-block animate-bounce mb-4">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-xl text-white font-medium">Select your pickup and dropoff to begin</p>
                    <p className="text-white/70 mt-2">Tap anywhere on the map to get started</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Selection Controls - Takes 50% width on desktop */}
          <div className="p-6 space-y-4 lg:flex-1 lg:min-w-[400px] lg:max-w-[500px]">
            {/* Pickup Location */}
            <div className="space-y-2">
              <button 
                className={cn(
                  "w-full flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer",
                  "border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-md",
                  "hover:border-white/20 hover:translate-y-[-2px]",
                  activeSection === 'pickup' ? "bg-white/10 border-primary/50 ring-1 ring-primary/30" : ""
                )}
                onClick={() => handleLocationClick('pickup')}
                aria-label="Select pickup location"
              >
                <div className="flex-1 flex items-center gap-3">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                    "text-white bg-gradient-to-br from-primary to-primary/60"
                  )}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-white/60 text-sm font-medium">PICKUP</p>
                    <p className="text-white font-medium truncate">
                      {bookingState.pickupLocation?.name || 'Select Pickup Location'}
                    </p>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "h-5 w-5 text-white/50 transition-transform",
                  activeSection === 'pickup' ? "transform rotate-90" : ""
                )} />
              </button>
              
              {/* Pickup Location Search Dropdown */}
              <AnimatePresence>
                {activeSection === 'pickup' && (
                  <LocationSearch 
                    type="pickup"
                    currentLocation={bookingState.pickupLocation}
                    onSelect={(location) => handleLocationSelect('pickup', location)}
                    popularLocations={popularLocations}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Dropoff Location */}
            <div className="space-y-2">
              <button 
                className={cn(
                  "w-full flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer",
                  "border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-md",
                  "hover:border-white/20 hover:translate-y-[-2px]",
                  activeSection === 'dropoff' ? "bg-white/10 border-primary/50 ring-1 ring-primary/30" : ""
                )}
                onClick={() => handleLocationClick('dropoff')}
                aria-label="Select destination location"
              >
                <div className="flex-1 flex items-center gap-3">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                    bookingState.dropoffLocation ? "bg-gradient-to-br from-primary to-primary/60" : "bg-white/10"
                  )}>
                    <MapPin className="h-5 w-5 text-white" />
                    {!bookingState.dropoffLocation && (
                      <PulsatingDot delay={1} />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-white/60 text-sm font-medium">DESTINATION</p>
                    <p className="text-white font-medium truncate">
                      {bookingState.dropoffLocation?.name || 'Where Would You Like To Go?'}
                    </p>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "h-5 w-5 text-white/50 transition-transform",
                  activeSection === 'dropoff' ? "transform rotate-90" : ""
                )} />
              </button>
              
              {/* Dropoff Location Search Dropdown */}
              <AnimatePresence>
                {activeSection === 'dropoff' && (
                  <LocationSearch 
                    type="dropoff"
                    currentLocation={bookingState.dropoffLocation}
                    onSelect={(location) => handleLocationSelect('dropoff', location)}
                    popularLocations={popularLocations}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Continue Button - Only enabled if both locations selected */}
            <div className="pt-2">
              <Button
                size="lg"
                className={cn(
                  "w-full h-14 text-lg font-medium rounded-xl",
                  "bg-gradient-to-r from-primary to-primary/80 hover:from-primary-600 hover:to-primary-500",
                  "text-white shadow-xl shadow-primary/20 transition-all",
                  "flex items-center justify-center gap-2",
                  (!bookingState.pickupLocation || !bookingState.dropoffLocation) && "opacity-70 cursor-not-allowed"
                )}
                onClick={handleContinue}
                disabled={!bookingState.pickupLocation || !bookingState.dropoffLocation}
              >
                <Car className="h-5 w-5 text-white" />
                <span>Choose Your Luxury Vehicle</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
