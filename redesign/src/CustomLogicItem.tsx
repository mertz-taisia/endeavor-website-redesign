// @ts-nocheck
import { motion } from 'framer-motion';

export const CustomLogicItem = ({
  state,
  x,
  y,
  text
}: {
  state: "hidden" | "visible" | "processing" | "complete";
  x: number;
  y: number;
  text: string;
}) => {
  // Rectangle dimensions for the background - centered at 0,0
  const rectangleCoordsByState = {
    hidden: { width: 350, height: 70, x: -336, y: -86.5 },
    visible: { width: 350, height: 70, x: -336, y: -86.5 },
    processing: { width: 350, height: 70, x: -336, y: -86.5 },
    complete: { width: 350, height: 70, x: -336, y: -86.5 },
  };

  const currentCoords = rectangleCoordsByState[state] || rectangleCoordsByState.hidden;
  
  // Position for the logo container - these control where each logo appears on the screen
  const loadingStateVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    processing: { opacity: 1 },
    complete: { opacity: 1 },
  };

  // Render the icon based on state
  const renderLoadingState = () => {
    if (state === "complete") {
      // Show checkmark when completed
      return (
        <motion.g initial={{
          x: -30,
          y: -50
        }}
         animate={{
          x: -30,
          y: -50
         }} 
         >
          <circle cx="0" cy="0" r="15" fill="#4CAF50" />
          <path 
            d="M -7,0 -2,5 7,-5" 
            stroke="white" 
            strokeWidth="2.5" 
            fill="none"
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </motion.g>
      );
    } else if (state === "processing") {
      // Show moving loading spinner
      return (
        <motion.g initial={{
          x: -30,
          y: -50
        }}
         animate={{
          x: -30,
          y: -50
         }} 
         >
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: '0px 0px' }}
          >
            <circle cx="0" cy="0" r="15" fill="#2196F3" opacity="0.3" />
            <path
              d="M 0,-12 A 12,12 0 0,1 12,0"
              stroke="#2196F3"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </motion.g>
        </motion.g>
      );
    } else if (state === "visible") {
      // Show static loading state
      return (
        <motion.g initial={{
          x: -30,
          y: -50
        }}
         animate={{
          x: -30,
          y: -50
         }} 
         >
          <circle cx="0" cy="0" r="15" fill="#2196F3" opacity="0.3" />
          <path
            d="M 0,-12 A 12,12 0 0,1 12,0"
            stroke="#2196F3"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            transform="rotate(45)"
          />
        </motion.g>
      );
    } else {
      // Hidden state - return empty
      return null;
    }
  };

  return (
    <motion.g
      initial="hidden"
      animate={state}
      variants={loadingStateVariants}
      style={{ x, y }}
    >
      <motion.rect
        initial={{
          width: currentCoords.width,
          height: currentCoords.height,
          x: currentCoords.x,
          y: currentCoords.y,
          opacity: state === "hidden" ? 0 : 1
        }}
        animate={{
          width: currentCoords.width,
          height: currentCoords.height,
          x: currentCoords.x,
          y: currentCoords.y,
          opacity: state === "hidden" ? 0 : 1
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

      {/* Render the loading state */}
      {renderLoadingState()}

      {/* Render the text */}
      {state !== "hidden" && text && (
          <motion.text 
          initial={{
            x: -300,
            y: -50
          }}
          animate={{
            x: -300,
            y: -50
           }} 
          textAnchor="left"
            dominantBaseline="middle"
          fill="#333333"
          fontSize="22"
          fontWeight="bold"

            fontFamily="Arial, sans-serif"
          >
          {text}
          </motion.text>
      )}

      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6.85" floodColor="black" floodOpacity="0.1" />
        </filter>
      </defs>
    </motion.g>
  );
};
