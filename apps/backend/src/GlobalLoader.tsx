'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const GlobalLoader = () => {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Initial load
    const timer = setTimeout(() => setLoading(false), 2500); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Page transition loading
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 800); // Shorter for transitions
    return () => clearTimeout(timer);
  }, [pathname]);

  const isLoading = loading || pageLoading;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="relative w-32 h-32 mb-8">
        <Image src="/logo.png" alt="Logo" layout="fill" objectFit="contain" />
        {/* Animated tech-style design */}
        <div className="absolute inset-0 border-2 border-gray-700 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-2 border border-gray-800 rounded-full animate-ping-slow"></div>
      </div>
      <h1 className="text-2xl font-bold tracking-widest uppercase">
        MoosaTheGreat.com
      </h1>
      <p className="mt-2 text-xs tracking-widest text-gray-400 uppercase">
        Fulfilling IT, Technology, Innovation, and Digital Systems
      </p>
      <div className="absolute bottom-8 w-1/2 h-1 bg-gray-800 overflow-hidden">
        <div className="h-full bg-white animate-progress"></div>
      </div>
    </div>
  );
};

export default GlobalLoader;