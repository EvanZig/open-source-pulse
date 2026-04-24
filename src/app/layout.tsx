import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import { QueryProvider } from '@/providers/QueryProvider';
import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn('bg-background min-h-screen font-sans antialiased', inter.variable)}>
        <QueryProvider>
          {children}
          <Toaster richColors closeButton position="bottom-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
