'use client';

import AdminConsole from '@/components/AdminConsole';

export default function AdminConsolePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">
          System Console
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest">
          Execute administrative commands and system operations
        </p>
      </div>

      <div className="border border-gray-800 p-6">
        <AdminConsole />
      </div>

      {/* Quick Commands */}
      <div className="border border-gray-800 p-6">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-4">
          Quick Commands
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              System
            </h4>
            <div className="space-y-1 text-xs">
              <div><code className="bg-gray-900 px-2 py-1">status</code> - System status</div>
              <div><code className="bg-gray-900 px-2 py-1">maintenance on</code> - Enable maintenance</div>
              <div><code className="bg-gray-900 px-2 py-1">maintenance off</code> - Disable maintenance</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Users
            </h4>
            <div className="space-y-1 text-xs">
              <div><code className="bg-gray-900 px-2 py-1">users list</code> - List all users</div>
              <div><code className="bg-gray-900 px-2 py-1">user create email@example.com</code> - Create user</div>
              <div><code className="bg-gray-900 px-2 py-1">user delete email@example.com</code> - Delete user</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
