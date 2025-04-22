// @ts-nocheck
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Import all ERP logo images
import epicorEclipse from './assets/erp/epicor_eclipse.png';
import epicorProphet21 from './assets/erp/epicor_prophet_21.png';
import infor from './assets/erp/infor.png';
import microsoftDynamics from './assets/erp/microsoft_dynamics_365.png';
import oracleNetsuite from './assets/erp/oracle_netsuite.png';
import sapLogo from './assets/erp/sap_logo.png';

export const ERPLogo = ({
  state,
}: {
  state: "hidden" | "visible";
}) => {
  // Array of all ERP logo images
  const erpLogos = [
    epicorEclipse,
    epicorProphet21,
    infor,
    microsoftDynamics,
    oracleNetsuite,
    sapLogo
  ];

  // State to track the current logo index
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  
  // State to track the current circle animation state
  const [circleState, setCircleState] = useState(0);
  
  // Effect to cycle through logos every 2 seconds
  useEffect(() => {
    if (state === "visible") {
      const interval = setInterval(() => {
        setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % erpLogos.length);
      }, 2000); // Change logo every 2 seconds
      
      return () => clearInterval(interval);
    }
  }, [state, erpLogos.length]);
  
  // Effect to animate circles
  useEffect(() => {
    if (state === "visible") {
      const circleInterval = setInterval(() => {
        setCircleState((prevState) => (prevState + 1) % 3);
      }, 800); // Change circle state every 800ms for a smoother animation
      
      return () => clearInterval(circleInterval);
    }
  }, [state]);

  // Rectangle dimensions for the background - centered at 0,0
  const rectangleCoordsByState = {
    hidden: { width: 200, height: 130, x: -65, y: -65 },
    visible: { width: 200, height: 130, x: -65, y: -65 }
  };

  const currentCoords = rectangleCoordsByState[state] || rectangleCoordsByState.hidden;
  
  // Position for the logo container
  const logoVariants = {
    hidden: { opacity: 0, x: 400, y: 400 },
    visible: { opacity: 1, x: 400, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Render the current logo
  const renderLogo = () => {
    // Set image dimensions
    const imageWidth = 150;
    const imageHeight = 150;
    
    return (
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: state === "visible" ? 1 : 0, 
          scale: state === "visible" ? 1 : 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }}
        style={{ transformOrigin: 'center center' }}
      >
        <AnimatePresence mode="wait">
          <motion.image 
            key={currentLogoIndex}
            href={erpLogos[currentLogoIndex]} 
            width={imageWidth} 
            height={imageHeight} 
            x={currentCoords.width / 2 - imageWidth / 2 + currentCoords.x} 
            y={currentCoords.height / 2 - imageHeight / 2 + currentCoords.y}
            style={{ objectFit: 'contain' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </motion.g>
    );
  };

  // Render the animated circles
  const renderCircles = () => {
    // Base positions for the circles - positioned to the left of the logo
    const circlePositions = [
      { cx: -170 + 20, cy: 0, initialRadius: 6, animatedRadius: 8 },
      { cx: -145 + 20, cy: 0, initialRadius: 7, animatedRadius: 9 },
      { cx: -120 + 20, cy: 0, initialRadius: 8, animatedRadius: 6 }
    ];
    
    return (
      <motion.g>
        {circlePositions.map((circle, index) => {
          // Determine if this circle is currently "active" based on circleState
          const isActive = index === circleState;
          
          return (
            <motion.circle
              key={index}
              cx={circle.cx}
              cy={circle.cy}
              r={isActive ? circle.animatedRadius : circle.initialRadius}
              fill="#D9D9D9"
              animate={{
                r: isActive ? circle.animatedRadius : circle.initialRadius,
                opacity: isActive ? 1 : 0.7,
                fill: isActive ? "#CCCCCC" : "#D9D9D9"
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </motion.g>
    );
  };

  return (
    <motion.g
      initial="hidden"
      animate={state}
      variants={logoVariants}
    >
      <motion.rect
        initial={{
          width: currentCoords.width,
          height: currentCoords.height,
          x: currentCoords.x,
          y: currentCoords.y,
          opacity: state === "visible" ? 1 : 0
        }}
        animate={{
          width: currentCoords.width,
          height: currentCoords.height,
          x: currentCoords.x,
          y: currentCoords.y,
          opacity: state === "visible" ? 1 : 0
        }}
        transition={{
          width: { duration: 0.6, ease: "easeInOut" },
          height: { duration: 0.6, ease: "easeInOut" },
          x: { duration: 0.6, ease: "easeInOut" },
          y: { duration: 0.6, ease: "easeInOut" },
          opacity: { duration: 0.6, ease: "easeInOut" }
        }}
        rx={20}
        fill="white"
        filter="url(#softShadow)"
      />

      {/* Render the animated circles */}
      {renderCircles()}
      
      {/* Render the current logo */}
      {renderLogo()}

      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6.85" floodColor="black" floodOpacity="0.1" />
        </filter>
      </defs>
    </motion.g>
  );
};
