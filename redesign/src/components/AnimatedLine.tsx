// @ts-nocheck
import { motion } from 'framer-motion';

export const AnimatedLine = ({
  id,
  d,
  visibility,
}: {
  id: string;
  d: string;
  visibility: boolean;
}) => {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 0.6, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      }
    }
  };

  return (
    <motion.path
      id={id}
      d={d}
      stroke="#DFDFDF"
      strokeWidth="2.5"
      initial="hidden"
      animate={visibility ? "visible" : "hidden"}
      variants={lineVariants}
    />
  );
};
