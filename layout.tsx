import type { Metadata } from 'next';
import './globals.css';
import GlobalLoader from '../components/GlobalLoader';

export const metadata: Metadata = {
  title: 'MoosaTheGreat.com',
  description: 'Fulfilling IT, technology, innovation, and digital systems',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalLoader>{children}</GlobalLoader>
      </body>
    </html>
  );
}