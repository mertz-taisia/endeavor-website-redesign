import { motion } from 'framer-motion';
import { useEffect } from 'react';

export const EndeavorContainer = ({
  state,
}: {
  state: "hidden" | "startState" | "basicState" | "basicShrunkState" | "processingState";
}) => {

  const containerVariants = {
    hidden: { opacity: 0, x: 310, y: 800 },
    startState: { opacity: 1, x: 310, y: 800, transition: { duration: 0.6, ease: "easeOut" } },
    basicState: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    basicShrunkState: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
    processingState: { opacity: 1, x: 310, y: 400, transition: { duration: 0.6, ease: "easeOut" } },
  };
  
  const rectangleHeightByState = {
    hidden: 170,
    startState: 170,
    basicState: 170,
    basicShrunkState: 130,
    processingState: 130,
  }[state] ?? 170;
  
  const rectangleWidthByState = {
    hidden: 173,
    startState: 173,
    basicState: 173,
    basicShrunkState: 140,
    processingState: 540,
  }[state] ?? 173;
  
  useEffect(() => {
    if (state) {
      console.log(state)
    }
  }, [state]);

  
  const logoX = {
    hidden: -317.5,
    startState: -317.5,
    basicState: -317.5,
    basicShrunkState: -317.5,
    processingState: -500,
  }[state] ?? -317.5;
  
  const logoY = -785; 
  
  const textX = {
    hidden: rectangleWidthByState / 2 - 325,
    startState: rectangleWidthByState / 2 - 325,
    basicState: rectangleWidthByState / 2 - 325,
    basicShrunkState: rectangleWidthByState / 2 - 380,
    processingState: rectangleWidthByState / 2 - 400,
  }[state] ?? rectangleWidthByState / 2 - 325;

  const textY = 0;

  const textByState = {
    hidden: "",
    startState: "",
    basicState: "",
    basicShrunkState: "",
    processingState: "Processing Order...",
  }[state] ?? "";

  const logoScaleByState = {
    hidden: 1,
    startState: 1,
    basicState: 1,
    basicShrunkState: 0.7,
    processingState: 0.7,
  }[state] ?? 1;
  
  return (
    <motion.g
      initial="hidden"
      animate={state}
      variants={containerVariants}
    >
      <motion.rect
        initial={{
          width: rectangleWidthByState,
          x: -rectangleWidthByState / 2,
        }}
        animate={{
          width: rectangleWidthByState,
          x: -rectangleWidthByState / 2,
        }}
        transition={{
          width: { duration: 0.5, ease: "easeInOut" },
          x: { duration: 0.5, ease: "easeInOut" }
        }}
        height={rectangleHeightByState}
        y={-rectangleHeightByState / 2}
        rx={20}
        fill="white"
        filter="url(#softShadow)"
      />

      {/* Endeavor Icon */}
      <motion.g
        animate={{ x: logoX, y: logoY, scale: logoScaleByState }}
        transition={{ x: { duration: 0.5, ease: "easeInOut" }, scale: { duration: 0.5, ease: "easeInOut" } }}
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

      {textByState && (
        <motion.text
          x={textX} // This puts the text near the right edge of the rectangle
          y={textY} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ x: { duration: 0.5, ease: "easeInOut" }, opacity: { duration: 0.4, delay: 0.3 } }}
          fill="black"
          fontSize="40"
          fontWeight="bold"
          alignmentBaseline="middle"
          >
          {textByState}
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
