'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';

const NAV_ITEMS = [
  { label: 'About',        href: '#about'        },
  { label: 'Mission',      href: '#mission'       },
  { label: 'Programs',     href: '#programs'      },
  { label: 'Achievements', href: '#achievements'  },
  { label: 'Team',         href: '#team'          },
  { label: 'Contact',      href: '#contact'       },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  // Only call setState when the threshold actually crosses — eliminates
  // 60fps nav re-renders from framer-motion's scrollY.onChange
  useEffect(() => {
    let cur = false;
    const handle = () => {
      const next = window.scrollY > 80;
      if (next !== cur) { cur = next; setScrolled(next); }
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleAnchor = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'py-2' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between transition-all duration-700 ${
          scrolled ? 'glass-panel px-5 sm:px-8 py-3 rounded-sm' : ''
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-start group flex-shrink-0"
        >
          <span className="font-cinzel font-bold text-lg sm:text-xl tracking-[0.3em] gold-text">
            ICARUS
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.4em] text-gold-500/70 uppercase -mt-0.5">
            Debate Academy
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_ITEMS.map(item => (
            <button
              key={item.href}
              onClick={() => handleAnchor(item.href)}
              className="font-cinzel text-xs tracking-[0.2em] text-white/50 uppercase hover:text-gold-300 transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right: theme toggle + enrol button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => handleAnchor('#contact')}
            className="hidden lg:block font-cinzel text-xs font-semibold tracking-[0.2em] px-4 py-2 border border-gold-400/100 text-gold-500 uppercase hover:bg-gold-400/10 hover:border-gold-300 transition-all duration-300 whitespace-nowrap"
          >
            Enrol Now
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 ml-1"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={
                  mobileOpen
                    ? i === 0 ? { rotate: 45,  y: 8,  scaleX: 1 }
                    : i === 2 ? { rotate: -45, y: -8, scaleX: 1 }
                    : { scaleX: 0 }
                    : { rotate: 0, y: 0, scaleX: 1 }
                }
                className="block w-5 h-px bg-gold-400"
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 lg:hidden z-[-1]"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden glass-panel mx-3 mt-2 py-5 px-6 rounded-sm"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleAnchor(item.href)}
                  className="block w-full text-left font-cinzel text-sm tracking-[0.2em] text-white/70 uppercase py-3 border-b border-gold-400/10 hover:text-gold-300 transition-colors last:border-b-0"
                >
                  {item.label}
                </motion.button>
              ))}
              <button
                onClick={() => handleAnchor('#contact')}
                className="mt-4 w-full font-cinzel text-xs tracking-[0.3em] px-6 py-3 border border-gold-400/50 text-gold-300 uppercase hover:bg-gold-400/10 transition-all duration-300"
              >
                Enrol Now
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
