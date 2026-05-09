'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

type TabId = 'founders' | 'team' | 'mentors';

interface Member {
  name: string; role: string; initials: string;
  bio: string; credentials: string[];
  accentFrom: string; accentTo: string;
  badge?: string;
}

const FOUNDERS: Member[] = [
  {
    name: 'Dr. Arjun Mehta', role: 'CEO & Founder', initials: 'AM',
    bio: 'Former national champion, Oxford-educated rhetorician, and architect of the ICARUS pedagogy. Arjun has personally trained over 2,000 debaters across 18 countries and continues to redefine what competitive rhetoric can be.',
    credentials: ['Oxford, MSc Argumentation', 'National Champion 2011', 'TEDx Speaker', '2,000+ Alumni Coached'],
    accentFrom: 'rgba(212,175,55,0.22)', accentTo: 'rgba(139,105,20,0.05)', badge: 'Founder',
  },
  {
    name: 'Priya Nair', role: 'Co-Founder & Director', initials: 'PN',
    bio: 'World Schools quarter-finalist and curriculum designer who built the ICARUS escalation framework from the ground up. Priya holds advisory roles at three international debate councils and leads all academic partnerships.',
    credentials: ['LSE, Philosophy & Law', 'WSDC Quarter-Finalist', 'Curriculum Architect', 'International Adviser'],
    accentFrom: 'rgba(212,175,55,0.18)', accentTo: 'rgba(212,175,55,0.03)', badge: 'Co-Founder',
  },
];

const CORE_TEAM: Member[] = [
  {
    name: 'Rohan Krishnamurthy', role: 'Sr. Coach — Competitive', initials: 'RK',
    bio: 'Forged three national champions through forensic precision in case construction and cross-examination.',
    credentials: ['NLS Alumni', '3× National Coach', 'Parliamentary Expert'],
    accentFrom: 'rgba(212,175,55,0.18)', accentTo: 'rgba(139,105,20,0.04)',
  },
  {
    name: 'Aisha Desai', role: 'Coach — Public Speaking', initials: 'AD',
    bio: 'RADA-trained voice specialist who teaches debaters to command presence, not just arguments.',
    credentials: ['RADA Trained', 'Voice & Performance', 'Stage & Screen Coach'],
    accentFrom: 'rgba(212,175,55,0.16)', accentTo: 'rgba(212,175,55,0.03)',
  },
  {
    name: 'Vikram Patel', role: 'Coach — Policy & Research', initials: 'VP',
    bio: 'Former policy analyst who brings real-world rigour and evidentiary mastery to argumentation.',
    credentials: ['IIM Ahmedabad', 'Policy Analyst, MoF', 'Research Methodology'],
    accentFrom: 'rgba(212,175,55,0.20)', accentTo: 'rgba(139,105,20,0.04)',
  },
  {
    name: 'Ananya Sharma', role: 'Coach — British Parliamentary', initials: 'AS',
    bio: 'WUDC semi-finalist who specialises in BP format, clash identification, and rebuttal economy.',
    credentials: ['WUDC Semi-Finalist', 'BP Format Expert', 'Clash Coach'],
    accentFrom: 'rgba(212,175,55,0.17)', accentTo: 'rgba(212,175,55,0.03)',
  },
  {
    name: 'Dev Iyer', role: 'Digital & Media Coach', initials: 'DI',
    bio: 'Bridges traditional debate with modern persuasion — social media, podcast, and broadcast formats.',
    credentials: ['BBC Media Fellow', 'Digital Rhetoric', 'Podcast Host'],
    accentFrom: 'rgba(212,175,55,0.19)', accentTo: 'rgba(139,105,20,0.04)',
  },
  {
    name: 'Kavya Reddy', role: 'Junior Coach & Coordinator', initials: 'KR',
    bio: 'Recent national finalist turned coach — Kavya connects with juniors through lived competition experience.',
    credentials: ['National Finalist 2023', 'Youth Programme Lead', 'Peer Mentoring'],
    accentFrom: 'rgba(212,175,55,0.15)', accentTo: 'rgba(212,175,55,0.03)',
  },
  {
    name: 'Siddharth Joshi', role: 'Analytics & Adjudication', initials: 'SJ',
    bio: 'Uses structured feedback loops and data to accelerate debater progression with scientific precision.',
    credentials: ['IIT Bombay, CS', 'Chief Adjudicator', 'Performance Analytics'],
    accentFrom: 'rgba(212,175,55,0.18)', accentTo: 'rgba(139,105,20,0.04)',
  },
];

