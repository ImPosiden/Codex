'use client';

import { BarChart3, Ticket, Clock, CheckCircle } from 'lucide-react';

export default function StaffDashboard() {
  const stats = [
    { label: 'Total Properties', value: '248', icon: Ticket, color: 'bg-blue-100 text-blue-700' },
    { label: 'In Progress', value: '42', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Completed', value: '206', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
    { label: 'Performance', value: '94%', icon: BarChart3, color: 'bg-purple-100 text-purple-700' },
  ];

  const recentTickets = [
    { id: 'TKT-001', title: 'Service Setup Issue', priority: 'High', status: 'In Progress' },
    { id: 'TKT-002', title: 'Account Upgrade Request', priority: 'Medium', status: 'In Progress' },
    { id: 'TKT-003', title: 'Payment Processing', priority: 'High', status: 'Pending Review' },
    { id: 'TKT-004', title: 'Feature Request', priority: 'Low', status: 'Completed' },
    { id: 'TKT-005', title: 'Password Reset', priority: 'Medium', status: 'Completed' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your work overview.</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Tickets Assigned</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ticket ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Priority</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">{ticket.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ticket.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.priority === 'High'
                          ? 'bg-red-100 text-red-800'
                          : ticket.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : ticket.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
