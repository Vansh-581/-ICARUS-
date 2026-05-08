'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export let lenisInstance: Lenis | null = null;

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.6,
    });

    lenisInstance = lenis;

    // ── Key: tell ScrollTrigger about every Lenis scroll event ───────────
    lenis.on('scroll', ScrollTrigger.update);

    // ── Also use GSAP's ticker as the raf source ──────────────────────────
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0); // prevent GSAP lag compensation from fighting Lenis

    // ScrollTrigger uses its own scroller, point it to window
    ScrollTrigger.defaults({ scroller: window });

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisInstance = null;
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <>{children}</>;
}
