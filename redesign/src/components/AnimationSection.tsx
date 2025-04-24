// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

type AnimationSectionProps = {
  tag?: string;
  title: string;
  description: string;
  ctaText?: string;
  animation: React.ReactNode;
  index: number;
  reversed?: boolean;
};

const AnimationSection: React.FC<AnimationSectionProps> = ({
  tag,
  title,
  description,
  ctaText,
  animation,
  index,
  reversed = false
}) => {
  // Create refs for the mobile and desktop animation containers
  const mobileAnimationRef = React.useRef(null);
  const desktopAnimationRef = React.useRef(null);
  
  // Use Framer Motion's useInView hook to detect when elements are in viewport
  const isMobileAnimationInView = useInView(mobileAnimationRef, { 
    once: false, // Allow re-triggering if scrolled away and back
    amount: 0.3 // Trigger when 30% of the element is in view
  });
  
  const isDesktopAnimationInView = useInView(desktopAnimationRef, { 
    once: true, // Only trigger once for desktop
    amount: 0.3
  });
  
  // Create separate trigger states for mobile and desktop
  const [mobileTrigger, setMobileTrigger] = useState(false);
  const [desktopTrigger, setDesktopTrigger] = useState(false);
  
  // Update trigger states when sections come into view
  useEffect(() => {
    if (isMobileAnimationInView) {
      setMobileTrigger(true);
    } else {
      // Reset trigger when section scrolls out of view (for mobile only)
      setMobileTrigger(false);
    }
  }, [isMobileAnimationInView]);
  
  useEffect(() => {
    if (isDesktopAnimationInView) {
      setDesktopTrigger(true);
    }
  }, [isDesktopAnimationInView]);
  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: 0.1
      }
    }
  };

  // Animation variants for animation container
  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: 0.2
      }
    }
  };
  
  // Clone the animation with the appropriate activeIndex prop for mobile
  const mobileAnimationElement = React.cloneElement(
    animation as React.ReactElement,
    { 
      activeIndex: index,
      isMobile: true,
      shouldAnimate: mobileTrigger
    }
  );
  
  // Clone the animation with the appropriate activeIndex prop for desktop
  const desktopAnimationElement = React.cloneElement(
    animation as React.ReactElement,
    { 
      activeIndex: index,
      isMobile: false,
      shouldAnimate: desktopTrigger
    }
  );

  return (
    <div className={`w-full py-10 md:py-16 lg:py-20 ${index % 2 !== 0 ? 'bg-[#f9f9f9]' : 'bg-white'}`}>
      {/* Mobile layout (stacked) */}
      <div className="md:hidden flex flex-col w-full px-4">
        <motion.div
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={contentVariants}
        >
          {tag && <p className="text-sm font-medium text-[#0082D3] mb-2">{tag}</p>}
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-[#444444] mb-6">{description}</p>
          {ctaText && (
            <button className="inline-flex items-center text-[#0082D3] font-medium hover:underline">
              {ctaText}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          )}
        </motion.div>
        
        <motion.div
          ref={mobileAnimationRef}
          className="w-full h-[350px] flex justify-center items-center"
          initial="hidden"
          animate={isMobileAnimationInView ? "visible" : "hidden"}
          variants={animationVariants}
        >
          {mobileAnimationElement}
        </motion.div>
      </div>

      {/* Desktop layout (side-by-side) */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex w-full items-center ${reversed ? 'flex-row-reverse' : 'flex-row'}`}>
          <motion.div
            className="w-1/2 pr-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={contentVariants}
          >
            {tag && <p className="text-sm font-medium text-[#0082D3] mb-3">{tag}</p>}
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">{title}</h2>
            <p className="text-lg text-[#444444] mb-8">{description}</p>
            {ctaText && (
              <button className="inline-flex items-center text-[#0082D3] font-medium text-lg hover:underline">
                {ctaText}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            )}
          </motion.div>
          
          <motion.div
            ref={desktopAnimationRef}
            className="w-1/2 h-[450px] flex justify-center items-center"
            initial="hidden"
            animate={isDesktopAnimationInView ? "visible" : "hidden"}
            variants={animationVariants}
          >
            {desktopAnimationElement}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimationSection;
