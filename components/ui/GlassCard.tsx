'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

export default function GlassCard({
  children,
  className = '',
  glowColor = 'rgba(212,175,55,0.08)',
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={`glass-panel relative overflow-hidden group ${className}`}
      style={{ '--glow': glowColor } as React.CSSProperties}
    >
      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)` }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
