'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mission-card', {
        y: 60, opacity: 0,
      }, {
        scrollTrigger: { trigger: '.mission-grid', start: 'top 75%' },
        y: 0, opacity: 1,
        stagger: 0.18,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="mission" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Asymmetric background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          eyebrow="Purpose"
          title="Mission & Vision"
          subtitle="To forge the next generation of intellectual leaders who argue not just to win — but to illuminate."
        />

        <div className="mission-grid mt-20 grid lg:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="mission-card glass-panel p-10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="absolute -top-4 left-10">
              <span className="font-mono text-[200px] text-gold-400/[0.03] font-bold leading-none select-none">
                M
              </span>
            </div>
            <div className="relative z-10">
              <span className="font-mono text-xs tracking-[0.5em] text-gold-500/60 uppercase block mb-6">
                01 / Mission
              </span>
              <h3 className="font-cinzel text-2xl md:text-3xl text-white font-semibold mb-5 leading-snug">
                Sharpen Every<br />
                <span className="gold-text">Mind to Its Edge</span>
              </h3>
              <p className="font-cormorant text-lg text-white/50 leading-relaxed">
                Our mission is to cultivate mastery of reasoned discourse, critical thinking, 
                and persuasive rhetoric — transforming students into thinkers who command 
                any room they enter, any argument they face, any future they choose to build.
              </p>
            </div>
            {/* Hover border glow */}
            <div className="absolute inset-0 border border-gold-400/0 group-hover:border-gold-400/20 transition-all duration-500 pointer-events-none" />
          </div>

          {/* Vision */}
          <div className="mission-card glass-panel p-10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="absolute -top-4 left-10">
              <span className="font-mono text-[200px] text-gold-400/[0.03] font-bold leading-none select-none">
                V
              </span>
            </div>
            <div className="relative z-10">
              <span className="font-mono text-xs tracking-[0.5em] text-gold-500/60 uppercase block mb-6">
                02 / Vision
              </span>
              <h3 className="font-cinzel text-2xl md:text-3xl text-white font-semibold mb-5 leading-snug">
                A World Led by<br />
                <span className="gold-text">Thoughtful Voices</span>
              </h3>
              <p className="font-cormorant text-lg text-white/50 leading-relaxed">
                We envision a world where the most powerful leaders are the most rigorous 
                thinkers — where institutions, parliaments, and boardrooms are shaped by 
                those trained to reason fearlessly, speak precisely, and lead with conviction.
              </p>
            </div>
            <div className="absolute inset-0 border border-gold-400/0 group-hover:border-gold-400/20 transition-all duration-500 pointer-events-none" />
          </div>
        </div>

        {/* Central quote */}
        <motion.blockquote
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="font-mono text-xs tracking-[0.4em] text-gold-500/40 mb-6 uppercase">
            ✦ &nbsp; The Icarus Principle &nbsp; ✦
          </div>
          <p className="font-cinzel text-xl md:text-3xl lg:text-4xl font-light text-white/70 leading-relaxed max-w-4xl mx-auto">
            "The wings that carry you highest are forged from{' '}
            <em className="gold-text not-italic font-semibold">discipline</em>,{' '}
            <em className="gold-text not-italic font-semibold">knowledge</em>, and{' '}
            <em className="gold-text not-italic font-semibold">courage</em>."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
