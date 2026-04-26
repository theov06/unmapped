import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Building2, Landmark } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { useApp, type Role } from "@/lib/app-context";
import { BackgroundOrbs } from "@/components/motion/BackgroundOrbs";
import { staggerContainer, cardVariants } from "@/lib/motion";

export const Route = createFileRoute("/")({ component: Landing });

const ROLES: { id: Role; title: string; who: string; desc: string; bullets: string[]; cta: string; icon: typeof GraduationCap; to: string; gradient: string; glow: string }[] = [
  { id: "youth", title: "Student", who: "Map what you actually know", desc: "Build a skills profile from real life — informal work, self-taught skills, languages — and find what matches.", bullets: ["Personal skills card", "Live opportunity board", "Personalized growth plan"], cta: "I'm a Student", icon: GraduationCap, to: "/student", gradient: "linear-gradient(135deg, #FF5A6A, #8B5CF6)", glow: "0 0 40px rgba(255,90,106,0.3)" },
  { id: "employer", title: "Organization", who: "See the talent your region already has", desc: "For employers, NGOs and universities. Post opportunities. Detect talent gaps before they become hiring crises.", bullets: ["Internal & external skill graph", "Matched profile heatmap", "Action items & gap alerts"], cta: "I'm an Organization", icon: Building2, to: "/org", gradient: "linear-gradient(135deg, #34D399, #22D3EE)", glow: "0 0 40px rgba(34,211,153,0.3)" },
  { id: "gov", title: "Government", who: "Configure the system. Read the signals.", desc: "Calibrate UNMAPPED for your country. Watch skills supply, demand and automation risk evolve in near real time.", bullets: ["Region-level configuration", "Profiles + activity heatmaps", "ML-detected trends"], cta: "I'm a Government", icon: Landmark, to: "/gov", gradient: "linear-gradient(135deg, #8B5CF6, #6366F1)", glow: "0 0 40px rgba(139,92,246,0.3)" },
];

function Landing() {
  const { role, setRole } = useApp();
  const navigate = useNavigate();
  useEffect(() => {
    if (role === "youth") void navigate({ to: "/student" });
    else if (role === "employer") void navigate({ to: "/org" });
    else if (role === "gov") void navigate({ to: "/gov" });
  }, [role, navigate]);

  return (
    <div className="min-h-screen" style={{ background: "#060812" }}>
      <BackgroundOrbs />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo /><span className="text-[12px] text-slate-500">v2</span>
      </header>
      <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-20">
        <h1 className="text-balance font-display text-[32px] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-[48px] md:text-[64px] lg:text-[80px]">
          Close the distance<br />between <span className="neon-text">skills</span> and <span className="neon-text">opportunity</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-[18px] leading-relaxed text-slate-400">
          unmapped maps real human skills to real economic opportunity — for the people who have them, the organizations that need them, and the governments that shape them.
        </p>
      </motion.section>
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-4 md:grid-cols-3">
          {ROLES.map((r) => {
            const Icon = r.icon;
            return (
              <motion.button key={r.id} variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02, boxShadow: r.glow, transition: { duration: 0.25 } }}
                type="button" onClick={() => { setRole(r.id); void navigate({ to: r.to }); }}
                className="glass-card gradient-border group flex flex-col rounded-3xl p-7 text-left">
                <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: r.gradient, boxShadow: r.glow }}>
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <h3 className="mt-5 font-display text-[24px] font-bold leading-tight text-white">{r.title}</h3>
                <p className="mt-1 text-[13px] font-medium neon-text">{r.who}</p>
                <p className="mt-3 text-[14px] text-slate-400">{r.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[13px] text-slate-500">
                      <span className="h-1 w-1 rounded-full bg-violet-500" />{b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 self-start rounded-full px-5 py-2.5 text-[13px] font-semibold text-white" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  {r.cta} <ArrowRight className="h-4 w-4" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </section>
      <footer className="relative z-10 mx-auto max-w-6xl border-t border-white/[0.06] px-6 py-6 text-[12px] text-slate-600">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>unmapped · concept build</span>
          <span>signals · ILO · World Bank · UNESCO · Wittgenstein Centre</span>
        </div>
      </footer>
    </div>
  );
}
