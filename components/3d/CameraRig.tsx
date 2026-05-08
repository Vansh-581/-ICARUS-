'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number;
}

export default function CameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 7));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = scrollProgress;

    // Target camera position: follow Icarus upward + slight orbit
    const targetX = Math.sin(t * 0.12) * 0.8;
    const targetY = p * 6.5 + Math.sin(t * 0.08) * 0.3;
    const targetZ = 7 - p * 1.5; // zoom in slightly as ascending

    const lookAtY = p * 6.0;

    // Smooth lerp toward target
    const lerpF = Math.min(delta * 2.5, 1);
    currentPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), lerpF);
    currentTarget.current.lerp(new THREE.Vector3(0, lookAtY, 0), lerpF);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
