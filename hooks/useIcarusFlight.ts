'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlightState {
  positionY:    number;
  rotationY:    number;
  rotationZ:    number;
  wingFlapL:    number;
  wingFlapR:    number;
  glowIntensity: number;
  cameraY:      number;
  cameraZ:      number;
}

/**
 * Computes all smooth flight values per frame given a scroll progress (0–1).
 * Uses lerp / damp — no physics engine.
 *
 * Call inside a <Canvas> subtree (requires R3F context).
 * Returns a ref object updated every frame — not React state, so no re-renders.
 */
export function useIcarusFlight(scrollProgress: number) {
  const state = useRef<FlightState>({
    positionY:    0,
    rotationY:    0,
    rotationZ:    0,
    wingFlapL:    0,
    wingFlapR:    0,
    glowIntensity: 0.4,
    cameraY:      0,
    cameraZ:      7,
  });

  // Internal smooth values
  const smoothPosY = useRef(0);
  const smoothRotY = useRef(0);
  const smoothGlow = useRef(0.4);

  useFrame((_, delta) => {
    const p  = scrollProgress;
    const dt = Math.min(delta, 0.05); // clamp to avoid spiral on tab switch
    const t  = performance.now() * 0.001;

    // Lerp smoothing factor
    const lf = dt * 3.2;

    // Position Y: Icarus ascends up to 8 world units
    smoothPosY.current += ((p * 8.0)             - smoothPosY.current) * lf;
    smoothRotY.current += ((p * 0.45)            - smoothRotY.current) * (dt * 2.2);
    smoothGlow.current += ((0.4 + p * 1.4)       - smoothGlow.current) * (dt * 1.8);

    // Wing flap frequency & amplitude ramp up with scroll
    const flapSpeed = 0.75 + p * 0.55;
    const flapAmp   = 0.22 + p * 0.18;
    const flap      = Math.sin(t * flapSpeed * Math.PI * 2) * flapAmp;

    // Subtle Z wobble (anti-gravity drift)
    const rotZ = Math.sin(t * 0.22) * 0.05;

    // Camera follows Icarus, pulls back slightly at peak
    const camY = smoothPosY.current * 0.82 + Math.sin(t * 0.09) * 0.25;
    const camZ = 7 - p * 1.4;

    // Commit
    state.current = {
      positionY:     smoothPosY.current,
      rotationY:     smoothRotY.current + Math.sin(t * 0.28) * 0.06,
      rotationZ:     rotZ,
      wingFlapL:     flap,
      wingFlapR:    -flap,
      glowIntensity: smoothGlow.current,
      cameraY:       camY,
      cameraZ:       camZ,
    };
  });

  return state;
}
