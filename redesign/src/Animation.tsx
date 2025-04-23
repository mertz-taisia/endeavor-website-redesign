// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { EndeavorContainer } from './EndeavorContainer';
import { Catalog } from './Catalog';
import { Logo } from './Logo';
import { CustomLogicItem } from './CustomLogicItem';
import { ERPLogo } from './ERPLogo';


const Animation = ({
  activeIndex
}: {
  activeIndex: number | null;
}) => {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const visibility = {
    section0: {
      // Initial hidden
      1: {
        excelLogo: { state: "hidden" },
        phoneLogo: { state: "hidden" },
        emailLogo: { state: "hidden" },
        pdfLogo: { state: "hidden" }
      },
      // Make input types logos visible
      2: {
        excelLogo: { state: "visible" },
        phoneLogo: { state: "visible" },
        emailLogo: { state: "visible" },
        pdfLogo: { state: "visible" }
      },
      // Make lines visible and endeavor logo visible
      3: {
        excelLogo: { state: "visible" },
        phoneLogo: { state: "visible" },
        emailLogo: { state: "visible" },
        pdfLogo: { state: "visible" },
        excelLine: { state: "visible" },
        phoneLine: { state: "visible" },
        emailLine: { state: "visible" },
        pdfLine: { state: "visible" },
        endeavorLogo: { state: "startState" }
      }
    },
    section1: {
      1: {
        endeavorLogo: { state: "basicState" },
        catalog: { state: "hidden" }
      },
      // Shrink logo
      2: {
        endeavorLogo: { state: "basicShrunkState" }
      },
      3: {
        endeavorLogo: { state: "itemExtractionState" }
      },
      4: {
        endeavorLogo: { state: "extractedOne" }
      },
      // Extracted two
      5: {
        endeavorLogo: { state: "extractedTwo" }
      },
      // Extracted three
      6: {
        endeavorLogo: { state: "extractedThree" },
      }
    },
    section2: {
      1: {
        endeavorLogo: { state: "catalogEmpty" },
        catalog: { state: "hidden" },
        customBusinessLogicOne: { state: "hidden", x: 480, y: 400 },
        customBusinessLogicTwo: { state: "hidden", x: 480, y: 500 },
        customBusinessLogicThree: { state: "hidden", x: 480, y: 600 },
        customBusinessLogicFour: { state: "hidden", x: 480, y: 700 }
      },
      2: {
        endeavorLogo: { state: "catalogSelectingOne" },
        catalog: { state: "scrollToItemOne", activeItem: 3 }
      },
      3: {
        endeavorLogo: { state: "catalogSelectingOne" },
        catalog: { state: "scrollToItemOne", activeItem: 4 }
      },
      4: {
        endeavorLogo: { state: "catalogSelectingOne" },
        catalog: { state: "scrollToItemOne", activeItem: 5 }
      },
      5: {
        endeavorLogo: { state: "pullOutItemOne" },
        catalog: { state: "pullOutItemOne", activeItem: 5 }
      },
      6: {
        endeavorLogo: { state: "catalogSelectingTwo" },
        catalog: { state: "scrollToItemTwo", activeItem: 6 }
      },
      7: {
        endeavorLogo: { state: "catalogSelectingTwo" },
        catalog: { state: "scrollToItemTwo", activeItem: 7 }
      },
      8: {
        endeavorLogo: { state: "catalogSelectingTwo" },
        catalog: { state: "scrollToItemTwo", activeItem: 8 }
      },
      9: {
        endeavorLogo: { state: "pullOutItemTwo" },
        catalog: { state: "pullOutItemTwo", activeItem: 8 }
      },
      10: {
        endeavorLogo: { state: "catalogSelectingThree" },
        catalog: { state: "scrollToItemThree", activeItem: 9 }
      },
      11: {
        endeavorLogo: { state: "catalogSelectingThree" },
        catalog: { state: "scrollToItemThree", activeItem: 10 }
      },
      12: {
        endeavorLogo: { state: "catalogSelectingThree" },
        catalog: { state: "scrollToItemThree", activeItem: 11 }
      },
      13: {
        endeavorLogo: { state: "catalogSelectingThree" },
        catalog: { state: "scrollToItemThree", activeItem: 12 }
      },
      14: {
        endeavorLogo: { state: "pullOutItemThree" },
        catalog: { state: "pullOutItemThree", activeItem: 12 }
      }
    },
    section3: {
      1: {
        catalog: { state: "hidden" },
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "hidden", x: 480, y: 400 },
        customBusinessLogicTwo: { state: "hidden", x: 480, y: 500 },
        customBusinessLogicThree: { state: "hidden", x: 480, y: 600 },
        customBusinessLogicFour: { state: "hidden", x: 480, y: 700 },
        ERPLogo: { state: "hidden" }
      },
      2: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "visible", x: 480, y: 400 },
        customBusinessLogicTwo: { state: "visible", x: 480, y: 500 },
        customBusinessLogicThree: { state: "visible", x: 480, y: 600 },
        customBusinessLogicFour: { state: "visible", x: 480, y: 700 }
      },
      3: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "processing", x: 480, y: 400 },
        customBusinessLogicTwo: { state: "visible", x: 480, y: 500 },
        customBusinessLogicThree: { state: "visible", x: 480, y: 600 },
        customBusinessLogicFour: { state: "visible", x: 480, y: 700 }
      },
      4: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "complete", x: 480, y: 400 },
        customBusinessLogicTwo: { state: "visible", x: 480, y: 500 },
        customBusinessLogicThree: { state: "visible", x: 480, y: 600 },
        customBusinessLogicFour: { state: "visible", x: 480, y: 700 }
      },
      5: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "complete", x: 480, y: 300 },
        customBusinessLogicTwo: { state: "processing", x: 480, y: 400 },
        customBusinessLogicThree: { state: "visible", x: 480, y: 500 },
        customBusinessLogicFour: { state: "visible", x: 480, y: 600 }
      },
      6: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "complete", x: 1000, y: 300 },
        customBusinessLogicTwo: { state: "complete", x: 480, y: 400 },
        customBusinessLogicThree: { state: "visible", x: 480, y: 500 },
        customBusinessLogicFour: { state: "visible", x: 480, y: 600 }
      },
      7: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "complete", x: 1000, y: 200 },
        customBusinessLogicTwo: { state: "complete", x: 480, y: 300 },
        customBusinessLogicThree: { state: "visible", x: 480, y: 400 },
        customBusinessLogicFour: { state: "visible", x: 480, y: 500 }
      },
      8: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "complete", x: 1000, y: 200 },
        customBusinessLogicTwo: { state: "complete", x: 1000, y: 300 },
        customBusinessLogicThree: { state: "processing", x: 480, y: 400 },
        customBusinessLogicFour: { state: "visible", x: 480, y: 500 }
      },
      9: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "complete", x: 1000, y: 200 },
        customBusinessLogicTwo: { state: "complete", x: 1000, y: 300 },
        customBusinessLogicThree: { state: "complete", x: 480, y: 400 },
        customBusinessLogicFour: { state: "visible", x: 480, y: 500 }
      },
      10: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "complete", x: 1000, y: 100 },
        customBusinessLogicTwo: { state: "complete", x: 1000, y: 200 },
        customBusinessLogicThree: { state: "complete", x: 480, y: 300 },
        customBusinessLogicFour: { state: "processing", x: 480, y: 400 }
      },
      11: {
        endeavorLogo: { state: "customBusinessLogic" },
        customBusinessLogicOne: { state: "complete", x: 1000, y: 100 },
        customBusinessLogicTwo: { state: "complete", x: 1000, y: 200 },
        customBusinessLogicThree: { state: "complete", x: 1000, y: 300 },
        customBusinessLogicFour: { state: "complete", x: 480, y: 400 }
      },
      12: {
        endeavorLogo: { state: "customBusinessLogicComplete" },
        customBusinessLogicOne: { state: "hidden", x: 1000, y: 100 },
        customBusinessLogicTwo: { state: "hidden", x: 1000, y: 200 },
        customBusinessLogicThree: { state: "hidden", x: 1000, y: 300 },
        customBusinessLogicFour: { state: "hidden", x: 1000, y: 400 }
      },
      13: {
        endeavorLogo: { state: "customBusinessLogicCompleteLarge" },
      }

    },
    section4: {
      1: {
        endeavorLogo: { state: "erpState" },
        ERPLogo: { state: "visible" }
      }
    }

  };

  const sectionMap = {
    0: "section0",
    1: "section1",
    2: "section2",
    3: "section3",
    4: "section4",
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [sectionKey, setSectionKey] = useState<string | null>(null);

  useEffect(() => {
    const newSection = sectionMap[activeIndex ?? -1];

    if (!newSection) return;

    setSectionKey(newSection);
    setCurrentStep(1); // reset animation
  }, [activeIndex]);

  // Define custom durations for each animation step (in milliseconds)
  const stepDurations = {
    section0: {
      1: 750,  // Step 1 to 2: 750ms
      2: 750,  // Step 2 to 3: 750ms
      3: 750,  // Step 3 to 4: 750ms
    },
    section1: {
      1: 750,  // Step 1 to 2: 750ms
      2: 750,  // Step 2 to 3: 750ms
      3: 750,  // Step 3 to 4: 750ms
      4: 750,  // Step 4 to 5: 750ms
      5: 750,  // Step 5 to 6: 750ms
      6: 750,  // Step 6 to 7: 750ms
      // Add more steps as needed
    },
    section2: {
      1: 750,  // Step 1 to 2: 750ms
      2: 750,  // Step 2 to 3: 750ms
      3: 750,  // Step 3 to 4: 750ms
      4: 750,  // Step 4 to 5: 750ms
      5: 2000,  // Step 5 to 6: 3000ms (longer for pullOutItem animation)
      6: 750,  // Step 6 to 7: 750ms
      7: 750,  // Step 7 to 8: 750ms
      8: 750,  // Step 8 to 9: 3000ms (longer for pullOutItem animation)
      9: 2000,  // Step 9 to 10: 750ms
      10: 750,  // Step 10 to 11: 750ms
      11: 750,  // Step 11 to 12: 750ms
      12: 750,  // Step 12 to 13: 750ms
      13: 750,  // Step 13 to 14: 750ms
      14: 2000,  // Step 14 to 15: 3000ms (longer for pullOutItem animation)
      // Add more steps as needed
    },
    section3: {
      1: 1000,
      2: 1000,
      3: 1000,
      4: 1000,
      5: 1000,
      6: 1000,
      7: 1000,
      8: 1000,
      9: 1000,
      10: 1000,
      11: 1000,
      12: 1000
    },
    section4: {
      1: 1000,
      2: 1000,
      3: 1000,
      4: 1000,
      5: 1000,
      6: 1000,
      7: 1000,
      8: 1000,
      9: 1000,
      10: 1000,
      11: 1000,
      12: 1000
    }
  };

  useEffect(() => {
    if (!sectionKey) return;

    const maxStep = Object.keys(visibility[sectionKey]).length;
    let timeoutId: NodeJS.Timeout;

    const scheduleNextStep = (currentStep: number) => {
      if (currentStep >= maxStep) return;
      
      // Get the duration for this step (or default to 750ms)
      const duration = stepDurations[sectionKey as keyof typeof stepDurations]?.[currentStep as keyof typeof stepDurations[keyof typeof stepDurations]] || 750;
      
      timeoutId = setTimeout(() => {
        setCurrentStep(currentStep + 1);
        scheduleNextStep(currentStep + 1);
      }, duration);
    };

    // Start the sequence
    scheduleNextStep(currentStep);

    return () => clearTimeout(timeoutId);
  }, [sectionKey, currentStep]);
  
  // Track previous Y positions for slide animations
  const [prevPositions, setPrevPositions] = useState({
    customBusinessLogicOne: 0,
    customBusinessLogicTwo: 0,
    customBusinessLogicThree: 0,
    customBusinessLogicFour: 0
  });
  
  // Track previous states for slide animations
  const [prevStates, setPrevStates] = useState({
    customBusinessLogicOne: "hidden",
    customBusinessLogicTwo: "hidden",
    customBusinessLogicThree: "hidden",
    customBusinessLogicFour: "hidden"
  });

  const currentVisibility = visibility[sectionKey ?? "section1"]?.[currentStep] || {};


  const getState = (id: string) => currentVisibility[id]?.state;
  const getX = (id: string) => currentVisibility[id]?.x;
  const getY = (id: string) => currentVisibility[id]?.y;
  const getActiveItem = (id: string) => currentVisibility[id]?.activeItem;

  function getScrollProgress(sectionEl) {
    const rect = sectionEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;

    // How much of the section is above the viewport (negative if section top is in view)
    const scrollY = Math.max(0, windowHeight - rect.top);
    // Clamp between 0 and sectionHeight
    const progress = Math.min(Math.max(scrollY / sectionHeight, 0), 1);

    return progress; // 0 (top), 1 (bottom)
  }

  useEffect(() => {
    function handleScroll() {
      const sectionEl = sectionsRef.current[activeIndex];
      if (!sectionEl) return;
      const progress = getScrollProgress(sectionEl);
      const thresholds = sectionStepThresholds[`section${activeIndex}`] || [];

      // Find the highest step whose threshold is <= progress
      let step = 1;
      for (let i = 0; i < thresholds.length; i++) {
        if (progress >= thresholds[i]) step = i + 1;
      }
      setCurrentStep(step);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);
  
  // Update previous positions and states when current positions change
  useEffect(() => {
    setPrevPositions(prev => ({
      customBusinessLogicOne: currentVisibility.customBusinessLogicOne?.y || prev.customBusinessLogicOne,
      customBusinessLogicTwo: currentVisibility.customBusinessLogicTwo?.y || prev.customBusinessLogicTwo,
      customBusinessLogicThree: currentVisibility.customBusinessLogicThree?.y || prev.customBusinessLogicThree,
      customBusinessLogicFour: currentVisibility.customBusinessLogicFour?.y || prev.customBusinessLogicFour
    }));
    
    setPrevStates(prev => ({
      customBusinessLogicOne: currentVisibility.customBusinessLogicOne?.state || prev.customBusinessLogicOne,
      customBusinessLogicTwo: currentVisibility.customBusinessLogicTwo?.state || prev.customBusinessLogicTwo,
      customBusinessLogicThree: currentVisibility.customBusinessLogicThree?.state || prev.customBusinessLogicThree,
      customBusinessLogicFour: currentVisibility.customBusinessLogicFour?.state || prev.customBusinessLogicFour
    }));
  }, [currentVisibility]);


  // Line animation variants
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  // Logo animation variants
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    oscillate: (custom: number) => ({
      y: [0, -10, 0],
      transition: {
        y: {
          delay: 0.6,
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }
      }
    }),
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    }
  };

  
  const businessLogicVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    oscillate: (custom: number) => ({
      y: [0, -10, 0],
      transition: {
        y: {
          delay: 0.6,
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }
      }
    }),
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    }
  };

  return (
    <svg viewBox="0 0 639 886" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Email Line */}
      <motion.path
        id="emailLine"
        d="M185 450V510H271V734"
        stroke="#A4A4A4"
        strokeWidth="1.5"
        initial="hidden"
        animate={getState("emailLine")}
        variants={lineVariants}
      />

      {/* Phone Line */}
      <motion.path
        id="phoneLine"
        d="M470 549V590H357V734"
        stroke="#A4A4A4"
        strokeWidth="1.5"
        initial="hidden"
        animate={getState("phoneLine")}
        variants={lineVariants}
      />

      {/* Excel Line */}
      <motion.path
        id="excelLine"
        d="M230 200V270H301V734"
        stroke="#A4A4A4"
        strokeWidth="1.5"
        initial="hidden"
        animate={getState("excelLine")}
        variants={lineVariants}
      />

      {/* PDF Line */}
      <motion.path
        id="pdfLine"
        d="M430 278V340H329V734"
        stroke="#A4A4A4"
        strokeWidth="1.5"
        initial="hidden"
        animate={getState("pdfLine")}
        variants={lineVariants}
      />

      {/* Always render Excel Logo but control visibility */}
      <Logo
        state={"excel"}
        icon={<ExcelIcon />}
        isVisible={getState("excelLogo") === "visible"}
      />

      {/* Always render Phone Logo but control visibility */}
      <Logo
        state={"phone"}
        icon={<PhoneIcon />}
        isVisible={getState("phoneLogo") === "visible"}
      />

      {/* Always render Email Logo but control visibility */}
      <Logo
        state={"email"}
        icon={<EmailIcon />}
        isVisible={getState("emailLogo") === "visible"}
      />

      {/* Always render PDF Logo but control visibility */}
      <Logo
        state={"pdf"}
        icon={<PDFIcon />}
        isVisible={getState("pdfLogo") === "visible"}
      />
      
      {/* Catalog */}
      {getState("catalog") && (
        <Catalog
          state={getState("catalog")}
          activeItem={getActiveItem("catalog")}
        />
      )}

      {/* Endeavor Logo */}
      <EndeavorContainer
        state={getState("endeavorLogo")}
        activeItem={getActiveItem("catalog")}
        catalogState={getState("catalog")}
      />


      <CustomLogicItem
        state={getState("customBusinessLogicOne")}
        x={getX("customBusinessLogicOne")}
        y={getY("customBusinessLogicOne")}
        previousY={prevPositions.customBusinessLogicOne}
        previousState={prevStates.customBusinessLogicOne}
        text='Priority Shipping'
      />

      <CustomLogicItem
        state={getState("customBusinessLogicTwo")}
        x={getX("customBusinessLogicTwo")}
        y={getY("customBusinessLogicTwo")}
        previousY={prevPositions.customBusinessLogicTwo}
        previousState={prevStates.customBusinessLogicTwo}
        text='Order Splitting'
      />

      <CustomLogicItem
        state={getState("customBusinessLogicThree")}
        x={getX("customBusinessLogicThree") || 480}
        y={getY("customBusinessLogicThree")}
        previousY={prevPositions.customBusinessLogicThree}
        previousState={prevStates.customBusinessLogicThree}
        text='Discounts'
      />

      <CustomLogicItem
        state={getState("customBusinessLogicFour")}
        x={getX("customBusinessLogicFour") || 480}
        y={getY("customBusinessLogicFour")}
        previousY={prevPositions.customBusinessLogicFour}
        previousState={prevStates.customBusinessLogicFour}
        text='Backorder Handling'
      />

      <ERPLogo
        state={getState("ERPLogo")}
      />


      <defs>
        <filter id="filter0_d_0_1" x="86.3" y="0.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <filter id="filter1_d_0_1" x="351.3" y="99.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <filter id="filter2_d_0_1" x="439.3" y="370.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <filter id="filter3_d_0_1" x="0.3" y="256.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <filter id="filter4_d_0_1" x="214.3" y="688.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_0_1" x1="536.742" y1="420" x2="536.742" y2="509.821" gradientUnits="userSpaceOnUse">
          <stop stopColor="#59F473" />
          <stop offset="1" stopColor="#03B722" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Animation;


