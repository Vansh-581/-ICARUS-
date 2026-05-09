'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

const IcarusScene = dynamic(() => import('../3d/IcarusScene'), { ssr: false });

export default function Hero() {
  const scrollProgressRef = useRef(0);
  const [isMobile, setIsMobile]   = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scroll progress → ref only (zero React re-renders)
  useEffect(() => {
    const handle = () => {
      if (!heroRef.current) return;
      const rect    = heroRef.current.getBoundingClientRect();
      const total   = heroRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      scrollProgressRef.current = Math.max(0, Math.min(1, scrolled / (total || 1)));
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Framer motion values for text fade-out on scroll (no re-renders)
  const { scrollYProgress } = useScroll({ target: heroRef });
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.35], [0, -60]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative"
      style={{ height: isMobile ? '170vh' : '190vh' }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* CSS backdrop elements */}
        <div className="hero-fast-backdrop" aria-hidden="true">
          <div className="hero-fast-sigil">ICARUS</div>
          <div className="hero-fast-ring hero-fast-ring-outer" />
          <div className="hero-fast-ring hero-fast-ring-inner" />
          <div className="hero-fast-wing hero-fast-wing-left" />
          <div className="hero-fast-wing hero-fast-wing-right" />
        </div>

        {/* 3-D canvas — transparent so page bg shows through */}
        <div className="absolute inset-0 z-10">
          <IcarusScene scrollProgressRef={scrollProgressRef} isMobile={isMobile} />
        </div>

        {/* Cinematic reveal vignette */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'var(--body-bg)' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 1.8, ease: 'easeInOut' }}
        />

        {/* ── Hero text ────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/*
            hero-text-panel:
            • Dark theme / desktop → invisible wrapper (no bg)
            • Light theme + mobile → warm frosted-glass card so text
              stays readable against the golden 3D model behind it
          */}
          <div className="hero-text-panel flex flex-col items-center w-full max-w-lg sm:max-w-none">

            {/* Eyebrow */}
            <motion.p
              className="font-mono text-[9px] sm:text-xs tracking-[0.45em] sm:tracking-[0.7em] text-black-500/70 uppercase mb-4 sm:mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.9 }}
            >
              Est.2025 — the art of argument
            </motion.p>

            {/* Main title — LARGER on mobile for visibility */}
            <motion.h1
              className="font-cinzel text-center leading-none mb-3 sm:mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/*
                Mobile: text-6xl (60px) — bigger than before so it dominates
                the screen and stays readable over the model.
                Desktop: text-7xl → 8rem → 10rem progressive scale.
              */}
              <span className="block text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] gold-shimmer-text font-black tracking-[-0.02em] hero-title-shadow">
                ICARUS
              </span>
              <span className="block text-[0.6rem] sm:text-sm md:text-lg tracking-[0.4em] sm:tracking-[0.6em] gold-text font-light mt-1.5 sm:mt-2">
                DEBATE ACADEMY
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="font-cormorant text-base sm:text-lg md:text-2xl italic tracking-wide mt-4 sm:mt-6 px-2 text-center max-w-xs sm:max-w-lg hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.9 }}
            >
              Dare to fly where logic becomes legend.
            </motion.p>
          </div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
          >
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-gold-500/50 uppercase hero-scroll-label">
              Ascend
            </span>
            <motion.div
              className="w-px h-10 sm:h-12 bg-gradient-to-b from-gold-400/60 to-transparent"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* Bottom fade into page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to top, var(--body-bg) 0%, transparent 100%)' }}
        />

        {/* Letterbox bars */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-10 pointer-events-none z-30"
          style={{ background: 'var(--body-bg)', transformOrigin: 'top' }}
          initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-30"
          style={{ background: 'var(--body-bg)', transformOrigin: 'bottom' }}
          initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </section>
  );
}
