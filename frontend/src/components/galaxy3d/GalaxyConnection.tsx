import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GalaxyConnection({
  from, to, color = "#22D3EE", highlighted = false, strength = 50,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
  highlighted?: boolean;
  strength?: number;
}) {
  const lineRef = useRef<THREE.Line>(null);

  const lineObj = useMemo(() => {
    const mid: [number, number, number] = [
      (from[0] + to[0]) / 2,
      (from[1] + to[1]) / 2 + 0.2,
      (from[2] + to[2]) / 2,
    ];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...from),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...to),
    );
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
    const baseOpacity = 0.04 + (strength / 100) * 0.1;
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: baseOpacity });
    return new THREE.Line(geo, mat);
  }, [from, to, color, strength]);

  useFrame(() => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      const baseOpacity = 0.04 + (strength / 100) * 0.1;
      mat.opacity = highlighted ? Math.min(0.6, baseOpacity * 4) : baseOpacity;
    }
  });

  return <primitive ref={lineRef} object={lineObj} />;
}
