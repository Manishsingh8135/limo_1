'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { JourneyMapProps } from './types';
import { PulsatingDot } from './PulsatingDot';

export const JourneyMap: React.FC<JourneyMapProps> = ({
  pickupLocation,
  dropoffLocation,
  isInteractive = false,
  onPickupClick,
  onDropoffClick
}) => {
  const [pathProgress, setPathProgress] = useState(0);
  
  useEffect(() => {
    // Reset and animate path when both locations are set
    if (pickupLocation && dropoffLocation) {
      setPathProgress(0);
      const timer = setTimeout(() => {
        setPathProgress(100);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pickupLocation, dropoffLocation]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Stylized Map Background - SVG or premium map style here */}
      <div className="absolute inset-0 z-0 bg-[url('/images/map-stylized.jpg')] bg-cover bg-center opacity-40 blur-[1px]"></div>
      
      {/* Map Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-grid-overlay opacity-20"></div>
      
      {/* Location Markers and Path */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {pickupLocation && (
          <motion.div 
            className="absolute"
            style={{ 
              left: `calc(${pickupLocation.coordinates ? pickupLocation.coordinates.lng/3 + 40 : 30}%)`, 
              top: `calc(${pickupLocation.coordinates ? pickupLocation.coordinates.lat/3 + 20 : 40}%)` 
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className={cn(
                "w-12 h-12 flex items-center justify-center cursor-pointer transition-transform",
                isInteractive && "hover:scale-110"
              )}
              onClick={isInteractive ? onPickupClick : undefined}
            >
              <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-ping-slow"></div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                <MapPin className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1">
              <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
                {pickupLocation.name}
              </div>
            </div>
          </motion.div>
        )}

        {dropoffLocation && (
          <motion.div 
            className="absolute"
            style={{ 
              left: `calc(${dropoffLocation.coordinates ? dropoffLocation.coordinates.lng/3 + 40 : 60}%)`, 
              top: `calc(${dropoffLocation.coordinates ? dropoffLocation.coordinates.lat/3 + 20 : 50}%)` 
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className={cn(
                "w-12 h-12 flex items-center justify-center cursor-pointer transition-transform",
                isInteractive && "hover:scale-110"
              )}
              onClick={isInteractive ? onDropoffClick : undefined}
            >
              <div className="absolute inset-0 bg-amber-500 rounded-full opacity-20 animate-ping-slow animation-delay-500"></div>
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                <MapPin className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1">
              <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
                {dropoffLocation.name}
              </div>
            </div>
          </motion.div>
        )}

        {/* Path between locations */}
        {pickupLocation && dropoffLocation && (
          <svg className="absolute inset-0 z-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d={`M ${pickupLocation.coordinates ? pickupLocation.coordinates.lng/3 + 40 : 30} 
                 ${pickupLocation.coordinates ? pickupLocation.coordinates.lat/3 + 20 : 40} 
                 Q 50 30, 
                 ${dropoffLocation.coordinates ? dropoffLocation.coordinates.lng/3 + 40 : 60} 
                 ${dropoffLocation.coordinates ? dropoffLocation.coordinates.lat/3 + 20 : 50}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - pathProgress }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Interactive hint when no locations selected */}
        {!pickupLocation && !dropoffLocation && isInteractive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <PulsatingDot size="lg" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 whitespace-nowrap">
                <p className="text-white text-center text-sm opacity-80">Tap to set your journey</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
    </div>
  );
};
