// @ts-nocheck
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Item from './Item';


export const EndeavorContainer = ({
  state,
  activeItem = 3, // Index of the active item in catalog
  catalogState = "hidden", // State of the catalog to determine when to show sliding item
  
}: {
  state: "hidden" | "startState" | "basicState" | "basicShrunkState" | "itemExtractionState" | "extractedOne" | "extractedTwo" | "extractedThree" | "catalogEmpty" | "pullOutItemOne" | "pullOutItemTwo" | "pullOutItemThree" | "catalogSelectingOne" | "catalogSelectingTwo" | "catalogSelectingThree" | "allSelected" | "customBusinessLogicComplete" | "customBusinessLogicCompleteLarge" | "erpState";
  activeItem?: number;
  catalogState?: "hidden" | "basicState" | "scrollToItemOne" | "scrollToItemTwo" | "scrollToItemThree" | "pullOutItemOne" | "pullOutItemTwo" | "pullOutItemThree";
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
    catalogEmpty: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    catalogSelectingOne: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    catalogSelectingTwo: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    catalogSelectingThree: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    pullOutItemOne: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    pullOutItemTwo: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    pullOutItemThree: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    allSelected: { opacity: 1, x: 160 , y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    customBusinessLogic: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    customBusinessLogicComplete: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    customBusinessLogicCompleteLarge: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    erpState: { opacity: 1, x: 160, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const logoLoading = state === "itemExtractionState" || state === "extractedOne" || state === "extractedTwo" || state === "extractedThree" || state === "catalogEmpty" || state === "catalogShrunk" || state === "catalogSelectingOne" || state === "catalogSelectingTwo" || state === "catalogSelectingThree" || state === "catalogSelectingThree" || state === "pullOutItemOne" || state === "pullOutItemTwo" || state === "pullOutItemThree" || state === "allSelected" ;
  
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
    catalogEmpty: { x1: -150, x2: 150, y1: -108, y2: 95 },
    catalogSelectingOne: { x1: -150, x2: 150, y1: -108, y2: 95 },
    catalogSelectingTwo: { x1: -150, x2: 150, y1: -108, y2: 95 },
    catalogSelectingThree: { x1: -150, x2: 150, y1: -108, y2: 95 },
    pullOutItemOne: { x1: -150, x2: 150, y1: -108, y2: 95 },
    pullOutItemTwo: { x1: -150, x2: 150, y1: -108, y2: 95 },
    pullOutItemThree: { x1: -150, x2: 150, y1: -108, y2: 95 },
    allSelected: { x1: -150, x2: 150, y1: -108, y2: 95 },
    customBusinessLogic: { x1: -150, x2: 150, y1: -35, y2: 35 },
    customBusinessLogicComplete: { x1: -150, x2: 150, y1: -35, y2: 35 },
    customBusinessLogicCompleteLarge: { x1: -265, x2: 265, y1: -55, y2: 55 },
    erpState: { x1: -60, x2: 60, y1: -55, y2: 55 },
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
    catalogEmpty: { x: -437, y: -860, scale: 0.3 },
    catalogSelectingOne: { x: -437, y: -860, scale: 0.3 },
    catalogSelectingTwo: { x: -437, y: -860, scale: 0.3 },
    catalogSelectingThree: { x: -437, y: -860, scale: 0.3 },
    pullOutItemOne: { x: -437, y: -860, scale: 0.3 },
    pullOutItemTwo: { x: -437, y: -860, scale: 0.3 },
    pullOutItemThree: { x: -437, y: -860, scale: 0.3 },
    allSelected: { x: -437, y: -860, scale: 0.3 },
    customBusinessLogic: { x: -437, y: -785, scale: 0.3 },
    customBusinessLogicComplete: { x: -437, y: -785, scale: 0.3 },
    customBusinessLogicCompleteLarge: { x: -515, y: -785, scale: 0.6 },
    erpState: { x: -317.5, y: -785, scale: 0.6 },
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
    catalogEmpty: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    catalogSelectingOne: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    catalogSelectingTwo: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    catalogSelectingThree: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    pullOutItemOne: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    pullOutItemTwo: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    pullOutItemThree: { x: currentCoords.x1 + 55, y: -72, textSize: 18, text: "Matching to catalog..." },
    customBusinessLogic: { x: currentCoords.x1 + 55, y: 0, textSize: 22, text: "Applying..." },
    customBusinessLogicComplete: { x: currentCoords.x1 + 55, y: 0, textSize: 22, text: "Applied Logic" },
    customBusinessLogicCompleteLarge: { x: currentCoords.x1 + 110, y: 0, textSize: 32, text: "Applied Logic" },
    erpState: { x: currentCoords.x1 + 110, y: 0, textSize: 40, text: "" },
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
        Item: createItemState(
      {...catalog, x: 10, y: -30 }, 
      {...catalog, x: 10, y: 10 }, 
      {...catalog, x: 10, y: 50 }
    ),
    catalogSelectingOne: createItemState(
      {...catalog, x: 10, y: -30, state: "focused" }, 
      {...catalog, x: 10, y: 10 }, 
      {...catalog, x: 10, y: 50 }
    ),
    pullOutItemOne: createItemState(
      {...catalog, x: 10, y: -30, state: "populated", iconScale: 0.8, iconX: -118, iconY: 2, textX: -89 }, 
      {...catalog, x: 10, y: 10 }, 
      {...catalog, x: 10, y: 50 }
    ),
    catalogSelectingTwo: createItemState(
      {...catalog, x: 10, y: -30, state: "populated", iconScale: 0.8, iconX: -118, iconY: 2, textX: -89 }, 
      {...catalog, x: 10, y: 10, state: "focused" }, 
      {...catalog, x: 10, y: 50 }
    ),
    pullOutItemTwo: createItemState(
      {...catalog, x: 10, y: -30, state: "populated", iconScale: 0.79, iconX: -118, iconY: 2, textX: -89 }, 
      {...catalog, x: 10, y: 10, state: "populated", iconScale: 0.75, iconX: -115, iconY: 3, textX: -86 }, 
      {...catalog, x: 10, y: 50 }
    ),
    catalogSelectingThree: createItemState(
      {...catalog, x: 10, y: -30, state: "populated", iconScale: 0.79, iconX: -118, iconY: 3, textX: -89 }, 
      {...catalog, x: 10, y: 10, state: "populated", iconScale: 0.75, iconX: -115, iconY: 3, textX: -86 }, 
      {...catalog, x: 10, y: 50, state: "focused" }
    ),
    pullOutItemThree: createItemState(
      {...catalog, x: 10, y: -30, state: "populated", iconScale: 0.79, iconX: -118, iconY: 3, textX: -89 }, 
      {...catalog, x: 10, y: 10, state: "populated", iconScale: 0.75, iconX: -115, iconY: 3, textX: -86 }, 
      {...catalog, x: 10, y: 50, state: "populated", iconScale: 0.75, iconX: -115, iconY: 3, textX: -86 }
    ),
    allSelected: createItemState(
      {...catalog, x: 10, y: -30, state: "populated", iconScale: 0.79, iconX: -118, iconY: 3, textX: -89 }, 
      {...catalog, x: 10, y: 10, state: "populated", iconScale: 0.75, iconX: -115, iconY: 3, textX: -86 }, 
      {...catalog, x: 10, y: 50, state: "populated", iconScale: 0.75, iconX: -115, iconY: 3, textX: -86 }
    ),
    customBusinessLogic: createItemState(),
    customBusinessLogicComplete: createItemState(),
    erpState: createItemState(),
  };
  
  const itemByState = itemStates[state] ?? createItemState();
  
  const itemOne = itemByState.itemOne;
  const itemTwo = itemByState.itemTwo;
  const itemThree = itemByState.itemThree;
  
  // Sliding item variants for each catalog state - removed as we'll use the original animation

  // Render checkmark for completed state
  const renderCheckmark = () => {
    // Only render for these states
    if (state === "customBusinessLogicComplete" || state === "customBusinessLogicCompleteLarge") {
      // Define size properties based on state
      const checkmarkProps = state === "customBusinessLogicCompleteLarge" 
        ? {
            circleX: 170,
            circleRadius: 25,
            pathData: "M 158,0 166,8 182,-8",
            strokeWidth: 4
          }
        : {
            circleX: 120,
            circleRadius: 15,
            pathData: "M 113,0 118,5 127,-5",
            strokeWidth: 2.5
          };

      return (
        <motion.g 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.circle 
            cx={checkmarkProps.circleX}
            cy={0}
            r={checkmarkProps.circleRadius}
            fill="#4CAF50"
            initial={{ 
              cx: state === "customBusinessLogicCompleteLarge" ? 120 : checkmarkProps.circleX,
              r: state === "customBusinessLogicCompleteLarge" ? 15 : checkmarkProps.circleRadius 
            }}
            animate={{ 
              cx: checkmarkProps.circleX,
              r: checkmarkProps.circleRadius 
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut" 
            }}
          />
          <motion.path 
            d={checkmarkProps.pathData}
            stroke="white"
            strokeWidth={checkmarkProps.strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ 
              d: state === "customBusinessLogicCompleteLarge" ? "M 113,0 118,5 127,-5" : checkmarkProps.pathData,
              strokeWidth: state === "customBusinessLogicCompleteLarge" ? 2.5 : checkmarkProps.strokeWidth 
            }}
            animate={{ 
              d: checkmarkProps.pathData,
              strokeWidth: checkmarkProps.strokeWidth 
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut" 
            }}
          />
        </motion.g>
      );
    }
    return null;
  };

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
        ry={20}
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
      
      {/* Render checkmark for completed state */}
      {renderCheckmark()}



      <Item 
        state={itemOne.state}
        x={itemOne.x}
        y={itemOne.y}
        text= '1/2" x 10 ft Copper Type ...'
        icon={<Pipes/>}
        rectWidth={itemOne.rectWidth} 
        rectHeight={itemOne.rectHeight} 
        iconX={itemOne.iconX}
        iconY={itemOne.iconY}
        iconScale={itemOne.iconScale}
        scale={1}
        textX={itemOne.textX}
        rx={itemOne.rx}
        ry={itemOne.ry}
        stateChangeDelay={state === "pullOutItemOne" ? 1.5 : 0} // Add 3.4s delay when transitioning to catalogMatch2
      />
      
      <Item 
        state={itemTwo.state}
        x={itemTwo.x}
        y={itemTwo.y}
        text='60" x 36" Polycarbonate ...'
        icon={<SheetMetalIcon/>}
        rectWidth={itemTwo.rectWidth} 
        rectHeight={itemTwo.rectHeight} 
        iconX={itemTwo.iconX}
        iconY={itemTwo.iconY}
        iconScale={itemTwo.iconScale}
        textX={itemTwo.textX}
        rx={itemTwo.rx}
        ry={itemTwo.ry}
        stateChangeDelay={state === "pullOutItemTwo" ? 1.5 : 0}// Add 3s delay when transitioning to catalogMatch2
      />

      <Item 
        state={itemThree.state}
        x={itemThree.x}
        y={itemThree.y}
        text='2" x 1" x 0.125" Stainless S...'
        icon={<ConcreteIcon/>}
        rectWidth={itemThree.rectWidth} 
        rectHeight={itemThree.rectHeight} 
        iconX={itemThree.iconX}
        iconY={itemThree.iconY}
        iconScale={itemThree.iconScale}
        scale={1}
        rx={itemThree.rx}
        ry={itemThree.ry}
        textX={itemThree.textX}
        stateChangeDelay={state === "pullOutItemThree" ? 1.5 : 0} // Add 3.4s delay when transitioning to catalogMatch2
      />
      

      {/* Render the sliding item from catalog when in pullOutItem state */}
      {(catalogState === "pullOutItemOne" || catalogState === "pullOutItemTwo" || catalogState === "pullOutItemThree") && (
        <motion.g
          initial={{ opacity: 0, x: 315, y: 0, scale: 1.03 }}
          animate={[
            // First animation: pop out and increase size
            { 
              opacity: 1, 
              x: 325, 
              y: 0, 
              scale: 1.2,
              transition: {
                duration: 0.6,
                ease: "easeOut",
              }
            },
            // Second animation: slide with spring
            { 
              x: 0,
              transition: {
                type: "spring",
                stiffness: 70,  // Lower stiffness for slower movement
                damping: 15,    // Lower damping for more bounce
                mass: 1.5,      // Higher mass for slower movement
                delay: 0.6      // Longer delay before sliding
              }
            },
            // Third animation: shrink into place
            { 
              scale: 1,
              transition: {
                duration: 0.8,   // Longer duration for slower shrinking
                ease: "easeOut",
                delay: 0.6       // Longer delay before shrinking
              }
            }
          ]}
        >
          {/* White container/background for each extracted item */}
          {catalogState === "pullOutItemOne" && (
            <motion.rect
              width={255}
              height={40}
              x={-135}
              y={-53}
              rx={10}
              ry={10}
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ opacity: { delay: 0.2, duration: 0.4, ease: "easeInOut" } }}
              style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
            />
          )}
          
          {catalogState === "pullOutItemTwo" && (
            <motion.rect
              width={255}
              height={40}
              x={-135}
              y={-10}
              rx={10}
              ry={10}
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ opacity: { delay: 0.2, duration: 0.4, ease: "easeInOut" } }}
              style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
            />
          )}
          
          {catalogState === "pullOutItemThree" && (
            <motion.rect
              width={255}
              height={40}
              x={-135}
              y={30}
              rx={10}
              ry={10}
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ opacity: { delay: 0.2, duration: 0.4, ease: "easeInOut" } }}
              style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
            />
          )}

          {/* First sliding item */}
          {catalogState === "pullOutItemOne" && (
            <Item
              state="populated"
              x={itemOne.x}
              y={itemOne.y}
              rectWidth={itemOne.rectWidth}
              rectHeight={itemOne.rectHeight}
              rx={itemOne.rx}
              ry={itemOne.ry}
              text= '1/2" x 10 ft Copper Type ...'
              icon={<Pipes/>}
              textX={itemOne.textX}
              iconX={itemOne.iconX}
              iconY={itemOne.iconY}
              iconScale={itemOne.iconScale}
              scale={1}
            />
          )}

          {/* Second sliding item */}
          {catalogState === "pullOutItemTwo" && (
            <Item
              state="populated"
              x={itemTwo.x}
              y={itemTwo.y}
              rectWidth={itemTwo.rectWidth}
              rectHeight={itemTwo.rectHeight}
              rx={itemTwo.rx}
              ry={itemTwo.ry}
              text='60" x 36" Polycarbonate ...'
              icon={<SheetMetalIcon/>}
              textX={itemTwo.textX}
              iconX={itemTwo.iconX}
              iconY={itemTwo.iconY}
              iconScale={itemTwo.iconScale}
              scale={1}
            />
          )}

          {/* Third sliding item */}
          {catalogState === "pullOutItemThree" && (
            <Item
              state="populated"
              x={itemThree.x}
              y={itemThree.y}
              rectWidth={itemThree.rectWidth}
              rectHeight={itemThree.rectHeight}
              rx={itemThree.rx}
              ry={itemThree.ry}
              text='2" x 1" x 0.125" Stainless S...'
              icon={<ConcreteIcon/>}
              textX={itemThree.textX}
              iconX={itemThree.iconX}
              iconY={itemThree.iconY}
              iconScale={itemThree.iconScale}
              scale={1}
            />
          )}
        </motion.g>
      )}


      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6.85" floodColor="black" floodOpacity="0.1" />
        </filter>
      </defs>
    </motion.g>
  );
};

