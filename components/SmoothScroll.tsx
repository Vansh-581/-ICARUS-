'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export let lenisInstance: Lenis | null = null;

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const isTouch  = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    // Also skip Lenis on low-end devices — native scroll is faster
    const isLowEnd = document.documentElement.getAttribute('data-perf') === 'low';

    if (isTouch || isMobile || isLowEnd) {
      ScrollTrigger.defaults({ scroller: window });
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,          // slightly snappier than 1.3 — less accumulated work
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.6,
    });

    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.defaults({ scroller: window });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <>{children}</>;
}
