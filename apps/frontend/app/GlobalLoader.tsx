'use client';

import { useEffect, useState } from 'react';

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="text-white text-2xl font-bold uppercase tracking-widest mb-4">
          MoosaTheGreat.com
        </div>
        <div className="w-64 h-1 bg-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-pulse"></div>
        </div>
        <div className="text-gray-500 text-xs uppercase tracking-widest mt-4">
          Initializing System...
        </div>
      </div>
    </div>
  );
}
