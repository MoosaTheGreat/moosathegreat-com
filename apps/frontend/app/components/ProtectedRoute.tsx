'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 uppercase text-xs tracking-widest">
          Authenticating...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 uppercase text-xs tracking-widest">
          Access Denied
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
