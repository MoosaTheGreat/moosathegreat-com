'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Page {
  title: string;
  content: any;
}

export default function HomePage() {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await apiFetch('/pages/home');
        setPage(data);
      } catch (error) {
        console.error('Failed to fetch home page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 uppercase text-xs tracking-widest">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-8">
          {page?.title || 'Welcome to MoosaTheGreat.com'}
        </h1>
        <div className="prose prose-invert max-w-none">
          {/* Render page content dynamically */}
          {page?.content ? (
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          ) : (
            <p className="text-gray-400">
              This is a dynamic CMS-powered page. Content can be edited in the admin panel.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
