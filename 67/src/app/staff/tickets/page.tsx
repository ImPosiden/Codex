'use client';

import { Search, Plus, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function StaffTickets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const tickets = [
    { id: 'TKT-001', customer: 'John Smith', subject: 'Service Setup Issue', category: 'Technical', priority: 'High', status: 'In Progress', assigned: '2h ago' },
    { id: 'TKT-002', customer: 'Sarah Johnson', subject: 'Account Upgrade Request', category: 'Account', priority: 'Medium', status: 'In Progress', assigned: '4h ago' },
    { id: 'TKT-003', customer: 'Mike Davis', subject: 'Payment Processing', category: 'Billing', priority: 'High', status: 'Pending Review', assigned: '1h ago' },
    { id: 'TKT-004', customer: 'Emma Wilson', subject: 'Feature Request Discussion', category: 'Feature', priority: 'Low', status: 'Completed', assigned: '1d ago' },
    { id: 'TKT-005', customer: 'Alex Brown', subject: 'Password Reset', category: 'Account', priority: 'Medium', status: 'Completed', assigned: '2d ago' },
    { id: 'TKT-006', customer: 'Lisa Anderson', subject: 'Service Outage Report', category: 'Technical', priority: 'High', status: 'In Progress', assigned: '30m ago' },
    { id: 'TKT-007', customer: 'Chris Taylor', subject: 'Integration Help', category: 'Technical', priority: 'Medium', status: 'Pending Review', assigned: '3h ago' },
    { id: 'TKT-008', customer: 'Diana Martinez', subject: 'Refund Request', category: 'Billing', priority: 'High', status: 'Pending Review', assigned: '5h ago' },
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
        <p className="text-gray-600 mt-2">Manage and respond to customer support tickets</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by ticket ID, customer, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
            <Plus size={20} />
            New Ticket
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ticket ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Priority</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Assigned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="px-6 py-4 text-sm font-mono text-indigo-600 font-semibold">{ticket.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ticket.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ticket.subject}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                      {ticket.category}
                    </span>
                  </td>
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
                  <td className="px-6 py-4 text-sm text-gray-600">{ticket.assigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tickets found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
