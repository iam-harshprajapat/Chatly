import { motion, AnimatePresence } from "framer-motion";

// animation/animation.jsx

export const slideInFromLeft = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
  transition: { type: "spring", stiffness: 100, damping: 20 },
};

export const slideInFromRight = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
  transition: {
    type: "tween", // smooth timing animation
    duration: 0.4, // duration in seconds
    ease: "easeInOut", // you can try "linear", "easeIn", etc.
  },
};

export const slideInFromTop = {
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
  transition: { type: "spring", stiffness: 100, damping: 20 },
};

export const slideInFromBottom = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0 },
  transition: { type: "spring", stiffness: 100, damping: 20 },
};
