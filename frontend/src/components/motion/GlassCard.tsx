import { motion } from "framer-motion";
import { cardVariants, hoverCard } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={cardVariants} whileHover={hoverCard}
      className={cn("glass-card gradient-border rounded-3xl p-5 transition-colors", className)}>
      {children}
    </motion.div>
  );
}
