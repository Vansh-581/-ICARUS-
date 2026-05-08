'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dramatic radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.12) 0%, rgba(180,140,30,0.04) 30%, transparent 65%)',
            scale,
          }}
        />
        {/* Gold particles — CSS only */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-16 bg-gradient-to-b from-gold-400/30 to-transparent"
            style={{
              left:  `${15 + i * 6.5}%`,
              top:   `${10 + Math.sin(i) * 60}%`,
              rotate: `${-20 + i * 4}deg`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
        style={{ opacity }}
      >
        {/* Decorative top */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold-400/40" />
          <span className="font-mono text-xs tracking-[0.5em] text-gold-500/50 uppercase">
            The Invitation
          </span>
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
          <span className="block text-white/80">Ascend?</span>
        </motion.h2>

        <motion.p
          className="font-cormorant text-xl md:text-2xl text-white/45 italic leading-relaxed mb-14 max-w-2xl mx-auto"
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
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(212,175,55,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-cinzel text-sm tracking-[0.3em] uppercase px-10 py-5 bg-gold-400/15 border border-gold-400/60 text-gold-200 hover:bg-gold-400/25 transition-all duration-400"
          >
            Begin Your Journey
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-cinzel text-sm tracking-[0.3em] uppercase px-10 py-5 border border-white/10 text-white/40 hover:border-white/25 hover:text-white/60 transition-all duration-400"
          >
            View Programs
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.div
          className="mt-32 flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />
          <p className="font-cinzel text-xs tracking-[0.5em] text-white/20 uppercase">
            ICARUS Debate Academy
          </p>
          <p className="font-mono text-xs text-white/15 tracking-widest">
            © {new Date().getFullYear()} — All Rights Reserved
          </p>
          <p className="font-cormorant text-sm text-gold-500/20 italic">
            Fly higher. Always.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
