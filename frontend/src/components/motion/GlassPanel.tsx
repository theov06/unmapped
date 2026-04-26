import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlassPanel({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("rounded-3xl border border-white/[0.06] p-6", className)}
      style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
    >
      {children}
    </motion.div>
  );
}
