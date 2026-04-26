import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Zap, ArrowUpRight, User } from "lucide-react";
import { NODE_COLORS, NODE_LABELS, GALAXY_NODES, type GalaxyNodeData } from "./types";
import { MatchRing } from "@/components/motion/MatchRing";

const selfNode = GALAXY_NODES.find((n) => n.type === "user")!;

export function GalaxyInspector({ node, onClose }: { node: GalaxyNodeData | null; onClose: () => void }) {
  const showNode = node && node.type !== "user" ? node : null;

  return (
    <div className="absolute right-3 top-12 z-40 w-[240px] sm:right-5 sm:top-14 sm:w-[260px]">
      <AnimatePresence mode="wait">
        {showNode ? (
          <motion.div
            key={showNode.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl"
            style={{
              background: "rgba(8, 12, 24, 0.92)",
              border: `1px solid ${NODE_COLORS[showNode.type]}25`,
              backdropFilter: "blur(20px)",
              boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 30px ${NODE_COLORS[showNode.type]}08`,
            }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full"
                    style={{ background: `${NODE_COLORS[showNode.type]}18`, border: `1.5px solid ${NODE_COLORS[showNode.type]}40` }}>
                    <span className="text-[12px] font-bold" style={{ color: NODE_COLORS[showNode.type] }}>{showNode.initials}</span>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-white leading-tight">{showNode.name}</h3>
                    <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: NODE_COLORS[showNode.type] }}>
                      {NODE_LABELS[showNode.type]}
                    </span>
                  </div>
                </div>
                <button onClick={onClose} className="rounded-full p-1 text-slate-600 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {showNode.location && (
                <p className="flex items-center gap-1.5 mb-3 text-[11px] text-slate-400"><MapPin className="h-3 w-3" />{showNode.location}</p>
              )}

              <div className="flex items-center justify-between mb-3 rounded-2xl p-3"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500">Strength</p>
                  <p className="metric-num text-lg text-white mt-0.5">{showNode.strength}%</p>
                </div>
                <MatchRing value={showNode.strength} size={42} color={NODE_COLORS[showNode.type]} />
              </div>

              {showNode.skills && showNode.skills.length > 0 && (
                <div className="mb-3">
                  <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500 mb-1.5">
                    <Zap className="inline h-3 w-3 mr-0.5" />Shared Skills
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {showNode.skills.map((s) => (
                      <span key={s} className="rounded-full px-2 py-0.5 text-[9px] font-medium text-slate-300"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              <button className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-[11px] font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ background: `${NODE_COLORS[showNode.type]}20`, border: `1px solid ${NODE_COLORS[showNode.type]}35` }}>
                Connect <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Default: user summary */
          <motion.div
            key="self-summary"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="rounded-3xl"
            style={{
              background: "rgba(8, 12, 24, 0.85)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
            }}
          >
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="grid h-11 w-11 place-items-center rounded-full"
                  style={{ background: "rgba(255,90,106,0.15)", border: "1.5px solid rgba(255,90,106,0.35)" }}>
                  <User className="h-4 w-4 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-white">{selfNode.name}</h3>
                  <p className="text-[10px] text-slate-500">{selfNode.location}</p>
                </div>
              </div>
              <div className="rounded-2xl p-3 mb-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500">Your Skills</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {selfNode.skills?.map((s) => (
                    <span key={s} className="rounded-full px-2 py-0.5 text-[9px] font-medium text-rose-300"
                      style={{ background: "rgba(255,90,106,0.1)", border: "1px solid rgba(255,90,106,0.15)" }}>{s}</span>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 text-center">Click a node to inspect</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
