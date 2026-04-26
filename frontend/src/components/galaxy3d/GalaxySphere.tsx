import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { NODE_COLORS, NODE_LABELS, type GalaxyNodeData } from "../galaxy/types";

const RING_SIZE = { center: 76, inner: 48, middle: 42, outer: 36 };

export function GalaxySphere({
  node, position, selected, onSelect, onHover,
}: {
  node: GalaxyNodeData;
  position: [number, number, number];
  selected: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const color = NODE_COLORS[node.type];
  const isCenter = node.ring === "center";
  const size = RING_SIZE[node.ring];
  const glowSize = isCenter ? 130 : 80;

  // Subtle vertical oscillation
  const phase = node.strength * 0.07;
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0008 + phase) * 0.04;
    }
  });

  const handleOver = () => { setHovered(true); onHover(node.id); document.body.style.cursor = "pointer"; };
  const handleOut = () => { setHovered(false); onHover(null); document.body.style.cursor = "auto"; };

  return (
    <group ref={groupRef} position={position}>
      {/* Invisible sphere for raycasting (hover/click detection) */}
      <mesh
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={() => onSelect(node.id)}
        visible={false}
      >
        <sphereGeometry args={[isCenter ? 0.5 : 0.3, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* HTML node — same design as 2D GalaxyNode */}
      <Html center distanceFactor={isCenter ? 6 : 8} style={{ pointerEvents: "none" }}>
        <div style={{ width: size, height: size, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Ambient glow */}
          <div style={{
            position: "absolute",
            width: glowSize,
            height: glowSize,
            left: (size - glowSize) / 2,
            top: (size - glowSize) / 2,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}${isCenter ? "50" : "30"}, transparent 70%)`,
            filter: "blur(10px)",
            animation: isCenter ? "pulse-glow 3s ease-in-out infinite" : "pulse-glow 4s ease-in-out infinite",
            opacity: selected ? 0.4 : hovered ? 0.3 : 0.15,
            transition: "opacity 0.25s",
          }} />

          {/* Circle body */}
          <div style={{
            position: "relative",
            width: size,
            height: size,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `radial-gradient(circle at 35% 35%, ${color}25, rgba(10,14,28,0.92))`,
            border: `${isCenter ? 2 : 1.5}px solid ${color}${selected ? "bb" : hovered ? "80" : "45"}`,
            boxShadow: selected ? `0 0 28px ${color}50, 0 0 8px ${color}30` : hovered ? `0 0 20px ${color}35` : `0 0 8px ${color}15`,
            transition: "box-shadow 0.25s, border-color 0.25s, transform 0.2s",
            transform: hovered ? "scale(1.15)" : "scale(1)",
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: isCenter ? 18 : Math.max(10, size * 0.24),
              color,
              userSelect: "none",
            }}>
              {node.initials}
            </span>
          </div>

          {/* Hover tooltip */}
          {(hovered || selected) && !isCenter && (
            <div style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: size + 8,
              whiteSpace: "nowrap",
              borderRadius: 12,
              padding: "6px 12px",
              background: "rgba(8,12,24,0.92)",
              border: `1px solid ${color}35`,
              backdropFilter: "blur(14px)",
              boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 12px ${color}10`,
              zIndex: 50,
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.3 }}>{node.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color }}>{NODE_LABELS[node.type]}</span>
                <span style={{ fontSize: 9, color: "#475569" }}>·</span>
                <span style={{ fontSize: 9, color: "#94A3B8" }}>{node.strength}% match</span>
              </div>
              {node.location && <p style={{ fontSize: 9, color: "#64748B", margin: "2px 0 0" }}>{node.location}</p>}
            </div>
          )}

          {/* Center node permanent label */}
          {isCenter && (
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: size + 8, textAlign: "center", whiteSpace: "nowrap" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#fff", margin: 0 }}>{node.name}</p>
              <p style={{ fontSize: 9, color: "#64748B", margin: "1px 0 0" }}>{node.location}</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
