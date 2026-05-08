'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgressRef: React.MutableRefObject<number>;
  isMobile?: boolean;
}

export default function CameraRig({ scrollProgressRef, isMobile = false }: CameraRigProps) {
  const { camera } = useThree();
  const currentPos    = useRef(new THREE.Vector3(0, 0, 7));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Pre-allocated scratch vectors — NO allocation in the hot path
  const _targetPos    = useRef(new THREE.Vector3());
  const _targetLookAt = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = scrollProgressRef.current;

    _targetPos.current.set(
      Math.sin(t * 0.12) * (isMobile ? 0.42 : 0.8),
      p * (isMobile ? 5.6 : 6.5) + Math.sin(t * 0.08) * (isMobile ? 0.18 : 0.3),
      (isMobile ? 8 : 7) - p * (isMobile ? 1.0 : 1.5),
    );
    _targetLookAt.current.set(0, p * 6.0, 0);

    const lerpF = Math.min(delta * 2.5, 1);
    currentPos.current.lerp(_targetPos.current, lerpF);
    currentTarget.current.lerp(_targetLookAt.current, lerpF);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
