"use client";

import { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Book3D from "./Book3D";
import FloatingParticles from "./FloatingParticles";

function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth < 768;

    if (isMobile.current && window.DeviceOrientationEvent) {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma !== null && e.beta !== null) {
          target.current.x = THREE.MathUtils.clamp(e.gamma / 45, -1, 1);
          target.current.y = THREE.MathUtils.clamp((e.beta - 45) / 45, -1, 1);
        }
      };
      const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
      if (typeof DOE.requestPermission === "function") {
        DOE.requestPermission()
          .then((state: string) => {
            if (state === "granted") window.addEventListener("deviceorientation", handleOrientation);
          })
          .catch(() => {});
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
      return () => window.removeEventListener("deviceorientation", handleOrientation);
    }

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    const lerp = isMobile.current ? 0.02 : 0.05;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, target.current.x, lerp);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, target.current.y, lerp);
    const amp = isMobile.current ? 0.5 : 0.8;
    camera.position.x = mouse.current.x * amp;
    camera.position.y = mouse.current.y * (amp * 0.5) + 1.2;
    camera.lookAt(0, 0.3, 0);
  });

  return null;
}

function CentralBook() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.5) * 0.15;
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.05;
    const s = 1 + Math.sin(t * 0.8) * 0.02;
    ref.current.scale.setScalar(s);
  });

  return (
    <group ref={ref} position={[0, 0.5, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
        <Book3D
          frontTexture="/images/fallback/manga-placeholder.svg"
          spineColor="#C5A3FF"
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1.2}
          width={1.4}
          height={2}
          depth={0.35}
        />
      </Float>
      <pointLight position={[0, 0, 2]} intensity={1.2} color="#C5A3FF" distance={5} decay={2} />
    </group>
  );
}

function EnergyOrbs() {
  const ref = useRef<THREE.Group>(null);
  const orbData = useMemo(() => [
    { angle: 0, radius: 2.5, speed: 0.4, color: "#C5A3FF", size: 0.08 },
    { angle: Math.PI / 2, radius: 3, speed: 0.3, color: "#FF6B9D", size: 0.06 },
    { angle: Math.PI, radius: 2.8, speed: 0.35, color: "#FFD700", size: 0.07 },
    { angle: (3 * Math.PI) / 2, radius: 3.2, speed: 0.25, color: "#C5A3FF", size: 0.05 },
  ], []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.children.forEach((child, i) => {
      const d = orbData[i];
      const a = d.angle + t * d.speed;
      child.position.x = Math.cos(a) * d.radius;
      child.position.z = Math.sin(a) * d.radius;
      child.position.y = Math.sin(t * 0.5 + i) * 0.3 + 0.5;
    });
  });

  return (
    <group ref={ref}>
      {orbData.map((orb, i) => (
        <mesh key={i}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function GoldDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 120;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = Math.random() * 10 - 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t * 0.2 + i * 0.3) * 0.002;
      pos[i * 3] += Math.cos(t * 0.15 + i * 0.2) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#FFD700"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </points>
  );
}

function SceneContent() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.15} />
      <spotLight position={[5, 8, 5]} angle={0.3} penumbra={1} intensity={1} color="#C5A3FF" castShadow />
      <spotLight position={[-5, 5, -5]} angle={0.4} penumbra={1} intensity={0.5} color="#FF6B9D" />
      <pointLight position={[0, 3, 3]} intensity={0.3} color="#FFD700" />

      <CentralBook />
      <EnergyOrbs />

      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.25}>
        <Book3D frontTexture="/images/fallback/manga-placeholder.svg" spineColor="#FF6B9D" position={[-2.8, -0.5, -1]} rotation={[0, 0.2, 0]} scale={0.7} />
      </Float>
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.3}>
        <Book3D frontTexture="/images/fallback/manga-placeholder.svg" spineColor="#FFD700" position={[2.8, -0.5, -1]} rotation={[0, -0.2, 0]} scale={0.7} />
      </Float>
      <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Book3D frontTexture="/images/fallback/manga-placeholder.svg" spineColor="#C5A3FF" position={[-1.5, -1.2, -2]} rotation={[0, 0.15, 0]} scale={0.55} />
      </Float>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.22}>
        <Book3D frontTexture="/images/fallback/manga-placeholder.svg" spineColor="#FF6B9D" position={[1.5, -1.2, -2]} rotation={[0, -0.15, 0]} scale={0.55} />
      </Float>

      <Float speed={2.5} rotationIntensity={0} floatIntensity={0.6}>
        <Text position={[0, 2.8, -1]} fontSize={0.9} color="#C5A3FF" anchorX="center" anchorY="middle" letterSpacing={0.15}>
          LOTUS
        </Text>
      </Float>

      <GoldDust />
      <FloatingParticles count={isMobile ? 80 : 180} color="#C5A3FF" size={0.025} speed={0.2} spread={14} />
      <FloatingParticles count={isMobile ? 40 : 80} color="#FF6B9D" size={0.018} speed={0.3} spread={10} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
      </EffectComposer>
      <AdaptiveDpr pixelated />
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#C5A3FF" wireframe />
    </mesh>
  );
}

export default function HeroScene() {
  const [dpr, setDpr] = useState(1.5);
  useEffect(() => { if (window.innerWidth < 768) setDpr(1); }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, dpr]}
        camera={{ position: [0, 1.2, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
