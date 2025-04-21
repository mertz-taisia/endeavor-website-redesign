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
      text: '6 x 1" #2 Phillips Bugle...',
      icon: Screw,
    },
    {
      text: '6 x 1-1/4" #2 Phillips B...',
      icon: Screw,
    },
    {
      text: '6 x 1-1/2" #2 Phillips B...',
      icon: Screw,
    },
    {
      text: '6 x 2" #2 Phillips Bugle ...',
      icon: Screw,
    },
    {
      text: '1/4" x 10 ft Copper Type ...',
      icon: Pipes,
    },
    {
      text: '1/2" x 10 ft Copper Type ...',
      icon: Pipes,
    },
    {
      text: '2" x 10 ft Copper Type L ...',
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
      text: '2" x 1" x 0.125" Stainless S...',
      icon: Concrete,
    },
    {
      text: '3" x 1 1/2" x 0.188" Stainle...',
      icon: Concrete,
    },
    {
      text: '3" x 1 1/2" x 0.188" Stainle...',
      icon: Concrete,
    },
    {
      text: '3" x 1 1/2" x 0.188" Stainle...',
      icon: Concrete,
    },
    {
      text: '3" x 1 1/2" x 0.188" Stainle...',
      icon: Concrete,
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
                initial={{ opacity: 0, y: currY + 100 }}
                animate={{
                  opacity: isHighLighted ? 1 : 0.6,
                  y: currY,
                  x: isHighLighted ? -8 : 0
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
                  textX={-75}
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

      {/* The sliding item has been moved to EndeavorContainer */}


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

const MetalIcon = () => (
  <g transform="translate(-24, -24) scale(0.8)">
    {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48"> */}
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M19.56,35.5H37.5v-1.188c0-2.105-1.707-3.812-3.812-3.812H30.5v-4.416"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M17.5,26.035V30.5h-3.188c-2.105,0-3.812,1.707-3.812,3.812V35.5h4.217"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M23.62,25.5H8.5c-0.552,0-1-0.448-1-1v-11c0-0.552,0.448-1,1-1h2.353"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M17.114,12.5H44.5c0.552,0,1,0.448,1,1v0.419c0,6.396-5.185,11.581-11.581,11.581h-3.647"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M7.5,22.5L7.5,22.5c-3.314,0-6-2.686-6-6v-1h6V22.5z"></path>
    {/* </svg> */}
  </g>
)

const BoltIcon = () => (
  <g transform="translate(-24, -24) scale(0.5)">
    <path fill="#777777" d="M41.1558 0.314827C40.9387 0.310076 40.7231 0.35061 40.5225 0.43384C40.322 0.517071 40.1411 0.641173 39.9912 0.798234C39.8413 0.955294 39.7258 1.14187 39.652 1.34605C39.5783 1.55024 39.5478 1.76755 39.5627 1.98414L40.3592 14.0783L30.9995 24.265L26.2967 23.5326C25.8823 23.4683 25.4594 23.5712 25.1208 23.8187C24.7823 24.0662 24.556 24.4381 24.4916 24.8525C24.4273 25.2669 24.5302 25.6899 24.7777 26.0284C25.0252 26.3669 25.3971 26.5933 25.8115 26.6576L28.4269 27.0635L24.9204 30.8812L20.2665 30.158C20.0613 30.1261 19.8518 30.135 19.6501 30.1841C19.4483 30.2332 19.2582 30.3215 19.0906 30.4441C18.9229 30.5666 18.7811 30.721 18.6731 30.8984C18.5652 31.0758 18.4932 31.2727 18.4614 31.4779C18.4295 31.683 18.4384 31.8925 18.4875 32.0943C18.5365 32.296 18.6249 32.4861 18.7474 32.6538C18.87 32.8214 19.0244 32.9632 19.2018 33.0712C19.3791 33.1791 19.5761 33.2511 19.7812 33.283L22.3478 33.6827L18.8413 37.4974L14.2484 36.7833C13.837 36.726 13.4196 36.8328 13.0863 37.0807C12.7531 37.3286 12.5308 37.6977 12.4674 38.1082C12.4041 38.5187 12.5048 38.9377 12.7479 39.2745C12.9909 39.6113 13.3567 39.839 13.7662 39.9083L16.2687 40.299L12.8019 44.0679L8.23339 43.3446C7.82201 43.2873 7.40459 43.3941 7.07133 43.642C6.73807 43.8899 6.51574 44.259 6.45241 44.6695C6.38907 45.08 6.4898 45.4989 6.73283 45.8358C6.97586 46.1726 7.34168 46.4003 7.75121 46.4696L10.2414 46.8572L6.68615 50.7268L2.21838 50.031C1.80398 49.9667 1.38099 50.0696 1.04246 50.3171C0.703939 50.5646 0.477607 50.9365 0.413262 51.3509C0.348916 51.7653 0.451826 52.1883 0.699352 52.5268C0.946879 52.8653 1.31875 53.0917 1.73315 53.156L4.11657 53.5222L3.56115 54.1265C3.37492 54.3218 3.2461 54.5646 3.18884 54.8284L0.890862 64.8748C0.816482 65.145 0.816144 65.4302 0.889887 65.7006C0.96363 65.971 1.10874 66.2165 1.31001 66.4116C1.51127 66.6066 1.76129 66.7439 2.03386 66.8091C2.30643 66.8743 2.59152 66.865 2.85925 66.7821L12.1091 64.2827C12.3922 64.2034 12.6471 64.0457 12.8446 63.828L20.0437 55.9819L24.7342 56.7052C25.1446 56.7651 25.5619 56.6595 25.8945 56.4117C26.227 56.1639 26.4474 55.7942 26.5073 55.3838C26.5672 54.9734 26.4616 54.5561 26.2138 54.2236C25.966 53.8911 25.5963 53.6706 25.1859 53.6107L22.5889 53.2048L26.1411 49.3322L30.734 50.0463C31.1121 50.053 31.4797 49.9225 31.7689 49.6788C32.058 49.4351 32.2489 49.0949 32.3063 48.7211C32.3637 48.3474 32.2836 47.9655 32.0809 47.6464C31.8782 47.3272 31.5666 47.0923 31.204 46.9854L28.6649 46.5825L32.1592 42.7709L36.749 43.485C37.1634 43.5493 37.5864 43.4464 37.9249 43.1989C38.2635 42.9514 38.4898 42.5795 38.5541 42.1651C38.6185 41.7507 38.5156 41.3277 38.268 40.9892C38.0205 40.6507 37.6486 40.4243 37.2342 40.36L34.7288 39.9694L38.2291 36.1547L42.764 36.8596C43.1784 36.924 43.6014 36.8211 43.9399 36.5735C44.2785 36.326 44.5048 35.9541 44.5691 35.5397C44.6335 35.1253 44.5306 34.7024 44.2831 34.3638C44.0355 34.0253 43.6637 33.799 43.2493 33.7346L40.7987 33.3532L44.3021 29.5354L48.7974 30.2343C49.209 30.2903 49.6262 30.1819 49.9585 29.9326C50.2908 29.6833 50.5116 29.3131 50.573 28.9022C50.6344 28.4913 50.5315 28.0728 50.2865 27.7372C50.0416 27.4016 49.6743 27.176 49.2643 27.1093L46.8686 26.7369L49.5634 23.7981L62.2519 22.4223C62.5683 22.4583 62.8882 22.3967 63.1686 22.2459C63.4491 22.0951 63.6767 21.8621 63.8211 21.5783C63.9655 21.2945 64.0198 20.9733 63.9766 20.6578C63.9334 20.3424 63.7948 20.0476 63.5794 19.813L42.2666 0.812264C42.1241 0.65925 41.9524 0.536383 41.7616 0.450938C41.5708 0.365493 41.3648 0.319208 41.1558 0.314827ZM42.938 6.1742L59 19.813L49.7342 20.6578L43.4842 13.9867L42.938 6.1742ZM41.9675 16.8767L46.7801 22.1105L43.0753 26.1449L34.6616 24.8357L41.9675 16.8767ZM32.092 27.6342L40.5088 28.9434L37.0023 32.7611L28.5856 31.4519L32.092 27.6342ZM26.016 34.2534L34.4327 35.5626L30.9293 39.3804L22.5126 38.0681L26.016 34.2534ZM19.943 40.8696L28.3597 42.1788L24.8685 45.9813L16.4731 44.6508L19.943 40.8696ZM13.9219 47.4309L22.3386 48.7401L18.7833 52.6128L10.3666 51.3005L13.9219 47.4309ZM7.80309 54.0929L16.232 55.393L10.7969 61.3134L4.54687 63.0315L6.10937 55.9392L7.80309 54.0929Z"/>
  </g>
)

const CoalIcon = () => (
  <g transform="translate(-24, -24) scale(0.75)">
    {/* <path fill="#9fa8da" d="M43.8,33L43.8,33c0,0.2-0.1,0.5-0.2,0.7l-6.2,13.3c-0.3,0.7-1,1.1-1.8,1.1H23.1c-0.4,0-0.7-0.1-1-0.3	c-0.3-0.2-0.5-0.4-0.7-0.7l-8.8-14.1c-0.2-0.3-0.3-0.6-0.3-1c0-0.3,0-0.6,0.2-0.9l0.8-1.6l5.6-11.9c0.1-0.2,0.2-0.3,0.3-0.4	c0.1-0.2,0.3-0.3,0.4-0.4l12-7.7c0.8-0.5,2-0.4,2.6,0.4l3.6,4.3c0.1,0.1,0.2,0.2,0.2,0.3c0.1,0.1,0.1,0.2,0.2,0.4l5.7,17.9	C43.8,32.5,43.9,32.7,43.8,33z"></path> */}
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M25,43.5h-5.9c-0.4,0-0.7-0.1-1-0.3c-0.3-0.2-0.5-0.4-0.7-0.6l-8.8-14c-0.2-0.3-0.3-0.6-0.3-1	c0-0.3,0-0.6,0.2-0.9l0.8-1.6l5.6-11.7c0.1-0.2,0.2-0.3,0.3-0.4c0.1-0.1,0.3-0.3,0.4-0.4l4.1-2.6"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M24.1,7.1L27.5,5c0.8-0.5,2-0.4,2.6,0.4l3.6,4.3c0.1,0.1,0.2,0.2,0.2,0.3c0.1,0.1,0.1,0.2,0.2,0.3L39.8,28	c0.1,0.2,0.1,0.4,0.1,0.6v0c0,0.2-0.1,0.5-0.2,0.7l-6.2,13.1c-0.3,0.7-1,1.1-1.8,1.1h-0.9"></path>
    <line x1="23.3" x2="18.3" y1="25" y2="43.5" fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
    <line x1="15.1" x2="19.6" y1="13.1" y2="19.6" fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
    <polyline fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" points="28.7,4.9 28.3,13.8 23.3,25"></polyline><polyline fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" points="32.1,27.2 23.9,25 8.3,27.9"></polyline>
  </g>
)

const Concrete = () => (
  <g transform="translate(-24, -24) scale(0.75)">
    <path stroke="#777777" fill="#777777" d="M 17 7.90625 L 17 14.90625 L 14 14.90625 L 14 16.90625 L 17 16.90625 L 17 23.90625 L 19 23.90625 L 19 16.90625 L 24 16.90625 L 24 23.90625 L 26 23.90625 L 26 16.90625 L 31 16.90625 L 31 23.90625 L 33 23.90625 L 33 16.90625 L 36 16.90625 L 36 14.90625 L 33 14.90625 L 33 7.90625 L 31 7.90625 L 31 14.90625 L 26 14.90625 L 26 7.90625 L 24 7.90625 L 24 14.90625 L 19 14.90625 L 19 7.90625 L 17 7.90625 z M 8.3398438 18.90625 L 5 26.701172 L 5 44.90625 L 45 44.90625 L 45 26.669922 L 41.617188 19.90625 L 35 19.90625 L 35 21.90625 L 40.382812 21.90625 L 42.382812 25.90625 L 7.5175781 25.90625 L 9.6601562 20.90625 L 15 20.90625 L 15 18.90625 L 8.3398438 18.90625 z M 7 27.90625 L 43 27.90625 L 43 42.90625 L 7 42.90625 L 7 27.90625 z"></path>
  </g>
)