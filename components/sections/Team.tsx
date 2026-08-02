'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

type TabId = 'founders' | 'team' | 'mentors' | 'interns';

interface Member {
  name: string;
  role: string;
  initials: string;
  bio: string;
  credentials: string[];
  accentFrom: string;
  accentTo: string;
  badge?: string;
  photoSrc?: string;
}

const FOUNDERS: Member[] = [
  {
    name: 'ADITYA SINGH THAKUR',
    role: 'Founder & CEO',
    initials: 'AST',
    bio: 'Founder & CEO of ICARUS, driving strategic vision, organizational leadership, and student empowerment.',
    credentials: ['Founder & CEO', 'Strategic Vision', 'Organizational Leadership'],
    accentFrom: 'rgba(212,175,55,0.24)',
    accentTo: 'rgba(139,105,20,0.06)',
    badge: 'Founder & CEO',
    photoSrc: '/team/aditya-singh-thakur.jpg',
  },
  {
    name: 'RITVIK SINGH',
    role: 'Co-Founder',
    initials: 'RS',
    bio: 'Co-Founder of ICARUS, national-level MUNer, and State Debate Champion.',
    credentials: ['National-Level MUNer', 'State Debate Champion', 'Co-Founder'],
    accentFrom: 'rgba(212,175,55,0.22)',
    accentTo: 'rgba(139,105,20,0.05)',
    badge: 'Co-Founder',
    photoSrc: '/team/ritvik.png',
  },
];

const CORE_TEAM: Member[] = [
  {
    name: 'VANSH SHARMA',
    role: 'Head of IT',
    initials: 'VS',
    bio: 'Leads the digital systems, technical setup, and online infrastructure for ICARUS.',
    credentials: ['Head of IT', 'Technical Systems', 'Digital Operations'],
    accentFrom: 'rgba(212,175,55,0.18)',
    accentTo: 'rgba(139,105,20,0.04)',
    photoSrc: '/team/vansh.png',
  },
  {
    name: 'ANEES VAID',
    role: 'Chief of Staff',
    initials: 'AV',
    bio: 'Coordinates internal planning, team communication, and operational follow-through.',
    credentials: ['Chief of Staff', 'Internal Coordination', 'Planning'],
    accentFrom: 'rgba(212,175,55,0.16)',
    accentTo: 'rgba(212,175,55,0.03)',
    photoSrc: '/team/anees.png',
  },
  {
    name: 'VATSAL GANDOTRA',
    role: 'Head of Finance & Logistics',
    initials: 'VG',
    bio: 'Manages budgeting, logistics, resources, and event-readiness for ICARUS programs.',
    credentials: ['Head of Finance & Logistics', 'Budgeting', 'Event Logistics'],
    accentFrom: 'rgba(212,175,55,0.20)',
    accentTo: 'rgba(139,105,20,0.04)',
    photoSrc: '/team/vatsal.png',
  },
  {
    name: 'AADITYA DASSI',
    role: 'Head of Media',
    initials: 'AD',
    bio: 'Leads media, content, and public-facing communication for ICARUS.',
    credentials: ['Head of Media', 'Content', 'Communication'],
    accentFrom: 'rgba(212,175,55,0.17)',
    accentTo: 'rgba(212,175,55,0.03)',
    photoSrc: '/team/aaditya.jpg',
  },
  {
    name: 'ARYAN BAKSHI',
    role: 'Team Coordinator',
    initials: 'AB',
    bio: 'Coordinates team tasks, event preparation, and communication across working groups.',
    credentials: ['Team Coordinator', 'Team Tasks', 'Event Preparation'],
    accentFrom: 'rgba(212,175,55,0.19)',
    accentTo: 'rgba(139,105,20,0.04)',
    photoSrc: '/team/aryan.png',
  },
  {
    name: 'JAIPREET SINGH',
    role: 'Director of Community Engagement',
    initials: 'JS',
    bio: 'Builds community relationships and supports student engagement across ICARUS initiatives.',
    credentials: ['Director of Community Engagement', 'Community', 'Student Engagement'],
    accentFrom: 'rgba(212,175,55,0.15)',
    accentTo: 'rgba(212,175,55,0.03)',
    photoSrc: '/team/jaipreet.png',
  },
  {
    name: 'MAHIR GAUTAM',
    role: 'Regional Operator - Kathua',
    initials: 'MG',
    bio: 'Supports ICARUS regional coordination, outreach, and operations in Kathua.',
    credentials: ['Regional Operator - Kathua', 'Regional Coordination', 'Outreach'],
    accentFrom: 'rgba(212,175,55,0.18)',
    accentTo: 'rgba(139,105,20,0.04)',
    photoSrc: '/team/mahir-gautam.jpg',
  },
];

