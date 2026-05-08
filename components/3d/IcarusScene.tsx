'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import IcarusCharacter from './IcarusCharacter';
import CameraRig from './CameraRig';
import AtmosphereBackground from './AtmosphereBackground';
import WingTrails from './WingTrails';

interface IcarusSceneProps {
  // Ref instead of number — component never re-renders on scroll
  scrollProgressRef: React.MutableRefObject<number>;
  isMobile?: boolean;
}

export default function IcarusScene({
  scrollProgressRef,
  isMobile = false,
}: IcarusSceneProps) {
  const [dpr, setDpr] = useState(isMobile ? 0.55 : 1);
  const [perfTier, setPerfTier] = useState<'low' | 'mid' | 'high'>(isMobile ? 'low' : 'mid');

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory && nav.deviceMemory <= 2) {
      setPerfTier('low');
      setDpr(0.5);
    } else if (isMobile) {
      setPerfTier('low');
      setDpr(0.55);
    }
  }, [isMobile]);

  const isLow = perfTier === 'low';

  return (
    <Canvas
      camera={{
        position: [0, isMobile ? 0.25 : 0, isMobile ? 8 : 7],
        fov: isMobile ? 66 : 50,
        near: 0.1,
        far: 100,
      }}
      dpr={[0.45, dpr]}
      frameloop="always"
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
      <PerformanceMonitor
        onDecline={() => {
          setDpr(prev => Math.max(0.5, prev - 0.15));
          setPerfTier('low');
        }}
        onIncline={() => {
          if (!isMobile) {
            setDpr(prev => Math.min(1.5, prev + 0.1));
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

      {/* Lighter post-processing on low-end */}
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