const MENTORS: Member[] = [
  {
    name: 'Prof. Meena Krishnan', role: 'Academic Mentor', initials: 'MK',
    bio: 'Professor of Rhetoric at Delhi University with 30 years of scholarship and two landmark books on Indian oratory.',
    credentials: ['Delhi University, Professor', '30 Years in Rhetoric', 'Published Author'],
    accentFrom: 'rgba(148,163,184,0.20)', accentTo: 'rgba(100,116,139,0.04)',
  },
  {
    name: 'Mr. Rajat Bose', role: 'Industry Mentor — Law', initials: 'RB',
    bio: 'Senior advocate at the Supreme Court of India and lifelong champion of legal debate education.',
    credentials: ['Supreme Court Advocate', 'Moot Court Champion', 'Legal Education Advocate'],
    accentFrom: 'rgba(148,163,184,0.18)', accentTo: 'rgba(100,116,139,0.03)',
  },
  {
    name: 'Dr. Leila Ahmad', role: 'International Mentor', initials: 'LA',
    bio: 'UN debate consultant and the bridge connecting ICARUS talent to the global competitive circuit.',
    credentials: ['UN Consultant', 'WSDC Board Member', 'Global Circuit Expert'],
    accentFrom: 'rgba(148,163,184,0.22)', accentTo: 'rgba(100,116,139,0.05)',
  },
];

const TABS = [
  { id: 'founders' as TabId, label: 'CEO & Founders', count: FOUNDERS.length },
  { id: 'team'     as TabId, label: 'Core Team',      count: CORE_TEAM.length },
  { id: 'mentors'  as TabId, label: 'Mentors',        count: MENTORS.length },
];

// ── animation variants ────────────────────────────────────────
const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
  exit:  { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const card = {
  hidden: { opacity: 0, y: 36, scale: 0.96, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)',
            transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -14, scale: 0.97, filter: 'blur(3px)',
            transition: { duration: 0.22, ease: 'easeIn' } },
};

