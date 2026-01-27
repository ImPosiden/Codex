'use client';

import Link from 'next/link';
import { LogOut, Settings, CreditCard, Package, Download } from 'lucide-react';

export default function Dashboard() {
  const subscriptions = [
    {
      id: 1,
      name: 'Cloud Storage Pro',
      price: 9.99,
      status: 'Active',
      renewalDate: '2026-02-27',
      usage: '75 GB / 100 GB',
    },
    {
      id: 2,
      name: 'Email Service Plus',
      price: 19.99,
      status: 'Active',
      renewalDate: '2026-03-15',
      usage: 'Unlimited',
    },
  ];

  const recentInvoices = [
    { id: 'INV-001', date: '2026-01-27', amount: 29.98, status: 'Paid' },
    { id: 'INV-002', date: '2025-12-27', amount: 29.98, status: 'Paid' },
    { id: 'INV-003', date: '2025-11-27', amount: 29.98, status: 'Paid' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome, John Doe</h1>
              <p className="text-blue-100">john.doe@example.com</p>
            </div>
            <Link
              href="/portal/login"
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg"
            >
              <LogOut size={20} />
              Logout
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Active Services</p>
            <p className="text-3xl font-bold text-blue-600">2</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Monthly Spend</p>
            <p className="text-3xl font-bold text-blue-600">$29.98</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Storage Used</p>
            <p className="text-3xl font-bold text-blue-600">75 GB</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Account Status</p>
            <p className="text-3xl font-bold text-green-600">Active</p>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Package size={28} />
              Your Subscriptions
            </h2>
            <Link
              href="/portal/catalog"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Add Services
            </Link>
          </div>

          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{sub.name}</h3>
                    <p className="text-sm text-gray-600">
                      Renews on {new Date(sub.renewalDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {sub.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-xl font-semibold">${sub.price}/month</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Usage</p>
                    <p className="text-xl font-semibold">{sub.usage}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-lg font-medium">
                      Manage
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 rounded-lg font-medium">
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Usage Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Invoices */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Download size={28} />
              Invoices
            </h2>

            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Invoice</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">${invoice.amount}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-8 h-fit">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <CreditCard size={28} />
              Payment Method
            </h2>

            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg p-6 mb-6">
              <p className="text-sm opacity-75 mb-4">Visa Card</p>
              <p className="text-2xl font-semibold mb-4 tracking-wider">•••• •••• •••• 4242</p>
              <div className="flex justify-between text-sm">
                <span>John Doe</span>
                <span>12/26</span>
              </div>
            </div>

            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg font-medium mb-3">
              Update Payment Method
            </button>

            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg font-medium flex items-center justify-center gap-2">
              <Settings size={18} />
              Billing Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
