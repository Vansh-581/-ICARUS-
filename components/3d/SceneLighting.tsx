'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Fog } from 'three';
import * as THREE from 'three';

interface SceneLightingProps {
  scrollProgress?: number;
}

export default function SceneLighting({ scrollProgress = 0 }: SceneLightingProps) {
  const keyLightRef  = useRef<THREE.PointLight>(null);
  const rimLightRef  = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.SpotLight>(null);
  const godRayRef    = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Key light subtly orbits
    if (keyLightRef.current) {
      keyLightRef.current.position.x = Math.sin(t * 0.2) * 3;
      keyLightRef.current.position.z = Math.cos(t * 0.2) * 3 + 4;
      keyLightRef.current.intensity  = 2.5 + scrollProgress * 3 + Math.sin(t * 0.4) * 0.3;
    }

    // Rim light strengthens with scroll
    if (rimLightRef.current) {
      rimLightRef.current.intensity  = 1.2 + scrollProgress * 2.5;
      rimLightRef.current.position.y = 2 + scrollProgress * 6;
    }

    // God ray follows character upward
    if (godRayRef.current) {
      godRayRef.current.position.y = 8 + scrollProgress * 8;
      godRayRef.current.intensity  = 1.5 + scrollProgress * 4;
    }
  });

  return (
    <>
      {/* Ambient — very dark */}
      <ambientLight intensity={0.06} color={0x0a0815} />

      {/* Key light — warm gold from front-right */}
      <pointLight
        ref={keyLightRef}
        color={0xffd700}
        intensity={2.5}
        distance={20}
        decay={2}
        position={[2, 3, 4]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.002}
      />

      {/* Rim / back light — cold blue to separate from background */}
      <pointLight
        ref={rimLightRef}
        color={0x1a2060}
        intensity={1.2}
        distance={18}
        decay={2}
        position={[-3, 2, -4]}
      />

      {/* Fill light — soft gold from below */}
      <spotLight
        ref={fillLightRef}
        color={0xb8860b}
        intensity={0.8}
        distance={15}
        angle={Math.PI / 4}
        penumbra={0.8}
        position={[0, -3, 2]}
      />

      {/* God ray from above — volumetric feel */}
      <spotLight
        ref={godRayRef}
        color={0xffd700}
        intensity={1.5}
        distance={30}
        angle={Math.PI / 8}
        penumbra={1}
        position={[0.5, 8, 1]}
        target-position={[0, 0, 0]}
      />

      {/* Subtle cool fill from camera direction */}
      <directionalLight
        color={0x0d1030}
        intensity={0.15}
        position={[0, 0, 8]}
      />
    </>
  );
}
