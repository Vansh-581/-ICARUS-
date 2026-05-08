'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const VALUES = [
  {
    icon: '⚡',
    title: 'Intellectual Courage',
    desc:  'We challenge received wisdom and speak uncomfortable truths with poise and evidence.',
  },
  {
    icon: '⚖',
    title: 'Rigorous Fairness',
    desc:  'Every argument is heard on its merits. We train students to engage the strongest version of opposing ideas.',
  },
  {
    icon: '✦',
    title: 'Elegant Precision',
    desc:  'Words chosen with surgical care. Our students learn that a single precise sentence outweighs a thousand vague ones.',
  },
  {
    icon: '∞',
    title: 'Relentless Growth',
    desc:  'Every defeat is a lesson. Every victory is a stepping stone. There is no ceiling to the curious mind.',
  },
  {
    icon: '◈',
    title: 'Ethical Integrity',
    desc:  'We argue to seek truth, not to deceive. Sophistry has no home here. Character is the bedrock of every debater.',
  },
  {
    icon: '⬡',
    title: 'Collective Ascent',
    desc:  'We rise together. ICARUS alumni form a lifelong network of minds committed to making each other better.',
  },
];

export default function CoreValues() {
  return (
    <section id="values" className="relative py-32 overflow-hidden">
      {/* Background texture lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(212,175,55,0.3) 0px, rgba(212,175,55,0.3) 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(90deg, rgba(212,175,55,0.3) 0px, rgba(212,175,55,0.3) 1px, transparent 1px, transparent 80px)
          `,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          eyebrow="What We Stand For"
          title="Core Values"
          subtitle="The six pillars that define every ICARUS debater."
        />

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((val, i) => (
            <motion.div
              key={val.title}
              className="glass-panel p-8 group relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold-400/40 to-transparent" />
                <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-gold-400/40 to-transparent" />
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
              />

              <div className="relative z-10">
                <span className="block text-3xl mb-5 gold-text" style={{ fontFamily: 'serif' }}>
                  {val.icon}
                </span>
                <h3 className="font-cinzel text-base md:text-lg font-semibold text-white mb-3 tracking-wide">
                  {val.title}
                </h3>
                <p className="font-cormorant text-base text-white/45 leading-relaxed">
                  {val.desc}
                </p>
              </div>

              {/* Bottom number */}
              <div className="absolute bottom-4 right-6 font-mono text-xs text-gold-400/20">
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
