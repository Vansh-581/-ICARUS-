'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard    from '@/components/ui/GlassCard';
import gsap         from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '800+',  label: 'Alumni Worldwide'   },
  { value: '12',    label: 'Years of Excellence' },
  { value: '94%',   label: 'Tournament Win Rate' },
  { value: '3',     label: 'International Titles'},
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-stat', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 30, opacity: 0,
        stagger: 0.1, duration: 0.7,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse, var(--section-glow) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-7 lg:gap-10">
            <SectionTitle
              eyebrow="Who We Are"
              title="Born From Myth, Built for Minds"
              align="left"
            />

            <motion.p
              className="font-cormorant text-lg md:text-xl leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Like Icarus who dared to soar beyond all convention, we train thinkers 
              who refuse the gravity of mediocrity. ICARUS Debate Academy is not merely 
              an institution — it is an ascension.
            </motion.p>

            <motion.p
              className="font-cormorant  text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
              
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Founded on the principle that rigorous argumentation, elegant expression, 
              and unshakeable logic are the true wings of human progress. Every student 
              who trains here learns not just to debate — but to reshape reality with words.
            </motion.p>

            {/* Gold decorative line */}
            <motion.div
              className="h-px bg-gradient-to-r from-gold-400 to-transparent"
              style={{ width: 0 }}
              whileInView={{ width: '60%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((stat, i) => (
              <GlassCard
                key={stat.label}
                delay={i * 0.1}
                className="p-6 sm:p-8 about-stat"
              >
                <p className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold gold-text mb-2">
                  {stat.value}
                </p>
                <p className="font-mono text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase"
                   style={{ color: 'var(--text-faint)' }}>
                  {stat.label}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Bottom ornament */}
        <motion.div
          className="mt-16 sm:mt-24 flex items-center gap-6 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-400/20" />
          <span className="font-cinzel font-bold text-xs tracking-[0.5em] text-gold-500/40 uppercase hidden sm:block">
            Icarus Debate Academy
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-400/20" />
        </motion.div>
      </div>
    </section>
  );
}
