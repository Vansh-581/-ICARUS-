'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

type ProgramId = 'training' | 'mun' | 'debate-concepts' | 'public-speaking';

const PROGRAMS = [
  {
    id: 'training' as ProgramId,
    level: '01',
    title: 'Training Sessions',
    intro: 'Focused sessions for students who want regular practice, clearer arguments, stronger delivery, and mentor-led feedback.',
    details: ['Debate drills and mock rounds', 'Research and rebuttal practice', 'Online and offline modes', 'Personal feedback after sessions'],
  },
  {
    id: 'mun' as ProgramId,
    level: '02',
    title: 'Model United Nations',
    intro: 'Preparation for delegates who want to understand committees, diplomacy, policy research, speaking, and documentation.',
    details: ['Committee procedure basics', 'Position papers and resolutions', 'Diplomacy and moderated caucus practice', 'Delegate confidence building'],
  },
  {
    id: 'debate-concepts' as ProgramId,
    level: '03',
    title: 'Concepts of Debates',
    intro: 'A foundation-first program for students learning debate structure, speaker roles, case building, clash, and rebuttals.',
    details: ['Argument structure', 'Motion analysis', 'Speaker roles and formats', 'Clash and rebuttal clarity'],
  },
  {
    id: 'public-speaking' as ProgramId,
    level: '04',
    title: 'Public Speaking',
    intro: 'Practical speaking training for students who want better stage presence, voice control, confidence, and speech structure.',
    details: ['Voice and body language', 'Speech writing', 'Impromptu speaking', 'Presentation confidence'],
  },
];

const PRICE_TIERS = [
  {
    title: 'Training',
    price: '₹200-500',
    unit: '*per student',
    features: [
      'Model UN, Debate and Public Speaking basics',
      'Professional Mentors',
      'Mock Sessions',
      'Online/Offline modes',
    ],
  },
  {
    title: 'Multi-Level',
    price: '₹2.5K-3.5K',
    unit: '*per student',
    featured: true,
    features: [
      'Training Included',
      'Management and Hosting of events at Inter/District/State Level',
      'Experienced Judges and Competitive Environment',
      'Delegation Kits, Certificates, Awards and more',
    ],
  },
  {
    title: 'Intra-Level',
    price: '₹1K-1.5K',
    unit: '*per student',
    features: [
      'Training Included',
      'Management and Hosting of events at Intra-Level',
      'Experienced Judges and Competitive Environment',
      'Delegation Kits, Certificates and Awards',
    ],
  },
];

export default function Programs() {
  const [active, setActive] = useState<ProgramId>('training');
  const activeProgram = PROGRAMS.find(program => program.id === active)!;

  return (
    <section id="programs" className="programs-section relative py-28 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-96 bg-gradient-to-b from-transparent via-gold-400/15 to-transparent" />
        <div className="absolute left-1/2 top-24 -translate-x-1/2 text-[18vw] font-cinzel font-black tracking-[0.08em] select-none opacity-[0.035]">
          ICARUS
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          eyebrow="What We Offer"
          title="Programs"
          subtitle="Select a program to read its introduction, then review the price list below."
        />

        <div className="mt-16 grid lg:grid-cols-[0.95fr_1.25fr] gap-8 items-start">
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {PROGRAMS.map(program => {
              const isActive = active === program.id;
              return (
                <button
                  key={program.id}
                  onClick={() => setActive(program.id)}
                  className={`program-toggle group text-left relative overflow-hidden p-5 sm:p-6 transition-all duration-300 ${isActive ? 'is-active' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="program-toggle-level font-cinzel text-2xl font-bold">
                      {program.level}
                    </span>
                    <div>
                      <h3 className="program-toggle-title font-cinzel text-sm sm:text-base tracking-[0.16em] uppercase">
                        {program.title}
                      </h3>
                      <p className="program-toggle-meta font-mono text-[10px] tracking-[0.22em] uppercase mt-1">
                        Click for intro
                      </p>
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="programActiveLine"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-400 pointer-events-none"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="program-detail-card relative overflow-hidden p-8 sm:p-10"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-600/18 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <span className="font-mono text-xs tracking-[0.5em] text-gold-500/70 uppercase">
                  Program {activeProgram.level}
                </span>
                <h3 className="font-cinzel text-3xl md:text-4xl font-semibold text-white mt-3">
                  {activeProgram.title}
                </h3>
                <p className="font-cormorant text-lg md:text-xl text-white/60 leading-relaxed mt-5">
                  {activeProgram.intro}
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {activeProgram.details.map(detail => (
                    <div key={detail} className="program-detail-chip px-4 py-3 font-mono text-[10px] tracking-[0.18em] uppercase">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="program-price-board relative mt-20 overflow-hidden px-4 py-12 sm:px-8 lg:px-10">
          <div className="absolute inset-0 pointer-events-none">
            <div className="program-price-ghost">ICARUS</div>
          </div>

          <div className="relative z-10 text-center">
            <p className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.28em] text-white">
              ICARUS
            </p>
            <h3 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.18em] text-gold-400 mt-2">
              Price List
            </h3>
          </div>

          <div className="relative z-10 mt-12 grid lg:grid-cols-3 items-stretch max-w-6xl mx-auto">
            {PRICE_TIERS.map(tier => (
              <motion.div
                key={tier.title}
                className={`price-tier-card relative flex flex-col text-center px-6 py-9 ${tier.featured ? 'is-featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <h4 className="font-cinzel text-2xl font-black tracking-[0.18em] text-gold-400 uppercase pb-5 border-b border-gold-400/40">
                  {tier.title}
                </h4>

                <div className="flex flex-col gap-5 mt-6 flex-1">
                  {tier.features.map(feature => (
                    <p key={feature} className="font-cormorant text-base leading-snug text-white/85">
                      {feature}
                    </p>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="font-cinzel text-4xl sm:text-5xl font-black text-gold-400 tracking-tight">
                    {tier.price}
                  </p>
                  <p className="font-cormorant text-base text-white/80 mt-1">
                    {tier.unit}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold-400 mt-4">
                    Negotiable
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 mt-12 text-center">
            <p className="font-cormorant text-xl sm:text-2xl text-white/85">
              for more info, contact at:
            </p>
            <p className="font-cormorant text-xl sm:text-2xl text-white">
              icarusdebate@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
