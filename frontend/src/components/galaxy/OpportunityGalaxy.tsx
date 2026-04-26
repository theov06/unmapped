import { useState, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { GalaxyNode } from "./GalaxyNode";
import { GalaxyInspector } from "./GalaxyInspector";
import { GALAXY_NODES, GALAXY_EDGES, NODE_COLORS, NODE_LABELS, type GalaxyNodeData, type NodeType } from "./types";

const RING_RADII = { center: 0, inner: 140, middle: 250, outer: 350 };
const RING_SCALE = { center: 1, inner: 1, middle: 0.85, outer: 0.7 };

function layoutNodes(nodes: GalaxyNodeData[], cx: number, cy: number) {
  const positions: Record<string, { x: number; y: number; scale: number }> = {};
  const rings: Record<string, GalaxyNodeData[]> = { center: [], inner: [], middle: [], outer: [] };
  for (const n of nodes) rings[n.ring].push(n);
  for (const [ring, items] of Object.entries(rings)) {
    const r = RING_RADII[ring as keyof typeof RING_RADII];
    const s = RING_SCALE[ring as keyof typeof RING_SCALE];
    items.forEach((n, i) => {
      if (ring === "center") {
        positions[n.id] = { x: cx, y: cy, scale: s };
      } else {
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const jitter = ((i * 37) % 20) - 10;
        positions[n.id] = { x: cx + Math.cos(angle) * (r + jitter), y: cy + Math.sin(angle) * (r + jitter), scale: s };
      }
    });
  }
  return positions;
}

const FILTER_TYPES: NodeType[] = ["person", "organization", "training", "employer"];
const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.5;

export function OpportunityGalaxy() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [filters, setFilters] = useState<Set<NodeType>>(new Set(FILTER_TYPES));

  // Zoom + pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const cx = 450, cy = 380;
  const positions = useMemo(() => layoutNodes(GALAXY_NODES, cx, cy), []);

  const visibleNodes = GALAXY_NODES.filter((n) => n.type === "user" || filters.has(n.type));
  const visibleIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = GALAXY_EDGES.filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to));
  const selectedNode = GALAXY_NODES.find((n) => n.id === selected) || null;
  const connectedToSelected = selected
    ? new Set(GALAXY_EDGES.filter((e) => e.from === selected || e.to === selected).flatMap((e) => [e.from, e.to]))
    : null;

  const toggleFilter = (t: NodeType) => {
    const next = new Set(filters);
    if (next.has(t)) next.delete(t); else next.add(t);
    setFilters(next);
  };

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)));
  }, []);

  // Drag pan
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, [data-galaxy-node]")) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [pan]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  }, [dragging]);

  const handlePointerUp = useCallback(() => setDragging(false), []);

  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const transformStyle = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden select-none"
      style={{ cursor: dragging ? "grabbing" : "grab" }}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Star field */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      {/* Transformable canvas */}
      <div className="absolute inset-0 origin-center transition-transform duration-100 ease-out" style={{ transform: transformStyle }}>
        {/* Orbital rings with slow rotation + glow */}
        {[RING_RADII.inner, RING_RADII.middle, RING_RADII.outer].map((r, i) => (
          <motion.div key={r} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{ opacity: { delay: 0.2 + i * 0.15, duration: 0.8 }, scale: { delay: 0.2 + i * 0.15, duration: 0.8 }, rotate: { duration: 120 + i * 40, repeat: Infinity, ease: "linear" } }}
            className="absolute rounded-full"
            style={{
              width: r * 2, height: r * 2,
              left: cx - r, top: cy - r,
              border: `1px solid rgba(139,92,246,${0.12 - i * 0.03})`,
              boxShadow: `0 0 ${20 - i * 5}px rgba(139,92,246,${0.04 - i * 0.01})`,
            }} />
        ))}

        {/* SVG edges */}
        <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 5, width: cx * 2, height: cy * 2 }}>
          {visibleEdges.map((e, i) => {
            const from = positions[e.from]; const to = positions[e.to];
            if (!from || !to) return null;
            const isHighlighted = hovered === e.from || hovered === e.to || selected === e.from || selected === e.to;
            const isDimmed = connectedToSelected && !connectedToSelected.has(e.from) && !connectedToSelected.has(e.to);
            return (
              <motion.line key={`${e.from}-${e.to}-${i}`}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isDimmed ? 0.03 : isHighlighted ? 0.4 : 0.1 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                stroke={isHighlighted ? "#8B5CF6" : "#22D3EE"} strokeWidth={isHighlighted ? 1.5 : 0.8} />
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0" style={{ zIndex: 10, perspective: "1200px" }}>
          <div style={{ transformStyle: "preserve-3d", transform: "rotateX(6deg)" }}>
            {visibleNodes.map((node) => {
              const pos = positions[node.id];
              if (!pos) return null;
              const isDimmed = connectedToSelected && !connectedToSelected.has(node.id) && node.id !== selected;
              return (
                <div key={node.id} data-galaxy-node style={{ opacity: isDimmed ? 0.25 : 1, transition: "opacity 0.3s" }}>
                  <GalaxyNode node={node} selected={selected === node.id} hovered={hovered === node.id}
                    onHover={setHovered} onClick={(id) => setSelected(selected === id ? null : id)}
                    x={pos.x} y={pos.y} scale={pos.scale} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zoom controls — fixed position, not affected by transform */}
      <div className="absolute right-6 bottom-6 z-30 flex flex-col gap-1.5">
        <button onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.2))}
          className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 hover:text-white transition-colors"
          style={{ background: "rgba(8,12,24,0.8)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
          <ZoomIn className="h-4 w-4" />
        </button>
        <button onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 0.2))}
          className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 hover:text-white transition-colors"
          style={{ background: "rgba(8,12,24,0.8)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
          <ZoomOut className="h-4 w-4" />
        </button>
        <button onClick={resetView}
          className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 hover:text-white transition-colors"
          style={{ background: "rgba(8,12,24,0.8)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
          <Maximize2 className="h-4 w-4" />
        </button>
        <span className="mt-1 text-center text-[9px] text-slate-600">{Math.round(zoom * 100)}%</span>
      </div>

      {/* Filter chips — fixed */}
      <div className="absolute left-6 top-4 z-30 flex flex-wrap gap-2">
        {FILTER_TYPES.map((t) => (
          <button key={t} onClick={() => toggleFilter(t)}
            className="rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all"
            style={{
              background: filters.has(t) ? `${NODE_COLORS[t]}20` : "rgba(255,255,255,0.03)",
              color: filters.has(t) ? NODE_COLORS[t] : "#475569",
              border: `1px solid ${filters.has(t) ? `${NODE_COLORS[t]}40` : "rgba(255,255,255,0.06)"}`,
            }}>
            {NODE_LABELS[t]}s
          </button>
        ))}
      </div>

      {/* Legend — fixed */}
      <div className="absolute left-6 bottom-6 z-30 flex flex-col gap-1.5 rounded-2xl p-3"
        style={{ background: "rgba(8,12,24,0.8)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
        {(["user", ...FILTER_TYPES] as NodeType[]).map((t) => (
          <div key={t} className="flex items-center gap-2 text-[10px]">
            <span className="h-2 w-2 rounded-full" style={{ background: NODE_COLORS[t], boxShadow: `0 0 6px ${NODE_COLORS[t]}60` }} />
            <span className="text-slate-400">{NODE_LABELS[t]}</span>
          </div>
        ))}
      </div>

      {/* Inspector — fixed */}
      <GalaxyInspector node={selectedNode} onClose={() => setSelected(null)} />
    </div>
  );
}
