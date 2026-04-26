import { motion } from "framer-motion";
import { Database, Shield, AlertTriangle, ExternalLink, Lock } from "lucide-react";

const SOURCES = [
  { name: "ILO ILOSTAT", desc: "Employment, wages, labor force by sector", url: "https://ilostat.ilo.org", color: "#22D3EE" },
  { name: "World Bank WDI", desc: "GDP, population, education indicators", url: "https://data.worldbank.org", color: "#34D399" },
  { name: "ESCO Taxonomy", desc: "EU skills & occupation classification", url: "https://esco.ec.europa.eu", color: "#8B5CF6" },
  { name: "ISCO-08", desc: "International Standard Classification of Occupations", url: "https://www.ilo.org/public/english/bureau/stat/isco/isco08/", color: "#F59E0B" },
  { name: "Frey & Osborne", desc: "Automation probability scores, LMIC-calibrated", url: "https://www.oxfordmartin.ox.ac.uk", color: "#FF5A6A" },
  { name: "Wittgenstein Centre", desc: "Education projections by country to 2035", url: "https://www.wittgensteincentre.org", color: "#A78BFA" },
];

const LIMITATIONS = [
  "Wage data for informal trades is partially imputed from regional medians.",
  "Automation scores are calibrated on global task content; LMIC field reality may shift the curve.",
  "Match scores reflect indexed organizations — coverage grows quarterly.",
  "ESCO/ISCO-08 don't yet cover several emerging roles (mobile-money ops, agritech field tech).",
];

export function DataTransparency() {
  return (
    <div className="space-y-6">
      {/* Sources */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Database className="h-4 w-4 text-cyan-400" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">Data Sources</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {SOURCES.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl border border-white/[0.06] p-3 transition-colors hover:border-white/[0.1]"
              style={{ background: "rgba(15,23,42,0.4)" }}>
              <div className="h-2 w-2 mt-1.5 rounded-full shrink-0" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}50` }} />
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-white flex items-center gap-1">{s.name} <ExternalLink className="h-2.5 w-2.5 text-slate-600" /></p>
                <p className="text-[10px] text-slate-500">{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="rounded-xl border border-white/[0.06] p-4" style={{ background: "rgba(15,23,42,0.4)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Lock className="h-4 w-4 text-emerald-400" />
          <p className="text-[12px] font-semibold text-white">Your Data Privacy</p>
        </div>
        <ul className="space-y-1 text-[11px] text-slate-400">
          <li>• Your profile is yours. You control what's visible.</li>
          <li>• Skills data is stored locally and in your Supabase account.</li>
          <li>• We never sell personal data to third parties.</li>
          <li>• You can export or delete your profile at any time.</li>
        </ul>
      </div>

      {/* Limitations */}
      <div className="rounded-xl border border-orange-500/10 p-4" style={{ background: "rgba(249,115,22,0.04)" }}>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-orange-400" />
          <p className="text-[12px] font-semibold text-white">Honest Limitations</p>
        </div>
        <ul className="space-y-1 text-[11px] text-slate-400">
          {LIMITATIONS.map((l, i) => <li key={i}>• {l}</li>)}
        </ul>
      </div>
    </div>
  );
}
