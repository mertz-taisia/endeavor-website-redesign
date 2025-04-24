// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import NavBar from './NavBar';
import Animation from './Animation';
import AnimationSection from './AnimationSection';

const AnimationPage: React.FC = () => {
  // Create refs for each section
  const section0Ref = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  
  // Track which section is currently active
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Check if sections are in view
  const section0InView = useInView(section0Ref, { amount: 0.5, once: false });
  const section1InView = useInView(section1Ref, { amount: 0.5, once: false });
  const section2InView = useInView(section2Ref, { amount: 0.5, once: false });
  const section3InView = useInView(section3Ref, { amount: 0.5, once: false });
  const section4InView = useInView(section4Ref, { amount: 0.5, once: false });
  
  // Update active index based on which section is in view
  useEffect(() => {
    if (section0InView) setActiveIndex(0);
    else if (section1InView) setActiveIndex(1);
    else if (section2InView) setActiveIndex(2);
    else if (section3InView) setActiveIndex(3);
    else if (section4InView) setActiveIndex(4);
  }, [section0InView, section1InView, section2InView, section3InView, section4InView]);

  // Animation sections data with detailed content
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
  
  // Map section text to component data
  const sections = sectionText.map((section, index) => ({
    tag: section[0],
    title: section[1],
    description: section[2],
    ctaText: section[3],
    animation: <Animation activeIndex={index} />
  }));

  // Page fade-in animation
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-white"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <NavBar />
      
      {/* Hero section */}
      <div className="w-full py-16 md:py-24 bg-[#0D0D0D] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            How Endeavor Works
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-center max-w-3xl mx-auto text-[#BBBBBB]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            See how our AI agents automate your order processing from start to finish
          </motion.p>
        </div>
      </div>
      
      {/* Animation sections */}
      <div ref={section0Ref}>
        <AnimationSection
          key={0}
          title={sections[0].title}
          description={sections[0].description}
          animation={<Animation activeIndex={section0InView ? 0 : null} />}
          index={0}
          reversed={false}
        />
      </div>
      
      <div ref={section1Ref}>
        <AnimationSection
          key={1}
          title={sections[1].title}
          description={sections[1].description}
          animation={<Animation activeIndex={section1InView ? 1 : null} />}
          index={1}
          reversed={true}
        />
      </div>
      
      <div ref={section2Ref}>
        <AnimationSection
          key={2}
          title={sections[2].title}
          description={sections[2].description}
          animation={<Animation activeIndex={section2InView ? 2 : null} />}
          index={2}
          reversed={false}
        />
      </div>
      
      <div ref={section3Ref}>
        <AnimationSection
          key={3}
          title={sections[3].title}
          description={sections[3].description}
          animation={<Animation activeIndex={section3InView ? 3 : null} />}
          index={3}
          reversed={true}
        />
      </div>
      
      <div ref={section4Ref}>
        <AnimationSection
          key={4}
          title={sections[4].title}
          description={sections[4].description}
          animation={<Animation activeIndex={section4InView ? 4 : null} />}
          index={4}
          reversed={false}
        />
      </div>
      
      {/* CTA section */}
      <div className="w-full py-16 md:py-24 bg-[#0D0D0D] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.h2 
            className="text-2xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to automate your order processing?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <button 
              className="px-6 py-3 text-white font-medium rounded-full bg-[#0D0D0D] border-2 border-transparent bg-clip-padding relative shadow-[0_0_15px_rgba(108,199,255,0.3)]"
              style={{
                backgroundImage: 'linear-gradient(#0D0D0D, #0D0D0D), linear-gradient(to right, #0082D3, #6CC7FF, #DBF1FF)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimationPage;
