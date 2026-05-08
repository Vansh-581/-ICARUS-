'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const TESTIMONIALS = [
  {
    quote: "ICARUS didn't teach me to win arguments. It taught me to think in dimensions I didn't know existed. I walked into Oxford's philosophy interview knowing I was ready.",
    name: 'Kavya Sharma',
    role: 'Oxford University, PPE — Batch of 2023',
  },
  {
    quote: "The rigor here is unlike anything I've experienced. Dr. Mehta broke down every flaw in my reasoning until there were none left. Three months later, I was national champion.",
    name: 'Aryan Patel',
    role: 'National Debate Champion — 2024',
  },
  {
    quote: "I was terrified of public speaking. Now I address boardrooms of hundreds without a note in hand. ICARUS transformed my relationship with language itself.",
    name: 'Sunita Krishnan',
    role: 'VP Strategy, Fintech Startup — Alumni 2019',
  },
  {
    quote: "Most programs teach you formats. ICARUS teaches you to think. That's the difference between a debater and a mind that can't be stopped.",
    name: 'Dhruv Raghunathan',
    role: 'WSDC Semi-Finalist, Class of 2022',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.05) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <SectionTitle
          eyebrow="What They Say"
          title="Alumni Voices"
        />

        <div className="mt-20 relative min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-panel p-10 md:p-14 relative overflow-hidden"
            >
              {/* Large quote mark */}
              <span className="absolute top-4 left-8 font-cinzel text-[120px] text-gold-400/[0.05] leading-none select-none">
                "
              </span>

              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

              <p className="font-cormorant text-xl md:text-2xl lg:text-3xl text-white/70 leading-relaxed italic relative z-10 mb-8">
                "{TESTIMONIALS[active].quote}"
              </p>

              <div className="flex flex-col items-center gap-1 relative z-10">
                <div className="w-8 h-px bg-gold-400/40 mb-3" />
                <p className="font-cinzel text-sm text-white font-semibold">
                  {TESTIMONIALS[active].name}
                </p>
                <p className="font-mono text-xs tracking-widest text-gold-500/50 uppercase">
                  {TESTIMONIALS[active].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 ${
                i === active
                  ? 'w-8 h-px bg-gold-400'
                  : 'w-2 h-px bg-gold-400/25 hover:bg-gold-400/50'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
