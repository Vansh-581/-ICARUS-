'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

const IcarusScene = dynamic(() => import('../3d/IcarusScene'), {
  ssr: false,
});

export default function Hero() {
  // ── KEY PERF FIX: use a ref, NOT state, so scroll events
  //    never trigger React re-renders on every tick ──────────
  const scrollProgressRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Update ref on scroll — zero React re-renders
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

  // Framer-motion scroll for text (motion values = no re-render)
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
        <div className="hero-fast-backdrop" aria-hidden="true">
          <div className="hero-fast-sigil">ICARUS</div>
          <div className="hero-fast-ring hero-fast-ring-outer" />
          <div className="hero-fast-ring hero-fast-ring-inner" />
          <div className="hero-fast-wing hero-fast-wing-left" />
          <div className="hero-fast-wing hero-fast-wing-right" />
        </div>

        {/* 3D scene — receives stable ref, never causes re-renders */}
        <div className="absolute inset-0 z-10">
          <IcarusScene scrollProgressRef={scrollProgressRef} isMobile={isMobile} />
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'var(--body-bg)' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 1.8, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.p
            className="font-mono text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[0.7em] text-gold-500/70 uppercase mb-4 sm:mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.9 }}
          >
            Est. — the art of argument
          </motion.p>

          <motion.h1
            className="font-cinzel text-center leading-none mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="block text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] gold-shimmer-text font-black tracking-[-0.02em]">
              ICARUS
            </span>
            <span className="block text-xs sm:text-sm md:text-lg tracking-[0.5em] sm:tracking-[0.6em] gold-text font-light mt-1 sm:mt-2">
              DEBATE ACADEMY
            </span>
          </motion.h1>

          <motion.p
            className="font-cormorant text-base sm:text-lg md:text-2xl text-white/40 italic tracking-wide mt-4 sm:mt-6 px-6 text-center max-w-sm sm:max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.9 }}
          >
            Dare to fly where logic becomes legend.
          </motion.p>

          <motion.div
            className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
          >
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-gold-500/40 uppercase">
              Ascend
            </span>
            <motion.div
              className="w-px h-10 sm:h-12 bg-gradient-to-b from-gold-400/60 to-transparent"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to top, var(--body-bg) 0%, transparent 100%)' }}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 h-10 pointer-events-none z-30"
          style={{ background: 'var(--body-bg)', transformOrigin: 'top' }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-30"
          style={{ background: 'var(--body-bg)', transformOrigin: 'bottom' }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </section>
  );
}
