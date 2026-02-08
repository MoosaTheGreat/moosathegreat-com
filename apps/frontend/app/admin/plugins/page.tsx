'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Plugin {
  id: string;
  name: string;
  enabled: boolean;
  version: string;
}

export default function PluginManagement() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlugins = async () => {
      try {
        const data = await apiFetch('/admin/plugins');
        setPlugins(data);
      } catch (error) {
        console.error('Failed to fetch plugins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlugins();
  }, []);

  const togglePlugin = async (id: string, enabled: boolean) => {
    try {
      await apiFetch(`/admin/plugins/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ enabled: !enabled }),
      });
      setPlugins(plugins.map(p => p.id === id ? { ...p, enabled: !enabled } : p));
    } catch (error) {
      console.error('Failed to toggle plugin:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 uppercase text-xs tracking-widest">
          Loading Plugins...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-6">
        Plugin Management
      </h1>

      <div className="border border-gray-800">
        <div className="bg-gray-900 p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold uppercase tracking-widest">Installed Plugins</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold">{plugin.name}</p>
                <p className="text-sm text-gray-500">v{plugin.version}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs uppercase tracking-widest ${
                  plugin.enabled ? 'bg-green-900 text-green-300' : 'bg-gray-900 text-gray-300'
                }`}>
                  {plugin.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <button
                  onClick={() => togglePlugin(plugin.id, plugin.enabled)}
                  className="text-xs uppercase tracking-widest bg-gray-800 px-3 py-1 hover:bg-gray-700 transition-colors"
                >
                  {plugin.enabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
