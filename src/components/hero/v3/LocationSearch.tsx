'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, X, Search, Star, Building, LocateFixed } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { LocationSearchProps } from './types';
import { Location } from '../types/hero.types';
import { cn } from '@/lib/utils';

export const LocationSearch = ({ 
  type,
  onSelect,
  popularLocations
}: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(popularLocations);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  
  // Direct selection handled inline

  // Filter locations when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLocations(popularLocations);
    } else {
      const filtered = popularLocations.filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchTerm, popularLocations]);

  const handleCurrentLocation = () => {
    // In a real app, we would use the browser's geolocation API here
    // For now, we'll just simulate it with a delay
    setUseCurrentLocation(true);
    setTimeout(() => {
      onSelect({
        id: 'current-location',
        name: 'Current Location',
        address: '123 Current St, Chicago, IL',
        type: 'custom',
        coordinates: {
          lat: 41.8781,
          lng: -87.6298
        }
      });
      setUseCurrentLocation(false);
    }, 1500);
  };

  const getIconForLocationType = (locationType: string) => {
    switch(locationType) {
      case 'airport':
        return <LocateFixed className="h-4 w-4" />;
      case 'hotel':
        return <Building className="h-4 w-4" />;
      case 'business':
        return <Building className="h-4 w-4" />;
      case 'venue':
        return <Star className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="p-3">
        <div className="flex items-center bg-white/10 rounded-lg border border-white/10 overflow-hidden">
          <Search className="h-4 w-4 text-white/60 ml-3" />
          <Input
            type="text"
            placeholder={`Search for ${type === 'pickup' ? 'pickup' : 'destination'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 bg-transparent text-white placeholder-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {searchTerm && (
            <button 
              className="mr-3 text-white/60 hover:text-white hover:bg-white/10 p-1 rounded-full transition-all cursor-pointer" 
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="max-h-60 overflow-y-auto px-2 pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Use current location option */}
        <button
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 hover:border-white/20 hover:shadow-md transition-all cursor-pointer"
          onClick={handleCurrentLocation}
          disabled={useCurrentLocation}
          aria-label="Use current location"
        >
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            useCurrentLocation ? "bg-primary text-white" : "bg-white/10 text-white/80"
          )}>
            <LocateFixed className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium">Use Current Location</p>
            {useCurrentLocation && <p className="text-white/60 text-xs">Locating...</p>}
          </div>
        </button>

        {/* Popular or filtered locations */}
        {filteredLocations.length > 0 ? (
          <div className="space-y-1 mt-1">
            {filteredLocations.map((location) => (
              <motion.button
                key={location.id}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onSelect(location)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                aria-label={`Select location: ${location.name}`}
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                  {getIconForLocationType(location.type)}
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-white font-medium truncate">{location.name}</p>
                  <p className="text-white/60 text-xs truncate">{location.address}</p>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-white/60">
            No locations found. Try different search terms.
          </div>
        )}
      </div>
    </motion.div>
  );
};
