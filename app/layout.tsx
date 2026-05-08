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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <body className="grain-overlay">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
