'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
  scrollProgress?: number;
}

export default function FloatingParticles({
  count = 70,
  scrollProgress = 0,
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const frameCount = useRef(0);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3.5 + Math.random() * 5.5;
      const angle  = Math.random() * Math.PI * 2;
      pos[i3]     = Math.cos(angle) * radius;
      pos[i3 + 1] = (Math.random() - 0.3) * 18;
      pos[i3 + 2] = Math.sin(angle) * radius - 2;
      spd[i]      = 0.012 + Math.random() * 0.04;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  const material = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(0xd4af37),
    size: 0.022,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  const livePositions = useRef(positions.slice());

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Skip every other frame on low-end (count ≤ 30)
    frameCount.current++;
    if (count <= 30 && frameCount.current % 2 !== 0) return;

    const t   = state.clock.elapsedTime;
    const pos = livePositions.current;
    const clampedDelta = Math.min(delta, 0.05); // cap delta to prevent jumps

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += speeds[i] * clampedDelta * 10;
      pos[i3]     += Math.sin(t * 0.3 + i) * 0.0006;
      pos[i3 + 2] += Math.cos(t * 0.25 + i) * 0.0005;

      const resetY = 10 + scrollProgress * 8;
      if (pos[i3 + 1] > resetY) {
        pos[i3 + 1] = -6;
      }
    }

    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    attr.array = pos;
    attr.needsUpdate = true;

    // Slower rotation = less GPU work
    pointsRef.current.rotation.y += clampedDelta * 0.002;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