const ExcelIcon = () => (
  <g>
    {/* Excel icon - centered at 0,0 */}
    <g transform="translate(-65, -40)">
      <path d="M32.113 7C32.113 3.134 35.247 0 39.113 0H90.817C94.683 0 97.817 3.134 97.817 7V19.7781H32.113V7Z" fill="#33C481" />
      <path d="M32.113 7C32.113 3.134 35.247 0 39.113 0H64.965V19.6664H32.113V7Z" fill="#20A264" />
      <rect x="32.113" y="19.6665" width="65.7036" height="19.6664" fill="#20A264" />
      <rect x="32.113" y="39.333" width="65.7036" height="19.7781" fill="#107C42" />
      <path d="M32.113 58.999H97.817V71.777C97.817 75.643 94.683 78.777 90.817 78.777H39.113C35.247 78.777 32.113 75.643 32.113 71.777V58.999Z" fill="#175B36" />
      <rect x="32.113" y="19.6665" width="32.8518" height="19.6664" fill="#0D7A40" />
      <rect x="32.113" y="39.333" width="32.8518" height="19.6664" fill="#175B36" />
      
      {/* Excel X logo */}
      <rect x="12.5" y="14" width="45.1433" height="43.8024" rx="7" fill="#0F7C42" />
      <path d="M45.523 48.943H39.712L35.019 39.7799L29.879 48.943H24.068L31.667 37.0981L24.739 25.4771H30.549L35.019 33.9694L39.936 25.4771H45.523L37.924 37.0981L45.523 48.943Z" fill="white" />
    </g>
  </g>
);


