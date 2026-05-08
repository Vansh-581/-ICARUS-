'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import IcarusCharacter from './IcarusCharacter';
import CameraRig from './CameraRig';
import AtmosphereBackground from './AtmosphereBackground';
import WingTrails from './WingTrails';
import FPSLimiter from './FPSLimiter';

interface IcarusSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
  isMobile?: boolean;
}

export default function IcarusScene({
  scrollProgressRef,
  isMobile = false,
}: IcarusSceneProps) {
  const [dpr, setDpr]           = useState(isMobile ? 0.55 : 1);
  const [perfTier, setPerfTier] = useState<'low' | 'mid' | 'high'>(isMobile ? 'low' : 'mid');

  useEffect(() => {
    // Read the tier already stamped on <html> by the inline script in layout.tsx
    const htmlTier = document.documentElement.getAttribute('data-perf') as
      'low' | 'mid' | 'high' | null;

    if (htmlTier === 'low' || isMobile) {
      setPerfTier('low');
      setDpr(0.5);
    } else if (htmlTier === 'mid') {
      setPerfTier('mid');
      setDpr(0.8);
    } else {
      setPerfTier('high');
      setDpr(1);
    }
  }, [isMobile]);

  const isLow  = perfTier === 'low';
  const isMid  = perfTier === 'mid';

  // FPS targets: low=30, mid=45, high=60
  const targetFPS = isLow ? 30 : isMid ? 45 : 60;

  return (
    <Canvas
      camera={{
        position: [0, isMobile ? 0.25 : 0, isMobile ? 8 : 7],
        fov: isMobile ? 66 : 50,
        near: 0.1,
        far: 100,
      }}
      dpr={[0.45, dpr]}
      // ── KEY: "demand" means the GPU only draws when FPSLimiter
      //    calls invalidate(). Zero wasted frames. ──────────────
      frameloop="demand"
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
        precision: isLow ? 'mediump' : 'highp',
      }}
      shadows={false}
      style={{ background: 'transparent' }}
    >
      {/* Hard FPS cap — prevents GPU from running at 120-240fps */}
      <FPSLimiter fps={targetFPS} />

      <PerformanceMonitor
        onDecline={() => {
          setDpr(prev => Math.max(0.45, prev - 0.15));
          setPerfTier('low');
        }}
        onIncline={() => {
          if (!isMobile && perfTier !== 'high') {
            setDpr(prev => Math.min(1.2, prev + 0.1));
            setPerfTier(prev => prev === 'low' ? 'mid' : 'high');
          }
        }}
        flipflops={3}
      />

      <AdaptiveDpr pixelated />

      <Suspense fallback={null}>
        <AtmosphereBackground scrollProgressRef={scrollProgressRef} />

        <WingTrails
          scrollProgressRef={scrollProgressRef}
          pointCount={isMobile || isLow ? 10 : 24}
          opacityScale={isMobile || isLow ? 0.65 : 1}
          updateEvery={isMobile || isLow ? 2 : 1}
        />

        <IcarusCharacter scrollProgressRef={scrollProgressRef} isMobile={isMobile} />

        <CameraRig scrollProgressRef={scrollProgressRef} isMobile={isMobile} />
      </Suspense>

      {/* Post-processing: disabled on low/mobile — not worth the extra render pass */}
      <EffectComposer multisampling={0} enabled={!isLow && !isMobile}>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.8}
          mipmapBlur
        />
        <Vignette
          offset={0.2}
          darkness={0.65}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
