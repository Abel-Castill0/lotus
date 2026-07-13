"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

interface Shelf3DProps {
  position?: [number, number, number];
  width?: number;
  children?: React.ReactNode;
}

export default function Shelf3D({
  position = [0, 0, 0],
  width = 6,
  children,
}: Shelf3DProps) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(time * 0.3) * 0.1;
    ref.current.rotation.y = Math.sin(time * 0.1) * 0.02;
  });

  return (
    <group ref={ref} position={position}>
      {/* Main shelf board */}
      <mesh position={[0, -1, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.15, 1.2]} />
        <meshStandardMaterial
          color="#2d1b69"
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Shelf edge highlight */}
      <mesh position={[0, -0.92, 0.55]}>
        <boxGeometry args={[width + 0.05, 0.08, 0.05]} />
        <meshStandardMaterial
          color="#7c3aed"
          roughness={0.1}
          metalness={0.8}
          emissive="#7c3aed"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Bottom shelf */}
      <mesh position={[0, -2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.15, 1.2]} />
        <meshStandardMaterial
          color="#2d1b69"
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Side supports */}
      <mesh position={[-width / 2 - 0.075, -1.6, 0]}>
        <boxGeometry args={[0.15, 2.4, 1.2]} />
        <meshStandardMaterial
          color="#1e1245"
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
      <mesh position={[width / 2 + 0.075, -1.6, 0]}>
        <boxGeometry args={[0.15, 2.4, 1.2]} />
        <meshStandardMaterial
          color="#1e1245"
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {children}
    </group>
  );
}
