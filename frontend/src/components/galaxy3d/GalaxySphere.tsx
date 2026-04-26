import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { NODE_COLORS, NODE_LABELS, type GalaxyNodeData } from "../galaxy/types";

// Size by ring: center largest, outer smallest
const RING_SIZE = { center: 0.45, inner: 0.25, middle: 0.18, outer: 0.13 };

export function GalaxySphere({
  node, position, selected, onSelect, onHover,
}: {
  node: GalaxyNodeData;
  position: [number, number, number];
  selected: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = NODE_COLORS[node.type];
  const isCenter = node.ring === "center";
  const baseSize = RING_SIZE[node.ring];

  // Subtle vertical oscillation — different phase per node
  const phase = node.strength * 0.07;
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0008 + phase) * 0.04;
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(Date.now() * 0.001 + phase) * (isCenter ? 0.12 : 0.06);
      glowRef.current.scale.setScalar(s);
    }
  });

  const handleOver = () => { setHovered(true); onHover(node.id); document.body.style.cursor = "pointer"; };
  const handleOut = () => { setHovered(false); onHover(null); document.body.style.cursor = "auto"; };

  const emissive = selected ? 2 : hovered ? 1.4 : isCenter ? 0.9 : 0.5;
  const glowScale = isCenter ? 2.8 : selected ? 2.2 : hovered ? 1.8 : 1.4;
  const opacity = node.ring === "outer" ? 0.7 : 0.9;

  return (
    <group position={position}>
      {/* Soft glow shell */}
      <mesh ref={glowRef} scale={[glowScale, glowScale, glowScale]}>
        <sphereGeometry args={[baseSize, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={selected ? 0.1 : 0.035} depthWrite={false} />
      </mesh>

      {/* Core sphere */}
      <mesh ref={meshRef} onPointerOver={handleOver} onPointerOut={handleOut} onClick={() => onSelect(node.id)}>
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshPhysicalMaterial
          color="#0a0e1c"
          emissive={color}
          emissiveIntensity={emissive}
          roughness={0.4}
          metalness={0.8}
          clearcoat={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Label — hover/select or always for center */}
      {(hovered || selected || isCenter) && (
        <Html center distanceFactor={isCenter ? 7 : 9} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded-lg px-2.5 py-1.5 text-center"
            style={{
              background: "rgba(6,8,18,0.92)",
              border: `1px solid ${color}30`,
              backdropFilter: "blur(12px)",
              transform: `translateY(${isCenter ? -50 : -36}px)`,
              boxShadow: `0 4px 16px rgba(0,0,0,0.4)`,
            }}>
            <p className="text-[10px] font-semibold text-white leading-tight">{node.name}</p>
            {!isCenter && (
              <p className="text-[8px] mt-0.5 leading-tight" style={{ color }}>
                {NODE_LABELS[node.type]} · {node.strength}%
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}
