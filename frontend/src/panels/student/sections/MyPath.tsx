import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Compass, BookOpen, Calendar, Users2, TrendingUp, Shield, Cpu, Target } from "lucide-react";
import { GlassPanel } from "@/components/motion/GlassPanel";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

const STAGES = [
  { id: 1, done: true, icon: CheckCircle2, title: "Map your skills", body: "9 skills and 2 experiences captured. Your card is shareable.", color: "#34D399" },
  { id: 2, done: true, icon: CheckCircle2, title: "Connect your first nodes", body: "Linked to 3 peers and 2 organizations. The graph notices.", color: "#34D399" },
  { id: 3, done: false, icon: Users2, title: "Find your community", body: "Join one regional repair-tech circle this month. Two members from your graph already attend.", color: "#8B5CF6" },
  { id: 4, done: false, icon: BookOpen, title: "Take a 6-week web cohort", body: "Pairing repair work with HTML/JS unlocks roles that pay 60% more — automation-resistant through 2035.", color: "#22D3EE" },
  { id: 5, done: false, icon: Calendar, title: "Run a tiny workshop", body: "Teach 3 friends to fix a phone screen. Your reputation compounds and the platform recommends you as a node.", color: "#F59E0B" },
  { id: 6, done: false, icon: Compass, title: "Strengthen a human-only skill", body: "Customer service, negotiation, multilingual ops — these hold value through 2035 because automation can't replicate trust.", color: "#FF5A6A" },
];

const RISK_SIGNALS = [
  { label: "Match score trend", value: 71, suffix: "%", color: "#34D399", icon: TrendingUp },
  { label: "Automation risk", value: 44, suffix: "%", color: "#FF5A6A", icon: Cpu },
  { label: "Future-save score", value: 68, suffix: "/100", color: "#8B5CF6", icon: Shield },
  { label: "Sectors under-supplied", value: 3, suffix: "", color: "#22D3EE", icon: Target },
];

export function StudentMyPath() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">Opportunity Journey</p>
        <h1 className="mt-2 font-display text-[28px] font-bold text-white sm:text-[40px]">Your path forward</h1>
        <p className="mt-2 max-w-lg mx-auto text-[15px] text-slate-400">
          Six moves — convening, learning, teaching — adapted to your profile and live regional signals.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Journey Path */}
        <div className="relative">
          {/* Animated progress line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "33%" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="absolute left-[23px] top-0 w-px"
            style={{ background: "linear-gradient(180deg, #34D399, #8B5CF6)" }}
          />

          <div className="space-y-6">
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 * i, duration: 0.5 }}
                  className="relative flex gap-5 pl-2"
                >
                  {/* Node */}
                  <div className="relative z-10 flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: s.done ? `${s.color}20` : "rgba(15,23,42,0.8)",
                      border: `2px solid ${s.done ? s.color : "rgba(255,255,255,0.1)"}`,
                      boxShadow: s.done ? `0 0 20px ${s.color}30` : "none",
                    }}>
                    <Icon className="h-5 w-5" style={{ color: s.done ? s.color : "#64748B" }} />
                  </div>

                  {/* Card */}
                  <GlassPanel delay={0.15 * i} className={`flex-1 ${s.done ? "opacity-60" : ""}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.color }}>Stage {s.id}</span>
                      {s.done && <span className="text-[10px] font-medium text-emerald-400">Complete</span>}
                    </div>
                    <h3 className={`mt-2 text-[16px] font-semibold ${s.done ? "text-slate-500 line-through" : "text-white"}`}>{s.title}</h3>
                    <p className="mt-1 text-[13px] text-slate-400 leading-relaxed">{s.body}</p>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Risk + Demand Summary */}
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">Live Signals</p>
          {RISK_SIGNALS.map((s, i) => {
            const Icon = s.icon;
            return (
              <GlassPanel key={s.label} delay={0.2 + i * 0.1} className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: `${s.color}15`, boxShadow: `0 0 16px ${s.color}20` }}>
                  <Icon className="h-4 w-4" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{s.label}</p>
                  <p className="metric-num text-xl" style={{ color: s.color }}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </div>
  );
}
