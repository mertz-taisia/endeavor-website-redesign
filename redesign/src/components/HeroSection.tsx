// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {

  // Animation variants for subtle slide-in effect
  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: 0.1 * custom
      }
    })
  };

  // Container variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  return (
    <motion.div 
      className="flex flex-col justify-center items-start min-h-[45vh] sm:min-h-[60vh] md:min-h-[70vh] w-full px-4 sm:px-6 md:px-10 lg:px-20 pt-32 sm:pt-16 md:pt-20 lg:pt-32 pb-6 sm:pb-8 md:pb-12 lg:pb-16 bg-[#0D0D0D] overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="w-full flex flex-col items-center"
        variants={containerVariants}
      >
        {/* Main title text */}
        <motion.h1 
          className="flex flex-col items-center text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium text-white leading-tight mb-3 sm:mb-4 md:mb-6"
          variants={slideUpVariants}
          custom={0}
        >
          <motion.span 
            className="px-2"
            variants={slideUpVariants}
            custom={1}
          >
            Grow, keep, & win,
          </motion.span>
          <motion.span
            className="px-2"
            variants={slideUpVariants}
            custom={2}
          >
            customers with AI Agents
          </motion.span>
        </motion.h1>
        
        {/* Subtitle text */}
        <motion.p 
          className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-[#898989] mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-4"
          variants={slideUpVariants}
          custom={3}
        >
          Automated sales orders, with no manual mess.
        </motion.p>
        
        {/* Get Started Button with gradient */}
        <motion.button 
          className="px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg text-white font-medium rounded-full bg-[#0D0D0D] border-2 border-transparent bg-clip-padding relative shadow-[0_0_15px_rgba(108,199,255,0.3)]"
          style={{
            backgroundImage: 'linear-gradient(#0D0D0D, #0D0D0D), linear-gradient(to right, #0082D3, #6CC7FF, #DBF1FF)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box'
          }}
          onClick={() => {
            // Use direct window location change instead of React Router
            window.location.href = '/animation';
          }}
          variants={slideUpVariants}
          custom={4}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;