const MENTORS: Member[] = [
  {
    name: 'SHAGUN MANHAS',
    role: 'Mentor',
    initials: 'SM',
    bio: 'Mentor supporting ICARUS students with guidance, perspective, and learning direction.',
    credentials: ['Mentor', 'Guidance', 'Learning Support'],
    accentFrom: 'rgba(148,163,184,0.20)',
    accentTo: 'rgba(100,116,139,0.04)',
    photoSrc: '/team/shagun.png',
  },
  {
    name: 'TASKEEN SAKINA',
    role: 'Mentor',
    initials: 'TS',
    bio: 'Mentor supporting ICARUS training through feedback, experience, and student-focused advice.',
    credentials: ['Mentor', 'Feedback', 'Student Support'],
    accentFrom: 'rgba(148,163,184,0.18)',
    accentTo: 'rgba(100,116,139,0.03)',
    photoSrc: '/team/taskeen.png',
  },
  {
    name: 'MOMINAH MANZOOR',
    role: 'Mentor',
    initials: 'MM',
    bio: 'Mentor supporting ICARUS programs through practical insight and growth-oriented guidance.',
    credentials: ['Mentor', 'Program Support', 'Growth'],
    accentFrom: 'rgba(148,163,184,0.22)',
    accentTo: 'rgba(100,116,139,0.05)',
    photoSrc: '/team/mominah.png',
  },
];

const INTERNS: Member[] = [
  {
    name: 'ASHITA MANYAL',
    role: 'Intern',
    initials: 'AM',
    bio: 'Supports ICARUS with coordination, communication, and event assistance.',
    credentials: ['Intern', 'Coordination', 'Events'],
    accentFrom: 'rgba(212,175,55,0.16)',
    accentTo: 'rgba(139,105,20,0.04)',
    photoSrc: '/team/ashita-manyal.jpg',
  },
  {
    name: 'AVAAPYA KAK',
    role: 'Intern',
    initials: 'AK',
    bio: 'Supports ICARUS with research, student communication, and operational tasks.',
    credentials: ['Intern', 'Research', 'Operations'],
    accentFrom: 'rgba(212,175,55,0.18)',
    accentTo: 'rgba(212,175,55,0.03)',
    photoSrc: '/team/avaapya-kak.jpg',
  },
  {
    name: 'ELISHA',
    role: 'Intern',
    initials: 'E',
    bio: 'Supports ICARUS with event assistance, team coordination, and student-facing work.',
    credentials: ['Intern', 'Team Support', 'Events'],
    accentFrom: 'rgba(212,175,55,0.15)',
    accentTo: 'rgba(139,105,20,0.04)',
    photoSrc: '/team/elisha.jpg',
  },
  {
    name: 'MAZHAR MAHMOD',
    role: 'Intern',
    initials: 'MM',
    bio: 'Supports ICARUS with logistics, research, and program coordination.',
    credentials: ['Intern', 'Logistics', 'Research'],
    accentFrom: 'rgba(212,175,55,0.17)',
    accentTo: 'rgba(212,175,55,0.03)',
    photoSrc: '/team/mazhar-mahmod.jpg',
  },
  {
    name: 'VANNIYA',
    role: 'Intern',
    initials: 'V',
    bio: 'Supports ICARUS with communication, coordination, and event tasks.',
    credentials: ['Intern', 'Communication', 'Coordination'],
    accentFrom: 'rgba(212,175,55,0.19)',
    accentTo: 'rgba(139,105,20,0.04)',
    photoSrc: '/team/vaniya.jpg',
  },
];

