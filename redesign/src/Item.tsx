import { motion } from 'framer-motion';
import { JSX, useEffect } from 'react';

interface ItemProps {
    state?: string;
    // Position and size
    x: number;
    y: number;
    scale?: number;

    // Content props
    text?: string;
    icon?: React.ReactNode | (() => JSX.Element);

    // Styling props
    textColor?: string;
    fontSize?: number | string;
    fontWeight?: number | string;

    // Container props
    rectWidth?: number;
    rectHeight?: number;

    iconX?: number;
    iconY?: number;
    iconScale?: number;

    // Other props
    focus?: boolean;
    populated?: boolean;
    children?: React.ReactNode;
}

export default function Item({
    state = 'hidden',
    // Position and size
    x,
    y,
    scale,

    // Content props
    text,
    icon, // Can be a function that returns JSX

    // Styling props
    textColor,
    fontSize,
    fontWeight,

    // Container props
    rectWidth,
    rectHeight,

    iconX,
    iconY,
    iconScale,

    // Other props
    focus = false,
    populated = false,

    children = null
}: ItemProps) {
    useEffect(() => {
        console.log("ItemContainer state:", state);
    }, [state]);

    // You can define state-specific animations here
    const variants = {
        hidden: { opacity: 0, color: '#EFEFEF', x, y },             // nothing visible
        base: { opacity: 1, color: '#EFEFEF', x, y },      // default
        focused: { opacity: 1, color: '#E3E3E3', x, y },   // highlighted
        populated: { opacity: 1, x, y },   // highlighted
        // Add more states as needed
    };

    const color = variants[state].color;

    // Render the icon
    const renderIcon = () => {
        if (icon === null) return null;

        // If icon is a function, call it to get the JSX
        if (typeof icon === 'function') {
            return (
                <motion.g
                    initial={{ opacity: 0, scale, x: iconX, y: iconY }}
                    animate={{ opacity: 1, scale, x: iconX, y: iconY }}
                    transition={{
                        opacity: { duration: 0.6, ease: "easeInOut" },
                        scale: { duration: 0.6, ease: "easeInOut" },
                        x: { duration: 0.6, ease: "easeInOut" },
                        y: { duration: 0.6, ease: "easeInOut" }
                    }}
                    style={{ transformOrigin: 'center center' }}
                >
                    {icon()}
                </motion.g>
            );
        }

        // Default icon if string is provided (e.g., 'circle')
        if (icon === 'circle') {
            return (
                <motion.circle
                    initial={{ opacity: 0, scale, x: iconX, y: iconY, scaleX: iconScale, scaleY: iconScale }}
                    animate={{ opacity: 1, scale, x: iconX, y: iconY, scaleX: iconScale, scaleY: iconScale }}
                    transition={{
                        opacity: { duration: 0.6, ease: "easeInOut" },
                        scale: { duration: 0.6, ease: "easeInOut" },
                        x: { duration: 0.6, ease: "easeInOut" },
                        y: { duration: 0.6, ease: "easeInOut" },
                        scaleX: { duration: 0.6, ease: "easeInOut" },
                        scaleY: { duration: 0.6, ease: "easeInOut" }
                    }}
                    cx={iconX}
                    cy={iconY}
                    r={27}
                    fill={color}
                />
            );
        }

        // Return the icon as is if it's an element
        return (
            <motion.g
                initial={{ opacity: 0, scale }}
                animate={{ opacity: 1, scale }}
                transition={{
                    opacity: { duration: 0.6, ease: "easeInOut" },
                    scale: { duration: 0.6, ease: "easeInOut" }
                }}
                style={{ transformOrigin: 'center center' }}
            >
                {icon}
            </motion.g>
        );
    };

    // Render the text or rectangle
    const renderContent = () => {
        if (!text && populated) return null;

        if (!populated) {
            return (
                <motion.rect
                    fill={color}
                    initial={{
                        opacity: 0,
                        width: rectWidth,
                        height: rectHeight,
                        x: -rectWidth / 2,
                        y: -rectHeight / 2,
                    }}
                    animate={{
                        opacity: 1,
                        width: rectWidth,
                        height: rectHeight,
                        x: -rectWidth / 2,
                        y: -rectHeight / 2,
                    }}
                    transition={{
                        opacity: { duration: 0.6, ease: "easeInOut" },
                        width: { duration: 0.6, ease: "easeInOut" },
                        height: { duration: 0.6, ease: "easeInOut" },
                    }}
                />
            );
        }

        if (text) {
            return (
                <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ opacity: { duration: 0.6 } }}
                    fill={textColor}
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    {text}
                </motion.text>
            );
        }
    };

    // Get the animation variants based on state

    return (
        <motion.g
            initial={{ x, y, opacity: 0, scale }}
            animate={variants[state]}
        >
            {renderIcon()}
            {renderContent()}
            {children}

            {/* Debug marker - can be removed or made conditional */}
            {process.env.NODE_ENV === 'development' && (
                <motion.rect
                    initial={{ x: -5, y: -5, width: 10, height: 10 }}
                    animate={{ x: -5, y: -5, width: 10, height: 10 }}
                    fill="pink"
                    rx={10}
                />
            )}
        </motion.g>
    );
}