const Pipes = () => (
  <g transform="translate(-24, -24) scale(0.8)">
    <path fill="#777777" stroke="#777777" d="M 4.90625 3.96875 C 4.863281 3.976563 4.820313 3.988281 4.78125 4 C 4.316406 4.105469 3.988281 4.523438 4 5 L 4 16 C 3.996094 16.359375 4.183594 16.695313 4.496094 16.878906 C 4.808594 17.058594 5.191406 17.058594 5.503906 16.878906 C 5.816406 16.695313 6.003906 16.359375 6 16 L 6 15 L 21 15 L 21 16 C 20.996094 16.359375 21.183594 16.695313 21.496094 16.878906 C 21.808594 17.058594 22.191406 17.058594 22.503906 16.878906 C 22.816406 16.695313 23.003906 16.359375 23 16 L 23 15 L 24 15 C 30.054688 15 35 19.945313 35 26 L 35 28 L 34 28 C 33.96875 28 33.9375 28 33.90625 28 C 33.355469 28.027344 32.925781 28.496094 32.953125 29.046875 C 32.980469 29.597656 33.449219 30.027344 34 30 L 35 30 L 35 44 L 34 44 C 33.96875 44 33.9375 44 33.90625 44 C 33.875 44 33.84375 44 33.8125 44 C 33.261719 44.050781 32.855469 44.542969 32.90625 45.09375 C 32.957031 45.644531 33.449219 46.050781 34 46 L 45 46 C 45.359375 46.003906 45.695313 45.816406 45.878906 45.503906 C 46.058594 45.191406 46.058594 44.808594 45.878906 44.496094 C 45.695313 44.183594 45.359375 43.996094 45 44 L 44 44 L 44 30 L 45 30 C 45.359375 30.003906 45.695313 29.816406 45.878906 29.503906 C 46.058594 29.191406 46.058594 28.808594 45.878906 28.496094 C 45.695313 28.183594 45.359375 27.996094 45 28 L 44 28 L 44 26 C 44 14.964844 35.035156 6 24 6 L 23 6 L 23 5 C 23.007813 4.691406 22.871094 4.398438 22.632813 4.203125 C 22.398438 4.007813 22.082031 3.933594 21.78125 4 C 21.316406 4.105469 20.988281 4.523438 21 5 L 21 6 L 6 6 L 6 5 C 6.011719 4.710938 5.894531 4.433594 5.6875 4.238281 C 5.476563 4.039063 5.191406 3.941406 4.90625 3.96875 Z M 6 8 L 21 8 L 21 13 L 6 13 Z M 23 8 L 24 8 C 33.953125 8 42 16.046875 42 26 L 42 28 L 37 28 L 37 26 C 37 18.855469 31.144531 13 24 13 L 23 13 Z M 4.90625 18.96875 C 4.863281 18.976563 4.820313 18.988281 4.78125 19 C 4.316406 19.105469 3.988281 19.523438 4 20 L 4 31 C 3.996094 31.359375 4.183594 31.695313 4.496094 31.878906 C 4.808594 32.058594 5.191406 32.058594 5.503906 31.878906 C 5.816406 31.695313 6.003906 31.359375 6 31 L 6 30 L 19 30 C 19.554688 30 20 30.445313 20 31 L 20 44 L 19 44 C 18.96875 44 18.9375 44 18.90625 44 C 18.875 44 18.84375 44 18.8125 44 C 18.261719 44.050781 17.855469 44.542969 17.90625 45.09375 C 17.957031 45.644531 18.449219 46.050781 19 46 L 30 46 C 30.359375 46.003906 30.695313 45.816406 30.878906 45.503906 C 31.058594 45.191406 31.058594 44.808594 30.878906 44.496094 C 30.695313 44.183594 30.359375 43.996094 30 44 L 29 44 L 29 31 C 29 25.488281 24.511719 21 19 21 L 6 21 L 6 20 C 6.011719 19.710938 5.894531 19.433594 5.6875 19.238281 C 5.476563 19.039063 5.191406 18.941406 4.90625 18.96875 Z M 6 23 L 19 23 C 23.429688 23 27 26.570313 27 31 L 27 44 L 22 44 L 22 31 C 22 29.355469 20.644531 28 19 28 L 6 28 Z M 37 30 L 42 30 L 42 44 L 37 44 Z"></path>
  </g>
);

