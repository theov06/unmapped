import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MatchRing } from "@/components/motion/MatchRing";
import { OPPORTUNITIES, COMMUNITY_ORGS, PEERS } from "./seed";
import { staggerContainer, listItem } from "@/lib/motion";

const TABS = ["All", "People", "Organizations", "Opportunities", "Events"] as const;
type Tab = (typeof TABS)[number];

function matchFor(seed: string, base = 60) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return base + (h % (98 - base));
}

const TAB_COLORS: Record<string, string> = { People: "#22D3EE", Organizations: "#8B5CF6", Opportunities: "#34D399", Events: "#FF5A6A" };

export function SearchSection({ subtitle }: { subtitle: string }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<Tab>("All");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const opps = OPPORTUNITIES.map((o) => ({ kind: o.type === "Event" ? "Events" : "Opportunities" as string, title: o.name, sub: `${o.org} · ${o.location}`, tags: o.matchedSkills, match: o.match }));
    const orgs = COMMUNITY_ORGS.map((o) => ({ kind: "Organizations", title: o.name, sub: `${o.type} · ${o.location}`, tags: [o.focus], match: matchFor(o.id, 55) }));
    const ppl = PEERS.map((p) => ({ kind: "People", title: p.label, sub: p.city, tags: p.skills, match: matchFor(p.id, 60) + p.shared * 2 }));
    return [...opps, ...orgs, ...ppl]
      .filter((r) => { if (tab !== "All" && r.kind !== tab) return false; if (!term) return true; return (r.title + " " + r.sub + " " + r.tags.join(" ")).toLowerCase().includes(term); })
      .sort((a, b) => b.match - a.match);
  }, [q, tab]);

  return (
    <div className="mx-auto max-w-3xl px-6 pt-8">
      {/* Command palette header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-center mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">Command Search</p>
        <h1 className="mt-2 font-display text-[24px] font-bold text-white sm:text-[32px]">Find anything</h1>
        <p className="mt-1 text-[14px] text-slate-500">{subtitle}</p>
      </motion.div>

      {/* Search input */}
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }}
        className="relative mb-6">
        <SearchIcon className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people, organizations, opportunities…"
          className="h-14 rounded-2xl border-white/[0.08] bg-white/[0.04] pl-14 text-[15px] text-white placeholder:text-slate-600 glow-input backdrop-blur-xl" />
      </motion.div>

      {/* Tab chips */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all"
            style={{ background: tab === t ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.04)", color: tab === t ? "#A78BFA" : "#64748B", border: `1px solid ${tab === t ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.06)"}` }}>
            {t}
          </button>
        ))}
      </div>

      {/* Results */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3 pb-32">
        {results.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/[0.08] p-12 text-center text-sm text-slate-600">No results. Try a different keyword.</div>
        )}
        {results.map((r, i) => (
          <motion.div key={`${r.title}-${i}`} variants={listItem}
            whileHover={{ x: 6, boxShadow: "0 0 20px rgba(139,92,246,0.1)" }}
            className="flex items-center gap-4 rounded-2xl border border-white/[0.06] p-4 transition-colors hover:border-white/[0.1]"
            style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(12px)" }}>
            <MatchRing value={r.match} size={44} color={TAB_COLORS[r.kind] || "#8B5CF6"} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: `${TAB_COLORS[r.kind] || "#8B5CF6"}15`, color: TAB_COLORS[r.kind] || "#8B5CF6" }}>{r.kind}</span>
              </div>
              <p className="mt-1 text-[14px] font-semibold text-white truncate">{r.title}</p>
              <p className="flex items-center gap-1 text-[12px] text-slate-500"><MapPin className="h-3 w-3" />{r.sub}</p>
            </div>
            {r.tags.length > 0 && (
              <div className="hidden md:flex flex-wrap gap-1 max-w-[200px]">
                {r.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-white/[0.06] px-2 py-0.5 text-[10px] text-slate-500">{t}</span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
