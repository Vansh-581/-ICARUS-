'use client';

import { motion } from 'framer-motion';

// Fewer orbs, lower opacity for performance
const ORBS = [
  { size: 280, x: '10%',  y: '20%',  delay: 0,   duration: 22 },
  { size: 180, x: '75%',  y: '15%',  delay: 4,   duration: 26 },
  { size: 220, x: '55%',  y: '65%',  delay: 9,   duration: 20 },
];

export default function AmbientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  orb.size,
            height: orb.size,
            left:   orb.x,
            top:    orb.y,
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)',
            filter: 'blur(50px)',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -20, 30, -15, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
