import type { Variants } from "framer-motion";

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 18, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, filter: "blur(8px)", transition: { duration: 0.25 } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.075, delayChildren: 0.08 } },
};

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const hoverCard = {
  y: -6, scale: 1.015,
  boxShadow: "0 0 36px rgba(139,92,246,0.28)",
  transition: { duration: 0.25 },
};

export const listItem: Variants = {
  initial: { opacity: 0, x: -14 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

export const glowPing: Variants = {
  animate: { scale: [1, 1.45], opacity: [0.45, 0], transition: { duration: 1.8, repeat: Infinity, ease: "easeOut" } },
};

export const pulseNode: Variants = {
  animate: { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75], transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
};
