import { motion } from "framer-motion";
import { NODE_COLORS, NODE_LABELS, type GalaxyNodeData } from "./types";

export function GalaxyNode({
  node, selected, hovered, onHover, onClick, x, y, scale = 1,
}: {
  node: GalaxyNodeData; selected: boolean; hovered: boolean;
  onHover: (id: string | null) => void; onClick: (id: string) => void;
  x: number; y: number; scale?: number;
}) {
  const color = NODE_COLORS[node.type];
  const isCenter = node.ring === "center";
  const size = isCenter ? 76 : 46 * scale;
  const glowSize = isCenter ? 130 : 80 * scale;

  return (
    <motion.div
      data-galaxy-node
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: selected || hovered || isCenter ? 1 : 0.75,
        scale: hovered ? 1.18 : 1,
        x: x - size / 2,
        y: y - size / 2,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: isCenter ? 0 : 0.08 + node.strength / 600 }}
      className="absolute cursor-pointer"
      style={{ width: size, height: size, zIndex: selected ? 30 : hovered ? 20 : isCenter ? 15 : 10 }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node.id)}
    >
      {/* Ambient glow + pulse */}
      <motion.div
        animate={isCenter
          ? { scale: [1, 1.25, 1], opacity: [0.25, 0.12, 0.25] }
          : { scale: [1, 1.08, 1], opacity: [0.15, 0.08, 0.15] }
        }
        transition={{ duration: isCenter ? 3 : 4 + (node.strength % 3), repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full"
        style={{
          width: glowSize, height: glowSize,
          left: (size - glowSize) / 2, top: (size - glowSize) / 2,
          background: `radial-gradient(circle, ${color}50, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />

      {/* Circle body */}
      <div className="relative flex h-full w-full items-center justify-center rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${color}25, rgba(10,14,28,0.92))`,
          border: `${isCenter ? 2 : 1.5}px solid ${color}${selected ? "bb" : hovered ? "80" : "45"}`,
          boxShadow: selected ? `0 0 28px ${color}50, 0 0 8px ${color}30` : hovered ? `0 0 20px ${color}35` : `0 0 8px ${color}15`,
          transition: "box-shadow 0.25s, border-color 0.25s",
        }}>
        <span className="font-bold select-none" style={{ color, fontSize: isCenter ? 18 : Math.max(9, 11 * scale) }}>
          {node.initials}
        </span>
      </div>

      {/* Hover tooltip — name + type + strength */}
      {(hovered || selected) && !isCenter && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl px-3 py-2"
          style={{
            top: size + 8,
            background: "rgba(8,12,24,0.92)",
            border: `1px solid ${color}35`,
            backdropFilter: "blur(14px)",
            boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 12px ${color}10`,
            zIndex: 50,
          }}>
          <p className="text-[11px] font-semibold text-white">{node.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[9px] font-medium uppercase tracking-wider" style={{ color }}>{NODE_LABELS[node.type]}</span>
            <span className="text-[9px] text-slate-600">·</span>
            <span className="text-[9px] text-slate-400">{node.strength}% match</span>
          </div>
          {node.location && <p className="text-[9px] text-slate-500 mt-0.5">{node.location}</p>}
        </motion.div>
      )}

      {/* Center node permanent label */}
      {isCenter && (
        <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: size + 8 }}>
          <p className="text-[11px] font-semibold text-white">{node.name}</p>
          <p className="text-[9px] text-slate-500">{node.location}</p>
        </div>
      )}
    </motion.div>
  );
}
