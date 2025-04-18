import { motion } from 'framer-motion';

export const Logo = ({
  state,
  icon,
  isVisible = true
}: {
  state: "hidden" | "excel" | "phone" | "email" | "pdf";
  icon?: React.ReactNode | ((scale: number, iconX: number, iconY: number) => React.ReactNode);
  isVisible?: boolean;
}) => {
  // Rectangle dimensions for the background - centered at 0,0
  const rectangleCoordsByState = {
    hidden: { width: 130, height: 130, x: -65, y: -65 },
    excel: { width: 130, height: 130, x: -65, y: -65 },
    phone: { width: 130, height: 130, x: -65, y: -65 },
    email: { width: 130, height: 130, x: -65, y: -65 },
    pdf: { width: 130, height: 130, x: -65, y: -65 },
  };

  const currentCoords = rectangleCoordsByState[state] || rectangleCoordsByState.hidden;
  
  // Position for the logo container - these control where each logo appears on the screen
  const logoVariants = {
    hidden: { opacity: 0, x: 100, y: 130 },
    excel: { opacity: isVisible ? 1 : 0, x: 235, y: 180, transition: { duration: 0.6, ease: "easeOut" } },
    phone: { opacity: isVisible ? 1 : 0, x: 470, y: 500, transition: { duration: 0.6, ease: "easeOut" } },
    email: { opacity: isVisible ? 1 : 0, x: 185, y: 420, transition: { duration: 0.6, ease: "easeOut" } },
    pdf: { opacity: isVisible ? 1 : 0, x: 430, y: 250, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Render the icon
  const renderIcon = () => {
    if (!icon) return null;

    // Return the icon as is if it's an element
    let iconElement = typeof icon === 'function' ? icon() : icon;

    return (
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? (state === "email" ? 0.9 : 1) : 0, // Use the scale that's already in the icon components
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }}
        style={{ transformOrigin: 'center center' }}
      >
        {iconElement}
      </motion.g>
    );
  };

  return (
    <motion.g
      initial="hidden"
      animate={state}
      variants={logoVariants}
    >
      <motion.rect
        initial={{
          width: currentCoords.width,
          height: currentCoords.height,
          x: currentCoords.x,
          y: currentCoords.y
        }}
        animate={{
          width: currentCoords.width,
          height: currentCoords.height,
          x: currentCoords.x,
          y: currentCoords.y,
          opacity: isVisible ? 1 : 0
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

      {/* Render the icon */}
      {renderIcon()}

      {/* Center indicator - small red dot at exact center (for debugging) */}
      {false && (
        <motion.circle
          cx={0}
          cy={0}
          r={3}
          fill="red"
        />
      )}

      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6.85" floodColor="black" floodOpacity="0.1" />
        </filter>
      </defs>
    </motion.g>
  );
};
