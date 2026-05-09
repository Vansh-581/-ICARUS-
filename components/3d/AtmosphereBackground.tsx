'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphereBackgroundProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

// Dark theme palette
const DARK = {
  bot: new THREE.Color(0x020208),
  mid: new THREE.Color(0x0d0a18),
  top: new THREE.Color(0x1a1008),
};

// Light theme palette — warm cream-to-gold sky
const LIGHT = {
  bot: new THREE.Color(0xf0e8d5),
  mid: new THREE.Color(0xf7f0e0),
  top: new THREE.Color(0xfdf8ed),
};

// Scratch colour objects reused every frame — no allocation
const _bot = new THREE.Color();
const _mid = new THREE.Color();
const _top = new THREE.Color();

export default function AtmosphereBackground({ scrollProgressRef }: AtmosphereBackgroundProps) {
  const themeRef = useRef<'dark' | 'light'>('dark');
  const lerpRef  = useRef(0); // 0 = dark, 1 = light — used to smooth the transition

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime:     { value: 0 },
      uScroll:   { value: 0 },
      uGoldAmt:  { value: 0 },
      uColorBot: { value: new THREE.Color(0x020208) },
      uColorMid: { value: new THREE.Color(0x0d0a18) },
      uColorTop: { value: new THREE.Color(0x1a1008) },
      uIsLight:  { value: 0.0 },
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
      uniform float uIsLight;
      varying vec2  vUv;
      varying float vY;

      void main() {
        float t = (vY + 30.0) / 60.0;
        vec3 col = mix(uColorBot, uColorMid, smoothstep(0.0, 0.45, t));
        col = mix(col, uColorTop, smoothstep(0.45, 1.0, t));

        // Gold glow band that follows scroll
        float goldCenter = uScroll * 0.9;
        float dist = abs(t - goldCenter);
        float glow = smoothstep(0.35, 0.0, dist) * uGoldAmt;

        // Dark mode: additive warm glow; light mode: subtractive warm saturation
        vec3 glowColor = mix(
          vec3(0.12, 0.08, 0.0),   // dark: warm orange-gold add
          vec3(0.0,  -0.02, -0.05), // light: slight warm desaturation
          uIsLight
        );
        col += glowColor * glow;

        // Very subtle breathing pulse
        col *= 1.0 + sin(uTime * 0.25) * 0.012;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollProgressRef.current;

    // Read theme from DOM — O(1), safe every frame
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    themeRef.current = currentTheme;

    // Smoothly lerp between dark and light palette (avoids jarring flash on toggle)
    const targetLerp = currentTheme === 'light' ? 1 : 0;
    lerpRef.current  = THREE.MathUtils.lerp(lerpRef.current, targetLerp, 0.06);
    const l = lerpRef.current;

    _bot.copy(DARK.bot).lerp(LIGHT.bot, l);
    _mid.copy(DARK.mid).lerp(LIGHT.mid, l);
    _top.copy(DARK.top).lerp(LIGHT.top, l);

    material.uniforms.uColorBot.value.copy(_bot);
    material.uniforms.uColorMid.value.copy(_mid);
    material.uniforms.uColorTop.value.copy(_top);
    material.uniforms.uIsLight.value   = l;
    material.uniforms.uTime.value      = t;
    material.uniforms.uScroll.value    = p;
    material.uniforms.uGoldAmt.value   = 0.28 + p * 1.1;
  });

  return (
    <mesh renderOrder={-1}>
      {/* 16×8 segments — enough for a smooth gradient, minimal vertex cost */}
      <sphereGeometry args={[50, 16, 8]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
