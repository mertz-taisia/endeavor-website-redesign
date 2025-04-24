// @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import Animation from './Animation';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import VideoPlayer from './VideoPlayer';
import Footer from './Footer';

const visibilityByIndex = {
  0: { showIcons: true, showLines: false, showEndeavor: false },
  1: { showIcons: true, showLines: true, showEndeavor: true },
  2: { showIcons: false, showLines: false, showEndeavor: true },
  3: { showIcons: false, showLines: false, showEndeavor: true },
  4: { showIcons: false, showLines: false, showEndeavor: true },
  5: { showIcons: false, showLines: false, showEndeavor: true },
  6: { showIcons: false, showLines: false, showEndeavor: true },
};


function App() {

  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const activatedElements = useRef<Set<string>>(new Set());
  const [animationVisible, setAnimationVisible] = useState(false);
  
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


  useEffect(() => {
    // Check if we're already scrolled down on page load
    const checkInitialScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      // If we're already scrolled down, make the animation visible
      if (scrollPosition > 100) {
        setAnimationVisible(true);
      }
    };
    
    // Run the check immediately
    checkInitialScroll();
    
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setActiveIndex(index);
            
            // Set animation visible when any section comes into view
            if (!animationVisible) {
              setAnimationVisible(true);
            }
            
            // Mark this section as activated for animations
            const id = entry.target.id;
            if (id && !activatedElements.current.has(id)) {
              activatedElements.current.add(id);
            }
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sectionsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [animationVisible]);

  const sectionText = [
    [
      "01 | ORDER INTAKE", 
      "Transform Purchase Order Processing", 
      "Eliminate tedious manual entry with Endeavor's intelligent AI assistant. Seamlessly process all order formats—Excel, PDFs, emails—with unparalleled accuracy. Our advanced system adapts to any document structure, reducing critical errors by up to 92% while saving your team countless hours.", 
      "Explore Order Intake"
    ],
    [
      "02 | FORMAT RECOGNITION", 
      "Instant Document Intelligence", 
      "Our proprietary AI technology rapidly identifies and adapts to your clients' unique purchase order formats. The system continuously learns and evolves, extracting critical data with precision that surpasses conventional OCR solutions by orders of magnitude.", 
      "Discover Format Recognition"
    ],
    [
      "03 | VALIDATION", 
      "Precision Through Intelligent Verification", 
      "Endeavor's validation engine cross-references extracted data against comprehensive knowledge bases containing millions of part numbers and product descriptions. The system integrates seamlessly with your historical sales data, ensuring unmatched accuracy through multi-layered verification processes.", 
      "Learn About Validation"
    ],
    [
      "04 | BUSINESS LOGIC", 
      "Custom Rules Engine for Maximum Efficiency", 
      "Deploy sophisticated business logic precisely calibrated to your operational needs. Our platform enables complex rule implementation—from tiered pricing structures to inventory-based prioritization—all executed with millisecond precision and zero human intervention.", 
      "Explore Business Logic"
    ],
    [
      "05 | ERP INTEGRATION", 
      "Frictionless System Connection", 
      "Achieve true end-to-end automation with our enterprise-grade ERP integration. Endeavor seamlessly interfaces with leading platforms including SAP, Oracle, and Netsuite. The system intelligently processes orders and applies sophisticated exception handling when human oversight is beneficial.", 
      "Discover ERP Integration"
    ],
  ];

  return (
      <div className="flex flex-col justify-center items-center w-full bg-[#222222]">
        <div className="relative w-full">
          {/* Blue gradient overlay */}
          <div className="absolute z-0 w-full top-0 left-0 flex justify-center pointer-events-none" style={{ height: 'calc(70vh + 100px)' }}>
            <svg width="100%" height="100%" viewBox="0 0 1393 569" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', top: '35vh' }}>
              <ellipse cx="696.5" cy="284.5" rx="696.5" ry="284.5" fill="url(#paint0_radial_198_43)"/>
              <defs>
                <radialGradient id="paint0_radial_198_43" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(696.5 284.5) rotate(90) scale(284.5 696.5)">
                  <stop stopColor="#0A89D7" stopOpacity="0.5"/>
                  <stop offset="0.360577" stopColor="#0A89D7" stopOpacity="0.3"/>
                  <stop offset="1" stopColor="#054871" stopOpacity="0"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
          
          <NavBar logoSize="w-44 md:w-48 lg:w-52" />
          <HeroSection />
          <div className="w-full relative overflow-hidden">
            <VideoPlayer videoSrc="/endeavor_demo.mp4" height="700px" />
          </div>
        </div>
        <div className="flex flex-row w-7/10 items-start justify-between relative">
          {/* Scrollable text column */}
          <div className="w-1/2 pr-8 z-10">
            <div className="space-y-20">
              {sectionText.map((text, idx) => (
                <motion.div 
                  key={idx}
                  id={`section-${idx}`}
                  ref={el => (sectionsRef.current[idx] = el!)}
                  data-index={idx}
                  className="min-h-[80vh] flex flex-col gap-8 justify-center w-5/6"
                  initial="hidden"
                  animate={activatedElements.current.has(`section-${idx}`) ? "visible" : "hidden"}
                  variants={containerVariants}
                >
                  <motion.div className="relative" variants={slideUpVariants} custom={0}>
                    <motion.p 
                      className="text-sm tracking-widest font-medium text-[#00A3FF] uppercase mb-1 border-l-2 border-[#00A3FF] pl-3"
                      variants={slideUpVariants}
                      custom={1}
                    >
                      {text[0]}
                    </motion.p>
                    <motion.div 
                      className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#00A3FF] to-transparent opacity-40"
                      variants={slideUpVariants}
                      custom={1}
                    ></motion.div>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-4xl font-bold leading-tight text-white"
                    variants={slideUpVariants}
                    custom={2}
                  >
                    {text[1]}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-base leading-relaxed text-[#B0B0B0] max-w-xl"
                    variants={slideUpVariants}
                    custom={3}
                  >
                    {text[2]}
                  </motion.p>
                  
                  <motion.button 
                    type="button"
                    className="group flex items-center mt-4 w-fit bg-[#222222] text-white text-sm font-medium tracking-wide px-6 py-3 rounded-full border-2 border-transparent bg-clip-padding relative"
                    style={{
                      backgroundImage: 'linear-gradient(#222222, #222222), linear-gradient(to right, #0082D3, #6CC7FF, #DBF1FF)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box'
                    }}
                    variants={slideUpVariants}
                    custom={4}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{text[3]}</span>
                    <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M5 12H19M19 12L12 5M19 12L12 19" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sticky/fixed animation on the right */}
          <div className="w-1/2 sticky top-8 mt-3 mb-3 self-start">
            {/* Animated border using Framer Motion */}
            <motion.div 
              className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
              style={{ zIndex: -1 }}
              initial="hidden"
              animate={animationVisible ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {}
              }}
            >
              {/* Top border */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent"
                initial={{ width: 0, left: '50%', opacity: 0 }}
                animate={animationVisible ? {
                  width: '100%',
                  left: 0,
                  opacity: [0.2, 0.5, 0.2],
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                } : { width: 0, left: '50%', opacity: 0 }}
                transition={{ 
                  width: { duration: 0.8, ease: 'easeOut' },
                  left: { duration: 0.8, ease: 'easeOut' },
                  opacity: { duration: 8, repeat: Infinity, ease: 'linear', delay: 0.8 },
                  backgroundPosition: { duration: 8, repeat: Infinity, ease: 'linear', delay: 0.8 },
                }}
              />
              
              {/* Right border */}
              <motion.div 
                className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#00A3FF] to-transparent"
                initial={{ height: 0, top: '50%', opacity: 0 }}
                animate={animationVisible ? {
                  height: '100%',
                  top: 0,
                  opacity: [0.2, 0.5, 0.2],
                  backgroundPosition: ['0% 0%', '0% 100%', '0% 0%'],
                } : { height: 0, top: '50%', opacity: 0 }}
                transition={{ 
                  height: { duration: 0.8, ease: 'easeOut', delay: 0.6 },
                  top: { duration: 0.8, ease: 'easeOut', delay: 0.6 },
                  opacity: { duration: 8, repeat: Infinity, ease: 'linear', delay: 1.4 },
                  backgroundPosition: { duration: 8, repeat: Infinity, ease: 'linear', delay: 1.4 },
                }}
              />
              
              {/* Bottom border */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent"
                initial={{ width: 0, right: '50%', opacity: 0 }}
                animate={animationVisible ? {
                  width: '100%',
                  right: 0,
                  opacity: [0.2, 0.5, 0.2],
                  backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                } : { width: 0, right: '50%', opacity: 0 }}
                transition={{ 
                  width: { duration: 0.8, ease: 'easeOut', delay: 1.2 },
                  right: { duration: 0.8, ease: 'easeOut', delay: 1.2 },
                  opacity: { duration: 8, repeat: Infinity, ease: 'linear', delay: 2 },
                  backgroundPosition: { duration: 8, repeat: Infinity, ease: 'linear', delay: 2 },
                }}
              />
              
              {/* Left border */}
              <motion.div 
                className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#00A3FF] to-transparent"
                initial={{ height: 0, bottom: '50%', opacity: 0 }}
                animate={animationVisible ? {
                  height: '100%',
                  bottom: 0,
                  opacity: [0.2, 0.5, 0.2],
                  backgroundPosition: ['0% 100%', '0% 0%', '0% 100%'],
                } : { height: 0, bottom: '50%', opacity: 0 }}
                transition={{ 
                  height: { duration: 0.8, ease: 'easeOut', delay: 1.8 },
                  bottom: { duration: 0.8, ease: 'easeOut', delay: 1.8 },
                  opacity: { duration: 8, repeat: Infinity, ease: 'linear', delay: 2.6 },
                  backgroundPosition: { duration: 8, repeat: Infinity, ease: 'linear', delay: 2.6 },
                }}
              />
              
              {/* Corner accents */}
              <motion.div 
                className="absolute top-0 left-0 w-6 h-6 border-t-[1px] border-l-[1px] border-[#00A3FF]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={animationVisible ? {
                  opacity: [0.3, 0.8, 0.3],
                  scale: 1
                } : { opacity: 0, scale: 0.5 }}
                transition={{
                  opacity: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 2.4 + (activeIndex * 0.2)
                  },
                  scale: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 2.4
                  }
                }}
              />
              <motion.div 
                className="absolute top-0 right-0 w-6 h-6 border-t-[1px] border-r-[1px] border-[#00A3FF]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={animationVisible ? {
                  opacity: [0.3, 0.8, 0.3],
                  scale: 1
                } : { opacity: 0, scale: 0.5 }}
                transition={{
                  opacity: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 2.6 + (activeIndex * 0.2)
                  },
                  scale: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 2.6
                  }
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-6 h-6 border-b-[1px] border-r-[1px] border-[#00A3FF]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={animationVisible ? {
                  opacity: [0.3, 0.8, 0.3],
                  scale: 1
                } : { opacity: 0, scale: 0.5 }}
                transition={{
                  opacity: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 2.8 + (activeIndex * 0.2)
                  },
                  scale: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 2.8
                  }
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-6 h-6 border-b-[1px] border-l-[1px] border-[#00A3FF]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={animationVisible ? {
                  opacity: [0.3, 0.8, 0.3],
                  scale: 1
                } : { opacity: 0, scale: 0.5 }}
                transition={{
                  opacity: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 3.0 + (activeIndex * 0.2)
                  },
                  scale: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 3.0
                  }
                }}
              />
              
              {/* Subtle glow effect that changes with activeIndex */}
              <motion.div
                className="absolute inset-0 opacity-0 bg-[#00A3FF]"
                initial={{ opacity: 0 }}
                animate={animationVisible ? {
                  opacity: [0, 0.03, 0],
                } : { opacity: 0 }}
                transition={{
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 3.2 + (activeIndex * 0.1),
                  }
                }}
                style={{ filter: 'blur(20px)' }}
              />
            </motion.div>
            
            {/* Main container with subtle padding for the border effect */}
            <div className="p-[30px] rounded-lg">
              <Animation
                activeIndex={activeIndex}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default App;
