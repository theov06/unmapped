import { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { OpportunityGalaxy } from "@/components/galaxy/OpportunityGalaxy";

// Lazy load 3D galaxy to avoid blocking initial render
const OpportunityGalaxy3D = lazy(() =>
  import("@/components/galaxy3d/OpportunityGalaxy3D").then((m) => ({ default: m.OpportunityGalaxy3D })),
);

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function StudentNetwork() {
  const [use3D, setUse3D] = useState(false);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    const ok = hasWebGL();
    setWebglOk(ok);
    setUse3D(ok);
  }, []);

  return (
    <div className="px-6 pt-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 flex items-end justify-between"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">Opportunity Galaxy</p>
          <h1 className="mt-1.5 font-display text-[24px] font-bold text-white leading-tight sm:text-[32px]">
            Your skills, mapped across the network
          </h1>
          <p className="mt-1 text-[13px] text-slate-500 max-w-xl">
            People, organizations, training providers, and employers — connected by shared skills.
          </p>
        </div>

        {/* 2D/3D toggle */}
        {webglOk && (
          <div className="flex rounded-full p-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <button onClick={() => setUse3D(false)}
              className="rounded-full px-3 py-1 text-[10px] font-semibold transition-all"
              style={{ background: !use3D ? "rgba(139,92,246,0.2)" : "transparent", color: !use3D ? "#A78BFA" : "#64748B" }}>
              2D
            </button>
            <button onClick={() => setUse3D(true)}
              className="rounded-full px-3 py-1 text-[10px] font-semibold transition-all"
              style={{ background: use3D ? "rgba(139,92,246,0.2)" : "transparent", color: use3D ? "#A78BFA" : "#64748B" }}>
              3D
            </button>
          </div>
        )}
      </motion.div>

      {/* Galaxy canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          height: "min(calc(100vh - 220px), 700px)",
          minHeight: 400,
          background: "radial-gradient(circle at 50% 45%, rgba(139,92,246,0.06), transparent 55%), #060812",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 0 80px rgba(139,92,246,0.04)",
        }}
      >
        {use3D ? (
          <Suspense fallback={
            <div className="flex h-full items-center justify-center text-slate-500 text-sm">Loading 3D galaxy…</div>
          }>
            <OpportunityGalaxy3D />
          </Suspense>
        ) : (
          <OpportunityGalaxy />
        )}
      </motion.div>
    </div>
  );
}
