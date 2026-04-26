import { Link } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp, Zap, Shield, Briefcase, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { OpportunityOrb } from "@/components/motion/OpportunityOrb";
import { SignalRail, type Signal } from "@/components/motion/SignalRail";
import { GlassPanel } from "@/components/motion/GlassPanel";
import { InsightCard } from "@/components/motion/InsightCard";
import { MatchRing } from "@/components/motion/MatchRing";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { OPPORTUNITIES, loadProfile } from "@/panels/shared/seed";
import { loadAllData, filterByCountry, getWdiValue } from "@/services/localDataService";
import { useState, useEffect } from "react";

export function StudentHome() {
  const profile = loadProfile();
  const top = OPPORTUNITIES.slice(0, 3);
  const [wage, setWage] = useState(0);
  const [svcJobs, setSvcJobs] = useState(0);
  const [youthUnemp, setYouthUnemp] = useState(0);

  useEffect(() => {
    loadAllData().then((d) => {
      const c = profile.country || "Ghana";
      const gdp = getWdiValue(d.wdi, c, "GDP (constant 2015 US$)");
      const pop = getWdiValue(d.wdi, c, "Population, total");
      if (gdp && pop && pop > 0) setWage(Math.round(gdp / pop / 12));
      const svc = filterByCountry(d.sector, c).find((r) => r.category === "Services");
      if (svc) setSvcJobs(Math.round(svc.value));
      const yu = filterByCountry(d.unemployment, c).find((r) => r.category === "Youth Unemployment (15-24)");
      if (yu) setYouthUnemp(Math.round(yu.value));
    });
  }, [profile.country]);

  const signals: Signal[] = [
    { icon: TrendingUp, label: "Wage signal", value: wage, prefix: "$", color: "#34D399" },
    { icon: Briefcase, label: "Services jobs (000s)", value: svcJobs, color: "#22D3EE" },
    { icon: Shield, label: "Youth unemp (000s)", value: youthUnemp, color: "#FF5A6A" },
    { icon: Zap, label: "Open matches", value: 12, color: "#8B5CF6" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* HERO: Mission Control */}
      <div className="grid min-h-[50vh] items-center gap-8 lg:min-h-[70vh] lg:grid-cols-[1fr_auto_280px]">
        {/* Left: Greeting + Status */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">Mission Control</p>
          <h1 className="mt-3 font-display text-[32px] font-bold leading-[1.05] tracking-tight text-white sm:text-[40px] lg:text-[56px]">
            Good morning,<br /><span className="neon-text">{profile.name.split(" ")[0]}.</span>
          </h1>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-slate-400">
            {profile.skills.length} skills mapped · {top.length} opportunities matched · your region is moving.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/student/path"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #6366F1)", boxShadow: "0 0 24px rgba(139,92,246,0.3)" }}>
              <Compass className="h-4 w-4" /> My Path
            </Link>
            <Link to="/student/profile"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[13px] font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-all">
              Edit Profile
            </Link>
          </div>
        </motion.div>

        {/* Center: Opportunity Pulse Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <OpportunityOrb value={78} label="Match Score" size={160} />
        </motion.div>

        {/* Right: Signal Rail */}
        <SignalRail signals={signals} />
      </div>

      {/* OPPORTUNITY RUNWAY */}
      <div className="mt-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">Opportunity Runway</p>
          <Link to="/student/search" className="text-[11px] font-medium text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
            View all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {top.map((o, i) => (
            <GlassPanel key={o.id} delay={0.1 * i} className="group cursor-pointer hover:border-violet-500/20 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-white leading-tight">{o.name}</p>
                  <p className="mt-1 text-[12px] text-slate-500">{o.org} · {o.location}</p>
                  <p className="mt-2 text-[12px] font-medium text-emerald-400">{o.pay}</p>
                </div>
                <MatchRing value={o.match} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {o.matchedSkills.slice(0, 3).map((s) => (
                  <span key={s} className="rounded-full border border-white/[0.06] px-2.5 py-0.5 text-[10px] text-slate-400">{s}</span>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>

      {/* INSIGHT CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-8">
        <InsightCard icon={Shield} title="Automation Alert" color="#FF5A6A" delay={0.3}
          body="Manual assembly tasks face 72% automation pressure by 2035. Pivot toward repair + diagnostics." />
        <InsightCard icon={Sparkles} title="Skill Compound" color="#8B5CF6" delay={0.4}
          body="Pairing repair work with HTML/JS unlocks roles that pay 60% more in your region." />
        <InsightCard icon={TrendingUp} title="Demand Signal" color="#34D399" delay={0.5}
          body={`Services employment in ${profile.country || "Ghana"}: ${svcJobs.toLocaleString()}k jobs. Growing sector.`} />
      </div>
    </div>
  );
}
