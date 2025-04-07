'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, Briefcase, MapPin, Car, CalendarClock, Users, CheckCircle } from 'lucide-react';
import { timeOptions } from '../data/hero.data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QuickBookPanelProps } from './types';

export const QuickBookPanel: React.FC<QuickBookPanelProps> = ({
  bookingState,
  goToStep
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleTimeChange = (newTime: string) => {
    goToStep('quickBook', { time: newTime });
  };

  const handlePassengerChange = (change: number) => {
    const newValue = Math.min(
      Math.max(1, bookingState.passengers + change),
      bookingState.vehicle.capacity.passengers
    );
    goToStep('quickBook', { passengers: newValue });
  };

  const handleLuggageChange = (change: number) => {
    const newValue = Math.min(
      Math.max(0, bookingState.luggage + change),
      bookingState.vehicle.capacity.luggage
    );
    goToStep('quickBook', { luggage: newValue });
  };

  const handleBookNow = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset after showing success
      setTimeout(() => {
        goToStep('success');
      }, 2000);
    }, 1500);
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Calculate estimated price (simplified version)
  const basePrice = bookingState.vehicle.basePrice;
  const distancePrice = 50; // This would be calculated based on the distance between locations
  const passengerFee = bookingState.passengers > 2 ? (bookingState.passengers - 2) * 10 : 0;
  const luggageFee = bookingState.luggage > 1 ? (bookingState.luggage - 1) * 5 : 0;
  const totalPrice = basePrice + distancePrice + passengerFee + luggageFee;

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
          onClick={() => goToStep('selectVehicle')}
          disabled={isSubmitting || isSuccess}
          aria-label="Back to vehicle selection"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Vehicle Selection</span>
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Success Overlay */}
        {isSuccess && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-3xl">
            <motion.div
              className="text-center p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-block mb-4 text-primary">
                <CheckCircle className="h-16 w-16" />
              </div>
              <h2 className="text-3xl font-serif text-white mb-2">Booking Confirmed!</h2>
              <p className="text-white/70">
                Need a specific pickup time? Let&apos;s schedule what works best for you.
              </p>
            </motion.div>
          </div>
        )}

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl text-white font-serif">Complete Your Booking</h2>
          <p className="text-white/60 mt-1">
            Review your journey details and confirm your luxury experience
          </p>
        </div>

        {/* Booking Summary */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Journey Details */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg text-white font-medium">Journey Details</h3>
              
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase font-medium">FROM</p>
                  <p className="text-white font-medium">{bookingState.pickupLocation?.name}</p>
                  <p className="text-white/70 text-sm">{bookingState.pickupLocation?.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase font-medium">TO</p>
                  <p className="text-white font-medium">{bookingState.dropoffLocation?.name}</p>
                  <p className="text-white/70 text-sm">{bookingState.dropoffLocation?.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex-shrink-0 mt-1">
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase font-medium">VEHICLE</p>
                  <p className="text-white font-medium">{bookingState.vehicle.name}</p>
                  <p className="text-white/70 text-sm">{bookingState.vehicle.description.split('.')[0]}</p>
                </div>
              </div>
            </motion.div>

            {/* Schedule & Passengers */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg text-white font-medium">Schedule & Passengers</h3>
              
              {/* Date & Time Selection */}
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex-shrink-0 mt-1">
                  <CalendarClock className="h-5 w-5 text-primary" />
                </div>
                <div className="w-full">
                  <p className="text-white/60 text-xs uppercase font-medium mb-2">PICKUP DATE & TIME</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {/* Simplified Date Picker - Would use Shadcn Calendar in real implementation */}
                    <div className="relative flex gap-2 items-center p-2 bg-white/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-white/70" />
                      <span className="text-white">{bookingState.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {timeOptions.map((option) => (
                      <button
                        key={option.id}
                        className={cn(
                          "py-2 px-3 rounded-lg text-sm transition-all cursor-pointer",
                          "hover:shadow-md hover:translate-y-[-1px]",
                          bookingState.time === option.value
                            ? "bg-primary text-white shadow-sm shadow-primary/20"
                            : "bg-white/10 text-white/80 hover:bg-white/20"
                        )}
                        onClick={() => handleTimeChange(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Passengers & Luggage */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{bookingState.passengers} Passengers</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                        "bg-white/10 text-white cursor-pointer", 
                        "hover:bg-white/20 hover:shadow-md hover:scale-110",
                        bookingState.passengers <= 1 && "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-white/10 hover:shadow-none"
                      )}
                      onClick={() => handlePassengerChange(-1)}
                      disabled={bookingState.passengers <= 1}
                      aria-label="Decrease passengers"
                    >-</button>
                    <button
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                        "bg-white/10 text-white cursor-pointer", 
                        "hover:bg-white/20 hover:shadow-md hover:scale-110",
                        bookingState.passengers >= bookingState.vehicle.capacity.passengers && "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-white/10 hover:shadow-none"
                      )}
                      onClick={() => handlePassengerChange(1)}
                      disabled={bookingState.passengers >= bookingState.vehicle.capacity.passengers}
                      aria-label="Increase passengers"
                    >+</button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{bookingState.luggage} Luggage</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                        "bg-white/10 text-white cursor-pointer", 
                        "hover:bg-white/20 hover:shadow-md hover:scale-110",
                        bookingState.luggage <= 0 && "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-white/10 hover:shadow-none"
                      )}
                      onClick={() => handleLuggageChange(-1)}
                      disabled={bookingState.luggage <= 0}
                      aria-label="Decrease luggage"
                    >-</button>
                    <button
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                        "bg-white/10 text-white cursor-pointer", 
                        "hover:bg-white/20 hover:shadow-md hover:scale-110",
                        bookingState.luggage >= bookingState.vehicle.capacity.luggage && "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-white/10 hover:shadow-none"
                      )}
                      onClick={() => handleLuggageChange(1)}
                      disabled={bookingState.luggage >= bookingState.vehicle.capacity.luggage}
                      aria-label="Increase luggage"
                    >+</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Price Summary */}
        <motion.div 
          variants={itemVariants}
          className="p-6 bg-gradient-to-r from-black/40 to-primary/5 border-t border-white/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg text-white font-medium">Price Summary</h3>
              <div className="text-white/60 text-sm mt-1">
                <p>Base fare + distance fee + extras</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl text-primary font-semibold">${totalPrice}</p>
              <p className="text-white/60 text-sm">estimated total</p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end">
          <Button
            className={cn(
              "bg-gradient-to-r from-primary to-primary/80 hover:from-primary-600 hover:to-primary-500",
              "text-white py-3 px-8 min-w-44 rounded-xl font-medium text-lg shadow-lg shadow-primary/20",
              "flex items-center justify-center gap-2",
              (isSubmitting || isSuccess) && "opacity-80 pointer-events-none"
            )}
            onClick={handleBookNow}
            disabled={isSubmitting || isSuccess}
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Processing...</span>
              </>
            ) : (
              <>
                <span>Confirm Booking</span>
                <CheckCircle className="h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
