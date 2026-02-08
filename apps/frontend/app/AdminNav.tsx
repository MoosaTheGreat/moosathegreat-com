'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Pages (CMS)', href: '/admin/pages' },
  { name: 'Console', href: '/admin/console' },
  { name: 'Commands', href: '/admin/commands' },
  { name: 'Plugins', href: '/admin/plugins' },
  { name: 'Visual Coder', href: '/admin/visual-coder' },
  { name: 'Users', href: '/admin/users' },
  { name: 'Settings', href: '/admin/settings' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center space-x-2">
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
        <h1 className="font-bold uppercase tracking-widest">Admin</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <a className={`block px-3 py-2 text-sm uppercase tracking-wider ${pathname === item.href ? 'bg-gray-800' : 'hover:bg-gray-900'}`}>
              {item.name}
            </a>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button onClick={logout} className="w-full text-left px-3 py-2 text-sm uppercase tracking-wider hover:bg-gray-900">Logout</button>
      </div>
    </div>
  );
}