const EmailIcon = () => (
  <g>
    {/* Gmail icon - centered at 0,0 */}
    <g transform="translate(-100, -354)">
      <path d="M55.1361 393H71.7869V349.223L48 329.91V385.275C48 389.549 51.1993 393 55.1361 393Z" fill="#4285F4" />
      <path d="M128.875 393H145.526C149.474 393 152.662 389.536 152.662 385.275V329.91L128.875 349.223" fill="#34A853" />
      <path d="M128.875 315.747V349.223L152.662 329.91V319.61C152.662 310.056 142.588 304.61 135.535 310.339" fill="#FBBC04" />
      <path d="M71.7871 349.223V315.747L100.331 338.923L128.876 315.747V349.223L100.331 372.399" fill="#EA4335" />
      <path d="M48 319.61V329.91L71.7869 349.223V315.747L65.1266 310.339C58.0619 304.61 48 310.056 48 319.61Z" fill="#C5221F" />
    </g>
  </g>
);


const PhoneIcon = () => (
  <g>
    {/* Phone icon - centered at 0,0 */}
    <g transform="translate(-537, -465)">
      <path d="M492.137 492.013C492.137 492.013 491.829 438.589 492.137 437.339C492.444 436.09 493.996 431.497 498.068 426.717C501.661 422.499 508.69 420 511.034 420L561.021 420C565.701 420.747 570.798 422.122 575.392 426.873C578.716 431.29 580.533 433.56 581.485 439.214V490.607C580.733 495.434 579.279 499.318 575.549 503.417C571.499 506.778 568.752 507.963 563.677 509.821H511.034C505.5 509.145 502.714 507.357 497.912 503.417C494.21 499.28 492.949 496.777 492.137 492.013Z" fill="url(#paint0_linear_0_1)" />
      <path d="M519.169 437.566C522.013 441.89 523.758 444.541 526.835 449.212C527.232 450.571 527.245 451.379 525.898 453.118L523.243 457.023C522.79 458.51 522.829 459.333 523.711 460.772C529.159 468.096 532.532 471.934 540.27 477.33C542.037 478.191 543.032 478.24 544.8 477.33L548.236 475.143C549.837 474.35 550.65 474.276 551.985 474.675L564.326 482.642C564.987 483.647 565.217 484.32 565.107 485.922C563.941 488.917 562.705 490.538 558.859 493.264C556.303 493.622 554.84 493.735 551.985 493.264C541.716 489.961 536.625 486.259 527.929 478.58C512.97 464.023 509.978 457.179 507.934 445.776C507.92 442.63 508.471 441.483 509.965 439.996C511.73 438.599 512.681 437.938 514.339 436.872C516.055 436.035 517.004 436.04 518.712 436.872L519.169 437.566Z" fill="white" />
      <defs>
        <linearGradient id="paint0_linear_0_1" x1="536.811" y1="420" x2="536.811" y2="509.821" gradientUnits="userSpaceOnUse">
          <stop stopColor="#32B5F1"/>
          <stop offset="1" stopColor="#2B9FED"/>
        </linearGradient>
      </defs>
    </g>
  </g>
);


