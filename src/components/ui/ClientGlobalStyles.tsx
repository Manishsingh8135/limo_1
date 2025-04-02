'use client';

import React from 'react';
import { createGlobalStyle } from 'styled-components';

// Global styles for luxury button animations
export const GlobalStyle = createGlobalStyle`
  /* Elegant Shine Effect - Subtle sweeping light effect */
  @keyframes royalShine {
    0% {
      background-position: -200% 0;
      opacity: 0;
    }
    50% {
      opacity: 0.15; /* Even more subtle opacity for true luxury */
    }
    100% {
      background-position: 200% 0;
      opacity: 0;
    }
  }

  /* Refined Pulse - Subtle pulsating glow */
  @keyframes majesticPulse {
    0% {
      box-shadow: 0 0 5px 0 hsl(var(--primary) / 0.15);
    }
    50% {
      box-shadow: 0 0 12px 3px hsl(var(--primary) / 0.2);
    }
    100% {
      box-shadow: 0 0 5px 0 hsl(var(--primary) / 0.15);
    }
  }

  /* Elegant Border - Subtle border animation */
  @keyframes regalBorder {
    0% {
      border-color: hsl(var(--primary) / 0.6);
      box-shadow: 0 0 4px hsl(var(--primary) / 0.1);
    }
    50% {
      border-color: hsl(var(--primary) / 0.8);
      box-shadow: 0 0 8px hsl(var(--primary) / 0.15);
    }
    100% {
      border-color: hsl(var(--primary) / 0.6);
      box-shadow: 0 0 4px hsl(var(--primary) / 0.1);
    }
  }

  /* Subtle Float - Barely perceptible floating effect */
  @keyframes luxuryFloat {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1px); /* Subtle movement */
    }
    100% {
      transform: translateY(0);
    }
  }

  /* Opulent Shimmer - Elegant shimmer across the surface */
  @keyframes opulentShimmer {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  /* Aristocratic Scale - Refined scaling animation */
  @keyframes aristocraticScale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02); /* More subtle scale for elegance */
    }
    100% {
      transform: scale(1);
    }
  }

  /* Apply the animations */
  .animate-royal-shine {
    position: relative;
    overflow: hidden;
  }
  
  .animate-royal-shine::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent); /* Subtle gradient */
    background-size: 200% 100%;
    border-radius: inherit;
    animation: royalShine 4s ease-in-out infinite; /* Slower animation for elegance */
    pointer-events: none;
  }

  .animate-majestic-pulse {
    animation: majesticPulse 3s infinite;
  }

  .animate-regal-border {
    animation: regalBorder 3s infinite;
  }

  .animate-luxury-float {
    animation: luxuryFloat 3s ease-in-out infinite;
  }

  .animate-opulent-shimmer {
    background-size: 200% 100%;
    animation: opulentShimmer 3s linear infinite;
  }

  .animate-aristocratic-scale {
    animation: aristocraticScale 3s ease-in-out infinite;
  }

  /* Hover-triggered animations */
  .hover-royal-shine {
    position: relative;
    overflow: hidden;
  }
  
  .hover-royal-shine:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent); /* Subtle gradient */
    background-size: 200% 100%;
    border-radius: inherit;
    animation: royalShine 2s ease-in-out; /* Slightly slower animation */
    pointer-events: none;
  }

  .hover-majestic-pulse:hover {
    animation: majesticPulse 2s infinite;
  }

  .hover-regal-border:hover {
    animation: regalBorder 2s infinite;
  }

  .hover-luxury-float:hover {
    animation: luxuryFloat 2s ease-in-out infinite;
  }
  
  /* Glass effect for buttons */
  .glass-effect {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Metallic effect for buttons */
  .metallic-effect {
    background: linear-gradient(135deg, #e2e2e2, #c9c9c9, #e2e2e2);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Gold effect for buttons */
  .gold-effect {
    background: linear-gradient(135deg, #f0c14b, #f5d68a, #f0c14b);
    border: 1px solid rgba(150, 100, 0, 0.2);
    box-shadow: 0 4px 8px rgba(150, 100, 0, 0.1);
    color: #5c4813;
  }
  
  /* Elegant button press effect */
  .press-effect {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .press-effect:active {
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default function ClientGlobalStyles() {
  return <GlobalStyle />;
}
