'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navigation        from '@/components/ui/Navigation';
import CustomCursor      from '@/components/ui/CustomCursor';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import Mission           from '@/components/sections/Mission';
import CoreValues        from '@/components/sections/CoreValues';
import Programs          from '@/components/sections/Programs';
import Achievements      from '@/components/sections/Achievements';
import Team              from '@/components/sections/Team';
import Contact           from '@/components/sections/Contact';
import FinalCTA          from '@/components/sections/FinalCTA';
import SmoothScroll      from '@/components/SmoothScroll';

// Lazy load heavy sections
const About    = dynamic(() => import('@/components/sections/About'));
const Hero     = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center" style={{ background: 'var(--body-bg)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border border-gold-400 rounded-full animate-ping opacity-40" />
        <p className="font-cinzel text-gold-400 text-xs tracking-[0.4em] uppercase opacity-60">
          Ascending…
        </p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <SmoothScroll>
      <ScrollProgressBar />
      <Navigation />

      {/* Hide custom cursor on touch devices */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <main>
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
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
