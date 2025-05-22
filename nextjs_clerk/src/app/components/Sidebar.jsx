'use client';

import Link from 'next/link';
import { Home, Settings, LayoutDashboard } from 'lucide-react';

const menu = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Home', href: '/', icon: Home },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 font-bold text-xl border-b">My App</div>
      <nav className="flex flex-col p-4 space-y-2">
        {menu.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-100 rounded">
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