const PDFIcon = () => (
  <g>
    {/* PDF icon - centered at 0,0 */}
    <g transform="translate(-453, -194)">
      <path d="M431.466 237.695H474.804C483.068 237.695 489.775 231.011 489.804 222.747L490.001 166.148H477.872C474.006 166.148 470.872 163.014 470.872 159.148V150H431.466C423.182 150 416.466 156.716 416.466 165V222.695C416.466 230.979 423.182 237.695 431.466 237.695Z" fill="#EAEAE4" />
      <path d="M470.871 150L490 166.148H470.871V150Z" fill="#D9D9D9" />
      <rect x="411" y="195.711" width="60.1196" height="33.2893" rx="10" fill="#F24646" />
      <path d="M453.567 204.157V220.63H457.228V214.224H465.007V211.021H457.228V207.36H466.151V204.157H453.567Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M433.435 220.63V204.157H442.357C445.388 204.698 449.215 206.674 449.45 211.936C449.714 217.884 444.874 220.172 442.357 220.63H433.435ZM436.637 217.394V206.903C437.107 206.924 437.533 206.939 437.933 206.952C439.363 207.001 440.468 207.039 442.133 207.359C444.72 208.319 445.695 209.231 445.786 212.148C445.877 215.065 443.808 216.481 442.133 217.166C440.049 217.463 438.828 217.453 436.637 217.394Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M416.962 220.63V204.157H425.885C428.916 204.698 430.505 206.862 430.534 209.877C430.642 212.299 428.401 214.681 425.885 215.139H420.622V220.63H416.962ZM420.622 211.707V207.36H425.427C426.616 207.818 427.257 208.275 427.257 209.648C427.257 210.982 426.746 211.185 425.534 211.665C425.499 211.679 425.463 211.693 425.427 211.707H420.622Z" fill="white" />
    </g>
  </g>
);

