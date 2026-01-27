'use client';

import React from 'react';
import { LayoutDashboard, Ticket, BarChart3, Settings, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StaffSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="w-64 bg-indigo-900 text-white min-h-screen p-6">
      <div className="mb-12">
        <Link href="/" className="flex items-center gap-2 mb-8 p-2 rounded-lg hover:bg-indigo-800 transition">
          <Home size={20} />
          <span className="font-semibold">Back Home</span>
        </Link>
      </div>

      <nav className="space-y-2">
        <Link
          href="/staff"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive('/staff') && pathname === '/staff'
              ? 'bg-indigo-600'
              : 'hover:bg-indigo-800'
          }`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/staff/tickets"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive('/staff/tickets')
              ? 'bg-indigo-600'
              : 'hover:bg-indigo-800'
          }`}
        >
          <Ticket size={20} />
          <span>Tickets</span>
        </Link>

        <Link
          href="/staff/reports"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive('/staff/reports')
              ? 'bg-indigo-600'
              : 'hover:bg-indigo-800'
          }`}
        >
          <BarChart3 size={20} />
          <span>Reports</span>
        </Link>

        <Link
          href="/staff/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive('/staff/settings')
              ? 'bg-indigo-600'
              : 'hover:bg-indigo-800'
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
