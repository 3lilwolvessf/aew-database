import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'AEW Atlas - Premium Wrestling Archive',
  description: 'Explore AEW history through Tale of the Tape, Event Archives, and Championship Lineage',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