const TABS = [
  { id: 'founders' as TabId, label: 'Founder & CEO', count: FOUNDERS.length },
  { id: 'team' as TabId, label: 'Core Team', count: CORE_TEAM.length },
  { id: 'mentors' as TabId, label: 'Mentors', count: MENTORS.length },
  { id: 'interns' as TabId, label: 'Interns', count: INTERNS.length },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const card = {
  hidden: { opacity: 0, y: 36, scale: 0.96, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.97,
    filter: 'blur(3px)',
    transition: { duration: 0.22, ease: 'easeIn' },
  },
};

function MemberImage({
  m,
  className = '',
  fit = 'cover',
  objectPosition = 'center 35%',
}: {
  m: Member;
  className?: string;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
}) {
  if (!m.photoSrc) return null;

  return (
    <img
      src={m.photoSrc}
      alt={m.name}
      loading="lazy"
      decoding="async"
      className={`absolute inset-0 w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} z-20 ${className}`}
      style={{ objectPosition }}
      onError={(event) => {
        event.currentTarget.style.display = 'none';
      }}
    />
  );
}

function FounderCard({ m }: { m: Member }) {
  return (
    <motion.div
      variants={card}
      className="group relative min-h-[660px] sm:min-h-[720px] overflow-hidden rounded-2xl border border-white/8 flex flex-col justify-end"
      style={{ background: `radial-gradient(ellipse at 50% 40%, ${m.accentFrom} 0%, ${m.accentTo} 72%)`, backdropFilter: 'blur(18px)' }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
    >
      <MemberImage m={m} objectPosition="center 35%" />
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(8,6,20,0.96) 0%, rgba(8,6,20,0.72) 34%, rgba(8,6,20,0.22) 66%, rgba(8,6,20,0.05) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-30 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.14) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.14) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div
        className="absolute inset-0 z-40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ border: '1px solid rgba(212,175,55,0.35)', boxShadow: '0 0 40px rgba(212,175,55,0.08) inset' }}
      />

      {m.badge && (
        <span
          className="absolute top-4 right-4 z-50 font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(8,6,20,0.58)', border: '1px solid rgba(212,175,55,0.38)', color: '#FFD700', backdropFilter: 'blur(10px)' }}
        >
          {m.badge}
        </span>
      )}

      <div className="relative z-40 flex flex-col p-8 sm:p-9">
        <h3 className="font-cinzel text-2xl font-semibold mb-1" style={{ color: 'rgba(255,248,220,0.95)' }}>
          {m.name}
        </h3>
        <p className="font-mono text-sm tracking-[0.24em] uppercase mb-5" style={{ color: '#D4AF37', opacity: 0.86 }}>
          {m.role}
        </p>
        <p className="font-cormorant text-lg leading-relaxed mb-6 flex-1" style={{ color: 'rgba(255,255,255,0.62)' }}>
          {m.bio}
        </p>

        <div className="border-t pt-4 flex flex-col gap-2" style={{ borderColor: 'rgba(212,175,55,0.12)' }}>
          {m.credentials.map(c => (
            <span key={c} className="font-mono text-sm flex items-center gap-2.5" style={{ color: 'rgba(255,255,255,0.58)' }}>
              <span style={{ color: 'rgba(212,175,55,0.5)' }}>-</span>
              {c}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TeamCard({ m }: { m: Member }) {
  return (
    <motion.div
      variants={card}
      className="group relative overflow-hidden rounded-xl border border-white/6 flex flex-col"
      style={{ background: 'rgba(10,8,24,0.50)', backdropFilter: 'blur(14px)' }}
      whileHover={{ y: -5, transition: { duration: 0.28, ease: 'easeOut' } }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ border: '1px solid rgba(212,175,55,0.28)', boxShadow: '0 0 28px rgba(212,175,55,0.06) inset' }}
      />

      <div className="relative h-[210px] sm:h-[230px] flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${m.accentFrom} 0%, ${m.accentTo} 100%)` }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.4) 1px, transparent 1px)', backgroundSize: '14px 14px' }}
        />
        <MemberImage m={m} objectPosition="center 32%" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,6,20,0.82), transparent)' }} />
        <span className="font-cinzel text-5xl font-bold relative z-10" style={{ color: 'rgba(212,175,55,0.62)' }}>
          {m.initials}
        </span>
        <div className="absolute bottom-0 left-4 right-4 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)' }} />
      </div>

      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-cinzel text-xl font-semibold mb-1 leading-snug" style={{ color: 'rgba(255,248,220,0.92)' }}>
          {m.name}
        </h3>
        <p className="font-mono text-sm tracking-[0.2em] uppercase mb-4" style={{ color: '#D4AF37', opacity: 0.86 }}>
          {m.role}
        </p>
        <p className="font-cormorant text-base leading-relaxed mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.58)' }}>
          {m.bio}
        </p>
        <div className="border-t pt-3 flex flex-col gap-1.5" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
          {m.credentials.map(c => (
            <span key={c} className="font-mono text-sm flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.56)' }}>
              <span style={{ color: 'rgba(212,175,55,0.4)' }}>-</span>
              {c}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MentorCard({ m }: { m: Member }) {
  return (
    <motion.div
      variants={card}
      className="group relative overflow-hidden rounded-xl border flex flex-col"
      style={{ background: 'rgba(8,10,20,0.52)', backdropFilter: 'blur(14px)', borderColor: 'rgba(148,163,184,0.12)' }}
      whileHover={{ y: -5, transition: { duration: 0.28, ease: 'easeOut' } }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ border: '1px solid rgba(148,163,184,0.3)', boxShadow: '0 0 28px rgba(148,163,184,0.05) inset' }}
      />

      <div className="relative h-[220px] sm:h-[240px] flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${m.accentFrom} 0%, ${m.accentTo} 100%)` }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.5) 1px, transparent 1px)', backgroundSize: '12px 12px' }}
        />
        <MemberImage m={m} objectPosition="center 32%" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,10,20,0.82), transparent)' }} />

        <div
          className="relative"
          style={{
            padding: 2,
            borderRadius: '50%',
            background: 'conic-gradient(from 180deg, #94a3b8 0%, #64748b 33%, #cbd5e1 66%, #64748b 100%)',
          }}
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(8,10,20,0.95)' }}>
            <span className="font-cinzel text-2xl font-bold" style={{ color: 'rgba(148,163,184,0.9)' }}>
              {m.initials}
            </span>
          </div>
        </div>

        <span
          className="absolute top-3 right-3 z-40 font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(148,163,184,0.12)', border: '1px solid rgba(148,163,184,0.25)', color: 'rgba(148,163,184,0.8)' }}
        >
          {m.role}
        </span>
        <div className="absolute bottom-0 left-4 right-4 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(148,163,184,0.2),transparent)' }} />
      </div>

      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-cinzel text-xl font-semibold mb-1" style={{ color: 'rgba(203,213,225,0.92)' }}>
          {m.name}
        </h3>
        <p className="font-mono text-sm tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(148,163,184,0.86)' }}>
          {m.role}
        </p>
        <p className="font-cormorant text-base leading-relaxed mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.58)' }}>
          {m.bio}
        </p>
        <div className="border-t pt-3 flex flex-col gap-1.5" style={{ borderColor: 'rgba(148,163,184,0.1)' }}>
          {m.credentials.map(c => (
            <span key={c} className="font-mono text-sm flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.54)' }}>
              <span style={{ color: 'rgba(148,163,184,0.4)' }}>-</span>
              {c}
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
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        <SectionTitle
          eyebrow="The Guides"
          title="Our Team"
          subtitle="The people shaping ICARUS programs, mentoring, operations, and student growth."
        />

        <div className="mt-12 sm:mt-16 flex items-center justify-center">
          <div className="relative flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.18)' }}>
            {TABS.map(tab => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className="relative z-10 flex items-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-base font-mono tracking-wider transition-colors duration-300"
                  style={{ color: isActive ? '#0c0c1a' : 'rgba(212,175,55,0.88)' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, #D4AF37, #8B6914)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 text-sm sm:text-base font-bold">{tab.label}</span>
                  <span
                    className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                    style={{
                      background: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(212,175,55,0.16)',
                      color: isActive ? '#0c0c1a' : 'rgba(212,175,55,0.92)',
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 sm:mt-14 min-h-[520px]">
          <AnimatePresence mode="wait">
            {active === 'founders' && (
              <motion.div key="founders" variants={grid} initial="hidden" animate="show" exit="exit" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {FOUNDERS.map(m => <FounderCard key={m.name} m={m} />)}
              </motion.div>
            )}

            {active === 'team' && (
              <motion.div key="team" variants={grid} initial="hidden" animate="show" exit="exit" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {CORE_TEAM.map((m, index) => <TeamCard key={`${m.name}-${index}`} m={m} />)}
              </motion.div>
            )}

            {active === 'mentors' && (
              <motion.div key="mentors" variants={grid} initial="hidden" animate="show" exit="exit" className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {MENTORS.map(m => <MentorCard key={m.name} m={m} />)}
              </motion.div>
            )}

            {active === 'interns' && (
              <motion.div key="interns" variants={grid} initial="hidden" animate="show" exit="exit" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {INTERNS.map(m => <TeamCard key={m.name} m={m} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
