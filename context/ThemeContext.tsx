'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('icarus-theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch {}
  }, []);

  const toggle = () => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('icarus-theme', next); } catch {}
      return next;
    });
  };

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', toggle }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
