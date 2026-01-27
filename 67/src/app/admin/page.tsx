'use client';

import { BarChart3, Users, Wrench, TrendingUp } from 'lucide-react';
import StatCard from '@/components/StatCard';
import RecentActivity from '@/components/RecentActivity';

export default function Dashboard() {
  const stats = [
    { icon: Users, label: 'Total Users', value: '2,451', change: '+12%' },
    { icon: Wrench, label: 'Active Services', value: '18', change: '+2' },
    { icon: BarChart3, label: 'Completed Tasks', value: '1,234', change: '+8%' },
    { icon: TrendingUp, label: 'System Health', value: '98.5%', change: 'Optimal' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black-900">Dashboard</h1>
        <p className="text-black-600 mt-1">Welcome back! Here's your system overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-black-900 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="/admin/users" className="text-blue-600 hover:text-blue-800 font-medium">
                Add New User
              </a>
            </li>
            <li>
              <a href="/admin/services" className="text-blue-600 hover:text-blue-800 font-medium">
                Create Service
              </a>
            </li>
            <li>
              <a href="/admin/reports" className="text-blue-600 hover:text-blue-800 font-medium">
                View Reports
              </a>
            </li>
            <li>
              <a href="/admin/settings" className="text-blue-600 hover:text-blue-800 font-medium">
                System Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
