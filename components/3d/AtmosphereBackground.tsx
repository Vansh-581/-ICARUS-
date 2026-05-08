'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphereBackgroundProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

export default function AtmosphereBackground({ scrollProgressRef }: AtmosphereBackgroundProps) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime:     { value: 0 },
      uScroll:   { value: 0 },
      uColorBot: { value: new THREE.Color(0x020208) },
      uColorMid: { value: new THREE.Color(0x0d0a18) },
      uColorTop: { value: new THREE.Color(0x1a1008) },
      uGoldAmt:  { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vY;
      void main() {
        vUv = uv;
        vY  = position.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uScroll;
      uniform vec3  uColorBot;
      uniform vec3  uColorMid;
      uniform vec3  uColorTop;
      uniform float uGoldAmt;
      varying vec2  vUv;
      varying float vY;

      void main() {
        float t = (vY + 30.0) / 60.0;
        vec3 col = mix(uColorBot, uColorMid, smoothstep(0.0, 0.45, t));
        col = mix(col, uColorTop, smoothstep(0.45, 1.0, t));
        float goldCenter = uScroll * 0.9;
        float dist = abs(t - goldCenter);
        float glow = smoothstep(0.35, 0.0, dist) * uGoldAmt;
        col += vec3(0.12, 0.08, 0.0) * glow;
        col *= 1.0 + sin(uTime * 0.25) * 0.015;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    material.uniforms.uTime.value   = state.clock.elapsedTime;
    const p = scrollProgressRef.current;
    material.uniforms.uScroll.value = p;
    material.uniforms.uGoldAmt.value = 0.3 + p * 1.2;
  });

  return (
    <mesh renderOrder={-1}>
      {/* Reduced from 32×16 → 16×8 — background sphere needs very few verts */}
      <sphereGeometry args={[50, 16, 8]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
