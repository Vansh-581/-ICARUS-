'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { SITE } from '@/lib/constants';

interface FormState {
  name: string; email: string; phone: string; program: string; message: string;
}
interface Errors { name?: string; email?: string; phone?: string; message?: string; }

const EMPTY: FormState = { name: '', email: '', phone: '', program: '', message: '' };
const LS_KEY = 'icarus-contact-draft';
const FORM_ENDPOINT = '/api/contact';
export default function Contact() {
  const [form,      setForm]      = useState<FormState>(EMPTY);
  const [errors,    setErrors]    = useState<Errors>({});
  const [focused,   setFocused]   = useState<string | null>(null);
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) setForm(JSON.parse(saved));
    } catch {}
  }, []);

  const handleChange = useCallback((key: keyof FormState, value: string) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    // Clear error as user types
    if (errors[key as keyof Errors]) setErrors(e => ({ ...e, [key]: undefined }));
  }, [errors]);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim())                   e.name    = 'Full name is required';
    if (!form.email.trim())                  e.email   = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (form.phone && !/^[\d\s\+\-()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.message.trim())                e.message = 'Please tell us about yourself';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          program: form.program,
          message: form.message,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || 'Unable to send enquiry right now.');
      }

      setSubmitted(true);
      try { localStorage.removeItem(LS_KEY); } catch {}
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : `Unable to send enquiry right now. Please email ${SITE.email}.`);
    } finally {
      setLoading(false);
    }
  };

  const renderField = ({
    name, label, type = 'text', required = false, children,
  }: {
    name: keyof FormState; label: string; type?: string; required?: boolean;
    children?: React.ReactNode;
  }) => {
    const isFocused = focused === name;
    const hasValue  = !!form[name];
    const error     = errors[name as keyof Errors];
    return (
      <div className="relative pt-5">
        {/* Floating label */}
        <label
          className="absolute left-0 font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-250 pointer-events-none"
          style={{
            top: isFocused || hasValue ? 0 : '1.4rem',
            fontSize: isFocused || hasValue ? '9px' : '13px',
            color: error ? 'rgba(239,68,68,0.8)' : isFocused ? 'rgba(212,175,55,0.9)' : 'rgba(255,255,255,0.28)',
            fontFamily: isFocused || hasValue ? 'inherit' : 'var(--font-cormorant, serif)',
          }}
        >
          {label}{required && ' *'}
        </label>

        {children || (
          <input
            type={type}
            value={form[name]}
            onChange={e => handleChange(name, e.target.value)}
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
            className="w-full bg-transparent pt-2 pb-3 font-cormorant text-lg outline-none transition-colors duration-250 placeholder:text-transparent"
            style={{ color: 'rgba(255,255,255,0.82)', borderBottom: `1px solid ${error ? 'rgba(239,68,68,0.6)' : isFocused ? 'rgba(212,175,55,0.7)' : 'rgba(255,255,255,0.1)'}` }}
          />
        )}

        {/* Focus line */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ background: 'linear-gradient(90deg, #D4AF37, #FFD700)' }}
          initial={false}
          animate={{ scaleX: isFocused ? 1 : 0, originX: 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-1 font-mono text-[10px] tracking-wider"
              style={{ color: 'rgba(239,68,68,0.8)' }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-60"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 65%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: info ─────────────────────────────────────── */}
          <div>
            <SectionTitle eyebrow="Begin Your Ascent" title="Contact Us" align="left" />

            <motion.p
              className="font-cormorant text-gold-500/40 text-lg sm:text-xl leading-relaxed mt-8 mb-12"
              style={{ color: 'var(--text-muted)' }}

              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            >
              Every great debate begins with a single bold statement.
              Yours starts here — reach out and we will place you in the right program.
            </motion.p>

            <div className="flex flex-col gap-7">
              {[
                { label: 'Email',    value: SITE.email,      icon: '✉', href: `mailto:${SITE.email}` },
                { label: 'Phone',    value: SITE.phone,               icon: '◈', href: `tel:${SITE.phone.replace(/\s/g, '')}` },
                { label: 'Location', value: SITE.locations.join(', '), icon: '◉' },
                { label: 'Instagram', value: SITE.instagramHandle, icon: 'IG', href: SITE.instagram },
              ].map((item, i) => (
                <motion.div key={item.label} className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                >
                  <span className="text-lg mt-0.5" style={{ color: '#D4AF37' }}>{item.icon}</span>
                  <div>
                    <p className="font-mono text-[14px] font-bold tracking-[0.4em] text-gold-500 uppercase mb-1"
                      >{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="font-cormorant text-gold-650 text-lg transition-opacity hover:opacity-75"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-cormorant text-gold-650 text-lg">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Hours */}
            <motion.div className="mt-10 pt-8 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="font-mono font-bold text-[13px] text-gold-600 tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(212,175,55,0.45)' }}>
                Response Time
              </p>
              <p className="font-cormorant text-black-400 text-base" >
                We respond to all enquiries within 24 hours on business days.
              </p>
            </motion.div>
          </div>

          {/* ── Right: form ────────────────────────────────────── */}
          <motion.div
            className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
            style={{ background: 'rgba(8,6,22,0.65)', backdropFilter: 'blur(18px)', border: '1px solid rgba(212,175,55,0.14)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)' }} />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" onSubmit={handleSubmit} noValidate
                  className="flex flex-col gap-7"
                  initial={{ opacity: 1 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}
                >
                  <h3 className="font-cinzel text-xl font-semibold" style={{ color: 'rgba(255,248,220,0.95)' }}>
                    Enrol or Enquire
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-7">
                    {renderField({ name: 'name', label: 'Full Name', required: true })}
                    {renderField({ name: 'phone', label: 'Phone Number', type: 'tel' })}
                  </div>
                  {renderField({ name: 'email', label: 'Email Address', type: 'email', required: true })}

                  {/* Program select */}
                  <div className="relative pt-5">
                    <label className="absolute left-0 top-0 font-mono text-[9px] tracking-[0.25em] uppercase"
                      style={{ color: 'rgba(212,175,55,0.7)' }}>Program</label>
                    <select
                      value={form.program}
                      onChange={e => handleChange('program', e.target.value)}
                      onFocus={() => setFocused('program')}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent pt-2 pb-3 font-cormorant text-lg outline-none cursor-pointer appearance-none"
                      style={{
                        color: form.program ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.28)',
                        borderBottom: `1px solid ${focused === 'program' ? 'rgba(212,175,55,0.7)' : 'rgba(255,255,255,0.1)'}`,
                      }}
                    >
                      <option value="" style={{ background: 'var(--body-bg)', color: 'var(--body-color)' }}>Select a Program</option>
                      <option value="training-sessions" style={{ background: 'var(--body-bg)', color: 'var(--body-color)' }}>Training Sessions</option>
                      <option value="mun" style={{ background: 'var(--body-bg)', color: 'var(--body-color)' }}>Model United Nations</option>
                      <option value="debate-concepts" style={{ background: 'var(--body-bg)', color: 'var(--body-color)' }}>Concepts of Debates</option>
                      <option value="public-speaking" style={{ background: 'var(--body-bg)', color: 'var(--body-color)' }}>Public Speaking</option>
                    </select>
                    {/* Custom arrow */}
                    <span className="absolute right-0 bottom-3.5 pointer-events-none text-xs"
                      style={{ color: 'rgba(212,175,55,0.5)' }}>▾</span>
                    <motion.div className="absolute bottom-0 left-0 h-px"
                      style={{ background: 'linear-gradient(90deg,#D4AF37,#FFD700)' }}
                      animate={{ scaleX: focused === 'program' ? 1 : 0, originX: 0 }}
                      transition={{ duration: 0.25 }} />
                  </div>

                  {renderField({ name: 'message', label: 'Your Message', required: true, children: (
                    <textarea
                      value={form.message}
                      onChange={e => handleChange('message', e.target.value)}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      rows={4}
                      className="w-full bg-transparent pt-2 pb-3 font-cormorant text-lg outline-none resize-none placeholder:text-transparent"
                      style={{
                        color: 'rgba(255,255,255,0.82)',
                        borderBottom: `1px solid ${errors.message ? 'rgba(239,68,68,0.6)' : focused === 'message' ? 'rgba(212,175,55,0.7)' : 'rgba(255,255,255,0.1)'}`,
                      }}
                    />
                  ) })}

                  <AnimatePresence>
                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-[10px] tracking-wider"
                        style={{ color: 'rgba(239,68,68,0.9)' }}
                      >
                        {submitError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.01, boxShadow: '0 0 28px rgba(212,175,55,0.2)' } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="w-full py-4 rounded-none font-cinzel text-sm tracking-[0.3em] uppercase transition-all duration-300 flex items-center justify-center gap-3"
                    style={{
                      background: loading ? 'rgba(212,175,55,0.08)' : 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.45)',
                      color: loading ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.92)',
                      cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {loading ? (
                      <>
                        <motion.span
                          className="w-4 h-4 border-2 border-t-transparent rounded-full"
                          style={{ borderColor: 'rgba(212,175,55,0.5)', borderTopColor: 'transparent' }}
                          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        />
                        Sending…
                      </>
                    ) : 'Send Enquiry'}
                  </motion.button>

                  <p className="font-mono text-[9px] text-center tracking-wider"
                    style={{ color: 'rgba(255,255,255,0.2)' }}>
                    * Required fields · Your draft is saved automatically
                  </p>
                </motion.form>
              ) : (
                <motion.div key="success"
                  className="flex flex-col items-center justify-center py-20 gap-6 text-center"
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
                >
                  {/* Animated gold check */}
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  >
                    <motion.span
                      className="text-4xl"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                      style={{ color: '#D4AF37' }}
                    >✦</motion.span>
                  </motion.div>
                  <h3 className="font-cinzel text-2xl font-semibold" style={{ color: 'rgba(255,248,220,0.95)' }}>
                    Enquiry Sent
                  </h3>
                  <p className="font-cormorant text-lg max-w-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    We have received your enquiry and will be in touch within 24 hours.
                  </p>
                  <button onClick={() => { setSubmitted(false); setSubmitError(null); setForm(EMPTY); }}
                    className="font-mono text-[10px] tracking-[0.3em] uppercase mt-2 transition-opacity hover:opacity-70"
                    style={{ color: 'rgba(212,175,55,0.5)' }}>
                    Submit Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
