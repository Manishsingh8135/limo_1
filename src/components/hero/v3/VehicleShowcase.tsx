'use client';

import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Briefcase, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VehicleShowcaseProps } from './types';

export const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({
  bookingState,
  goToStep,
  vehicles
}) => {
  const [activeVehicle, setActiveVehicle] = useState(bookingState.vehicle);
  const [vehicleIndex, setVehicleIndex] = useState(vehicles.findIndex(v => v.id === activeVehicle.id));
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const nextVehicle = () => {
    const newIndex = (vehicleIndex + 1) % vehicles.length;
    setVehicleIndex(newIndex);
    setActiveVehicle(vehicles[newIndex]);
    slideShowcase('next');
  };

  const prevVehicle = () => {
    const newIndex = vehicleIndex > 0 ? vehicleIndex - 1 : vehicles.length - 1;
    setVehicleIndex(newIndex);
    setActiveVehicle(vehicles[newIndex]);
    slideShowcase('prev');
  };

  const slideShowcase = (direction: 'next' | 'prev') => {
    controls.start({
      x: direction === 'next' ? [0, -20, 0] : [0, 20, 0],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.5 }
    });
  };

  const handleContinue = () => {
    goToStep('quickBook', { vehicle: activeVehicle });
  };

  const handleBack = () => {
    goToStep('initial');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={cn(
          "h-4 w-4",
          i < rating ? "text-amber-400 fill-amber-400" : "text-gray-400"
        )} 
      />
    ));
  };

  return (
    <motion.div
      className="w-full max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Back Button */}
      <div className="mb-4">
        <button
          className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
          onClick={handleBack}
          aria-label="Back to journey"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Journey</span>
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl text-white font-serif">Select Your Luxury Vehicle</h2>
          <p className="text-white/60 mt-1">
            Choose from our premium fleet for your journey from {bookingState.pickupLocation?.name} to {bookingState.dropoffLocation?.name}
          </p>
        </div>

        {/* Vehicle Showcase */}
        <motion.div
          className="relative overflow-hidden px-4 py-8"
          ref={containerRef}
          animate={controls}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 px-4">
            {/* Vehicle Image */}
            <motion.div 
              className="flex-shrink-0 w-full md:w-1/2 relative h-48 md:h-72 p-2"
              variants={imageVariants}
            >
              <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent rounded-3xl"></div>
              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-black/20 p-2">
                <Image
                  src={activeVehicle.image || '/images/vehicles/luxury-sedan.jpg'}
                  alt={activeVehicle.name}
                  fill
                  className="object-cover object-center rounded-xl shadow-inner filter brightness-110 contrast-110"
                />
              </div>
            </motion.div>

            {/* Vehicle Details */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl md:text-2xl text-white font-medium">{activeVehicle.name}</h3>
                  <div className="flex mt-1">
                    {renderStars(activeVehicle.luxuryLevel)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg text-primary font-semibold">${activeVehicle.basePrice}</p>
                  <p className="text-white/60 text-sm">base fare</p>
                </div>
              </div>
              
              <p className="text-white/80 my-4">{activeVehicle.description}</p>
              
              {/* Vehicle Features */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{activeVehicle.capacity.passengers} Passengers</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>{activeVehicle.capacity.luggage} Luggage</span>
                </div>
                {activeVehicle.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/80">
                    <div className="w-4 h-4 flex items-center justify-center text-primary">•</div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Vehicle Navigation */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <button
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    onClick={prevVehicle}
                    aria-label="Previous vehicle"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    onClick={nextVehicle}
                    aria-label="Next vehicle"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="text-white/60 text-sm">
                  {vehicleIndex + 1} of {vehicles.length}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end">
          <Button
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary-600 hover:to-primary-500 text-white py-2.5 px-6 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-primary/20"
            onClick={handleContinue}
          >
            <span>Continue with {activeVehicle.name}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
