'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const PROGRAMS = [
  {
    id: 'foundational',
    level: 'I',
    title: 'Foundational Oratory',
    subtitle: 'Ages 12 – 15',
    duration: '12 Weeks',
    desc: 'Build the bedrock of great debate: structure, evidence, and voice. Students master parliamentary format, logical reasoning, and the art of thinking on their feet.',
    skills: ['Argument Structure', 'Rebuttal Technique', 'Public Speaking', 'Research Methods'],
    color: 'from-gold-600/20 to-transparent',
  },
  {
    id: 'competitive',
    level: 'II',
    title: 'Competitive Debate',
    subtitle: 'Ages 15 – 18',
    duration: '20 Weeks',
    desc: 'Forge tournament-ready debaters through intensive practice, national format training, and regular inter-school competitions. The crucible that creates champions.',
    skills: ['WSDC Format', 'Cross-Examination', 'Flowing & Prep', 'Case Construction'],
    color: 'from-gold-400/25 to-transparent',
  },
  {
    id: 'advanced',
    level: 'III',
    title: 'Advanced Advocacy',
    subtitle: 'Ages 17+',
    duration: '16 Weeks',
    desc: 'Elite training for students aiming for national and international glory. Philosophical depth, advanced rhetoric, and the psychology of persuasion for top-tier competitors.',
    skills: ['Critical Theory', 'Philosophical Framework', 'Advanced Rhetoric', 'Team Strategy'],
    color: 'from-gold-300/20 to-transparent',
  },
  {
    id: 'leadership',
    level: 'IV',
    title: 'Leadership Lab',
    subtitle: 'All Ages',
    duration: '8 Weeks',
    desc: 'Beyond debate into the boardroom, the courtroom, and the podium. Real-world persuasion, negotiation, and leadership communication for the next generation of decision-makers.',
    skills: ['Negotiation', 'Executive Communication', 'Media Training', 'Crisis Speaking'],
    color: 'from-gold-500/20 to-transparent',
  },
];

export default function Programs() {
  const [active, setActive] = useState<string>('competitive');

  const activeProgram = PROGRAMS.find(p => p.id === active)!;

  return (
    <section id="programs" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-96 bg-gradient-to-b from-transparent via-gold-400/15 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          eyebrow="What We Offer"
          title="Programs"
          subtitle="Four pathways. One destination: mastery."
        />

        <div className="mt-20 grid lg:grid-cols-[1fr_1.4fr] gap-8 items-start">
          {/* Program selector */}
          <div className="flex flex-col gap-3">
            {PROGRAMS.map((prog) => (
              <button
                key={prog.id}
                onClick={() => setActive(prog.id)}
                className={`group text-left glass-panel p-6 relative overflow-hidden transition-all duration-300 ${
                  active === prog.id
                    ? 'border-gold-400/40 shadow-gold'
                    : 'hover:border-gold-400/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-cinzel text-2xl font-bold transition-colors duration-300 ${
                    active === prog.id ? 'gold-text' : 'text-white/20'
                  }`}>
                    {prog.level}
                  </span>
                  <div>
                    <h4 className={`font-cinzel text-sm tracking-wide transition-colors duration-300 ${
                      active === prog.id ? 'text-white' : 'text-white/50'
                    }`}>
                      {prog.title}
                    </h4>
                    <p className="font-mono text-xs text-gold-500/50 tracking-widest mt-0.5">
                      {prog.subtitle}
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-xs text-white/25">
                    {prog.duration}
                  </span>
                </div>
                {active === prog.id && (
                  <motion.div
                    layoutId="activeBorder"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Program detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-panel p-10 relative overflow-hidden"
            >
              {/* Bg gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activeProgram.color} pointer-events-none`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="font-mono text-xs tracking-[0.5em] text-gold-500/60 uppercase">
                      Program {activeProgram.level}
                    </span>
                    <h3 className="font-cinzel text-3xl md:text-4xl font-semibold text-white mt-2">
                      {activeProgram.title}
                    </h3>
                  </div>
                  <span className="glass-panel px-4 py-2 font-mono text-xs text-gold-400/70 tracking-widest whitespace-nowrap">
                    {activeProgram.duration}
                  </span>
                </div>

                <p className="font-cormorant text-lg md:text-xl text-white/55 leading-relaxed mb-8">
                  {activeProgram.desc}
                </p>

                <div>
                  <p className="font-mono text-xs tracking-[0.4em] text-gold-500/50 uppercase mb-4">
                    Core Skills
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {activeProgram.skills.map(skill => (
                      <span
                        key={skill}
                        className="glass-panel px-4 py-2 font-cinzel text-xs tracking-wide text-white/60 border-gold-400/15"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-10 font-cinzel text-xs tracking-[0.3em] uppercase px-8 py-4 bg-gold-400/10 border border-gold-400/40 text-gold-500 font-bold hover:bg-gold-400/20 hover:border-gold-300 transition-all duration-300"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Apply for This Program
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
