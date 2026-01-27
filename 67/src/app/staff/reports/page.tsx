'use client';

import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';

export default function StaffReports() {
  const performanceMetrics = [
    { label: 'Average Response Time', value: '2.5 hours', trend: 'down', change: '-15%' },
    { label: 'Property Resolution Rate', value: '94%', trend: 'up', change: '+3%' },
    { label: 'Customer Satisfaction', value: '4.8/5', trend: 'up', change: '+0.2' },
    { label: 'Properties Resolved This Month', value: '156', trend: 'up', change: '+28%' },
  ];

  const reportsList = [
    {
      id: 1,
      title: 'Monthly Performance Report',
      period: 'December 2025',
      properties: 245,
      resolved: 231,
      rating: 4.7,
      date: '2025-12-31',
    },
    {
      id: 2,
      title: 'Property Category Analysis',
      period: 'December 2025',
      properties: 245,
      residential: 89,
      commercial: 76,
      other: 80,
      date: '2025-12-25',
    },
    {
      id: 3,
      title: 'Customer Feedback Summary',
      period: 'December 2025',
      positive: '87%',
      neutral: '10%',
      negative: '3%',
      date: '2025-12-20',
    },
    {
      id: 4,
      title: 'Support Response Times',
      period: 'November 2025',
      avgTime: '2.8 hours',
      improvement: 'Improved by 12%',
      date: '2025-11-30',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Performance Reports</h1>
        <p className="text-gray-600 mt-2">Track your support metrics and performance over time</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
            <div className="flex items-center gap-2 mt-3">
              <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp size={16} />
                <span className="text-sm font-semibold">{metric.change}</span>
              </div>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 size={24} className="text-indigo-600" />
            Available Reports
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {reportsList.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {report.period}
                  </span>
                  <span>{report.date}</span>
                  {report.properties && (
                    <>
                      <span>{report.properties} properties</span>
                      {report.resolved && <span>{report.resolved} resolved</span>}
                      {report.rating && <span>★ {report.rating} rating</span>}
                    </>
                  )}
                  {report.positive && (
                    <>
                      <span>{report.positive} positive feedback</span>
                    </>
                  )}
                  {report.avgTime && (
                    <>
                      <span>{report.avgTime} avg response</span>
                    </>
                  )}
                </div>
              </div>
              <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 whitespace-nowrap">
                <Download size={18} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
