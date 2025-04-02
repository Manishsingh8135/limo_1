'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Clock, Luggage, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  defaultPickupLocation, 
  popularLocations, 
  vehicleOptions, 
  timeOptions 
} from '../data/hero.data';
import { BookingFormData, Location } from '../types/hero.types';

const BookingForm = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: defaultPickupLocation,
    dropoffLocation: null,
    date: new Date(),
    time: 'now',
    passengers: 2,
    luggage: 2,
    vehicleType: 'luxury-sedan',
    rideType: 'standard',
    specialRequests: ''
  });

  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeDropdown, setActiveDropdown] = useState<'pickup' | 'dropoff' | null>(null);
  // Vehicle selection state for future implementation
  const [, setIsVehicleSelectionOpen] = useState<boolean>(false);

  const handleLocationSelect = (location: Location, type: 'pickup' | 'dropoff') => {
    setFormData({
      ...formData,
      [type === 'pickup' ? 'pickupLocation' : 'dropoffLocation']: location
    });
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown: 'pickup' | 'dropoff') => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleVehicleSelect = (vehicleId: string) => {
    setFormData({
      ...formData,
      vehicleType: vehicleId
    });
    setIsVehicleSelectionOpen(false);
  };

  const selectedVehicle = vehicleOptions.find(v => v.id === formData.vehicleType);

  const formSteps = [
    { name: 'Location', icon: <MapPin className="h-5 w-5" /> },
    { name: 'Vehicle', icon: <Users className="h-5 w-5" /> },
    { name: 'Schedule', icon: <Calendar className="h-5 w-5" /> }
  ];

  const handleNextStep = () => {
    if (activeStep < formSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Submit form
      console.log('Booking submitted:', formData);
      // Here you would typically call an API to process the booking
    }
  };

  const locationDropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  const vehicleCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut'
      }
    }),
    hover: { 
      scale: 1.03,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 }
    },
    selected: {
      scale: 1.05,
      boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2)",
    }
  };

  const renderLocationStep = () => (
    <div className="space-y-6">
      {/* Pickup Location */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-300">Pickup Location</label>
        <div className="relative">
          <div className="w-full flex items-center justify-between p-4 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 w-full">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <input 
                type="text" 
                placeholder="Enter pickup location or select from popular locations" 
                className="bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-500 w-full"
                value={formData.pickupLocation?.address || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  pickupLocation: {
                    id: 'custom',
                    name: 'Custom Location',
                    address: e.target.value,
                    type: 'custom'
                  }
                })}
              />
            </div>
            <button 
              type="button"
              onClick={() => toggleDropdown('pickup')}
              className="flex-shrink-0 ml-2"
              aria-label="Toggle pickup locations"
            >
              <ChevronDown className={cn(
                "h-5 w-5 text-slate-400 transition-transform duration-300",
                activeDropdown === 'pickup' && "rotate-180"
              )} />
            </button>
          </div>

          {activeDropdown === 'pickup' && (
            <motion.div 
              className="absolute z-[9999] mt-2 w-full bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden shadow-xl"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={locationDropdownVariants}
            >
              <div className="p-3 border-b border-slate-700">
                <p className="text-sm font-medium text-slate-300">Popular Locations</p>
              </div>
              <div className="max-h-60 overflow-y-auto py-2">
                {popularLocations.map((location) => (
                  <div 
                    key={location.id}
                    className="px-4 py-3 hover:bg-slate-700/50 cursor-pointer transition-colors duration-200"
                    onClick={() => handleLocationSelect(location, 'pickup')}
                  >
                    <p className="font-medium text-slate-100">{location.name}</p>
                    <p className="text-xs text-slate-400">{location.address}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Dropoff Location */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-300">Dropoff Location</label>
        <div className="relative">
          <div className="w-full flex items-center justify-between p-4 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 w-full">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <input 
                type="text" 
                placeholder="Enter destination or select from popular locations" 
                className="bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-500 w-full"
                value={formData.dropoffLocation?.address || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  dropoffLocation: {
                    id: 'custom',
                    name: 'Custom Location',
                    address: e.target.value,
                    type: 'custom'
                  }
                })}
              />
            </div>
            <button 
              type="button"
              onClick={() => toggleDropdown('dropoff')}
              className="flex-shrink-0 ml-2"
              aria-label="Toggle popular destinations"
            >
              <ChevronDown className={cn(
                "h-5 w-5 text-slate-400 transition-transform duration-300",
                activeDropdown === 'dropoff' && "rotate-180"
              )} />
            </button>
          </div>
          
          {activeDropdown === 'dropoff' && (
            <motion.div 
              className="absolute z-[9999] mt-2 w-full bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden shadow-xl"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={locationDropdownVariants}
            >
              <div className="p-3 border-b border-slate-700">
                <p className="text-sm font-medium text-slate-300">Popular Destinations in Chicago</p>
              </div>
              <div className="max-h-60 overflow-y-auto py-2">
                {popularLocations.map((location) => (
                  <div 
                    key={location.id}
                    className="px-4 py-3 hover:bg-slate-700/50 cursor-pointer transition-colors duration-200"
                    onClick={() => handleLocationSelect(location, 'dropoff')}
                  >
                    <p className="font-medium text-slate-100">{location.name}</p>
                    <p className="text-xs text-slate-400">{location.address}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  const renderVehicleStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicleOptions.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            className={cn(
              "relative p-4 bg-slate-800/70 backdrop-blur-md border rounded-2xl cursor-pointer transition-all duration-300",
              formData.vehicleType === vehicle.id 
                ? "border-primary shadow-lg shadow-primary/20" 
                : "border-slate-700 hover:border-slate-600"
            )}
            onClick={() => handleVehicleSelect(vehicle.id)}
            variants={vehicleCardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
            whileTap={{ scale: 0.98 }}
          >
            {formData.vehicleType === vehicle.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            <div className="flex flex-col h-full">
              <div className="mb-3 h-40 overflow-hidden rounded-xl bg-slate-900">
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <span className="text-slate-600 text-sm">Vehicle Image</span>
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-serif font-medium text-slate-100">{vehicle.name}</h3>
                <p className="text-sm text-slate-400 mb-2">{vehicle.description}</p>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-primary/70" />
                    <span className="text-xs text-slate-300">{vehicle.capacity.passengers} passengers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Luggage className="h-4 w-4 text-primary/70" />
                    <span className="text-xs text-slate-300">{vehicle.capacity.luggage} luggage</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {vehicle.features.slice(0, 2).map((feature, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-slate-700/50 rounded-full text-slate-300">
                      {feature}
                    </span>
                  ))}
                  {vehicle.features.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-slate-700/50 rounded-full text-slate-300">
                      +{vehicle.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-auto pt-3 border-t border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400">From</span>
                    <span className="text-lg font-medium text-primary">${vehicle.basePrice}</span>
                  </div>
                  <div className="flex">
                    {[...Array(vehicle.luxuryLevel)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    {[...Array(5 - vehicle.luxuryLevel)].map((_, i) => (
                      <svg key={i + vehicle.luxuryLevel} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderScheduleStep = () => (
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-300">Date</label>
        <div className="flex items-center justify-between p-4 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <input 
              type="date" 
              className="bg-transparent border-none outline-none text-slate-100 w-full"
              value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({
                ...formData,
                date: new Date(e.target.value)
              })}
              aria-label="Select booking date"
              placeholder="Select date"
            />
          </div>
        </div>
      </div>

      {/* Time Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-300">Time</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {timeOptions.map((timeOption) => (
            <div 
              key={timeOption.id}
              className={cn(
                "p-4 bg-slate-800/70 backdrop-blur-md border rounded-2xl cursor-pointer transition-all duration-300",
                formData.time === timeOption.value 
                  ? "border-primary shadow-lg shadow-primary/20" 
                  : "border-slate-700 hover:border-slate-600"
              )}
              onClick={() => setFormData({...formData, time: timeOption.value})}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-slate-100">{timeOption.label}</p>
                  {timeOption.isPopular && (
                    <span className="text-xs px-2 py-0.5 bg-primary/20 rounded-full text-primary">
                      Popular
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Passenger and Luggage Count */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300">Passengers</label>
          <div className="flex items-center justify-between p-4 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-slate-100">{formData.passengers} passengers</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                onClick={() => setFormData({...formData, passengers: Math.max(1, formData.passengers - 1)})}
                disabled={formData.passengers <= 1}
              >
                -
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                onClick={() => setFormData({...formData, passengers: Math.min(selectedVehicle?.capacity.passengers || 10, formData.passengers + 1)})}
                disabled={formData.passengers >= (selectedVehicle?.capacity.passengers || 10)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300">Luggage</label>
          <div className="flex items-center justify-between p-4 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
                <Luggage className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-slate-100">{formData.luggage} pieces</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                onClick={() => setFormData({...formData, luggage: Math.max(0, formData.luggage - 1)})}
                disabled={formData.luggage <= 0}
              >
                -
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                onClick={() => setFormData({...formData, luggage: Math.min(selectedVehicle?.capacity.luggage || 10, formData.luggage + 1)})}
                disabled={formData.luggage >= (selectedVehicle?.capacity.luggage || 10)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveStep = () => {
    switch (activeStep) {
      case 0:
        return renderLocationStep();
      case 1:
        return renderVehicleStep();
      case 2:
        return renderScheduleStep();
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Form Header with Steps */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-serif font-medium text-slate-100">Book Your Luxury Ride</h2>
        </div>
        <div className="flex items-center">
          {formSteps.map((step, index) => (
            <React.Fragment key={step.name}>
              <div 
                className={cn(
                  "flex items-center gap-2 cursor-pointer",
                  index === activeStep ? "text-primary" : "text-slate-400"
                )}
                onClick={() => setActiveStep(index)}
              >
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300",
                  index === activeStep ? "bg-primary/20" : "bg-slate-800"
                )}>
                  {step.icon}
                </div>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
              {index < formSteps.length - 1 && (
                <div className="w-12 h-px bg-slate-800 mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {renderActiveStep()}
      </div>

      {/* Form Footer */}
      <div className="p-6 border-t border-slate-800 flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
        >
          Back
        </Button>
        <Button 
          onClick={handleNextStep}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-6 rounded-xl font-medium text-lg shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
        >
          {activeStep === formSteps.length - 1 ? 'Book Now' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
