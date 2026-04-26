import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import type { LucideIcon } from "lucide-react";

export type Signal = { icon: LucideIcon; label: string; value: number; prefix?: string; suffix?: string; color: string };

export function SignalRail({ signals }: { signals: Signal[] }) {
  return (
    <div className="flex flex-col gap-3">
      {signals.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            className="flex items-center gap-3 rounded-2xl border border-white/[0.06] px-4 py-3"
            style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: `${s.color}15`, boxShadow: `0 0 16px ${s.color}20` }}>
              <Icon className="h-4 w-4" style={{ color: s.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{s.label}</p>
              <p className="metric-num text-lg" style={{ color: s.color }}>
                <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