const Screw = () => (
  <g transform="translate(-24, -24) scale(0.8)">
    <path fill="#777777" stroke="#777777" d="M 32.595703 1 A 1.50015 1.50015 0 0 0 31.556641 1.4394531 L 29.041016 3.9550781 C 27.431441 5.5646528 27.288465 8.378312 29.095703 10.185547 L 29.386719 10.476562 C 29.12446 11.021837 28.674061 11.770741 27.707031 12.738281 C 26.964165 13.481148 4.2753906 36.175781 4.2753906 36.175781 A 1.50015 1.50015 0 0 0 3.9179688 36.75 L 1.0820312 45.013672 A 1.50015 1.50015 0 0 0 2.9863281 46.917969 L 11.248047 44.083984 A 1.50015 1.50015 0 0 0 11.822266 43.726562 C 11.822266 43.726562 34.363275 21.181647 35.248047 20.296875 C 36.09103 19.45432 36.880914 18.999073 37.439453 18.751953 C 37.557638 18.699663 37.514713 18.729203 37.603516 18.695312 L 37.923828 19.015625 C 38.852194 19.943991 40.088483 20.352915 41.201172 20.273438 C 42.31386 20.193957 43.303581 19.699123 44.042969 18.958984 L 46.560547 16.441406 A 1.50015 1.50015 0 0 0 46.560547 14.320312 L 33.677734 1.4394531 A 1.50015 1.50015 0 0 0 32.595703 1 z M 32.617188 4.6210938 L 43.378906 15.380859 C 42.845286 15.914197 42.492723 16.267042 41.921875 16.837891 A 1.50015 1.50015 0 0 0 41.919922 16.837891 C 41.67431 17.083752 41.307093 17.258478 40.988281 17.28125 C 40.66947 17.30402 40.399556 17.24721 40.044922 16.892578 C 38.762249 15.609854 32.453083 9.298786 31.216797 8.0625 C 30.552032 7.3977347 30.715684 6.5225972 31.162109 6.0761719 L 32.617188 4.6210938 z M 31.488281 12.609375 L 35.4375 16.558594 C 34.712682 16.957132 33.966783 17.334425 33.126953 18.173828 C 32.640844 18.659937 26.507505 24.795825 20.289062 31.015625 L 18.695312 25.996094 C 24.170088 20.519897 29.477881 15.209619 29.828125 14.859375 C 30.63918 14.047891 31.064008 13.31232 31.488281 12.609375 z M 16.306641 28.384766 L 17.900391 33.404297 C 17.123228 34.181631 16.823531 34.48296 16.144531 35.162109 L 14.548828 30.142578 C 15.327935 29.363267 15.465816 29.22581 16.306641 28.384766 z M 12.160156 32.53125 L 13.753906 37.550781 C 13.230452 38.074351 12.166883 39.139691 11.861328 39.445312 L 10.267578 34.425781 C 10.77496 33.918266 11.476301 33.215285 12.160156 32.53125 z M 7.8789062 36.814453 L 9.3847656 41.554688 L 4.9121094 43.087891 L 6.6425781 38.050781 C 6.6674651 38.025891 7.7368558 36.956541 7.8789062 36.814453 z"></path>
  </g>
);


