import Image from 'next/image';
import Header from '@/components/Header';

async function getHomePageContent() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/cms/pages/home`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch home page content:", error);
    return null;
  }
}

export default async function HomePage() {
  const page = await getHomePageContent();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="relative w-48 h-48 mb-8">
          <Image src="/logo.png" alt="MoosaTheGreat Logo" layout="fill" objectFit="contain" priority />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest">
          {page?.content?.content?.[0]?.content?.[0]?.text || 'MoosaTheGreat.com'}
        </h1>
        <p className="mt-4 text-sm md:text-base text-gray-400 uppercase tracking-wider">
          {page?.content?.content?.[1]?.content?.[0]?.text || 'Fulfilling IT, technology, innovation, and digital systems.'}
        </p>
      </div>
      <footer className="text-center p-4 text-xs text-gray-600">
        © {new Date().getFullYear()} MoosaTheGreat.com. All rights reserved.
      </footer>
    </div>
  );
}