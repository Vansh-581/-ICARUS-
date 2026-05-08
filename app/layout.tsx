import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'ICARUS Debate Academy — Ascend Beyond Limits',
  description:
    'ICARUS Debate Academy — where bold thinkers learn to argue, persuade, and lead with mythological clarity and futuristic precision.',
  keywords: ['debate', 'academy', 'public speaking', 'argumentation', 'ICARUS'],
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c0c1a',
};

/**
 * Device-tier detection — runs as an inline script BEFORE React hydrates.
 * Sets data-perf="low|mid|high" on <html> so CSS rules take effect on
 * the very first paint with zero layout shift or flicker.
 *
 * Criteria:
 *  low  → ≤2 GB RAM or ≤2 CPU cores  (old phones, budget laptops)
 *  mid  → ≤4 GB RAM or ≤4 CPU cores
 *  high → everything else
 */
const DEVICE_TIER_SCRIPT = `
(function(){
  try {
    var mem   = navigator.deviceMemory;
    var cores = navigator.hardwareConcurrency;
    var tier  = 'high';
    if      ((mem && mem   <= 2) || (cores && cores <= 2)) tier = 'low';
    else if ((mem && mem   <= 4) || (cores && cores <= 4)) tier = 'mid';
    document.documentElement.setAttribute('data-perf', tier);
  } catch(e) {}
})();
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark" data-perf="high">
      <head>
        {/* Runs synchronously before any paint — stamps the perf tier so
            CSS rules (no backdrop-filter, no shimmer, etc.) apply instantly */}
        <script dangerouslySetInnerHTML={{ __html: DEVICE_TIER_SCRIPT }} />
      </head>
      <body className="grain-overlay">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
