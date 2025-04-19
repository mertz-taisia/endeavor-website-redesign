// @ts-nocheck
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Item from './Item';

export const Catalog = ({
  state,
  activeItem = 3, // Index of the item to scroll to (0 to 6)
}: {
  state: "hidden" | "basicState" | "scrollToItem"; // Added a new state
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
      icon: SheetMetalIcon,
    },
    {
      text: '3" x 3" x 0.375" Galvaniz...',
      icon: SheetMetalIcon,
    },
    {
      text: '1 1/4" x 1/4" Cold Rolled...',
      icon: SheetMetalIcon,
    },
    {
      text: '2" x 2" x 0.25" Stainless...',
      icon: SheetMetalIcon,
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
    },,
    {
      text: '39.75" x 60" Clear 3/4" (12m...',
      icon: SheetMetalIcon,
    },,
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
  ];

  // Calculate the target scroll position based on the activeItem
  // useEffect(() => {
  //   if (state === "scrollToItem" && activeItem >= 0 && activeItem < items.length) {
  //     const offset = (activeItem - centerPosition) * 50;
  //     setTimeout(() => {
  //       setScrollPosition(-offset);
  //     }, 50);
  //   } else {
  //     // Reset scrollPosition to 0 so item at index 3 remains centered
  //     setScrollPosition(0);
  //   }
  // }, [state, activeItem, items]);
  

  // Calculate start and end indices to ensure active item is at position 3
  // const centerPosition = 3; // The position where we want the active item
  // const visibleItems = 7; // Total number of items to display
  
  // const { startIndex, endIndex } = { startIndex: 0, endIndex: 7 };
  const centerPosition = 3;
const visibleItems = 7;

