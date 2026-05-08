'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref   = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    const step  = Math.ceil(target / 60);
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + step;
        if (next >= target) { clearInterval(timer); return target; }
        return next;
      });
    }, 24);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const AWARDS = [
  { year: '2024', title: 'World Schools Debating Championship — Semi-Finalists' },
  { year: '2024', title: 'National Parliamentary Debate — 1st Place' },
  { year: '2023', title: 'Asia-Pacific Open Debate — Best Team' },
  { year: '2023', title: 'National Moot Court Championship — Grand Finalists' },
  { year: '2022', title: 'International Schools Forum — Best Speakers (3 titles)' },
  { year: '2022', title: 'Regional British Parliamentary — Champions' },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(212,175,55,0.04) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          eyebrow="Our Record"
          title="Achievements"
          subtitle="Years of excellence, measured in minds changed and trophies won."
        />

        {/* Big stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { target: 847,  suffix: '+',  label: 'Students Trained'   },
            { target: 94,   suffix: '%',  label: 'Tournament Win Rate' },
            { target: 3,    suffix: '',   label: 'Int\'l Championships' },
            { target: 12,   suffix: '',   label: 'Years of Excellence'  },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-panel p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <p className="font-cinzel text-4xl md:text-5xl font-bold gold-text">
                <Counter target={stat.target} suffix={stat.suffix} />
              </p>
              <p className="font-mono text-xs tracking-[0.3em] text-white/35 uppercase mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Awards timeline */}
        <div className="mt-24">
          <motion.p
            className="font-mono text-xs tracking-[0.5em] text-gold-500/50 uppercase mb-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ✦ Notable Accolades ✦
          </motion.p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-400/20 to-transparent hidden md:block" />

            <div className="flex flex-col gap-6">
              {AWARDS.map((award, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-6 group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  {/* Year */}
                  <span className="font-mono text-xs text-gold-500/50 w-16 shrink-0 text-right hidden md:block">
                    {award.year}
                  </span>

                  {/* Dot */}
                  <div className="hidden md:flex w-3 h-3 rounded-full border border-gold-400/40 shrink-0 group-hover:border-gold-300 group-hover:bg-gold-400/20 transition-all duration-300" />

                  {/* Title */}
                  <div className="glass-panel flex-1 px-6 py-4 group-hover:border-gold-400/25 transition-all duration-300">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-cormorant text-base md:text-lg text-white/70 group-hover:text-white/90 transition-colors">
                        {award.title}
                      </span>
                      <span className="font-mono text-xs text-gold-500/40 md:hidden shrink-0">
                        {award.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
