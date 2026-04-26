import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function InsightCard({ icon: Icon, title, body, color, delay = 0 }: {
  icon: LucideIcon; title: string; body: string; color: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: `0 0 30px ${color}20` }}
      className="rounded-2xl border border-white/[0.06] p-5"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(16px)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: `${color}15` }}>
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>{title}</span>
      </div>
      <p className="text-[13px] leading-relaxed text-slate-300">{body}</p>
    </motion.div>
  );
}
