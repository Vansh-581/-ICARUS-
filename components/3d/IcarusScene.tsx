'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import IcarusCharacter from './IcarusCharacter';
import CameraRig from './CameraRig';
import AtmosphereBackground from './AtmosphereBackground';
import WingTrails from './WingTrails';
import FPSLimiter from './FPSLimiter';

interface IcarusSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
  isMobile?: boolean;
}

export default function IcarusScene({ scrollProgressRef, isMobile = false }: IcarusSceneProps) {
  const [dpr, setDpr]           = useState(isMobile ? 0.55 : 1);
  const [perfTier, setPerfTier] = useState<'low' | 'mid' | 'high'>(isMobile ? 'low' : 'mid');

  useEffect(() => {
    const htmlTier = document.documentElement.getAttribute('data-perf') as 'low'|'mid'|'high'|null;
    if (htmlTier === 'low' || isMobile) { setPerfTier('low'); setDpr(0.5); }
    else if (htmlTier === 'mid')        { setPerfTier('mid'); setDpr(0.85); }
    else                                { setPerfTier('high'); setDpr(1.2); }
  }, [isMobile]);

  const isLow = perfTier === 'low';
  const isMid = perfTier === 'mid';
  const targetFPS = isLow ? 30 : isMid ? 45 : 60;

  return (
    <Canvas
      camera={{ position: [0, isMobile ? 0.25 : 0, isMobile ? 8 : 7], fov: isMobile ? 66 : 50, near: 0.1, far: 100 }}
      dpr={[0.45, dpr]}
      frameloop="demand"
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        precision: isLow ? 'mediump' : 'highp',
        // Skip ACESFilmic tone-mapping math — not needed for a stylised scene
        toneMapping: THREE.NoToneMapping,
      }}
      shadows={false}
      style={{ background: 'transparent' }}
    >
      <FPSLimiter fps={targetFPS} />

      <PerformanceMonitor
        onDecline={() => { setDpr(p => Math.max(0.45, p - 0.15)); setPerfTier('low'); }}
        onIncline={() => { if (!isMobile) { setDpr(p => Math.min(1.4, p + 0.1)); setPerfTier(p => p === 'low' ? 'mid' : 'high'); } }}
        flipflops={3}
      />
      <AdaptiveDpr pixelated />

      {/* ── Premium lighting rig ──────────────────────────────── */}
      {/* Dim dark-purple ambient — keeps shadows from going pure black */}
      <ambientLight intensity={0.12} color="#100820" />

      {/* Warm gold key light — main illumination, upper-left */}
      <directionalLight position={[-2, 4, 3]} intensity={isLow ? 1.0 : 1.6} color="#D4AF37" />

      {/* Cool blue-purple fill — opposite side, creates depth + drama */}
      <pointLight position={[4, -1, -3]} intensity={isLow ? 0.4 : 0.9} color="#2020aa" distance={20} />

      {/* Gold rim light from above-behind — makes wings glow on edges */}
      <pointLight position={[0, 6, -5]} intensity={isLow ? 0.3 : 0.7} color="#FFD700" distance={18} />

      {/* Soft warm back-fill — lifts shadows on the body */}
      {!isLow && <pointLight position={[0, -3, 4]} intensity={0.35} color="#8B6914" distance={12} />}

      <Suspense fallback={null}>
        <AtmosphereBackground scrollProgressRef={scrollProgressRef} />
        <WingTrails
          scrollProgressRef={scrollProgressRef}
          pointCount={isMobile || isLow ? 10 : 26}
          opacityScale={isMobile || isLow ? 0.6 : 1}
          updateEvery={isMobile || isLow ? 2 : 1}
        />
        <IcarusCharacter scrollProgressRef={scrollProgressRef} isMobile={isMobile} isLow={isLow} />
        <CameraRig scrollProgressRef={scrollProgressRef} isMobile={isMobile} />
      </Suspense>

      <EffectComposer multisampling={0} enabled={!isLow && !isMobile}>
        <Bloom intensity={0.9} luminanceThreshold={0.35} luminanceSmoothing={0.85} mipmapBlur />
        <Vignette offset={0.18} darkness={0.7} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </Canvas>
  );
}
