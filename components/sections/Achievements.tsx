'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
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
    <section id="achievements" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(212,175,55,0.04) 0%, transparent 65%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        <SectionTitle
          eyebrow="Our Record"
          title="Achievements"
          subtitle="Years of excellence, measured in minds changed and trophies won."
        />

        {/* Stats row */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { target: 847, suffix: '+', label: 'Students Trained'    },
            { target: 94,  suffix: '%', label: 'Tournament Win Rate'  },
            { target: 3,   suffix: '',  label: "Int'l Championships"  },
            { target: 12,  suffix: '',  label: 'Years of Excellence'  },
          ].map((stat, i) => (
            <motion.div key={stat.label} className="glass-panel p-5 sm:p-8"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <p className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold gold-text">
                <Counter target={stat.target} suffix={stat.suffix} />
              </p>
              <p className="font-mono text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mt-2"
                style={{ color: 'rgba(255,255,255,0.35)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Awards timeline */}
        <div className="mt-16 sm:mt-24">
          <motion.p className="font-mono text-[13px] font-bold tracking-[0.5em] uppercase mb-8 sm:mb-10 text-center"
            style={{ color: 'rgba(189, 158, 53, 0.5)' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            ✦ Notable Accolades ✦
          </motion.p>

          <div className="relative">
            {/* Vertical line — desktop only */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.2), transparent)' }} />

            <div className="flex flex-col gap-4 sm:gap-6">
              {AWARDS.map((award, i) => (
                <motion.div key={i} className="flex items-center gap-3 sm:gap-6 group"
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  {/* Year — desktop only */}
                  <span className="font-mono text-xs w-16 shrink-0 text-right hidden md:block"
                    style={{ color: 'rgba(212,175,55,0.5)' }}>
                    {award.year}
                  </span>

                  {/* Dot — desktop only */}
                  <div className="hidden md:flex w-3 h-3 rounded-full border shrink-0 transition-all duration-300"
                    style={{ borderColor: 'rgba(175, 146, 51, 0.4)' }} />

                  {/* Card */}
                  <div className="glass-panel flex-1 min-w-0 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300">
                    {/* 
                      KEY FIX: flex-col on mobile (year above title stacked),
                      flex-row on md+. Title has min-w-0 + break-words so it
                      wraps instead of overflowing the flex container.
                    */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                      <span className="font-cormorant text-sm sm:text-base md:text-lg leading-snug
                        min-w-0 break-words transition-colors duration-300"
                        style={{ color: 'rgba(255,255,255,0.7)', wordBreak: 'break-word' }}
                      >
                        {award.title}
                      </span>
                      {/* Year badge — always visible on mobile, hidden on md (shown left) */}
                      <span className="font-mono text-[9px] sm:text-xs shrink-0 md:hidden"
                        style={{ color: 'rgba(212,175,55,0.45)' }}>
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
