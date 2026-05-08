'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: 'Dr. Arjun Mehta',
    role: 'Founder & Lead Trainer',
    initials: 'AM',
    bio: 'Former national champion, Oxford-educated rhetorician, and architect of the ICARUS pedagogy.',
    credentials: ['Oxford, MSc Argumentation', 'National Champion 2011', 'TEDx Speaker'],
    accent: 'from-gold-500/20 to-gold-600/5',
  },
  {
    name: 'Priya Nair',
    role: 'Director of Programs',
    initials: 'PN',
    bio: 'World Schools quarter-finalist and curriculum designer who built the ICARUS escalation framework.',
    credentials: ['LSE, Philosophy & Law', 'WSDC Quarter-Finalist', 'Curriculum Architect'],
    accent: 'from-gold-400/15 to-gold-500/5',
  },
  {
    name: 'Rohan Krishnamurthy',
    role: 'Senior Coach — Competitive',
    initials: 'RK',
    bio: 'Forged three national champions. Known for forensic precision in case construction.',
    credentials: ['NLS Alumni', '3× National Coach', 'Parliamentary Expert'],
    accent: 'from-gold-300/15 to-gold-400/5',
  },
  {
    name: 'Aisha Desai',
    role: 'Coach — Public Speaking',
    initials: 'AD',
    bio: 'Voice coach and performance specialist who teaches debaters to command presence, not just arguments.',
    credentials: ['RADA Trained', 'Voice & Performance', 'Stage & Screen Coach'],
    accent: 'from-gold-500/12 to-gold-300/5',
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<HTMLDivElement[]>([]);
  const desktopCardsRef = useRef<HTMLDivElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── MOBILE: pin + sequential card reveal ─────────────────────────────
    mm.add('(max-width: 1023px)', () => {
      const cards = mobileCardsRef.current.filter(Boolean);

      // Stack cards on top of each other initially
      cards.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          y:       i === 0 ? 0 : '105%',
          opacity: i === 0 ? 1 : 0,
          scale:   i === 0 ? 1 : 0.96,
          zIndex:  i + 1,
          position: 'absolute',
          inset: 0,
        });
      });

      // Pin the sticky container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top top',
          end:     () => `+=${TEAM.length * window.innerHeight}`,
          invalidateOnRefresh: true,
          pin:     stickyRef.current,
          scrub:   0.6,
          onUpdate: (self) => {
            // Update dot indicator
            if (!indicatorRef.current) return;
            const idx = Math.min(
              TEAM.length - 1,
              Math.floor(self.progress * TEAM.length)
            );
            indicatorRef.current
              .querySelectorAll('.dot')
              .forEach((d, i) => {
                (d as HTMLElement).style.opacity = i === idx ? '1' : '0.25';
                (d as HTMLElement).style.width   = i === idx ? '20px' : '6px';
              });
          },
        },
      });

      // Animate each card transition
      TEAM.forEach((_, i) => {
        if (i === TEAM.length - 1) return; // last card stays
        tl.to(cards[i], {
          y: '-16%', opacity: 0, scale: 0.92,
          duration: 0.5, ease: 'power2.inOut',
        })
          .to(cards[i + 1], {
            y: 0, opacity: 1, scale: 1,
            duration: 0.5, ease: 'power2.inOut',
          }, '<0.15');
      });
    });

    // ── DESKTOP: simple stagger reveal (unchanged) ────────────────────────
    mm.add('(min-width: 1024px)', () => {
      const cards = desktopCardsRef.current.filter(Boolean);

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 50, opacity: 0, scale: 0.96,
        stagger: 0.14, duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      // Mobile: tall enough to scroll through all 4 cards
      className="relative py-32 lg:py-32"
      style={{ minHeight: 'auto' }}
    >
      {/* Mobile section needs extra height for pin scroll */}
      <style>{`
        @media (max-width: 1023px) {
          #team { min-height: calc(${TEAM.length * 100}vh + 380px); }
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle
          eyebrow="The Guides"
          title="Our Team"
          subtitle="World-class coaches who have stood where you want to stand."
        />

        {/* ── Sticky wrapper (mobile pins here) ── */}
        <div ref={stickyRef} className="mt-20">

          {/* ─── MOBILE CARD STACK ─── */}
          <div className="relative lg:hidden h-[440px] min-[390px]:h-[420px]">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                ref={(el) => { if (el) mobileCardsRef.current[i] = el; }}
                className="glass-panel team-stack-card overflow-hidden w-full"
              >
                {/* Avatar */}
                <div className={`relative h-40 bg-gradient-to-br ${member.accent} flex items-center justify-center`}>
                  <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)' }}
                  />
                  <span className="font-cinzel text-6xl font-bold gold-text opacity-40 relative z-10">
                    {member.initials}
                  </span>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

                  {/* Card number */}
                  <span className="absolute bottom-3 right-4 font-mono text-xs text-gold-400/30">
                    {String(i + 1).padStart(2, '0')} / {String(TEAM.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-cinzel text-lg font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs tracking-widest text-gold-500/60 uppercase mb-3">
                    {member.role}
                  </p>
                  <p className="font-cormorant text-base text-white/50 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-col gap-1">
                    {member.credentials.map(c => (
                      <span key={c} className="font-mono text-xs text-white/25 flex items-center gap-2">
                        <span className="text-gold-500/40">—</span> {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile dot indicator */}
          <div ref={indicatorRef} className="flex lg:hidden items-center justify-center gap-2 mt-6">
            {TEAM.map((_, i) => (
              <div
                key={i}
                className="dot h-px bg-gold-400 transition-all duration-300"
                style={{ width: i === 0 ? '20px' : '6px', opacity: i === 0 ? 1 : 0.25 }}
              />
            ))}
          </div>

          {/* ─── DESKTOP GRID ─── */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                ref={(el) => { if (el) desktopCardsRef.current[i] = el as unknown as HTMLDivElement; }}
                className="glass-panel group overflow-hidden relative"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Avatar */}
                <div className={`relative h-44 bg-gradient-to-br ${member.accent} flex items-center justify-center`}>
                  <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)' }}
                  />
                  <span className="font-cinzel text-5xl font-bold gold-text opacity-40 relative z-10">
                    {member.initials}
                  </span>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-cinzel text-sm md:text-base font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs tracking-widest text-gold-500/60 uppercase mb-4">
                    {member.role}
                  </p>
                  <p className="font-cormorant text-sm text-white/45 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {member.credentials.map(c => (
                      <span key={c} className="font-mono text-xs text-white/25 flex items-center gap-2">
                        <span className="text-gold-500/40">—</span> {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-gold-400/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
