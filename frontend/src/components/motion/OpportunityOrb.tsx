import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

export function OpportunityOrb({ value, label, size = 180 }: { value: number; label: string; size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(from 0deg, #8B5CF6, #22D3EE, #34D399, #FF5A6A, #8B5CF6)", opacity: 0.2, filter: "blur(12px)" }}
      />
      {/* Animated ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full"
        style={{ border: "1px solid rgba(139,92,246,0.3)", borderTopColor: "rgba(34,211,238,0.6)" }}
      />
      {/* Inner glass */}
      <div className="relative z-10 flex flex-col items-center justify-center rounded-full"
        style={{ width: size * 0.72, height: size * 0.72, background: "rgba(15,23,42,0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 0 40px rgba(139,92,246,0.15), inset 0 0 30px rgba(139,92,246,0.05)" }}>
        <span className="metric-num text-4xl neon-text"><AnimatedCounter value={value} suffix="%" /></span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-slate-400">{label}</span>
      </div>
      {/* Pulse */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{ border: "1px solid rgba(139,92,246,0.3)" }}
      />
    </div>
  );
}
