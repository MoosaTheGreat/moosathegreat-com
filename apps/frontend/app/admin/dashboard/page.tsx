'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface DashboardStats {
  totalUsers: number;
  totalPages: number;
  totalPlugins: number;
  totalCommands: number;
  recentUpdates: any[];
  systemStatus: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiFetch('/admin/stats');
        setStats(response);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 uppercase text-xs tracking-widest">
          Loading System Data...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-6">
        System Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border border-gray-800 p-6">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Total Users
          </h3>
          <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
        </div>

        <div className="border border-gray-800 p-6">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Active Pages
          </h3>
          <p className="text-3xl font-bold">{stats?.totalPages || 0}</p>
        </div>

        <div className="border border-gray-800 p-6">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Plugins
          </h3>
          <p className="text-3xl font-bold">{stats?.totalPlugins || 0}</p>
        </div>

        <div className="border border-gray-800 p-6">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Commands
          </h3>
          <p className="text-3xl font-bold">{stats?.totalCommands || 0}</p>
        </div>
      </div>

      {/* System Status */}
      <div className="border border-gray-800 p-6">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-4">
          System Status
        </h3>
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${
            stats?.systemStatus === 'ONLINE' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="uppercase text-sm tracking-widest">
            {stats?.systemStatus || 'UNKNOWN'}
          </span>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="border border-gray-800 p-6">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-4">
          Recent Updates
        </h3>
        <div className="space-y-3">
          {stats?.recentUpdates?.length ? (
            stats.recentUpdates.map((update: any, index: number) => (
              <div key={index} className="border-l-2 border-gray-700 pl-4">
                <p className="text-sm">{update.title}</p>
                <p className="text-xs text-gray-500">{update.timestamp}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent updates</p>
          )}
        </div>
      </div>
    </div>
  );
}
