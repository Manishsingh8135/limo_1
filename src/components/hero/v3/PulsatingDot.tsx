'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { PulsatingDotProps } from './types';

export const PulsatingDot: React.FC<PulsatingDotProps> = ({ 
  delay = 0,
  size = 'default'
}) => {
  const sizeClasses = {
    'sm': 'w-1.5 h-1.5',
    'default': 'w-2.5 h-2.5',
    'lg': 'w-4 h-4'
  };
  
  const sizePulseClasses = {
    'sm': 'w-4 h-4',
    'default': 'w-6 h-6',
    'lg': 'w-10 h-10'
  };

  return (
    <div className="absolute flex items-center justify-center">
      <div
        className={cn(
          "absolute rounded-full bg-primary opacity-20",
          sizePulseClasses[size as keyof typeof sizePulseClasses]
        )}
        style={{
          animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite ${delay}s`
        }}
      ></div>
      <div
        className={cn(
          "rounded-full bg-primary",
          sizeClasses[size as keyof typeof sizeClasses]
        )}
      ></div>
    </div>
  );
};
