// @ts-nocheck
import { motion, AnimatePresence } from 'framer-motion';
import { JSX, useEffect, useState } from 'react';

interface ItemProps {
    state?: string;
    // Position and size
    x: number;
    y: number;
    rx?: number;
    ry?: number;
    scale?: number;

    // Content props
    text?: string;
    icon?: React.ReactNode | ((scale: number, iconX: number, iconY: number) => React.ReactNode);
  

    // Styling props
    textColor?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
    textX?: number;

    // Container props
    rectWidth?: number;
    rectHeight?: number;

    iconX?: number;
    iconY?: number;
    iconScale?: number;

    // Other props
    focus?: boolean;
    children?: React.ReactNode;
    
    // Delay prop for state changes (in seconds)
    stateChangeDelay?: number;
}


export default function Item({
    state = 'hidden',
    // Position and size
    x,
    y,
    rx,
    ry,
    scale = 1,

    // Content props
    text,
    icon, // Can be a function that returns JSX

    // Styling props
    fontSize,
    fontWeight,
    textX,

    // Container props
    rectWidth,
    rectHeight,

    iconX,
    iconY,
    iconScale,

    // Other props
    focus = false,
    stateChangeDelay = 0,

    children = null
}: ItemProps) {
    // Track the actual state to display with delay
    const [displayState, setDisplayState] = useState(state);
    // Track delayed icon properties
    const [delayedIconX, setDelayedIconX] = useState(iconX);
    const [delayedIconY, setDelayedIconY] = useState(iconY);
    const [delayedIconScale, setDelayedIconScale] = useState(iconScale);
    const [delayedTextX, setDelayedTextX] = useState(textX);

    useEffect(() => {
        console.log("ItemContainer state:", state);
        
        // If there's a delay, set a timeout to change the display state and icon properties
        if (stateChangeDelay > 0) {
            const timer = setTimeout(() => {
                setDisplayState(state);
                setDelayedIconX(iconX);
                setDelayedIconY(iconY);
                setDelayedIconScale(iconScale);
                setDelayedTextX(textX);
            }, stateChangeDelay * 1000); // Convert to milliseconds
            
            return () => clearTimeout(timer);
        } else {
            // No delay, update immediately
            setDisplayState(state);
            setDelayedIconX(iconX);
            setDelayedIconY(iconY);
            setDelayedIconScale(iconScale);
            setDelayedTextX(textX);
        }
    }, [state, stateChangeDelay, iconX, iconY, iconScale, textX]);

    // Define state-specific animations including exit animations
    const variants = {
        hidden: { opacity: 0, color: '#EFEFEF', x, y },  // nothing visible
        base: { opacity: 1, color: '#EFEFEF', x, y },                // default
        focused: { opacity: 1, color: '#E3E3E3', x, y },             // highlighted
        populated: { opacity: 1, x, y },                             // highlighted
        exit: { opacity: 0, scale: 0.8 },                 // exit animation
        // Add more states as needed
    };

    // Use displayState instead of state for the color and animations
    const color = variants[displayState]?.color;

    // Render the icon
    const renderIcon = () => {
        if (icon === null) return null;

        if (displayState === "base" || displayState === "focused") {
            return (
                <motion.rect
                    initial={{ opacity: 0, x: delayedIconX, y: delayedIconY, scaleX: delayedIconScale, scaleY: delayedIconScale, rx: rx, ry: ry }}
                    animate={{ opacity: 1,  x: delayedIconX, y: delayedIconY, scaleX: delayedIconScale, scaleY: delayedIconScale, rx: rx, ry: ry }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                        opacity: { duration: 0.6, ease: "easeInOut" },
                        scale: { duration: 0.6, ease: "easeInOut" },
                        x: { duration: 0.6, ease: "easeInOut" },
                        y: { duration: 0.6, ease: "easeInOut" },
                        scaleX: { duration: 0.6, ease: "easeInOut" },
                        scaleY: { duration: 0.6, ease: "easeInOut" },
                        rx: { duration: 0.6, ease: "easeInOut" },
                        ry: { duration: 0.6, ease: "easeInOut" }
                    }}
                    width={30}
                    height={30}
                    fill={color}
                />
            );
        }

        // Return the icon as is if it's an element
        let iconElement = typeof icon === 'function' ? icon() : icon;

        return (
            <motion.g
                initial={{ opacity: 0, x: iconX, y: iconY, scaleX: iconScale, scaleY: iconScale }}
                animate={{ opacity: 1, x: iconX, y: iconY, scaleX: iconScale, scaleY: iconScale }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                    opacity: { duration: 0.6, ease: "easeInOut" },
                    scale: { duration: 0.6, ease: "easeInOut" },
                    x: { duration: 0.6, ease: "easeInOut" },
                    y: { duration: 0.6, ease: "easeInOut" },
                    scaleX: { duration: 0.6, ease: "easeInOut" },
                    scaleY: { duration: 0.6, ease: "easeInOut" }
                }}
                style={{ transformOrigin: 'center center' }}
            >
                {iconElement}
            </motion.g>
        );
    };

    // Render the text or rectangle
    const renderContent = () => {
        // For base or focused states, render a rectangle
        if (displayState === "base" || displayState === "focused") {
            return (
                <motion.rect
                    fill={color}
                    initial={{
                        opacity: 0,
                        width: rectWidth,
                        height: rectHeight,
                        x: -rectWidth / 2,
                        y: -rectHeight / 2,
                        rx: rx,
                        ry: ry
                    }}
                    animate={{
                        opacity: 1,
                        width: rectWidth,
                        height: rectHeight,
                        x: -rectWidth / 2,
                        y: -rectHeight / 2,
                        rx: rx,
                        ry: ry
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.95
                    }}
                    transition={{
                        opacity: { duration: 0.6, ease: "easeInOut" },
                        width: { duration: 0.6, ease: "easeInOut" },
                        height: { duration: 0.6, ease: "easeInOut" },
                        x: { duration: 0.6, ease: "easeInOut" },
                        y: { duration: 0.6, ease: "easeInOut" },
                        rx: { duration: 0.6, ease: "easeInOut" },
                        ry: { duration: 0.6, ease: "easeInOut" },
                        scale: { duration: 0.6, ease: "easeInOut" }
                    }}
                />
            );
        }
        // For populated or hidden states, render text with appropriate opacity
        else {
            // Only render text if we have text content
            if (!text) return null;
            
            return (
                <motion.text
                    initial={{ opacity: 0, x: delayedTextX, y: 0 }}
                    animate={{ 
                        opacity: displayState === "populated" ? 1 : 0,
                        x: delayedTextX, 
                        y: 0 
                    }}
                    exit={{ 
                        opacity: 0,
                        scale: 0.95
                    }}
                    transition={{ 
                        opacity: { duration: 0.6, ease: "easeInOut" }, 
                        x: { duration: 0.6, ease: "easeInOut" }, 
                        y: { duration: 0.6, ease: "easeInOut" },
                        scale: { duration: 0.6, ease: "easeInOut" }
                    }}
                    fill={"#000000"}
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    textAnchor="center"
                    dominantBaseline="middle"
                >
                    {text}
                </motion.text>
            );
        }
    };

    // Get the animation variants based on displayState

    return (
        <motion.g
            initial={{ x, y, opacity: 0, scale }}
            animate={variants[displayState]}
            exit={variants.exit}
            transition={{
                opacity: { duration: 0.6, ease: "easeInOut" },
                scale: { duration: 0.6, ease: "easeInOut" },
                x: { duration: 0.6, ease: "easeInOut" },
                y: { duration: 0.6, ease: "easeInOut" },
            }}
        >
            {renderIcon()}
            {renderContent()}
            {children}
            
            {/* <motion.rect 
                initial = {{x: -5, y: -5, width: 10, height: 10}}
                animate = {{x: -5, y: -5, width: 10, height: 10}}
                fill="yellow"
                rx={10}
            ></motion.rect> */}
        </motion.g>
    );
}