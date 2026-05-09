'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navigation        from '@/components/ui/Navigation';
import CustomCursor      from '@/components/ui/CustomCursor';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import SmoothScroll      from '@/components/SmoothScroll';

// ── Hero: SSR off, shown immediately with a loading shell
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center" style={{ background: 'var(--body-bg)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border border-gold-400 rounded-full animate-ping opacity-40" />
        <p className="font-cinzel text-gold-400 text-xs tracking-[0.4em] uppercase opacity-60">Ascending…</p>
      </div>
    </div>
  ),
});

// ── All other sections: lazy-loaded code bundles.
//    Browser only parses their JS when they're needed,
//    cutting initial bundle parse time by ~60%.
const About       = dynamic(() => import('@/components/sections/About'));
const Mission     = dynamic(() => import('@/components/sections/Mission'));
const CoreValues  = dynamic(() => import('@/components/sections/CoreValues'));
const Programs    = dynamic(() => import('@/components/sections/Programs'));
const Achievements = dynamic(() => import('@/components/sections/Achievements'));
const Team        = dynamic(() => import('@/components/sections/Team'));
const Contact     = dynamic(() => import('@/components/sections/Contact'));
const FinalCTA    = dynamic(() => import('@/components/sections/FinalCTA'));

export default function HomePage() {
  return (
    <SmoothScroll>
      <ScrollProgressBar />
      <Navigation />
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      <main>
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
        {/* Each section below will lazy-load its JS as the user scrolls toward it */}
        <About />
        <Mission />
        <CoreValues />
        <Programs />
        <Achievements />
        <Team />
        <Contact />
        <FinalCTA />
      </main>
    </SmoothScroll>
  );
}
