'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const textAlign =
    align === 'center' ? 'text-center items-center' :
    align === 'left'   ? 'text-left items-start'    : 'text-right items-end';

  return (
    <motion.div
      className={`flex flex-col gap-3 sm:gap-4 ${textAlign}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.8 }}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.8em', y: 20 }}
          whileInView={{ opacity: 1, letterSpacing: '0.45em', y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="font-mono text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] text-gold-500 uppercase"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 80, rotateX: -40 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false }}
        className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight perspective-text"
      >
        <span className="gold-text animated-title inline-block">{title}</span>
      </motion.h2>

      {align === 'center' && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="icarus-divider w-36 sm:w-48"
        >
          <span className="text-gold-500/60 text-base sm:text-lg">✦</span>
        </motion.div>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15 }}
          viewport={{ once: false }}
          className="font-cormorant text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed italic"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
