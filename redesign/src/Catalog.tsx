// @ts-nocheck
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAnimationStore } from "./AnimationStore";
import Item from './Item';


export const Catalog = ({
  state,
  selecting,
  activeItem = 3, // Index of the item to scroll to (0 to 6)
}: {
  state: "hidden" | "basicState" | "scrollToItemOne" | "scrollToItemTwo" | "scrollToItemThree" | "pullOutItem1" | "pullOutItem2" | "pullOutItem3"; // Added a new state
  activeItem?: number;
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Define the items once
  const items = [
    {
      text: '1" Schedule 40 PVC Pipe ...',
      icon: Screw,
    },
    {
      text: '1" Schedule 40 PVC Pipe ...',
      icon: Screw,
    },
    {
      text: '4" x 4" x 0.5" Steel Pla...',
      icon: Screw,
    },
    {
      text: '96" x 48" Acrylic Sheet ...',
      icon: Pipes,
    },
    {
      text: '3" x 3" x 0.375" Galvaniz...',
      icon: Pipes,
    },
    {
      text: '1 1/4" x 1/4" Cold Rolled...',
      icon: Pipes,
    },
    {
      text: '2" x 2" x 0.25" Stainless...',
      icon: Pipes,
    },
    {
      text: '60" x 36" Polycarbonate ...',
      icon: SheetMetalIcon,
    },
    {
      text: '1 1/2" Schedule 80 Black ...',
      icon: SheetMetalIcon,
    },
    {
      text: '3" x 3" x 0.25" Aluminum...',
      icon: SheetMetalIcon,
    },
    {
      text: '1 1/2" x 3/4" x 1" Stain...',
      icon: SheetMetalIcon,
    },
    {
      text: '1 1/2" x 3/4" x 0.75" St...',
      icon: SheetMetalIcon,
    },
    {
      text: '2" x 1" x 0.125" Stainless S...',
      icon: SheetMetalIcon,
    },
    {
      text: '3" x 1 1/2" x 0.188" Stainle...',
      icon: SheetMetalIcon,
    },
    {
      text: '3" x 1 1/2" x 0.188" Stainle...',
      icon: SheetMetalIcon,
    },
    {
      text: '79.5" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    },
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    }, ,
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    }, ,
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    },
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    },
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    },
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    },
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    },
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    },
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    },
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    }
  ];

  const centerPosition = 3;
  const visibleItems = 7;

  const startIndex = Math.max(0, activeItem - Math.floor(visibleItems / 2));
  const endIndex = Math.min(items.length, startIndex + visibleItems);


  const catalogVariants = {
    hidden: { opacity: 0, x: 480, y: 372, },
    basicState: { opacity: 1, x: 480, y: 372, transition: { duration: 0.6, ease: "easeOut" } },
    scrollToItemOne: { opacity: 1, x: 480, y: 372, transition: { duration: 0.6, ease: "easeOut" } },
    pullOutItemOne: { opacity: 1, x: 480, y: 372, transition: { duration: 0.6, ease: "easeOut" } },
    scrollToItemTwo: { opacity: 1, x: 480, y: 415, transition: { duration: 0.6, ease: "easeOut" } },
    pullOutItemTwo: { opacity: 1, x: 480, y: 415, transition: { duration: 0.6, ease: "easeOut" } },
    scrollToItemThree: { opacity: 1, x: 480, y: 455, transition: { duration: 0.6, ease: "easeOut" } },
    pullOutItemThree: { opacity: 1, x: 480, y: 455, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const rectangleCoordsByState = {
    hidden: { x1: -150, x2: 150, y1: -190, y2: 190 },
    basicState: { x1: -150, x2: 150, y1: -190, y2: 190 },
    scrollToItemOne: { x1: -150, x2: 150, y1: -190, y2: 190 },
    pullOutItemOne: { x1: -150, x2: 150, y1: -190, y2: 190 },
    scrollToItemTwo: { x1: -150, x2: 150, y1: -190, y2: 190 },
    pullOutItemTwo: { x1: -150, x2: 150, y1: -190, y2: 190 },
    scrollToItemThree: { x1: -150, x2: 150, y1: -190, y2: 190 },
    pullOutItemThree: { x1: -150, x2: 150, y1: -190, y2: 190 }
  };

  const currentCoords = rectangleCoordsByState[state] || rectangleCoordsByState.hidden;

  // Highlight the active item
  const getItemStyle = (index) => {
    if ((state === "scrollToItemOne" || state === "scrollToItemTwo" || state === "scrollToItemThree") && index === activeItem) {
      return {
        opacity: 1,
        scale: 1.05,
      };
    }
    return {
      opacity: 1,
      scale: 1,
    };
  };

  return (
    <motion.g
      initial="hidden"
      animate={state}
      variants={catalogVariants}
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
          width: { duration: 0.6, ease: "easeInOut" },
          x: { duration: 0.6, ease: "easeInOut" },
          height: { duration: 0.6, ease: "easeInOut" },
        }}
        rx={20}
        fill="white"
        filter="url(#softShadow)"
      />

      {/* Clip path for the scrollable area */}
      <clipPath id="catalogClip">
        <motion.rect
          x={currentCoords.x1 + 10}
          y={currentCoords.y1 + 10}
          width={currentCoords.x2 - currentCoords.x1 - 20}
          height={currentCoords.y2 - currentCoords.y1 - 20}
          rx={15}
        />
      </clipPath>

      {/* Scrollable content */}
      {/* Main container with clipping path for regular items */}
      <motion.g clipPath="url(#catalogClip)">
        <AnimatePresence mode="popLayout" initial={true}>
          {items.slice(startIndex, endIndex).map((item, index) => {
            // In pullOutItem state, we still want to show the item in the catalog
            // We'll create a duplicate outside the clipping path for the sliding animation
            const actualIndex = startIndex + index;
            const currY = (index - centerPosition) * 50; // relative to visible center
            const isHighLighted = actualIndex === activeItem;
            // Determine state based on component state and item position
            let itemState = "hidden";

            if (isHighLighted || (actualIndex >= activeItem - 3 && actualIndex <= activeItem + 3)) {
              itemState = "populated";
            }

            // When in pullOutItem state, we want to keep the active item visible
            if ((state === "pullOutItemOne" || state === "pullOutItemTwo" || state === "pullOutItemThree") && actualIndex === activeItem) {
              itemState = "populated";
            }

            return (
              <motion.g
                key={`item-container-${actualIndex}`}
                initial={{ opacity: 0, y: currY + 100, scale: 0.95 }}
                animate={{
                  opacity: isHighLighted ? 1 : 0.6,
                  y: currY,
                  // filter: isHighLighted ? "brightness(1.2)" : "brightness(1)",
                  scale: isHighLighted ? 1.05 : 1,
                  // When in pullOutItem state and this is the active item, slide it to the left
                  x: isHighLighted ? -2 : 0
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: currY - 15, // Move upwards by 15 pixels
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{
                  // For the pullOutItem state, make the x transition longer and with a different easing
                  x: (state === "pullOutItemOne" || state === "pullOutItemTwo" || state === "pullOutItemThree") && actualIndex === activeItem
                    ? { duration: 0.8, ease: "easeInOut" }
                    : { duration: 0.4, ease: "easeOut" },
                  y: { duration: 0.5, ease: "backOut" },  // Using backOut for a more pronounced slide effect
                  opacity: { duration: 0.5, ease: "easeOut" },
                  // filter: { duration: 0.4, ease: "easeOut" },
                  scale: { duration: 0.5, ease: "easeOut" },
                  default: { duration: 0.5, ease: "easeOut" }
                }}
              >
                <Item
                  key={`item-${actualIndex}`}
                  state={itemState}
                  x={0}
                  y={0}
                  text={item.text}
                  icon={item.icon}
                  textX={isHighLighted ? -77 : -75}
                  iconX={-105}
                  iconY={0}
                  iconScale={0.8}
                  scale={1}
                />
              </motion.g>
            );
          })}
        </AnimatePresence>
      </motion.g>

      {/* Render the duplicate active item with white container outside the clipping path when in pullOutItem state */}
      {(state === "pullOutItemOne" || state === "pullOutItemTwo" || state === "pullOutItemThree") && (
        <motion.g>
          {items.map((item, index) => {
            if (index !== activeItem) return null;

            // Calculate the position to match the centered item
            // This ensures it slides out from the center position
            const centerY = 0; // Center position is always at y=0

            return (
              <motion.g
                key={`sliding-item-${index}`}
                initial={{
                  opacity: 1,
                  y: centerY, // Start at center position
                  x: -2, // Match the original item's x position
                  scale: 1.05, // Match the original item's scale
                  // filter: "brightness(1.2)"
                }}
                animate={[
                  // First animation: slide to the left with slight scale up
                  { 
                    opacity: 1,
                    y: centerY,
                    x: -325, // Slide to the left
                    scale: 1.1, // Slightly larger during movement
                    // filter: "brightness(1.3)",
                    transition: {
                      x: { 
                        duration: 2.0, 
                        ease: "easeInOut",
                        delay: 1.0 // Delay before moving
                      },
                      scale: { duration: 1.5, ease: "easeOut" },
                      // filter: { duration: 1.5, ease: "easeOut" }
                    }
                  },
                  // Second animation: shrink into final position
                  { 
                    scale: 0.95, // Shrink to final size
                    // filter: "brightness(1.2)",
                    transition: {
                      delay: 3.0, // Start shrinking after sliding completes
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }
                ]}
              >
                {/* White container/background for the extracted item */}
                <motion.rect
                  width={245}
                  height={45}
                  x={-130}
                  y={-26}
                  rx={10}
                  ry={10}
                  fill="white"
                  initial={{
                    opacity: 0,
                    scale: 1.05
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1.05
                  }}
                  transition={{
                    opacity: { delay: 0.3, duration: 0.6, ease: "easeInOut" }
                  }}
                />

                <Item
                  key={`item-slide-${index}`}
                  state="populated"
                  x={0}
                  y={0}
                  text={item.text}
                  icon={item.icon}
                  textX={-77}
                  iconX={-105}
                  iconY={0}
                  iconScale={0.8}
                  scale={1} // Match the original item's scale (line 263)
                />
              </motion.g>
            );
          })}
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


const Screw = () => (
  <g transform="translate(-24, -24) scale(0.9)">
    <path fill="#777777" stroke="#777777" d="M 32.595703 1 A 1.50015 1.50015 0 0 0 31.556641 1.4394531 L 29.041016 3.9550781 C 27.431441 5.5646528 27.288465 8.378312 29.095703 10.185547 L 29.386719 10.476562 C 29.12446 11.021837 28.674061 11.770741 27.707031 12.738281 C 26.964165 13.481148 4.2753906 36.175781 4.2753906 36.175781 A 1.50015 1.50015 0 0 0 3.9179688 36.75 L 1.0820312 45.013672 A 1.50015 1.50015 0 0 0 2.9863281 46.917969 L 11.248047 44.083984 A 1.50015 1.50015 0 0 0 11.822266 43.726562 C 11.822266 43.726562 34.363275 21.181647 35.248047 20.296875 C 36.09103 19.45432 36.880914 18.999073 37.439453 18.751953 C 37.557638 18.699663 37.514713 18.729203 37.603516 18.695312 L 37.923828 19.015625 C 38.852194 19.943991 40.088483 20.352915 41.201172 20.273438 C 42.31386 20.193957 43.303581 19.699123 44.042969 18.958984 L 46.560547 16.441406 A 1.50015 1.50015 0 0 0 46.560547 14.320312 L 33.677734 1.4394531 A 1.50015 1.50015 0 0 0 32.595703 1 z M 32.617188 4.6210938 L 43.378906 15.380859 C 42.845286 15.914197 42.492723 16.267042 41.921875 16.837891 A 1.50015 1.50015 0 0 0 41.919922 16.837891 C 41.67431 17.083752 41.307093 17.258478 40.988281 17.28125 C 40.66947 17.30402 40.399556 17.24721 40.044922 16.892578 C 38.762249 15.609854 32.453083 9.298786 31.216797 8.0625 C 30.552032 7.3977347 30.715684 6.5225972 31.162109 6.0761719 L 32.617188 4.6210938 z M 31.488281 12.609375 L 35.4375 16.558594 C 34.712682 16.957132 33.966783 17.334425 33.126953 18.173828 C 32.640844 18.659937 26.507505 24.795825 20.289062 31.015625 L 18.695312 25.996094 C 24.170088 20.519897 29.477881 15.209619 29.828125 14.859375 C 30.63918 14.047891 31.064008 13.31232 31.488281 12.609375 z M 16.306641 28.384766 L 17.900391 33.404297 C 17.123228 34.181631 16.823531 34.48296 16.144531 35.162109 L 14.548828 30.142578 C 15.327935 29.363267 15.465816 29.22581 16.306641 28.384766 z M 12.160156 32.53125 L 13.753906 37.550781 C 13.230452 38.074351 12.166883 39.139691 11.861328 39.445312 L 10.267578 34.425781 C 10.77496 33.918266 11.476301 33.215285 12.160156 32.53125 z M 7.8789062 36.814453 L 9.3847656 41.554688 L 4.9121094 43.087891 L 6.6425781 38.050781 C 6.6674651 38.025891 7.7368558 36.956541 7.8789062 36.814453 z"></path>
  </g>
);

const Pipes = () => (
  <g transform="translate(-24, -24) scale(0.8)">
    <path fill="#777777" stroke="#777777" d="M 4.90625 3.96875 C 4.863281 3.976563 4.820313 3.988281 4.78125 4 C 4.316406 4.105469 3.988281 4.523438 4 5 L 4 16 C 3.996094 16.359375 4.183594 16.695313 4.496094 16.878906 C 4.808594 17.058594 5.191406 17.058594 5.503906 16.878906 C 5.816406 16.695313 6.003906 16.359375 6 16 L 6 15 L 21 15 L 21 16 C 20.996094 16.359375 21.183594 16.695313 21.496094 16.878906 C 21.808594 17.058594 22.191406 17.058594 22.503906 16.878906 C 22.816406 16.695313 23.003906 16.359375 23 16 L 23 15 L 24 15 C 30.054688 15 35 19.945313 35 26 L 35 28 L 34 28 C 33.96875 28 33.9375 28 33.90625 28 C 33.355469 28.027344 32.925781 28.496094 32.953125 29.046875 C 32.980469 29.597656 33.449219 30.027344 34 30 L 35 30 L 35 44 L 34 44 C 33.96875 44 33.9375 44 33.90625 44 C 33.875 44 33.84375 44 33.8125 44 C 33.261719 44.050781 32.855469 44.542969 32.90625 45.09375 C 32.957031 45.644531 33.449219 46.050781 34 46 L 45 46 C 45.359375 46.003906 45.695313 45.816406 45.878906 45.503906 C 46.058594 45.191406 46.058594 44.808594 45.878906 44.496094 C 45.695313 44.183594 45.359375 43.996094 45 44 L 44 44 L 44 30 L 45 30 C 45.359375 30.003906 45.695313 29.816406 45.878906 29.503906 C 46.058594 29.191406 46.058594 28.808594 45.878906 28.496094 C 45.695313 28.183594 45.359375 27.996094 45 28 L 44 28 L 44 26 C 44 14.964844 35.035156 6 24 6 L 23 6 L 23 5 C 23.007813 4.691406 22.871094 4.398438 22.632813 4.203125 C 22.398438 4.007813 22.082031 3.933594 21.78125 4 C 21.316406 4.105469 20.988281 4.523438 21 5 L 21 6 L 6 6 L 6 5 C 6.011719 4.710938 5.894531 4.433594 5.6875 4.238281 C 5.476563 4.039063 5.191406 3.941406 4.90625 3.96875 Z M 6 8 L 21 8 L 21 13 L 6 13 Z M 23 8 L 24 8 C 33.953125 8 42 16.046875 42 26 L 42 28 L 37 28 L 37 26 C 37 18.855469 31.144531 13 24 13 L 23 13 Z M 4.90625 18.96875 C 4.863281 18.976563 4.820313 18.988281 4.78125 19 C 4.316406 19.105469 3.988281 19.523438 4 20 L 4 31 C 3.996094 31.359375 4.183594 31.695313 4.496094 31.878906 C 4.808594 32.058594 5.191406 32.058594 5.503906 31.878906 C 5.816406 31.695313 6.003906 31.359375 6 31 L 6 30 L 19 30 C 19.554688 30 20 30.445313 20 31 L 20 44 L 19 44 C 18.96875 44 18.9375 44 18.90625 44 C 18.875 44 18.84375 44 18.8125 44 C 18.261719 44.050781 17.855469 44.542969 17.90625 45.09375 C 17.957031 45.644531 18.449219 46.050781 19 46 L 30 46 C 30.359375 46.003906 30.695313 45.816406 30.878906 45.503906 C 31.058594 45.191406 31.058594 44.808594 30.878906 44.496094 C 30.695313 44.183594 30.359375 43.996094 30 44 L 29 44 L 29 31 C 29 25.488281 24.511719 21 19 21 L 6 21 L 6 20 C 6.011719 19.710938 5.894531 19.433594 5.6875 19.238281 C 5.476563 19.039063 5.191406 18.941406 4.90625 18.96875 Z M 6 23 L 19 23 C 23.429688 23 27 26.570313 27 31 L 27 44 L 22 44 L 22 31 C 22 29.355469 20.644531 28 19 28 L 6 28 Z M 37 30 L 42 30 L 42 44 L 37 44 Z"></path>
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
