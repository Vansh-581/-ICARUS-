'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GodRaysProps {
  scrollProgress?: number;
}

export default function GodRays({ scrollProgress = 0 }: GodRaysProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Build several translucent cone shafts
  const shafts = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const angle  = (i / 5) * Math.PI * 0.28 - 0.18;
      const length = 10 + i * 2;
      const geom   = new THREE.CylinderGeometry(0.0, 0.6 + i * 0.12, length, 8, 1, true);
      const mat    = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xd4af37),
        transparent: true,
        opacity: 0.022 + i * 0.005,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      return { geom, mat, angle, length };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Follow character upward
    groupRef.current.position.y = 6 + scrollProgress * 8;
    // Gentle sway
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.04;
    // Pulse opacity
    shafts.forEach((shaft, i) => {
      shaft.mat.opacity = (0.018 + i * 0.004) * (0.85 + scrollProgress * 0.7)
        * (1 + Math.sin(t * 0.3 + i) * 0.15);
    });
  });

  return (
    <group ref={groupRef}>
      {shafts.map((shaft, i) => (
        <mesh
          key={i}
          geometry={shaft.geom}
          material={shaft.mat}
          position={[(i - 2) * 0.35, -shaft.length / 2, -1.5]}
          rotation={[0, 0, shaft.angle]}
        />
      ))}
    </group>
  );
}
