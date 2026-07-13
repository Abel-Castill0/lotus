"use client";

import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";
import * as THREE from "three";

interface Book3DProps {
  frontTexture?: string;
  spineColor?: string;
  width?: number;
  height?: number;
  depth?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onHover?: (hovering: boolean) => void;
  onClick?: () => void;
}

export default function Book3D({
  frontTexture,
  spineColor = "#7c3aed",
  width = 1.2,
  height = 1.7,
  depth = 0.3,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  onHover,
  onClick,
}: Book3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const texture = useLoader(
    TextureLoader,
    frontTexture || "/images/fallback/manga-placeholder.svg"
  );

  const spineTexture = new THREE.Color(spineColor);
  const backColor = new THREE.Color(spineColor).multiplyScalar(0.6);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle floating animation
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.05;

    // Hover rotation
    if (hovered) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation[1] + 0.3,
        0.1
      );
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation[1],
        0.1
      );
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover?.(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover?.(false);
    document.body.style.cursor = "auto";
  };

  const handleClick = () => {
    setClicked(!clicked);
    onClick?.();
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        attach="material-0"
        color={spineTexture}
        roughness={0.3}
        metalness={0.1}
      />
      <meshStandardMaterial
        attach="material-1"
        color={spineTexture}
        roughness={0.3}
        metalness={0.1}
      />
      <meshStandardMaterial
        attach="material-2"
        map={texture}
        roughness={0.4}
        metalness={0}
      />
      <meshStandardMaterial
        attach="material-3"
        color={backColor}
        roughness={0.5}
        metalness={0}
      />
      <meshStandardMaterial
        attach="material-4"
        color={spineTexture}
        roughness={0.3}
        metalness={0.1}
      />
      <meshStandardMaterial
        attach="material-5"
        color={spineTexture}
        roughness={0.3}
        metalness={0.1}
      />

      {/* Glow effect on hover */}
      {hovered && (
        <pointLight
          position={[0, 0, 1]}
          intensity={0.5}
          color={spineColor}
          distance={2}
        />
      )}
    </mesh>
  );
}
