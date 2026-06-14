import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'ICARUS - Learn. Grow. Inspire.',
  description: 'ICARUS helps students learn, grow, inspire, speak confidently, and lead.',
  keywords: ['education', 'debate', 'public speaking', 'Model United Nations', 'ICARUS'],
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c0c1a',
};

const PERF_SCRIPT = `(function(){try{
  var m=navigator.deviceMemory,c=navigator.hardwareConcurrency,t='high';
  if((m&&m<=2)||(c&&c<=2))t='low';
  else if((m&&m<=4)||(c&&c<=4))t='mid';
  document.documentElement.setAttribute('data-perf',t);
}catch(e){}})();`.trim();

const SW_SCRIPT = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch(function () { /* silent progressive enhancement */ });
  });
}
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light" data-perf="high">
      <head>
        <script dangerouslySetInnerHTML={{ __html: PERF_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: SW_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
        />
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
