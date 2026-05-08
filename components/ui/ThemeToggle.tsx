'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle"
      whileTap={{ scale: 0.92 }}
    >
      <motion.div
        className="theme-toggle-thumb"
        animate={{ x: isDark ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <span style={{ lineHeight: 1 }}>
          {isDark ? '🌙' : '☀️'}
        </span>
      </motion.div>
    </motion.button>
  );
}