const SheetMetalIcon = () => (
  <g transform="translate(-24, -24) scale(0.85)">
    <g>
      <path fill="none" stroke="#777777" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7.5,20.304v15.247"></path>
      <path fill="none" stroke="#777777" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M31.304,11.551H38.5c1.105,0,2,0.895,2,2v26c0,1.105-0.895,2-2,2H15c-2.499,0-7.5-1.3-7.5-6.501 c0-3.039,3.751-5.2,7.5-5.2c1.61,0,4.209,0.338,5.886,1.75c0.637,0.536,1.614,0.047,1.614-0.786V11.649 c0.002-3.039-3.325-5.2-7.5-5.2s-7.5,2.161-7.5,5.2v1.482"></path>
    </g>
  </g>
);


const ConcreteIcon = () => (
  <g transform="translate(-24, -24) scale(0.75)">
    <path stroke="#777777" fill="#777777" d="M 17 7.90625 L 17 14.90625 L 14 14.90625 L 14 16.90625 L 17 16.90625 L 17 23.90625 L 19 23.90625 L 19 16.90625 L 24 16.90625 L 24 23.90625 L 26 23.90625 L 26 16.90625 L 31 16.90625 L 31 23.90625 L 33 23.90625 L 33 16.90625 L 36 16.90625 L 36 14.90625 L 33 14.90625 L 33 7.90625 L 31 7.90625 L 31 14.90625 L 26 14.90625 L 26 7.90625 L 24 7.90625 L 24 14.90625 L 19 14.90625 L 19 7.90625 L 17 7.90625 z M 8.3398438 18.90625 L 5 26.701172 L 5 44.90625 L 45 44.90625 L 45 26.669922 L 41.617188 19.90625 L 35 19.90625 L 35 21.90625 L 40.382812 21.90625 L 42.382812 25.90625 L 7.5175781 25.90625 L 9.6601562 20.90625 L 15 20.90625 L 15 18.90625 L 8.3398438 18.90625 z M 7 27.90625 L 43 27.90625 L 43 42.90625 L 7 42.90625 L 7 27.90625 z"></path>
  </g>
)