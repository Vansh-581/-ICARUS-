'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

interface FormState {
  name: string;
  email: string;
  program: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', program: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (key: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  const inputClass = (name: string) =>
    `w-full bg-transparent border-b py-3 font-cormorant text-lg text-white/80 outline-none transition-all duration-300 placeholder:text-white/20 ${
      focused === name ? 'border-gold-400' : 'border-white/10'
    }`;

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left — info */}
          <div>
            <SectionTitle
              eyebrow="Begin Your Ascent"
              title="Contact Us"
              align="left"
            />

            <motion.p
              className="font-cormorant text-xl text-white/50 leading-relaxed mt-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Every great debate begins with a single bold statement. Yours starts here. 
              Reach out and we will guide you to the right program.
            </motion.p>

            <div className="flex flex-col gap-8">
              {[
                { label: 'Email', value: 'hello@icarusdebate.academy', icon: '✉' },
                { label: 'Phone', value: '+91 98765 43210', icon: '◈' },
                { label: 'Location', value: 'New Delhi · Mumbai · Bangalore', icon: '◉' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-5 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                >
                  <span className="gold-text text-lg mt-1">{item.icon}</span>
                  <div>
                    <p className="font-mono text-xs tracking-[0.4em] text-gold-500/40 uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="font-cormorant text-lg text-white/65">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            className="glass-panel p-10 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

            {!submitted ? (
              <div className="flex flex-col gap-8">
                <h3 className="font-cinzel text-xl text-white font-semibold">
                  Enrol or Enquire
                </h3>

                <div className="flex flex-col gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('name')}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className={inputClass('email')}
                    />
                  </div>
                  <div>
                    <select
                      value={form.program}
                      onChange={e => handleChange('program', e.target.value)}
                      onFocus={() => setFocused('program')}
                      onBlur={() => setFocused(null)}
                      className={`${inputClass('program')} cursor-pointer`}
                    >
                      <option value="" className="bg-obsidian-300 text-white/60">
                        Select a Program
                      </option>
                      <option value="foundational" className="bg-obsidian-300">
                        Foundational Oratory
                      </option>
                      <option value="competitive" className="bg-obsidian-300">
                        Competitive Debate
                      </option>
                      <option value="advanced" className="bg-obsidian-300">
                        Advanced Advocacy
                      </option>
                      <option value="leadership" className="bg-obsidian-300">
                        Leadership Lab
                      </option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us about yourself or your student…"
                      value={form.message}
                      onChange={e => handleChange('message', e.target.value)}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      rows={4}
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(212,175,55,0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-4 border border-gold-400/50 text-gold-300 font-cinzel text-sm tracking-[0.3em] uppercase transition-all duration-300"
                >
                  Send Enquiry
                </motion.button>
              </div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center py-16 gap-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-5xl gold-text">✦</span>
                <h3 className="font-cinzel text-2xl text-white font-semibold">
                  Your Ascent Begins
                </h3>
                <p className="font-cormorant text-lg text-white/50 max-w-xs">
                  We have received your enquiry and will be in touch within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
