'use client';

import { Plus, MoreVertical, Zap } from 'lucide-react';
import { useState } from 'react';

export default function Services() {
  const [filter, setFilter] = useState('all');

  const services = [
    { id: 1, name: 'Email Service', status: 'Active', uptime: '99.9%', requests: '1.2M' },
    { id: 2, name: 'Database Service', status: 'Active', uptime: '99.8%', requests: '2.5M' },
    { id: 3, name: 'Cache Service', status: 'Active', uptime: '99.95%', requests: '800K' },
    { id: 4, name: 'Payment Gateway', status: 'Maintenance', uptime: '99.7%', requests: '500K' },
    { id: 5, name: 'Notification Service', status: 'Active', uptime: '99.85%', requests: '3.1M' },
  ];

  const filteredServices =
    filter === 'all'
      ? services
      : services.filter((s) => s.status.toLowerCase() === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all services</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={20} />
          Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'active', 'maintenance'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Zap className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.requests} requests/day</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {service.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-semibold text-gray-900">{service.uptime}</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