const startIndex = Math.max(0, activeItem - Math.floor(visibleItems / 2));
const endIndex = Math.min(items.length, startIndex + visibleItems);


  const endeavorVariants = {
    hidden: { opacity: 0, x: 480, y: 400, },
    basicState: { opacity: 1, x: 480, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    scrollToItem: { opacity: 1, x: 480, y: 400, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const rectangleCoordsByState = {
    hidden: { x1: -150, x2: 150, y1: -190, y2: 190 },
    basicState: { x1: -150, x2: 150, y1: -190, y2: 190 },
    scrollToItem: { x1: -150, x2: 150, y1: -190, y2: 190 }
  };

  const currentCoords = rectangleCoordsByState[state] || rectangleCoordsByState.hidden;

  // Highlight the active item
  const getItemStyle = (index) => {
    if (state === "scrollToItem" && index === activeItem) {
      return {
        opacity: 1,
        scale: 1.05,
        filter: "brightness(1.2)"
      };
    }
    return {
      opacity: 1,
      scale: 1,
      filter: "brightness(1)"
    };
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
        <rect 
          x={currentCoords.x1 + 10} 
          y={currentCoords.y1 + 10} 
          width={currentCoords.x2 - currentCoords.x1 - 20} 
          height={currentCoords.y2 - currentCoords.y1 - 20}
          rx={15}
        />
      </clipPath>
      
      {/* Scrollable content */}
      <motion.g clipPath="url(#catalogClip)">
        <AnimatePresence mode="popLayout" initial={true}>
          {items.slice(startIndex, endIndex).map((item, index) => {
            const actualIndex = startIndex + index;
            const currY = (index - centerPosition) * 50; // relative to visible center
            const isHighLighted = actualIndex === activeItem;
            const state = isHighLighted || (actualIndex >= activeItem - 3 && actualIndex <= activeItem + 3)
              ? "populated"
              : "hidden";

            return (
              <motion.g
                key={`item-container-${actualIndex}`}
                initial={{ opacity: 0, y: currY + 100, scale: 0.95 }}
                animate={{
                  opacity: isHighLighted ? 1 : 0.6,
                  y: currY,
                  filter: isHighLighted ? "brightness(1.2)" : "brightness(1)",
                  scale: isHighLighted ? 1.05 : 1,
                  x: isHighLighted ? -2 : 0
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95,
                  y: currY - 15, // Move upwards by 15 pixels
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{
                  x: { duration: 0.4, ease: "easeOut" },
                  y: { duration: 0.5, ease: "backOut" },  // Using backOut for a more pronounced slide effect
                  opacity: { duration: 0.5, ease: "easeOut" },
                  filter: { duration: 0.4, ease: "easeOut" },
                  scale: { duration: 0.5, ease: "easeOut" },
                  default: { duration: 0.5, ease: "easeOut" }
                }}
              >
                <Item
                  key={`item-${actualIndex}`}
                  state={state}
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


      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6.85" floodColor="black" floodOpacity="0.1" />
        </filter>
      </defs>
    </motion.g>
  );
};


// const SheetMetalIcon = () => (
//   <g transform="translate(-24, -24)">
//     <path fill="#9fa8da" d="M7.5,35.551l0.028-0.045C7.519,35.355,7.5,35.551,7.5,35.551z"></path>
//     <path fill="#9fa8da" d="M42.5,15.551h-16l-0.006,0.01c-0.063-2.992-3.36-5.112-7.494-5.112c-4.175,0-7.5,2.161-7.5,5.2l0.028,23.858 c0.29,4.811,5.049,6.045,7.472,6.045h23.5c1.105,0,2-0.895,2-2v-26C44.5,16.447,43.605,15.551,42.5,15.551z"></path>
//     <g>
//       <path fill="none" stroke="#18193f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7.5,20.304v15.247"></path>
//       <path fill="none" stroke="#18193f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M31.304,11.551H38.5c1.105,0,2,0.895,2,2v26c0,1.105-0.895,2-2,2H15c-2.499,0-7.5-1.3-7.5-6.501 c0-3.039,3.751-5.2,7.5-5.2c1.61,0,4.209,0.338,5.886,1.75c0.637,0.536,1.614,0.047,1.614-0.786V11.649 c0.002-3.039-3.325-5.2-7.5-5.2s-7.5,2.161-7.5,5.2v1.482"></path>
//     </g>
//   </g>
// );

const Screw = () => (
  <g transform="translate(-24, -24) scale(0.9)">
    <path fill="#636363" stroke="#636363" d="M 32.595703 1 A 1.50015 1.50015 0 0 0 31.556641 1.4394531 L 29.041016 3.9550781 C 27.431441 5.5646528 27.288465 8.378312 29.095703 10.185547 L 29.386719 10.476562 C 29.12446 11.021837 28.674061 11.770741 27.707031 12.738281 C 26.964165 13.481148 4.2753906 36.175781 4.2753906 36.175781 A 1.50015 1.50015 0 0 0 3.9179688 36.75 L 1.0820312 45.013672 A 1.50015 1.50015 0 0 0 2.9863281 46.917969 L 11.248047 44.083984 A 1.50015 1.50015 0 0 0 11.822266 43.726562 C 11.822266 43.726562 34.363275 21.181647 35.248047 20.296875 C 36.09103 19.45432 36.880914 18.999073 37.439453 18.751953 C 37.557638 18.699663 37.514713 18.729203 37.603516 18.695312 L 37.923828 19.015625 C 38.852194 19.943991 40.088483 20.352915 41.201172 20.273438 C 42.31386 20.193957 43.303581 19.699123 44.042969 18.958984 L 46.560547 16.441406 A 1.50015 1.50015 0 0 0 46.560547 14.320312 L 33.677734 1.4394531 A 1.50015 1.50015 0 0 0 32.595703 1 z M 32.617188 4.6210938 L 43.378906 15.380859 C 42.845286 15.914197 42.492723 16.267042 41.921875 16.837891 A 1.50015 1.50015 0 0 0 41.919922 16.837891 C 41.67431 17.083752 41.307093 17.258478 40.988281 17.28125 C 40.66947 17.30402 40.399556 17.24721 40.044922 16.892578 C 38.762249 15.609854 32.453083 9.298786 31.216797 8.0625 C 30.552032 7.3977347 30.715684 6.5225972 31.162109 6.0761719 L 32.617188 4.6210938 z M 31.488281 12.609375 L 35.4375 16.558594 C 34.712682 16.957132 33.966783 17.334425 33.126953 18.173828 C 32.640844 18.659937 26.507505 24.795825 20.289062 31.015625 L 18.695312 25.996094 C 24.170088 20.519897 29.477881 15.209619 29.828125 14.859375 C 30.63918 14.047891 31.064008 13.31232 31.488281 12.609375 z M 16.306641 28.384766 L 17.900391 33.404297 C 17.123228 34.181631 16.823531 34.48296 16.144531 35.162109 L 14.548828 30.142578 C 15.327935 29.363267 15.465816 29.22581 16.306641 28.384766 z M 12.160156 32.53125 L 13.753906 37.550781 C 13.230452 38.074351 12.166883 39.139691 11.861328 39.445312 L 10.267578 34.425781 C 10.77496 33.918266 11.476301 33.215285 12.160156 32.53125 z M 7.8789062 36.814453 L 9.3847656 41.554688 L 4.9121094 43.087891 L 6.6425781 38.050781 C 6.6674651 38.025891 7.7368558 36.956541 7.8789062 36.814453 z"></path>
  </g>
);


const SheetMetalIcon = () => (
  <g transform="translate(-24, -24) scale(1.3)">
    <path fill="#636363" stroke="#636363" d="M 10.613281 4 C 9.164063 4 7.828125 4.351563 6.792969 5.039063 C 5.757813 5.726563 5 6.828125 5 8.109375 L 5 22.109375 C 5 23.996094 6.03125 25.359375 7.210938 26.078125 C 8.394531 26.792969 9.675781 27 10.613281 27 L 27 27 L 27 7.109375 L 15.941406 7.109375 C 15.660156 6.28125 15.179688 5.53125 14.4375 5.039063 C 13.402344 4.351563 12.066406 4 10.613281 4 Z M 10.613281 6 C 11.730469 6 12.707031 6.292969 13.332031 6.707031 C 13.960938 7.121094 14.230469 7.578125 14.230469 8.109375 L 14.230469 18.933594 C 14.109375 18.863281 14.023438 18.726563 13.902344 18.667969 C 12.734375 18.117188 11.488281 18 10.613281 18 C 9.3125 18 8.039063 18.351563 7 18.988281 L 7 8.109375 C 7 7.578125 7.269531 7.121094 7.898438 6.707031 C 8.523438 6.292969 9.5 6 10.613281 6 Z M 16.230469 9.109375 L 25 9.109375 L 25 25 L 10.613281 25 C 10.015625 25 8.992188 24.816406 8.25 24.367188 C 7.507813 23.917969 7 23.335938 7 22.109375 C 7 21.625 7.304688 21.144531 7.976563 20.71875 C 8.652344 20.289063 9.648438 20 10.613281 20 C 11.277344 20 12.308594 20.128906 13.046875 20.476563 C 13.78125 20.824219 14.207031 21.207031 14.230469 22.140625 L 16.230469 22.109375 Z"></path>
  </g>
);

const PipesIcon = () => (
  <g transform="translate(-24, -24">
    <path fill="#FFE082" d="M46.792,40.36h-0.34v-5.888c0-13.241-10.772-24.012-24.012-24.012h-6.63v-0.357	C15.809,9.493,15.316,9,14.707,9h-4.605C9.493,9,9,9.493,9,10.102v8.496c0,0.609,0.493,1.102,1.102,1.102h4.605	c0.609,0,1.102-0.493,1.102-1.102v-0.357h6.63c8.95,0,16.23,7.281,16.23,16.23v5.888h-0.34c-0.584,0-1.058,0.474-1.058,1.058v4.232	c0,0.584,0.474,1.058,1.058,1.058h8.463c0.584,0,1.058-0.474,1.058-1.058v-4.232C47.85,40.833,47.376,40.36,46.792,40.36z"></path>
    <path fill="#FFE082" d="M30.837,40.129h-0.923v-2.908c0-6.174-5.023-11.197-11.197-11.197h-3.07v-0.711	c0-0.597-0.484-1.081-1.081-1.081h-4.323c-0.597,0-1.081,0.484-1.081,1.081v7.566c0,0.597,0.484,1.081,1.081,1.081h4.323	c0.597,0,1.081-0.484,1.081-1.081V31.86h3.07c2.956,0,5.361,2.405,5.361,5.361v2.908h-0.753c-0.612,0-1.108,0.496-1.108,1.108v4.594	c0,0.612,0.496,1.108,1.108,1.108h7.513c0.612,0,1.108-0.496,1.108-1.108v-4.594C31.945,40.624,31.449,40.129,30.837,40.129z"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M10.5,15.5h-4c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1v8	C11.5,15.052,11.052,15.5,10.5,15.5z"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M34.5,42.5v-4c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1v4c0,0.552-0.448,1-1,1h-8	C34.948,43.5,34.5,43.052,34.5,42.5z"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M27.5,8.077C24.797,7.058,21.87,6.5,18.815,6.5H11.5v8h7.315c5.896,0,11.088,3.074,14.056,7.704"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M35.414,29.481c0.057,0.56,0.086,1.128,0.086,1.703V37.5h8v-6.315c0-8.262-4.08-15.589-10.331-20.072"></path>
    <line x1="20" x2="20" y1="5" y2="16" fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
    <line x1="45" x2="34" y1="29.5" y2="29.5" fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></line>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M20.5,37.092v-3.082c0-2.605-1.817-4.794-4.25-5.365"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M11.761,22.5h3.228c6.347,0,11.511,5.164,11.511,11.511v3.277"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M10.5,30.5h-4c-0.552,0-1-0.448-1-1v-7c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1v7	C11.5,30.052,11.052,30.5,10.5,30.5z"></path>
    <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M18.5,42.5v-4c0-0.552,0.448-1,1-1h7c0.552,0,1,0.448,1,1v4c0,0.552-0.448,1-1,1h-7	C18.948,43.5,18.5,43.052,18.5,42.5z"></path>
  </g>
);


//   <g>
//     {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48"> */}
//       <path fill="#9fa8da" d="M7.5,35.551l0.028-0.045C7.519,35.355,7.5,35.551,7.5,35.551z"></path>
//       <path fill="#9fa8da" d="M42.5,15.551h-16l-0.006,0.01c-0.063-2.992-3.36-5.112-7.494-5.112c-4.175,0-7.5,2.161-7.5,5.2l0.028,23.858 c0.29,4.811,5.049,6.045,7.472,6.045h23.5c1.105,0,2-0.895,2-2v-26C44.5,16.447,43.605,15.551,42.5,15.551z"></path>
//       <g>
//         <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M7.5,20.304v15.247"></path>
//         <path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M31.304,11.551H38.5c1.105,0,2,0.895,2,2v26c0,1.105-0.895,2-2,2H15c-2.499,0-7.5-1.3-7.5-6.501 c0-3.039,3.751-5.2,7.5-5.2c1.61,0,4.209,0.338,5.886,1.75c0.637,0.536,1.614,0.047,1.614-0.786V11.649 c0.002-3.039-3.325-5.2-7.5-5.2s-7.5,2.161-7.5,5.2v1.482"></path>
//       </g>
//     {/* </svg> */}
//   </g>
// );