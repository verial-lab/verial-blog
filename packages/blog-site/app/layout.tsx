import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { Navigation } from '@/components/Navigation';

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const instrumentSerif = Instrument_Serif({ weight: '400', subsets: ['latin'], variable: '--font-serif' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    template: '%s | Verial',
    default: 'Verial — Essays on Systems & Architecture',
  },
  description: 'High-density essays on systems design, architecture, and engineering philosophy.',
  metadataBase: new URL('https://verial.xyz'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <RootProvider>
          <Navigation />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
