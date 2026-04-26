import { motion } from "framer-motion";
import { Trophy, Star, Zap, Target, CheckCircle2 } from "lucide-react";

const MILESTONES = [
  { label: "Create profile", icon: Star, threshold: 10 },
  { label: "Add 3 skills", icon: Zap, threshold: 30 },
  { label: "Add experience", icon: Target, threshold: 50 },
  { label: "Get first match", icon: CheckCircle2, threshold: 70 },
  { label: "Complete profile", icon: Trophy, threshold: 100 },
];

export function ProfileProgress({ progress }: { progress: number }) {
  const currentMilestone = MILESTONES.findIndex((m) => progress < m.threshold);
  const nextMilestone = MILESTONES[currentMilestone] || MILESTONES[MILESTONES.length - 1];

  return (
    <div className="rounded-2xl border border-white/[0.06] p-5" style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">Profile Level</p>
        <span className="text-[12px] font-bold text-white">{progress}%</span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(90deg, #8B5CF6, #22D3EE, #34D399)" }}
        />
      </div>

      {/* Milestones */}
      <div className="flex justify-between mt-3">
        {MILESTONES.map((m, i) => {
          const Icon = m.icon;
          const done = progress >= m.threshold;
          return (
            <div key={m.label} className="flex flex-col items-center gap-1">
              <div className="grid h-7 w-7 place-items-center rounded-full transition-colors"
                style={{
                  background: done ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${done ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.06)"}`,
                }}>
                <Icon className="h-3 w-3" style={{ color: done ? "#A78BFA" : "#475569" }} />
              </div>
              <span className="text-[8px] text-slate-600 text-center leading-tight max-w-[50px]">{m.label}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[10px] text-slate-500 text-center">
        Next: <span className="text-violet-400 font-medium">{nextMilestone.label}</span>
      </p>
    </div>
  );
}
