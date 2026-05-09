import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'ICARUS Debate Academy — Ascend Beyond Limits',
  description: 'ICARUS Debate Academy — where bold thinkers learn to argue, persuade, and lead.',
  keywords: ['debate', 'academy', 'public speaking', 'argumentation', 'ICARUS'],
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c0c1a',
};

// Runs before React hydrates: stamps data-perf on <html> so CSS tier rules
// apply on the very first paint with zero flicker.
const PERF_SCRIPT = `(function(){try{
  var m=navigator.deviceMemory,c=navigator.hardwareConcurrency,t='high';
  if((m&&m<=2)||(c&&c<=2))t='low';
  else if((m&&m<=4)||(c&&c<=4))t='mid';
  document.documentElement.setAttribute('data-perf',t);
}catch(e){}})();`.trim();


// Service Worker registration — runs after page load so it never
// blocks the critical rendering path
const SW_SCRIPT = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch(function () { /* silent — SW is a progressive enhancement */ });
  });
}
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light" data-perf="high">
      <head>
        {/* Device-tier detection — must run before any paint */}
        <script dangerouslySetInnerHTML={{ __html: PERF_SCRIPT }} />
        {/* Service Worker registration — after load, never blocks render */}
        <script dangerouslySetInnerHTML={{ __html: SW_SCRIPT }} />

        {/* Preconnect to Google Fonts domains — tells the browser to open
            the TCP/TLS connection before it even sees the stylesheet link */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Non-blocking font load — <link rel="stylesheet"> in <head> is
            parsed async by modern browsers, unlike CSS @import which blocks
            the entire stylesheet cascade until the font CSS arrives */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
        />

        {/* Preload the GLB — starts fetching at highest priority, before
            React even boots. Eliminates the "model pop-in" on first visit. */}
        <link rel="preload" href="/Icarus_model_3d.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className="grain-overlay">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
