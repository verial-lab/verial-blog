import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Source_Serif_4, Newsreader, JetBrains_Mono } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SearchDialog } from '@/components/SearchDialog';
import { FeedbackWidget } from '@/components/FeedbackWidget';
import { SubscriptionBanner } from '@/components/SubscriptionBanner';
import { ogMeta } from '@/lib/og';

const sourceSerif = Source_Serif_4({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-serif' });
const newsreader = Newsreader({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    template: '%s | Verial',
    default: 'Verial — Truth-seeking. Applied.',
  },
  description: 'High-density writing on engineering, systems thinking, and applied wisdom for the exponential age.',
  metadataBase: new URL('https://verial.xyz'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  ...ogMeta('Verial', 'High-density writing on engineering, systems thinking, and applied wisdom for the exponential age.'),
  alternates: {
    types: { 'application/rss+xml': '/feed.xml' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    {/* suppressHydrationWarning: next-themes injects the `dark` class server-side but applies it via script on the client, causing a className mismatch. This suppresses that expected discrepancy on <html> only. */}
    <html lang="en" suppressHydrationWarning className={`${sourceSerif.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased text-[18px] leading-[1.65]">
        <RootProvider search={{ enabled: false }} theme={{ defaultTheme: 'dark', forcedTheme: 'dark' }}>
          <Navigation />
          <SearchDialog />
          <Suspense><SubscriptionBanner /></Suspense>
          {children}
          <Footer />
          <FeedbackWidget />
        </RootProvider>
      </body>
    </html>
  );
}