// ── sub-components ────────────────────────────────────────────
function FounderCard({ m, isMentor = false }: { m: Member; isMentor?: boolean }) {
  const isFounder = !!m.badge;
  return (
    <motion.div variants={card}
      className="group relative overflow-hidden rounded-2xl border border-white/8 flex flex-col"
      style={{ background: 'rgba(10,8,24,0.55)', backdropFilter: 'blur(18px)' }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
    >
      {/* Hover border shimmer */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ border: '1px solid rgba(212,175,55,0.35)', boxShadow: '0 0 40px rgba(212,175,55,0.08) inset' }} />

      {/* Avatar area */}
      <div className="relative flex flex-col items-center justify-center py-10 overflow-hidden"
        style={{ background: `radial-gradient(ellipse at 50% 60%, ${m.accentFrom} 0%, ${m.accentTo} 70%)` }}
      >
        {/* Background grid lines */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.15) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Badge */}
        {m.badge && (
          <span className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}>
            {m.badge}
          </span>
        )}

        {/* Conic gold ring around initials */}
        <div className="relative" style={{ padding: 2, borderRadius: '50%',
          background: 'conic-gradient(from 180deg, #D4AF37 0%, #8B6914 25%, #FFD700 50%, #8B6914 75%, #D4AF37 100%)' }}>
          <div className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{ background: 'rgba(8,6,20,0.92)' }}>
            <span className="font-cinzel text-4xl font-bold"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #FFD700, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {m.initials}
            </span>
          </div>
          {/* Glow */}
          <div className="absolute inset-0 rounded-full blur-xl scale-150 pointer-events-none"
            style={{ background: 'rgba(212,175,55,0.12)' }} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-7">
        <h3 className="font-cinzel text-lg font-semibold mb-0.5"
          style={{ color: 'rgba(255,248,220,0.95)' }}>{m.name}</h3>
        <p className="font-mono text-[10px] tracking-[0.28em] uppercase mb-4"
          style={{ color: '#D4AF37', opacity: 0.75 }}>{m.role}</p>
        <p className="font-cormorant text-[15px] leading-relaxed mb-5 flex-1"
          style={{ color: 'rgba(255,255,255,0.55)' }}>{m.bio}</p>

        <div className="border-t pt-4 flex flex-col gap-2"
          style={{ borderColor: 'rgba(212,175,55,0.12)' }}>
          {m.credentials.map(c => (
            <span key={c} className="font-mono text-[10px] flex items-center gap-2.5"
              style={{ color: 'rgba(255,255,255,0.38)' }}>
              <span style={{ color: 'rgba(212,175,55,0.5)' }}>—</span>{c}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TeamCard({ m }: { m: Member }) {
  return (
    <motion.div variants={card}
      className="group relative overflow-hidden rounded-xl border border-white/6 flex flex-col"
      style={{ background: 'rgba(10,8,24,0.50)', backdropFilter: 'blur(14px)' }}
      whileHover={{ y: -5, transition: { duration: 0.28, ease: 'easeOut' } }}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ border: '1px solid rgba(212,175,55,0.28)', boxShadow: '0 0 28px rgba(212,175,55,0.06) inset' }} />

      {/* Avatar strip */}
      <div className="relative h-28 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${m.accentFrom} 0%, ${m.accentTo} 100%)` }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.4) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
        <span className="font-cinzel text-4xl font-bold relative z-10"
          style={{ color: 'rgba(212,175,55,0.55)' }}>{m.initials}</span>
        <div className="absolute bottom-0 left-4 right-4 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)' }} />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-cinzel text-sm font-semibold mb-0.5 leading-snug"
          style={{ color: 'rgba(255,248,220,0.92)' }}>{m.name}</h3>
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase mb-3"
          style={{ color: '#D4AF37', opacity: 0.65 }}>{m.role}</p>
        <p className="font-cormorant text-[13px] leading-relaxed mb-4 flex-1"
          style={{ color: 'rgba(255,255,255,0.48)' }}>{m.bio}</p>
        <div className="border-t pt-3 flex flex-col gap-1.5"
          style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
          {m.credentials.map(c => (
            <span key={c} className="font-mono text-[9px] flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.32)' }}>
              <span style={{ color: 'rgba(212,175,55,0.4)' }}>—</span>{c}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MentorCard({ m }: { m: Member }) {
  return (
    <motion.div variants={card}
      className="group relative overflow-hidden rounded-xl border flex flex-col"
      style={{ background: 'rgba(8,10,20,0.52)', backdropFilter: 'blur(14px)', borderColor: 'rgba(148,163,184,0.12)' }}
      whileHover={{ y: -5, transition: { duration: 0.28, ease: 'easeOut' } }}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ border: '1px solid rgba(148,163,184,0.3)', boxShadow: '0 0 28px rgba(148,163,184,0.05) inset' }} />

      <div className="relative h-36 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${m.accentFrom} 0%, ${m.accentTo} 100%)` }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.5) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

        {/* Platinum ring */}
        <div className="relative" style={{ padding: 2, borderRadius: '50%',
          background: 'conic-gradient(from 180deg, #94a3b8 0%, #64748b 33%, #cbd5e1 66%, #64748b 100%)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(8,10,20,0.95)' }}>
            <span className="font-cinzel text-xl font-bold" style={{ color: 'rgba(148,163,184,0.85)' }}>{m.initials}</span>
          </div>
        </div>

        <span className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(148,163,184,0.12)', border: '1px solid rgba(148,163,184,0.25)', color: 'rgba(148,163,184,0.8)' }}>
          Mentor
        </span>
        <div className="absolute bottom-0 left-4 right-4 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(148,163,184,0.2),transparent)' }} />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-cinzel text-sm font-semibold mb-0.5" style={{ color: 'rgba(203,213,225,0.92)' }}>{m.name}</h3>
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase mb-3" style={{ color: 'rgba(148,163,184,0.65)' }}>{m.role}</p>
        <p className="font-cormorant text-[13px] leading-relaxed mb-4 flex-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{m.bio}</p>
        <div className="border-t pt-3 flex flex-col gap-1.5" style={{ borderColor: 'rgba(148,163,184,0.1)' }}>
          {m.credentials.map(c => (
            <span key={c} className="font-mono text-[9px] flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
              <span style={{ color: 'rgba(148,163,184,0.4)' }}>—</span>{c}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const [active, setActive] = useState<TabId>('founders');

  return (
    <section id="team" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">

      {/* Section background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        <SectionTitle
          eyebrow="The Guides"
          title="Our Team"
          subtitle="World-class coaches, scholars, and advocates who have stood where you want to stand."
        />

        {/* ── Tab bar ─────────────────────────────────────────── */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center">
          <div className="relative flex gap-1 p-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.12)' }}>
            {TABS.map(tab => {
              const isActive = active === tab.id;
              return (
                <button key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className="relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-mono tracking-wider transition-colors duration-300"
                  style={{ color: isActive ? '#0c0c1a' : 'rgba(212,175,55,0.6)' }}
                >
                  {/* Active pill bg */}
                  {isActive && (
                    <motion.div layoutId="tab-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #D4AF37, #8B6914)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 text-[11px] sm:text-xs">{tab.label}</span>
                  <span className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full text-[10px]"
                    style={{
                      background: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(212,175,55,0.1)',
                      color: isActive ? '#0c0c1a' : 'rgba(212,175,55,0.7)',
                    }}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab content ─────────────────────────────────────── */}
        <div className="mt-10 sm:mt-14 min-h-[520px]">
          <AnimatePresence mode="wait">

            {active === 'founders' && (
              <motion.div key="founders" variants={grid} initial="hidden" animate="show" exit="exit"
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {FOUNDERS.map(m => <FounderCard key={m.name} m={m} />)}
              </motion.div>
            )}

            {active === 'team' && (
              <motion.div key="team" variants={grid} initial="hidden" animate="show" exit="exit"
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {CORE_TEAM.map(m => <TeamCard key={m.name} m={m} />)}
              </motion.div>
            )}

            {active === 'mentors' && (
              <motion.div key="mentors" variants={grid} initial="hidden" animate="show" exit="exit"
                className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {MENTORS.map(m => <MentorCard key={m.name} m={m} />)}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 sm:mt-20 pt-8 border-t flex flex-wrap items-center justify-center gap-10 sm:gap-16"
          style={{ borderColor: 'rgba(212,175,55,0.1)' }}
        >
          {[['12', 'Combined Coaches'], ['40+', 'Years Experience'], ['3', 'Continents Represented']].map(([val, label]) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-cinzel text-3xl font-bold"
                style={{ background: 'linear-gradient(135deg,#D4AF37,#FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {val}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.38)' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
