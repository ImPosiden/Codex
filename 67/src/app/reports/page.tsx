'use client';

import { Download, Calendar } from 'lucide-react';

export default function Reports() {
  const reports = [
    { id: 1, name: 'Monthly Performance Report', date: 'Jan 2024', size: '2.4 MB' },
    { id: 2, name: 'User Analytics Report', date: 'Jan 2024', size: '1.8 MB' },
    { id: 3, name: 'System Health Report', date: 'Jan 2024', size: '3.1 MB' },
    { id: 4, name: 'Security Audit Report', date: 'Dec 2023', size: '5.2 MB' },
    { id: 5, name: 'Quarterly Review', date: 'Dec 2023', size: '4.7 MB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">View and download system reports</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Calendar size={20} />
          Generate Report
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Report Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Size</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{report.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.size}</td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                    <Download size={18} />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
