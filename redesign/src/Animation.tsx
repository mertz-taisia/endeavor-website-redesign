import React from 'react';
import { motion } from 'framer-motion';
import {EndeavorContainer} from './EndeavorContainer';

const Animation = ({
  activeIndex
}: {
  activeIndex: number | null;
}) => {
  const visibility = {
    0: {
      excelLogo: { state: "hidden"},
      phoneLogo: { state: "hidden"},
      emailLogo: { state: "hidden"},
      pdfLogo: { state: "hidden"},
    },
    1: {
      excelLogo: { state: "visible"},
      phoneLogo: { state: "visible"},
      emailLogo: { state: "visible"},
      pdfLogo: { state: "visible"},
    },
    2: {
      excelLogo: { state: "visible"},
      phoneLogo: { state: "visible"},
      emailLogo: { state: "visible"},
      pdfLogo: { state: "visible"},
      excelLine: { state: "visible"},
      phoneLine: { state: "visible"},
      emailLine: { state: "visible"},
      pdfLine: { state: "visible"},
      endeavorLogo: { state: "startState"},
    },
    3: {
      excelLogo: { state: "visible"},
      phoneLogo: { state: "visible"},
      emailLogo: { state: "visible"},
      pdfLogo: { state: "visible"},
      excelLine: { state: "visible"},
      phoneLine: { state: "visible"},
      emailLine: { state: "visible"},
      pdfLine: { state: "visible"},
      endeavorLogo: { state: "startState"},
    },
    4: {
      endeavorLogo: { state: "pulsatingState"},
    },
    5: {
      endeavorLogo: { state: "pulsatingState"},
    },
    6: {
      endeavorLogo: { state: "pulsatingState"},
    },
    7: {
      endeavorLogo: { state: "pulsatingState"},
    },
    8: {
      endeavorLogo: { state: "pulsatingState"},
    },
    9: {
      endeavorLogo: { state: "pulsatingState"},
    },
  };
  
  const currentVisibility = activeIndex !== null ? visibility[activeIndex] ?? {} : {};
  
  const getState = (id: string) => currentVisibility[id]?.state;
  // const getProps = (id: string) => currentVisibility[id]?.props ?? {};

  
  
  // Line animation variants
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 0.6, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  // Logo animation variants
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    oscillate: (custom: number) => ({
      y: [0, -10, 0],
      transition: {
        y: {
          delay: 0.6,
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }
      }
    }),
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    }
  };

  // Endeavor logo animation variants
  const endeavorVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 734 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 200,
      transition: {
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        y: { duration: 1.2, ease: "easeOut" }
      }
    }
  };

  return (
    <svg viewBox="0 0 639 886" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Email Line */}
      <motion.path
        id="emailLine"
        d="M94 435V501H271V734"
        stroke="#DFDFDF"
        strokeWidth="2.5"
        initial="hidden"
        animate={getState("emailLine")}
        variants={lineVariants}
      />

      {/* Phone Line */}
      <motion.path
        id="phoneLine"
        d="M537 549V594H357V734"
        stroke="#DFDFDF"
        strokeWidth="2.5"
        initial="hidden"
        animate={getState("phoneLine")}
        variants={lineVariants}
      />

      {/* Excel Line */}
      <motion.path
        id="excelLine"
        d="M188 180V233.672H301V734"
        stroke="#DFDFDF"
        strokeWidth="2.5"
        initial="hidden"
        animate={getState("excelLine")}
        variants={lineVariants}
      />

      {/* PDF Line */}
      <motion.path
        id="pdfLine"
        d="M452 278V324.228H329V734"
        stroke="#DFDFDF"
        strokeWidth="2.5"
        initial="hidden"
        animate={getState("pdfLine")}
        variants={lineVariants}
      />

      {/* Excel Logo */}
      <motion.g
        id="excelLogo"
        initial="hidden"
        animate={getState("excelLogo")}
        variants={logoVariants}
        custom={0}
      >
        <g filter="url(#filter0_d_0_1)">
          <rect x="100" y="10" width="172" height="170" rx="20" fill="white" />
        </g>
        <path d="M163.113 63C163.113 59.134 166.247 56 170.113 56H221.817C225.683 56 228.817 59.134 228.817 63V75.7781H163.113V63Z" fill="#33C481" />
        <path d="M163.113 63C163.113 59.134 166.247 56 170.113 56H195.965V75.6664H163.113V63Z" fill="#20A264" />
        <rect x="163.113" y="75.6665" width="65.7036" height="19.6664" fill="#20A264" />
        <rect x="163.113" y="95.333" width="65.7036" height="19.7781" fill="#107C42" />
        <path d="M163.113 114.999H228.817V127.777C228.817 131.643 225.683 134.777 221.817 134.777H170.113C166.247 134.777 163.113 131.643 163.113 127.777V114.999Z" fill="#175B36" />
        <rect x="163.113" y="75.6665" width="32.8518" height="19.6664" fill="#0D7A40" />
        <rect x="163.113" y="95.333" width="32.8518" height="19.6664" fill="#175B36" />
        <rect x="143.5" y="70" width={45.1433} height={43.8024} rx={7} fill="#0F7C42" />
        <path d="M176.523 104.943H170.712L166.019 95.7799L160.879 104.943H155.068L162.667 93.0981L155.739 81.4771H161.549L166.019 89.9694L170.936 81.4771H176.523L168.924 93.0981L176.523 104.943Z" fill="white" />
      </motion.g>

      {/* PDF Logo */}
      <motion.g
        id="pdfLogo"
        initial="hidden"
        animate={getState("pdfLogo")}
        variants={logoVariants}
        custom={1}
      >
        <g filter="url(#filter1_d_0_1)">
          <rect x="365" y="109" width="172" height="170" rx="20" fill="white" />
        </g>
        <path d="M431.466 237.695H474.804C483.068 237.695 489.775 231.011 489.804 222.747L490.001 166.148H477.872C474.006 166.148 470.872 163.014 470.872 159.148V150H431.466C423.182 150 416.466 156.716 416.466 165V222.695C416.466 230.979 423.182 237.695 431.466 237.695Z" fill="#EAEAE4" />
        <path d="M470.871 150L490 166.148H470.871V150Z" fill="#D9D9D9" />
        <rect x="411" y="195.711" width="60.1196" height="33.2893" rx="10" fill="#F24646" />
        <path d="M453.567 204.157V220.63H457.228V214.224H465.007V211.021H457.228V207.36H466.151V204.157H453.567Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M433.435 220.63V204.157H442.357C445.388 204.698 449.215 206.674 449.45 211.936C449.714 217.884 444.874 220.172 442.357 220.63H433.435ZM436.637 217.394V206.903C437.107 206.924 437.533 206.939 437.933 206.952C439.363 207.001 440.468 207.039 442.133 207.359C444.72 208.319 445.695 209.231 445.786 212.148C445.877 215.065 443.808 216.481 442.133 217.166C440.049 217.463 438.828 217.453 436.637 217.394Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M416.962 220.63V204.157H425.885C428.916 204.698 430.505 206.862 430.534 209.877C430.642 212.299 428.401 214.681 425.885 215.139H420.622V220.63H416.962ZM420.622 211.707V207.36H425.427C426.616 207.818 427.257 208.275 427.257 209.648C427.257 210.982 426.746 211.185 425.534 211.665C425.499 211.679 425.463 211.693 425.427 211.707H420.622Z" fill="white" />
      </motion.g>

      {/* Phone Logo */}
      <motion.g
        id="phoneLogo"
        initial="hidden"
        animate={getState("phoneLogo")}
        variants={logoVariants}
        custom={2}
      >
        <g filter="url(#filter2_d_0_1)">
          <rect x="453" y="380" width="172" height="170" rx="20" fill="white" />
        </g>
        <path d="M492.137 492.013C492.137 492.013 491.829 438.589 492.137 437.339C492.444 436.09 493.996 431.497 498.068 426.717C501.661 422.499 508.69 420 511.034 420L561.021 420C565.701 420.747 570.798 422.122 575.392 426.873C578.716 431.29 580.533 433.56 581.485 439.214V490.607C580.733 495.434 579.279 499.318 575.549 503.417C571.499 506.778 568.752 507.963 563.677 509.821H511.034C505.5 509.145 502.714 507.357 497.912 503.417C494.21 499.28 492.949 496.777 492.137 492.013Z" fill="url(#paint0_linear_0_1)" />
        <path d="M519.169 437.566C522.013 441.89 523.758 444.541 526.835 449.212C527.232 450.571 527.245 451.379 525.898 453.118L523.243 457.023C522.79 458.51 522.829 459.333 523.711 460.772C529.159 468.096 532.532 471.934 540.27 477.33C542.037 478.191 543.032 478.24 544.8 477.33L548.236 475.143C549.837 474.35 550.65 474.276 551.985 474.675L564.326 482.642C564.987 483.647 565.217 484.32 565.107 485.922C563.941 488.917 562.705 490.538 558.859 493.264C556.303 493.622 554.84 493.735 551.985 493.264C541.716 489.961 536.625 486.259 527.929 478.58C512.97 464.023 509.978 457.179 507.934 445.776C507.92 442.63 508.471 441.483 509.965 439.996C511.73 438.599 512.681 437.938 514.339 436.872C516.055 436.035 517.004 436.04 518.712 436.872L519.169 437.566Z" fill="white" />
      </motion.g>

      {/* Email Logo */}
      <motion.g
        id="emailLogo"
        initial="hidden"
        animate={getState("emailLogo")}
        variants={logoVariants}
        custom={3}
      >
        <g filter="url(#filter3_d_0_1)">
          <rect x="14" y="266" width="172" height="170" rx="20" fill="white" />
        </g>
        <path d="M55.1361 393H71.7869V349.223L48 329.91V385.275C48 389.549 51.1993 393 55.1361 393Z" fill="#4285F4" />
        <path d="M128.875 393H145.526C149.474 393 152.662 389.536 152.662 385.275V329.91L128.875 349.223" fill="#34A853" />
        <path d="M128.875 315.747V349.223L152.662 329.91V319.61C152.662 310.056 142.588 304.61 135.535 310.339" fill="#FBBC04" />
        <path d="M71.7871 349.223V315.747L100.331 338.923L128.876 315.747V349.223L100.331 372.399" fill="#EA4335" />
        <path d="M48 319.61V329.91L71.7869 349.223V315.747L65.1266 310.339C58.0619 304.61 48 310.056 48 319.61Z" fill="#C5221F" />
      </motion.g>

      {/* Endeavor Logo */}
      <EndeavorContainer
        state={getState("endeavorLogo")}
      />
      
      <defs>
        <filter id="filter0_d_0_1" x="86.3" y="0.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <filter id="filter1_d_0_1" x="351.3" y="99.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <filter id="filter2_d_0_1" x="439.3" y="370.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <filter id="filter3_d_0_1" x="0.3" y="256.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <filter id="filter4_d_0_1" x="214.3" y="688.3" width="199.4" height="197.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6.85" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_0_1" x1="536.742" y1="420" x2="536.742" y2="509.821" gradientUnits="userSpaceOnUse">
          <stop stopColor="#59F473" />
          <stop offset="1" stopColor="#03B722" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Animation;