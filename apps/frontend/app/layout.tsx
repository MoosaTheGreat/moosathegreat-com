'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [token, loading, router]);

  if (loading || !token) {
    return null; // Or a loading spinner specific to the admin area
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <AdminNav />
      <main className="flex-grow p-8 overflow-y-auto">{children}</main>
    </div>
  );
}