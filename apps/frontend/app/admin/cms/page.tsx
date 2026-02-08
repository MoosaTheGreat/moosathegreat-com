'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: any;
  published: boolean;
}

export default function CmsEditor() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await apiFetch('/admin/pages');
        setPages(data);
      } catch (error) {
        console.error('Failed to fetch pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const savePage = async () => {
    if (!selectedPage) return;
    try {
      await apiFetch(`/admin/pages/${selectedPage.id}`, {
        method: 'PATCH',
        body: JSON.stringify(selectedPage),
      });
      alert('Page saved successfully');
    } catch (error) {
      console.error('Failed to save page:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 uppercase text-xs tracking-widest">
          Loading Pages...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-6">
        CMS Page Editor
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="border border-gray-800 p-6">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-4">Pages</h2>
          <div className="space-y-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left p-3 border transition-colors ${
                  selectedPage?.id === page.id
                    ? 'border-white bg-gray-900'
                    : 'border-gray-700 hover:border-white'
                }`}
              >
                {page.title}
              </button>
            ))}
          </div>
        </div>

        {selectedPage && (
          <div className="lg:col-span-2 border border-gray-800 p-6">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4">Edit Page</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-2 uppercase">Title</label>
                <input
                  type="text"
                  value={selectedPage.title}
                  onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                  className="w-full bg-black border border-gray-700 p-3 text-white focus:border-white outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase">Slug</label>
                <input
                  type="text"
                  value={selectedPage.slug}
                  onChange={(e) => setSelectedPage({ ...selectedPage, slug: e.target.value })}
                  className="w-full bg-black border border-gray-700 p-3 text-white focus:border-white outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase">Content (JSON)</label>
                <textarea
                  value={JSON.stringify(selectedPage.content, null, 2)}
                  onChange={(e) => {
                    try {
                      const content = JSON.parse(e.target.value);
                      setSelectedPage({ ...selectedPage, content });
                    } catch (error) {
                      // Invalid JSON, ignore
                    }
                  }}
                  className="w-full bg-black border border-gray-700 p-3 text-white font-mono text-sm focus:border-white outline-none transition-colors"
                  rows={10}
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPage.published}
                    onChange={(e) => setSelectedPage({ ...selectedPage, published: e.target.checked })}
                    className="bg-black border border-gray-700"
                  />
                  <span className="text-xs font-bold uppercase">Published</span>
                </label>
              </div>
              <button
                onClick={savePage}
                className="w-full bg-white text-black font-bold py-3 uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Save Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
