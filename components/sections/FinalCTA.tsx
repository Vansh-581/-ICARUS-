'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.06]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.13) 0%, rgba(180,140,30,0.05) 30%, transparent 65%)',
            scale: bgScale,
          }}
        />
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-gold-400/25 to-transparent"
            style={{
              height: `${48 + i * 8}px`,
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 3) * 28}%`,
              rotate: `${-18 + i * 5}deg`,
            }}
            animate={{ y: [0, -24, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 4.5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold-400/40" />
          <span className="font-mono text-xs tracking-[0.5em] text-gold-500/50 uppercase">The Invitation</span>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold-400/40" />
        </motion.div>

        <motion.h2
          className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-black leading-none mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="block gold-shimmer-text">Are You</span>
          <span className="block gold-shimmer-text">Ready to</span>
          <span className="block" style={{ color: 'var(--text-muted)' }}>Ascend?</span>
        </motion.h2>

        <motion.p
          className="font-cormorant text-xl md:text-2xl italic leading-relaxed mb-14 max-w-2xl mx-auto"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          The wax is strong. The wings are ready.
          The only question is whether you have the courage to fly.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(212,175,55,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-cinzel font-bold text-sm tracking-[0.3em] uppercase px-10 py-5 border transition-all duration-300"
            style={{ background: 'rgba(212,175,55,0.12)', borderColor: 'rgba(212,175,55,0.55)', color: 'rgba(212,175,55,0.95)' }}
          >
            Begin Your Journey
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-cinzel text-sm tracking-[0.3em] uppercase px-10 py-5 border transition-all duration-300"
            style={{ borderColor: 'var(--text-muted)', color: 'var(--text-muted)' }}
          >
            View Programs
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-28 sm:mt-36 flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />
          <p className="font-mono font-bold text-xs tracking-[0.5em] uppercase" style={{ color: 'var(--text-muted)' }}>
            ICARUS
          </p>
          <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Copyright 2025 - All Rights Reserved
          </p>
          <p className="font-cormorant text-sm italic" style={{ color: 'var(--text-muted)' }}>
            Trust but verify.
          </p>
          <p className="font-mono text-[10px] leading-relaxed tracking-wider max-w-2xl" style={{ color: 'var(--text-faint)' }}>
            In case of discrepancies, cases will be handled or worked upon by the ICARUS lawyer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
