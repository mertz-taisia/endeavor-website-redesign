// @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import Animation from './Animation';
import { motion } from 'framer-motion'

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


  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            console.log("Setting active index to:", index); // Add logging
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sectionsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
        <div className="w-full h-[100vh] bg-[#0D0D0D] text-4xl font-bold text-center items-center justify-center">hero section</div>
        <div className="flex flex-row w-7/10 items-start justify-between relative">
          {/* Scrollable text column */}
          <div className="w-1/2 pr-8 z-10">
            <div className="space-y-20">
              {sectionText.map((text, idx) => (
                <div 
                  key={idx}
                  ref={el => (sectionsRef.current[idx] = el!)}
                  data-index={idx}
                  className="min-h-[80vh] flex flex-col gap-8 justify-center w-5/6">
                  <div className="relative">
                    <p className="text-sm tracking-widest font-medium text-[#00A3FF] uppercase mb-1 border-l-2 border-[#00A3FF] pl-3">
                      {text[0]}
                    </p>
                    <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#00A3FF] to-transparent opacity-40"></div>
                  </div>
                  
                  <h2 className="text-4xl font-bold leading-tight text-white">
                    {text[1]}
                  </h2>
                  
                  <p className="text-base leading-relaxed text-[#B0B0B0] max-w-xl">
                    {text[2]}
                  </p>
                  
                  <button 
                    type="button"
                    className="group flex items-center mt-4 w-fit bg-transparent border border-[#00A3FF] text-[#00A3FF] text-sm font-medium tracking-wide px-6 py-3 rounded-md transition-all duration-300 hover:bg-[#00A3FF10] relative overflow-hidden"
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
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky/fixed animation on the right */}
          <div className="w-1/2 sticky top-8 mt-3 mb-3 self-start">
            {/* Animated border using Framer Motion */}
            <motion.div 
              className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
              style={{ zIndex: -1 }}
            >
              {/* Top border */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: 'linear',
                }}
              />
              
              {/* Right border */}
              <motion.div 
                className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#00A3FF] to-transparent"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  backgroundPosition: ['0% 0%', '0% 100%', '0% 0%'],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: 'linear',
                  delay: 2,
                }}
              />
              
              {/* Bottom border */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: 'linear',
                  delay: 4,
                }}
              />
              
              {/* Left border */}
              <motion.div 
                className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#00A3FF] to-transparent"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  backgroundPosition: ['0% 100%', '0% 0%', '0% 100%'],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: 'linear',
                  delay: 6,
                }}
              />
              
              {/* Corner accents */}
              <motion.div 
                className="absolute top-0 left-0 w-6 h-6 border-t-[1px] border-l-[1px] border-[#00A3FF]"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: activeIndex * 0.2, // Subtle reaction to activeIndex changes
                }}
              />
              <motion.div 
                className="absolute top-0 right-0 w-6 h-6 border-t-[1px] border-r-[1px] border-[#00A3FF]"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: activeIndex * 0.2 + 1,
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-6 h-6 border-b-[1px] border-r-[1px] border-[#00A3FF]"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: activeIndex * 0.2 + 2,
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-6 h-6 border-b-[1px] border-l-[1px] border-[#00A3FF]"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: activeIndex * 0.2 + 3,
                }}
              />
              
              {/* Subtle glow effect that changes with activeIndex */}
              <motion.div
                className="absolute inset-0 opacity-0 bg-[#00A3FF]"
                animate={{
                  opacity: [0, 0.03, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: activeIndex * 0.1,
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
        <div className="w-full h-[100vh] bg-[#0D0D0D] text-4xl font-bold text-center items-center justify-center">footer section</div>
      </div>
  );
}

export default App;
