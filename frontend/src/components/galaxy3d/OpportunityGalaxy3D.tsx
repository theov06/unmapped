import { Suspense, useMemo, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { GalaxySphere } from "./GalaxySphere";
import { GalaxyConnection } from "./GalaxyConnection";
import { GalaxyInspector } from "../galaxy/GalaxyInspector";
import { GALAXY_NODES, GALAXY_EDGES, NODE_COLORS, type GalaxyNodeData } from "../galaxy/types";

// Structured ring radii — evenly spaced
const RING_R = { center: 0, inner: 2.0, middle: 3.6, outer: 5.2 };

/** Evenly distribute nodes around each ring at fixed angles */
function computePositions(nodes: GalaxyNodeData[]): Record<string, [number, number, number]> {
  const pos: Record<string, [number, number, number]> = {};
  const rings: Record<string, GalaxyNodeData[]> = { center: [], inner: [], middle: [], outer: [] };
  for (const n of nodes) rings[n.ring].push(n);

  for (const [ring, items] of Object.entries(rings)) {
    const r = RING_R[ring as keyof typeof RING_R];
    items.forEach((n, i) => {
      if (ring === "center") {
        pos[n.id] = [0, 0, 0];
      } else {
        // Even angular distribution — no jitter, no randomness
        const angle = (i / items.length) * Math.PI * 2;
        pos[n.id] = [Math.cos(angle) * r, 0, Math.sin(angle) * r];
      }
    });
  }
  return pos;
}

/** Rotating group for each orbital ring */
function OrbitalRingGroup({ children, speed, radius }: { children: React.ReactNode; speed: number; radius: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * speed; });
  return <group ref={ref}>{children}</group>;
}

/** Visual ring circle */
function RingCircle({ radius, color = "#8B5CF6", opacity = 0.06 }: { radius: number; color?: string; opacity?: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.008, radius + 0.008, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function GalaxyScene({ selected, hovered, onSelect, onHover }: {
  selected: string | null; hovered: string | null;
  onSelect: (id: string) => void; onHover: (id: string | null) => void;
}) {
  const positions = useMemo(() => computePositions(GALAXY_NODES), []);

  // Group nodes by ring for orbital rotation
  const byRing = useMemo(() => {
    const m: Record<string, GalaxyNodeData[]> = { center: [], inner: [], middle: [], outer: [] };
    for (const n of GALAXY_NODES) m[n.ring].push(n);
    return m;
  }, []);

  // Edge strength lookup
  const edgeStrength = useMemo(() => {
    const m: Record<string, number> = {};
    for (const e of GALAXY_EDGES) {
      const fromNode = GALAXY_NODES.find((n) => n.id === e.from);
      const toNode = GALAXY_NODES.find((n) => n.id === e.to);
      m[`${e.from}-${e.to}`] = ((fromNode?.strength || 50) + (toNode?.strength || 50)) / 2;
    }
    return m;
  }, []);

  const connectedToSelected = useMemo(() => {
    if (!selected) return null;
    return new Set(GALAXY_EDGES.filter((e) => e.from === selected || e.to === selected).flatMap((e) => [e.from, e.to]));
  }, [selected]);

  const renderNode = (node: GalaxyNodeData) => {
    const pos = positions[node.id];
    if (!pos) return null;
    return (
      <GalaxySphere key={node.id} node={node} position={pos}
        selected={selected === node.id} onSelect={onSelect} onHover={onHover} />
    );
  };

  return (
    <>
      {/* Lighting — subtle, directional */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#8B5CF6" distance={18} decay={2} />
      <pointLight position={[4, -2, 4]} intensity={0.6} color="#22D3EE" distance={14} decay={2} />
      <pointLight position={[-4, -1, -4]} intensity={0.4} color="#FF5A6A" distance={12} decay={2} />

      {/* Stars — sparse, calm */}
      <Stars radius={60} depth={50} count={800} factor={2.5} saturation={0} fade speed={0.3} />

      {/* Visual ring circles */}
      <RingCircle radius={RING_R.inner} color="#8B5CF6" opacity={0.07} />
      <RingCircle radius={RING_R.middle} color="#6366F1" opacity={0.05} />
      <RingCircle radius={RING_R.outer} color="#22D3EE" opacity={0.035} />

      {/* Connections — drawn under nodes, static (not rotating) */}
      {GALAXY_EDGES.map((e, i) => {
        const from = positions[e.from];
        const to = positions[e.to];
        if (!from || !to) return null;
        const isHighlighted = hovered === e.from || hovered === e.to || selected === e.from || selected === e.to;
        const str = edgeStrength[`${e.from}-${e.to}`] || 50;
        return (
          <GalaxyConnection key={`${e.from}-${e.to}-${i}`}
            from={from} to={to}
            color={isHighlighted ? "#8B5CF6" : "#334155"}
            highlighted={isHighlighted}
            strength={str}
          />
        );
      })}

      {/* Center node — no rotation */}
      {byRing.center.map(renderNode)}

      {/* Inner ring — slow rotation */}
      <OrbitalRingGroup speed={0.025} radius={RING_R.inner}>
        {byRing.inner.map(renderNode)}
      </OrbitalRingGroup>

      {/* Middle ring — slower, opposite direction */}
      <OrbitalRingGroup speed={-0.015} radius={RING_R.middle}>
        {byRing.middle.map(renderNode)}
      </OrbitalRingGroup>

      {/* Outer ring — slowest */}
      <OrbitalRingGroup speed={0.008} radius={RING_R.outer}>
        {byRing.outer.map(renderNode)}
      </OrbitalRingGroup>

      {/* Camera controls — constrained */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={4}
        maxDistance={12}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.3}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export function OpportunityGalaxy3D() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const selectedNode = GALAXY_NODES.find((n) => n.id === selected) || null;

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 5, 9], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={() => setSelected(null)}
      >
        <Suspense fallback={null}>
          <GalaxyScene selected={selected} hovered={hovered} onSelect={handleSelect} onHover={setHovered} />
        </Suspense>
      </Canvas>

      {/* Inspector overlay */}
      <GalaxyInspector node={selectedNode} onClose={() => setSelected(null)} />

      {/* Legend */}
      <div className="absolute left-5 bottom-5 z-30 flex flex-col gap-1.5 rounded-2xl p-3"
        style={{ background: "rgba(6,8,18,0.85)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(14px)" }}>
        {(["user", "person", "organization", "training", "employer"] as const).map((t) => (
          <div key={t} className="flex items-center gap-2 text-[10px]">
            <span className="h-2 w-2 rounded-full" style={{ background: NODE_COLORS[t], boxShadow: `0 0 6px ${NODE_COLORS[t]}50` }} />
            <span className="text-slate-500 capitalize">{t === "user" ? "You" : t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
