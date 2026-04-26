import { Link } from "@tanstack/react-router";
import { ArrowUpRight, AlertTriangle, TrendingUp, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/layout/PanelShell";
import { GlassCard } from "@/components/motion/GlassCard";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { OPPORTUNITIES, loadProfile } from "@/panels/shared/seed";
import { loadAllData, filterByCountry, getWdiValue } from "@/services/localDataService";
import { useState, useEffect } from "react";
import { staggerContainer, cardVariants, listItem } from "@/lib/motion";

export function StudentHome() {
  const profile = loadProfile();
  const top = OPPORTUNITIES.slice(0, 3);
  const [wageSignal, setWageSignal] = useState(0);

  useEffect(() => {
    loadAllData().then((allData) => {
      const country = profile.country || "Ghana";
      const gdp = getWdiValue(allData.wdi, country, "GDP (constant 2015 US$)");
      const pop = getWdiValue(allData.wdi, country, "Population, total");
      if (gdp && pop && pop > 0) {
        setWageSignal(Math.round(gdp / pop / 12));
      } else {
        const rows = filterByCountry(allData.sector, country);
        const svc = rows.find((r) => r.category === "Services");
        setWageSignal(svc ? Math.round(svc.value) : 210);
      }
    });
  }, [profile.country]);

  return (
    <>
      <SectionHeader
        eyebrow={`Welcome back, ${profile.name.split(" ")[0]}`}
        title="Your world today"
        description="A quick read of where your skills, the people around you, and live opportunities meet."
      />
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8 px-8 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard icon={Target} label="Profile strength" value={78} suffix="%" color="var(--color-coral)" />
          <MetricCard icon={Zap} label="Open matches" value={12} color="var(--color-sky)" />
          <MetricCard icon={TrendingUp} label="Local wage signal" value={wageSignal} prefix="$" color="var(--color-mint)" sub="WDI" />
          <MetricCard icon={AlertTriangle} label="Automation risk" value={72} suffix="%" color="var(--color-warn)" />
        </div>

        <GlassCard className="p-8">
          <p className="eyebrow" style={{ color: "var(--color-grape)" }}>What's moving</p>
          <h2 className="mt-3 font-display text-[30px] font-bold leading-[1.08] tracking-tight" style={{ color: "var(--color-ink)" }}>
            12 opportunities woke up this week.
            <br />
            <span style={{ color: "var(--color-coral)" }}>3 of them want exactly what you do.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            We watched the network around your profile and surfaced what's worth your attention — paid work,
            skill-building cohorts, and one warning about a skill that may fade by 2035.
          </p>
        </GlassCard>

        <motion.div variants={cardVariants}
          className="flex items-start gap-3 rounded-2xl border-l-4 p-4"
          style={{ borderColor: "var(--color-warn)", background: "color-mix(in oklab, var(--color-warn) 10%, transparent)" }}>
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--color-warn)" }} />
          <div>
            <p className="text-[14px] font-semibold" style={{ color: "var(--color-ink)" }}>
              Manual assembly tasks · 72% automation pressure by 2035
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Pivot toward repair + diagnostics. We mapped two cohorts that get you there.
            </p>
            <Link to="/student/path" className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color: "var(--color-coral)" }}>
              See My Path <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>

        <div>
          <p className="eyebrow mb-4" style={{ color: "var(--color-mint)" }}>Top matches for you</p>
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
            {top.map((o) => (
              <motion.div key={o.id} variants={listItem}
                whileHover={{ x: 6, scale: 1.005 }}
                className="card-soft card-soft-hover flex items-start justify-between gap-4 rounded-2xl p-5">
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold leading-tight" style={{ color: "var(--color-ink)" }}>{o.name}</p>
                  <p className="text-[13px] text-muted-foreground">{o.org} · {o.location} · {o.pay}</p>
                </div>
                <div className="text-right">
                  <p className="metric-num text-xl" style={{ color: "var(--color-mint)" }}>
                    <AnimatedCounter value={o.match} suffix="%" />
                  </p>
                  <p className="text-[11px] text-muted-foreground">match</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <Link to="/student/network" className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold" style={{ color: "var(--color-ink)" }}>
            Open full network <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>
    </>
  );
}

function MetricCard({ icon: Icon, label, value, prefix, suffix, color, sub }: {
  icon: typeof TrendingUp; label: string; value: number;
  prefix?: string; suffix?: string; color: string; sub?: string;
}) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-muted-foreground">{label}{sub && <span className="ml-1 opacity-70">· {sub}</span>}</p>
        <div className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `color-mix(in oklab, ${color} 14%, transparent)` }}>
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
      </div>
      <p className="metric-num mt-3 text-3xl" style={{ color }}>
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </p>
    </GlassCard>
  );
}
