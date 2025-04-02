'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { heroConfig } from '../data/hero.data';
import BookingForm from './BookingForm';

const Hero = () => {
  // State to track component loading
  const [, setIsLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsLoaded(true);
    controls.start('visible');
  }, [controls]);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const backgroundShineVariants = {
    initial: { backgroundPosition: '200% 0' },
    animate: {
      backgroundPosition: '-200% 0'
    }
  };
  
  const backgroundShineTransition = {
    repeat: Infinity,
    repeatType: 'mirror' as const,
    duration: 15,
    ease: 'linear'
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        
        {/* Background Image with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: 'easeOut' }}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat hero-background"
            data-background-url={heroConfig.backgroundImage}
          ></div>
        </motion.div>
        
        {/* Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 opacity-40 bg-gradient-shine"
          variants={backgroundShineVariants}
          initial="initial"
          animate="animate"
          transition={backgroundShineTransition}
        ></motion.div>
        
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950/90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 min-h-screen flex flex-col">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 mt-16"
          variants={heroVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Hero Text Content */}
          <motion.div className="flex-1 text-center lg:text-left" variants={itemVariants}>
            <motion.div 
              className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-sm font-medium text-primary">Premium Luxury Transportation</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 tracking-tight"
              variants={itemVariants}
            >
              <span className="block">Experience Unparalleled</span>
              <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-purple-400">
                Luxury & Comfort
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              From airport transfers to special occasions, our premium fleet and professional chauffeurs ensure your journey is as remarkable as your destination.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-200">Professional Chauffeurs</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-200">Luxury Fleet</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-200">24/7 Service</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Booking Form */}
          <motion.div 
            className="flex-1 w-full max-w-2xl relative z-20"
            variants={itemVariants}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <BookingForm />
          </motion.div>
        </motion.div>
        
        {/* Floating Elements - Decorative */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl z-0 pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl z-0 pointer-events-none"></div>
      </div>
      
      {/* Curved Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-950">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full">
          <path 
            fill="#020617" 
            fillOpacity="1" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
