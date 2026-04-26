import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

export function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  useEffect(() => { const c = animate(count, value, { duration: 1.1, ease: [0.22, 1, 0.36, 1] }); return c.stop; }, [value, count]);
  return <span>{prefix}<motion.span>{rounded}</motion.span>{suffix}</span>;
}
