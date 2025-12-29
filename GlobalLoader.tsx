'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function GlobalLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Trigger load on route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate tech processing
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="animate-pulse mb-8">
        <Image 
          src="/logo.png" 
          alt="MoosaTheGreat Logo" 
          width={100} 
          height={100} 
          className="grayscale"
        />
      </div>
      
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-2">
        MoosaTheGreat.com
      </h1>
      
      <div className="flex flex-col items-center text-xs font-mono text-gray-400">
        <p>INITIALIZING SYSTEMS...</p>
        <p>LOADING MODULES...</p>
        <p>OPTIMIZING INNOVATION...</p>
      </div>

      <div className="mt-8 w-64 h-1 bg-gray-800 rounded overflow-hidden">
        <div className="h-full bg-white animate-progress"></div>
      </div>

      <style jsx>{`
        .animate-progress {
          width: 0%;
          animation: progress 1.5s ease-in-out forwards;
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}