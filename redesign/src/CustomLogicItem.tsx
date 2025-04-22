// @ts-nocheck
import { motion } from 'framer-motion';

export const CustomLogicItem = ({
  state,
  x,
  y,
  text,
  previousY,
  previousState
}: {
  state: "hidden" | "visible" | "processing" | "complete";
  x: number;
  y: number;
  text: string;
  previousY?: number;
  previousState?: "hidden" | "visible" | "processing" | "complete";
}) => {
  // Track previous y position to detect when item moves up
  const isMovingUp = previousY !== undefined && y < previousY && state === "complete";
  
  // Track when an item has been completed and moved up
  const wasCompletedAndMovedUp = previousState === "complete" && state === "complete" && previousY !== undefined && y < previousY;
  // Rectangle dimensions for the background - similar to Catalog structure
  const rectangleCoordsByState = {
    hidden: { x1: -150, x2: 150, y1: -35, y2: 35 },
    visible: { x1: -150, x2: 150, y1: -35, y2: 35 },
    processing: { x1: -150, x2: 150, y1: -35, y2: 35 },
    complete: { x1: -150, x2: 150, y1: -35, y2: 35 },
  };

  const currentCoords = rectangleCoordsByState[state] || rectangleCoordsByState.hidden;
  
  // Calculate width and height from x1, x2, y1, y2
  const width = currentCoords.x2 - currentCoords.x1;
  const height = currentCoords.y2 - currentCoords.y1;
  const rectX = currentCoords.x1;
  const rectY = currentCoords.y1;
  
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
          x: 120,
          y: 0,
          opacity: 0
        }}
         animate={{
          x: 120,
          y: 0,
          opacity: 1
         }} 
         transition={{
           x: { duration: 0.6, ease: "easeInOut" },
           y: { duration: 0.6, ease: "easeInOut" },
           opacity: { duration: 0.6, ease: "easeInOut" }
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
          x: 120,
          y: 0,
          opacity: 0
        }}
         animate={{
          x: 120,
          y: 0,
          opacity: 1
         }} 
         transition={{
          x: { duration: 0.6, ease: "easeInOut" },
          y: { duration: 0.6, ease: "easeInOut" },
          opacity: { duration: 0.6, ease: "easeInOut" }
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
          x: 120,
          y: 0,
          opacity: 0
        }}
         animate={{
          x: 120,
          y: 0,
          opacity: 1
         }} 
         transition={{
          x: { duration: 0.6, ease: "easeInOut" },
          y: { duration: 0.6, ease: "easeInOut" },
          opacity: { duration: 0.6, ease: "easeInOut" }
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
      initial={{
        opacity: 0,
        x: x,
        y: y
      }}
      animate={{
        opacity: state === "hidden" ? 0 : 1,
        x: wasCompletedAndMovedUp ? x + 100 : isMovingUp ? x - 50 : x, // Slide right after being moved up and completed
        y: y
      }}
      transition={{
        x: { type: "spring", stiffness: 100, damping: 15 },
        y: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.4 }
      }}
    >
      <motion.rect
        initial={{
          width: width,
          height: height,
          x: rectX,
          y: rectY,
          opacity: state === "hidden" ? 0 : 1
        }}
        animate={{
          width: width,
          height: height,
          x: rectX,
          y: rectY,
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
              x: -120,
              y: 0,
              opacity: 0
            }}
            animate={{
              x: -120,
              y: 0,
              opacity: 1
            }} 
            transition={{
              x: { duration: 0.6, ease: "easeInOut" },
              y: { duration: 0.6, ease: "easeInOut" },
              opacity: { duration: 0.6, ease: "easeInOut" }
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
