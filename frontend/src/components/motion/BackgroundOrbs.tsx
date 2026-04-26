import { motion } from "framer-motion";

export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }} />
      <motion.div animate={{ x: [0, -25, 35, 0], y: [0, 30, -25, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 top-1/4 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, #22D3EE, transparent 70%)" }} />
      <motion.div animate={{ x: [0, 20, -30, 0], y: [0, -20, 30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, #FF5A6A, transparent 70%)" }} />
    </div>
  );
}
