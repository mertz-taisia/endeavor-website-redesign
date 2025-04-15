import { delay, motion } from 'framer-motion';

export default function ItemContainer({
  state = 'blank',
  text = '',
  icon = 'triangle',
  item = 'itemOne', // Accepts "itemOne", "itemTwo", or "itemThree"
}) {
  const positions = {
    itemOne: { x: -150, y: -10 },
    itemTwo: { x: -150, y: 60},
    itemThree: { x: -150, y: 130},
  };

  const containerVariants = {
    itemOneBlank: { x: positions.itemOne.x, y: positions.itemOne.y, opacity: 1 },
    itemOne: { x: positions.itemOne.x, y: positions.itemOne.y, opacity: 1 },
    itemTwoBlank: { x: positions.itemTwo.x, y: positions.itemTwo.y, opacity: 1 },
    itemTwo: { x: positions.itemTwo.x, y: positions.itemTwo.y, opacity: 1 },
    itemThreeBlank: { x: positions.itemThree.x, y: positions.itemThree.y, opacity: 1 },
    itemThree: { x: positions.itemThree.x, y: positions.itemThree.y, opacity: 1 },
  };

  if (state === 'hidden') return null;

  const variantKey = `${item}${state === 'blank' ? 'Blank' : ''}`;
  
  const iconXByState = -30;
  const iconYByState = 15;

  const renderIcon = () => {
    if (state === 'hidden') return null;
    if (state === 'blank') {
      return (
        <motion.circle
          initial={{ opacity: 0, x: iconXByState, y: iconYByState }}
          animate={{ opacity: 1, x: iconXByState, y: iconYByState }}
          transition={{ opacity: { duration: 0.4, delay: 0.5 } }}
          cx={0}
          cy={0}
          r={27}
          fill="#EFEFEF"
        />
      );
    }
    return null;
  };

  const textXByState = 15;
  const textYByState = 2;

  const renderTextArea = () => {
    if (state === 'hidden') return null;
  
    if (state === 'blank')
    return (
      <motion.rect 
      initial={{ opacity: 0, x: textXByState, y: textYByState }}
      animate={{ opacity: 1, x: textXByState, y: textYByState }}
      transition={{ opacity: { duration: 0.4, delay: 0.5 } }}
      width={340} height={25} rx={2} 
      fill="#EFEFEF" />
    );
    else
    return (
        <motion.text
          initial={{ opacity: 0, x: textXByState, y: textYByState }}
          animate={{ 
            opacity: 1, 
            x: textXByState, 
            y: textYByState 
          }}
          transition={{ x: { duration: 0.5, ease: "easeInOut" }, y: { duration: 0.4, ease: "easeInOut" }, opacity: { duration: 0.4, delay: 0.5 } }}
          fill="black"
          fontSize="30"
          fontWeight="bold"
          alignmentBaseline="middle"
          
          >
          ITEM TEXT
        </motion.text>
        )
  };

//   const renderCheckmark = () => {
//     if (state === 'hidden') return null;
//     if (state === 'item') {
//       return (
//         <path
//           d="M5 15L10 20L20 5"
//           stroke="green"
//           strokeWidth="2"
//         />
//       );
//     }
//     return null;
//   };

  return (
    <motion.g variants={containerVariants} animate={variantKey} initial={false} transition={{ opacity: { duration: 0.4 } }}>
      {renderIcon()}
      {renderTextArea()}
      {/* {renderCheckmark()} */}
    </motion.g>
  );
}
