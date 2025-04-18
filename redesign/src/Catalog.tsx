// @ts-nocheck
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Item from './Item';

export const Catalog = ({
  state,
}: {
  state: "hidden" | "basicState";
}) => {

  const endeavorVariants = {
    hidden: { opacity: 0, x: 480, y: 400, },
    basicState: { opacity: 1, x: 480, y: 400, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const rectangleCoordsByState = {
    hidden: { x1: -150, x2: 150, y1: -190, y2: 190 },
    basicState: { x1: -150, x2: 150, y1: -190, y2: 190 }
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
          width: { duration: 0.6, ease: "easeInOut" },
          x: { duration: 0.6, ease: "easeInOut" },
          height: { duration: 0.6, ease: "easeInOut" },
        }}

        rx={20}
        fill="white"
        filter="url(#softShadow)"
      />

       
    <Item 
        state={"populated"}
        x={0}
        y={-150}
        text='1 1/2" x 3/4" x 1" Stainless...'
        icon={SheetMetalIcon}
        textX={-75}
        iconX={-105}
        iconY={0}
        iconScale={0.75}
        scale={1}
    /> 
    <Item 
        state={"populated"}
        x={0}
        y={-100}
        text='1 1/2" x 3/4" x 0.75" Stainl...'
        icon={SheetMetalIcon}
        textX={-75}
        iconX={-105}
        iconY={0}
        iconScale={0.75}
        scale={1}
    /> 
    <Item 
        state={"populated"}
        x={0}
        y={-50}
        text='2" x 1" x 0.125" Stainless S...'
        icon={SheetMetalIcon}
        textX={-75}
        iconX={-105}
        iconY={0}
        iconScale={0.75}
        scale={1}
    />
    <Item 
        state={"populated"}
        x={0}
        y={0}
        text='3" x 1 1/2" x 0.188" Stainle...'
        icon={SheetMetalIcon}
        textX={-75}
        iconX={-105}
        iconY={0}
        iconScale={0.75}
        scale={1}
    />
    <Item 
        state={"populated"}
        x={0}
        y={50}
        text='3" x 1 1/2" x 0.188" Stainle...'
        icon={PipesIcon}
        textX={-75}
        iconX={-105}
        iconY={0}
        iconScale={0.75}
        scale={1}
    />
    <Item 
        state={"populated"}
        x={0}
        y={100}
        text='79.5" x 60" Clear 3/4" (12m...'
        icon={PipesIcon}
        textX={-75}
        iconX={-105}
        iconY={0}
        iconScale={0.75}
        scale={1}
    />
    <Item 
        state={"populated"}
        x={0}
        y={150}
        text='39.75" x 60" Clear 3/4" (12m...'
        icon={PipesIcon}
        textX={-75}
        iconX={-105}
        iconY={0}
        iconScale={0.75}
        scale={1}
    />

      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6.85" floodColor="black" floodOpacity="0.1" />
        </filter>
      </defs>
    </motion.g>
  );
};


const MyCustomIcon = () => (
  <g>
    <circle cx={0} cy={0} r={27} fill="#E3E3E3" />
  </g>
);

const SheetMetalIcon = () => (
  <g transform="translate(-24, -24)">
    <path fill="#9fa8da" d="M7.5,35.551l0.028-0.045C7.519,35.355,7.5,35.551,7.5,35.551z"></path>
    <path fill="#9fa8da" d="M42.5,15.551h-16l-0.006,0.01c-0.063-2.992-3.36-5.112-7.494-5.112c-4.175,0-7.5,2.161-7.5,5.2l0.028,23.858 c0.29,4.811,5.049,6.045,7.472,6.045h23.5c1.105,0,2-0.895,2-2v-26C44.5,16.447,43.605,15.551,42.5,15.551z"></path>
    <g>
      <path fill="none" stroke="#18193f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7.5,20.304v15.247"></path>
      <path fill="none" stroke="#18193f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M31.304,11.551H38.5c1.105,0,2,0.895,2,2v26c0,1.105-0.895,2-2,2H15c-2.499,0-7.5-1.3-7.5-6.501 c0-3.039,3.751-5.2,7.5-5.2c1.61,0,4.209,0.338,5.886,1.75c0.637,0.536,1.614,0.047,1.614-0.786V11.649 c0.002-3.039-3.325-5.2-7.5-5.2s-7.5,2.161-7.5,5.2v1.482"></path>
    </g>
  </g>
);

const PipesIcon = () => (
  <g transform="translate(-24, -24)">
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