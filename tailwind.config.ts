import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#FFF8DC',
          200: '#FFE87C',
          300: '#FFD700',
          400: '#D4AF37',
          500: '#B8860B',
          600: '#8B6914',
        },
        obsidian: {
          50:  '#1a1a2e',
          100: '#16213e',
          200: '#0f3460',
          300: '#0a0a1a',
          400: '#050510',
          500: '#020208',
        },
        mist: {
          100: 'rgba(212,175,55,0.08)',
          200: 'rgba(212,175,55,0.15)',
          300: 'rgba(212,175,55,0.25)',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        mono: ['Courier Prime', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #FFF8DC 50%, #FFD700 75%, #D4AF37 100%)',
        'radial-gold': 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
        'hero-gradient': 'radial-gradient(ellipse at 50% 40%, #1a1508 0%, #08080f 40%, #020208 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)',
        'gold-lg': '0 0 60px rgba(212,175,55,0.4), 0 0 120px rgba(212,175,55,0.15)',
        'inner-gold': 'inset 0 0 30px rgba(212,175,55,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
