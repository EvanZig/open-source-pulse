import type { Metadata, Viewport } from 'next';
import { Atkinson_Hyperlegible, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

import { QueryProvider } from '@/providers/QueryProvider';
import { cn } from '@/lib/utils';

import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-readable',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Open Source Pulse',
    template: '%s | Open Source Pulse',
  },
  description:
    'Explore curated Good First Issues and Help Wanted tickets from popular open source repositories.',
  applicationName: 'Open Source Pulse',
  keywords: ['open source', 'good first issue', 'help wanted', 'github', 'contributions'],
  authors: [{ name: 'Open Source Pulse' }],
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          plusJakartaSans.variable,
          atkinsonHyperlegible.variable,
        )}
      >
        <QueryProvider>
          {children}
          <Toaster richColors closeButton position="bottom-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
