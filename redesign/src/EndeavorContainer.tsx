// @ts-nocheck
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Item from './Item';


export const EndeavorContainer = ({
  state,
}: {
  state: "hidden" | "startState" | "basicState" | "basicShrunkState" | "itemExtractionState" | "extractedOne" | "extractedTwo" | "extractedThree" | "catalogMatch";
}) => {

  // Endeavor variants for each state
  const endeavorVariants = {
    hidden: { opacity: 0, x: 310, y: 800 },
    startState: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    basicState: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    basicShrunkState: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    itemExtractionState: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    extractedOne: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    
    
    extractedTwo: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    extractedThree: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    
    catalogShrunk: { opacity: 1, x: 310, y: 400, transition: { duration: 0.2, ease: "easeOut" } },
    
    catalogMatch: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    catalogMatch2: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    catalogMatch3: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    catalogMatch4: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    catalogMatch5: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const logoLoading = state === "itemExtractionState" || state === "extractedOne" || state === "extractedTwo" || state === "extractedThree" || state === "catalogMatch";
  
  // Rectangle coords for each state (defined by x1, x2, y1, y2)
  const rectangleCoordsByState = {
    hidden: { x1: -80, x2: 80, y1: -80, y2: 80 },
    startState: { x1: -80, x2: 80, y1: -130, y2: 30 },
    basicState: { x1: -80, x2: 80, y1: -80, y2: 80 },
    basicShrunkState: { x1: -60, x2: 60, y1: -55, y2: 55 },
    itemExtractionState: { x1: -265, x2: 265, y1: -55, y2: 55 },

    extractedOne: { x1: -265, x2: 265, y1: -89, y2: 89 },
    extractedTwo: { x1: -265, x2: 265, y1: -122, y2: 122 },
    extractedThree: { x1: -265, x2: 265, y1: -155, y2: 155 },




    catalogShrunk: { x1: -150, x2: 150, y1: -108, y2: 95 },
    catalogMatch: { x1: -150, x2: 150, y1: -108, y2: 95 },
    catalogMatch2: { x1: -150, x2: 150, y1: -108, y2: 95 },
    catalogMatch3: { x1: -150, x2: 150, y1: -108, y2: 95 },
    catalogMatch4: { x1: -150, x2: 150, y1: -108, y2: 95 },
    catalogMatch5: { x1: -150, x2: 150, y1: -108, y2: 95 },
  };


  const currentCoords = rectangleCoordsByState[state] || rectangleCoordsByState.hidden;


  // Endeavor Logo coords for each state (defined by x, y, scale)
  const logoByState = {
    hidden: { x: -317.5, y: -785, scale: 1 },
    startState: { x: -317.5, y: -835, scale: 1 },
    basicState: { x: -317.5, y: -785, scale: 1 },
    basicShrunkState: { x: -317.5, y: -785, scale: 0.6 },
    itemExtractionState: { x: -515, y: -785, scale: 0.6 },
    extractedOne: { x: -515, y: -820, scale: 0.6 },
    extractedTwo: { x: -515, y: -860, scale: 0.6 },
    extractedThree: { x: -515, y: -890, scale: 0.6 },
    catalogShrunk: { x: -437, y: -860, scale: 0.3 },
    catalogMatch: { x: -437, y: -860, scale: 0.3 },
    catalogMatch2: { x: -437, y: -860, scale: 0.3 },
    catalogMatch3: { x: -437, y: -860, scale: 0.3 },
    catalogMatch4: { x: -437, y: -860, scale: 0.3 },
    catalogMatch5: { x: -437, y: -860, scale: 0.3 },
  }[state] ?? { x: -317.5, y: -785, scale: 1 };

  const logoX = logoByState.x;
  const logoY = logoByState.y;
  const logoScale = logoByState.scale;

  const textByState = {
    hidden: { x: currentCoords.x1 + 120, y: 0, textSize: 40, text: "" },
    startState: { x: currentCoords.x1 + 120, y: 0, textSize: 40, text: "" },
    basicState: { x: currentCoords.x1 + 120, y: 0, textSize: 40, text: "" },
    basicShrunkState: { x: currentCoords.x1 + 110, y: 0, textSize: 40, text: "" },
    itemExtractionState: { x: currentCoords.x1 + 110, y: 0, textSize: 32, text: "Extracting Data..." },
    extractedOne: { x: currentCoords.x1 + 110, y: -30, textSize: 32, text: "Extracting Data..." },
    extractedTwo: { x: currentCoords.x1 + 110, y: -70, textSize: 32, text: "Extracting Data..." },
    
    
    
    extractedThree: { x: currentCoords.x1 + 110, y: -100, textSize: 32, text: "Extracting Data..." },
    
    
    catalogShrunk: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    catalogMatch: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    catalogMatch2: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    catalogMatch3: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    catalogMatch4: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    catalogMatch5: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
  }[state] ?? { x: currentCoords.x1 - 10, y: 0, textSize: 40, text: "" };


  const textX = textByState.x;
  const textY = textByState.y;
  const textSize = textByState.textSize;
  const text = textByState.text;

  const defaultItem = { state: "hidden", x:0, y:0, rectWidth: 330, rectHeight: 24, iconX: -240, iconY: -15, iconScale: 1, rx: 3, ry: 3 };
  const baseItem = { state: "base", x:0, y:0, rectWidth: 350, rectHeight: 24, iconX: -240, iconY: -15, iconScale: 1, rx: 3, ry: 3 };
  const catalog = { state: "base", x:0, y:0, rectWidth: 200, rectHeight: 16, iconX: -140, iconY: -15, iconScale: 0.6, rx: 2, ry: 2 };

  const createItemState = (itemOne = defaultItem, itemTwo = defaultItem, itemThree = defaultItem) => ({
    itemOne,
    itemTwo,
    itemThree,
  });
  
  const itemStates = {
    hidden: createItemState(),
    startState: createItemState(),
    basicState: createItemState(),
    basicShrunkState: createItemState(),
    itemExtractionState: createItemState(
      {...defaultItem, x: 20, y: 30 },
      {...defaultItem, x: 20, y: 70 },
      {...defaultItem, x: 20, y: 90 }
    ),
    extractedOne: createItemState(
      { ...baseItem, x: 20, y: 30 },
      {...defaultItem, x:20, y: 60 },
      {...defaultItem, x:20, y: 90 }
    ),
    extractedTwo: createItemState(
      { ...baseItem, x: 20, y: 0}, 
      { ...baseItem, x: 20, y: 60}, 
      {...defaultItem, x: 20, y: 90 }
    ),
    extractedThree: createItemState(
        { ...baseItem, x: 20, y: -30}, 
        { ...baseItem, x: 20, y: 30}, 
        { ...baseItem, x: 20, y: 90}
        ),
    catalogShrunk: createItemState(
      {...catalog, x: 10, y: -30 }, 
      {...catalog, x: 10, y: 10 }, 
      {...catalog, x: 10, y: 50 }
    ),
    catalogMatch: createItemState(
      {...catalog, x: 10, y: -30, state: "focused" }, 
      {...catalog, x: 10, y: 10 }, 
      {...catalog, x: 10, y: 50 }
    ),
    catalogMatch2: createItemState(
      {...catalog, x: 10, y: -30 }, 
      {...catalog, x: 10, y: 10, state: "focused"  }, 
      {...catalog, x: 10, y: 50 }
    ),
    catalogMatch3: createItemState(
      {...catalog, x: 10, y: -30 }, 
      {...catalog, x: 10, y: 10 }, 
      {...catalog, x: 10, y: 50, state: "focused" }
    ),
    catalogMatch4: createItemState(
      {...catalog, x: 10, y: -30 }, 
      {...catalog, x: 10, y: 10 }, 
      {...catalog, x: 10, y: 50 }
    ),
    catalogMatch5: createItemState(
      {...catalog, x: 10, y: -30 }, 
      {...catalog, x: 10, y: 10 }, 
      {...catalog, x: 10, y: 50 }
    ),
  };
  
  const itemByState = itemStates[state] ?? createItemState();
  
  const itemOne = itemByState.itemOne;
  const itemTwo = itemByState.itemTwo;
  const itemThree = itemByState.itemThree;
  
  return (
    <motion.g
      initial="hidden"
      animate={state}
      variants={endeavorVariants}
    >

      <motion.rect
        initial={{
          width: currentCoords.x2 - currentCoords.x1,
          height: currentCoords.y2 - currentCoords.y1,
          // Calculate center position
          x: (currentCoords.x1 + currentCoords.x2) / 2 - (currentCoords.x2 - currentCoords.x1) / 2,
          y: (currentCoords.y1 + currentCoords.y2) / 2 - (currentCoords.y2 - currentCoords.y1) / 2
        }}
        animate={{
          width: currentCoords.x2 - currentCoords.x1,
          height: currentCoords.y2 - currentCoords.y1,
          // Calculate center position
          x: (currentCoords.x1 + currentCoords.x2) / 2 - (currentCoords.x2 - currentCoords.x1) / 2,
          y: (currentCoords.y1 + currentCoords.y2) / 2 - (currentCoords.y2 - currentCoords.y1) / 2
        }}
        transition={{
          width: { duration: 0.6, ease: "easeInOut" },
          height: { duration: 0.6, ease: "easeInOut" },
          x: { duration: 0.6, ease: "easeInOut" },
          y: { duration: 0.6, ease: "easeInOut" }
        }}

        rx={20}
        fill="white"
        filter="url(#softShadow)"
      />

      {/* Endeavor Logo */}
      <motion.g
        animate={{
          x: logoX,
          y: logoY,
          scale: logoLoading ? [logoScale, logoScale * 0.9, logoScale] : logoScale,
        }}
        transition={{
          x: { duration: 0.6, ease: "easeInOut" },
          y: { duration: 0.6, ease: "easeInOut" },
          scale: logoLoading
            ? { repeat: Infinity, duration: 1, ease: "easeInOut" }
            : { duration: 0.6, ease: "easeInOut" },
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M364.504 783.439C352.925 777.009 342.15 771.019 330.537 764.567C330.537 769.076 330.325 772.865 330.682 776.611C330.771 777.588 332.467 778.63 333.638 779.274C342.874 784.394 352.111 789.504 361.448 794.431C363.802 795.676 364.906 797.168 364.516 799.68C364.493 799.82 364.482 799.959 364.516 800.099C366.624 808.365 361.526 812.25 354.61 814.838C353.516 815.245 351.776 815.063 350.739 814.483C336.605 806.733 322.505 798.918 308.506 790.942C307.312 790.266 306.208 788.355 306.197 787.013C306.04 771.212 306.029 755.41 306.197 739.609C306.208 738.171 307.479 736.367 308.718 735.39C314.306 730.968 319.583 730.903 326.041 735.015C337.308 742.185 349.255 748.39 361.057 754.766C363.735 756.215 364.605 757.869 364.549 760.67C364.382 767.97 364.493 775.27 364.493 783.428L364.504 783.439Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M293.859 782.757C293.859 786.716 294.049 789.761 293.803 792.762C293.579 795.568 294.787 797.025 297.249 798.352C310.763 805.627 324.188 813.076 337.624 820.482C338.575 821.004 339.447 821.678 340.946 822.679C333.194 827.214 325.978 831.509 318.639 835.609C317.811 836.076 316.088 835.707 315.115 835.152C300.84 827.17 286.598 819.144 272.458 810.956C271.283 810.282 270.31 808.367 270.22 806.975C269.594 796.025 269.661 796.003 279.506 790.522C283.969 788.042 288.489 785.65 293.848 782.757H293.859Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M294.043 743.536C294.043 752.683 294.078 760.782 293.986 768.881C293.986 769.566 293.37 770.539 292.742 770.871C285.497 774.733 278.195 778.488 270.003 782.757C270.003 773.685 269.98 765.5 270.06 757.316C270.06 756.77 270.676 756.01 271.235 755.711C278.469 751.795 285.737 747.954 294.043 743.536Z"
          fill="black"
        />
      </motion.g>

      {text && (
        <motion.text
          initial={{ opacity: 0, x: 0, y: 0, fontSize: textSize }}
          animate={{
            opacity: 1,
            x: textX,
            y: textY,
            fontSize: textSize
          }}
          transition={{ x: { duration: 0.5, ease: "easeInOut" }, y: { duration: 0.6, ease: "easeInOut" }, opacity: { duration: 0.6, ease: "easeInOut" }, fontSize: { duration: 0.6, ease: "easeInOut" } }}
          fill="black"
          fontWeight="bold"
          alignmentBaseline="middle"
        >
          {text}
        </motion.text>
      )}



      <Item 
        state={itemOne.state}
        x={itemOne.x}
        y={itemOne.y}
        text="ITEM TEXT"
        icon="rectangle"
        rectWidth={itemOne.rectWidth} 
        rectHeight={itemOne.rectHeight} 
        iconX={itemOne.iconX}
        iconY={itemOne.iconY}
        iconScale={itemOne.iconScale}
        scale={1}
        rx={itemOne.rx}
        ry={itemOne.ry}
      />
      
      <Item 
        state={itemTwo.state}
        x={itemTwo.x}
        y={itemTwo.y}
        text="ITEM TEXT"
        icon="rectangle"
        rectWidth={itemTwo.rectWidth} 
        rectHeight={itemTwo.rectHeight} 
        iconX={itemTwo.iconX}
        iconY={itemTwo.iconY}
        iconScale={itemTwo.iconScale}
        scale={1}
        rx={itemTwo.rx}
        ry={itemTwo.ry}
      />

      <Item 
        state={itemThree.state}
        x={itemThree.x}
        y={itemThree.y}
        text="ITEM TEXT"
        icon="rectangle"
        rectWidth={itemThree.rectWidth} 
        rectHeight={itemThree.rectHeight} 
        iconX={itemThree.iconX}
        iconY={itemThree.iconY}
        iconScale={itemThree.iconScale}
        scale={1}
        rx={itemThree.rx}
        ry={itemThree.ry}
      />
      

      
      {/* <motion.rect 
      initial = {{x: -5, y: -5, width: 10, height: 10}}
      animate = {{x: -5, y: -5, width: 10, height: 10}}
      fill="red"
      rx={10}
      ></motion.rect> */}

      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6.85" floodColor="black" floodOpacity="0.1" />
        </filter>
      </defs>
    </motion.g>
  );
};
