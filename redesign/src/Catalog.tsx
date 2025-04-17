import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Item from './Item';

export const Catalog = ({
  state,
}: {
  state: "hidden" | "basicState";
}) => {

  const endeavorVariants = {
    hidden: { opacity: 0, x: 310, y: 800 },
    basicState: { opacity: 1, x: 480, y: 400, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const rectangleCoordsByState = {
    hidden: { x1: -80, x2: 80, y1: -80, y2: 80 },
    basicState: { x1: -150, x2: 150, y1: -180, y2: 180 }
  };


  const currentCoords = rectangleCoordsByState[state] || rectangleCoordsByState.hidden;


  return (
    <motion.g
      initial="hidden"
      animate={state}
      variants={endeavorVariants}
    >

      <motion.rect
        initial={{
          width: currentCoords.x2 - currentCoords.x1,
          x: currentCoords.x1,
          y: currentCoords.y1,
          height: currentCoords.y2 - currentCoords.y1
        }}
        animate={{
          width: currentCoords.x2 - currentCoords.x1,
          x: currentCoords.x1,
          y: currentCoords.y1,
          height: currentCoords.y2 - currentCoords.y1
        }}
        transition={{
          width: { duration: 0.5, ease: "easeInOut" },
          x: { duration: 0.5, ease: "easeInOut" },
          height: { duration: 0.5, ease: "easeInOut" },
        }}

        rx={20}
        fill="white"
        filter="url(#softShadow)"
      />


      <motion.rect 
      initial = {{x: -5, y: -5, width: 10, height: 10}}
      animate = {{x: -5, y: -5, width: 10, height: 10}}
      fill="blue"
      rx={10}
      ></motion.rect>

      

      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6.85" floodColor="black" floodOpacity="0.1" />
        </filter>
      </defs>
    </motion.g>
  );
};
