'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import IcarusCharacter from './IcarusCharacter';
import FloatingParticles from './FloatingParticles';
import SceneLighting from './SceneLighting';
import CameraRig from './CameraRig';
import AtmosphereBackground from './AtmosphereBackground';
import WingTrails from './WingTrails';

interface IcarusSceneProps {
  scrollProgress: number;
  isMobile?: boolean;
}

export default function IcarusScene({
  scrollProgress,
  isMobile = false,
}: IcarusSceneProps) {
  const [dpr, setDpr] = useState(isMobile ? 0.75 : 1);
  const [perfTier, setPerfTier] = useState<'low' | 'mid' | 'high'>(isMobile ? 'low' : 'mid');

  // Detect low-end device from memory or mobile
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory && nav.deviceMemory <= 2) {
      setPerfTier('low');
      setDpr(0.6);
    } else if (isMobile) {
      setPerfTier('low');
      setDpr(0.75);
    }
  }, [isMobile]);

  const isLow  = perfTier === 'low';
  const isMid  = perfTier === 'mid';
  const isHigh = perfTier === 'high';

  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: isMobile ? 60 : 50,
        near: 0.1,
        far: 100,
      }}
      dpr={[0.6, dpr]}
      frameloop="always"
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
        // Reduce precision on low-end
        precision: isLow ? 'mediump' : 'highp',
      }}
      shadows={false}
      style={{ background: '#0c0c1a' }}
    >
      {/* Auto-degrade DPR on performance drop */}
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
        <AtmosphereBackground scrollProgress={scrollProgress} />

        <SceneLighting scrollProgress={scrollProgress} />

        {/* Fewer particles on low-end */}
        <FloatingParticles
          count={isLow ? 25 : isMobile ? 40 : 70}
          scrollProgress={scrollProgress}
        />

        {/* Skip wing trails on low-end */}
        {!isLow && <WingTrails scrollProgress={scrollProgress} />}

        <IcarusCharacter scrollProgress={scrollProgress} />

        <CameraRig scrollProgress={scrollProgress} />
      </Suspense>

      {/* Lighter post-processing on low-end */}
      <EffectComposer multisampling={0} enabled={!isLow}>
        <Bloom
          intensity={isLow ? 0.3 : 0.6}
          luminanceThreshold={isLow ? 0.7 : 0.5}
          luminanceSmoothing={0.8}
          mipmapBlur={!isLow}
        />
        <Vignette
          offset={0.2}
          darkness={isLow ? 0.5 : 0.65}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
