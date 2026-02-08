import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GlobalLoader from '@/components/GlobalLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MoosaTheGreat.com',
  description: 'Fulfilling IT, technology, innovation, and digital systems',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <GlobalLoader />
        <main>{children}</main>
      </body>
    </html>
  );
}