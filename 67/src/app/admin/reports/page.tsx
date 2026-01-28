'use client';

import { useState } from 'react';
import { Download, Calendar, X, FileText, Users, Shield, BarChart3, Loader2 } from 'lucide-react';

interface Report {
  id: number;
  name: string;
  date: string;
  size: string;
  type: string;
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([
    { id: 1, name: 'Monthly Performance Report', date: 'Jan 2024', size: '2.4 MB', type: 'performance' },
    { id: 2, name: 'User Analytics Report', date: 'Jan 2024', size: '1.8 MB', type: 'users' },
    { id: 3, name: 'System Health Report', date: 'Jan 2024', size: '3.1 MB', type: 'system' },
    { id: 4, name: 'Security Audit Report', date: 'Dec 2023', size: '5.2 MB', type: 'security' },
    { id: 5, name: 'Quarterly Review', date: 'Dec 2023', size: '4.7 MB', type: 'performance' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    reportType: 'performance',
    dateRange: 'monthly',
    format: 'pdf',
    includeCharts: true,
    includeSummary: true,
  });

  const reportTypes = [
    { value: 'performance', label: 'Performance Report', icon: BarChart3 },
    { value: 'users', label: 'User Analytics', icon: Users },
    { value: 'system', label: 'System Health', icon: FileText },
    { value: 'security', label: 'Security Audit', icon: Shield },
  ];

  const dateRanges = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const formats = [
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV' },
    { value: 'xlsx', label: 'Excel (XLSX)' },
  ];

  const generateReportContent = (report: Report, format: string) => {
    const reportData = {
      title: report.name,
      generatedAt: new Date().toISOString(),
      data: {
        summary: 'This is a generated report summary.',
        metrics: [
          { name: 'Total Users', value: 1250 },
          { name: 'Active Sessions', value: 340 },
          { name: 'Revenue', value: '$45,000' },
          { name: 'Growth Rate', value: '12.5%' },
        ],
      },
    };

    if (format === 'csv') {
      const headers = 'Metric,Value\n';
      const rows = reportData.data.metrics.map(m => `${m.name},${m.value}`).join('\n');
      return headers + rows;
    } else if (format === 'xlsx' || format === 'pdf') {
      return JSON.stringify(reportData, null, 2);
    }
    return JSON.stringify(reportData);
  };

  const handleDownload = async (report: Report) => {
    setDownloading(report.id);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const format = 'csv'; // Default format for existing reports
    const content = generateReportContent(report, format);
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.name.replace(/\s+/g, '_')}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setDownloading(null);
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reportType = reportTypes.find(r => r.value === formData.reportType);
    const currentDate = new Date();
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    const newReport: Report = {
      id: reports.length + 1,
      name: `${reportType?.label} - ${formData.dateRange.charAt(0).toUpperCase() + formData.dateRange.slice(1)}`,
      date: monthYear,
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      type: formData.reportType,
    };
    
    setReports([newReport, ...reports]);
    
    // Auto-download the generated report
    const content = generateReportContent(newReport, formData.format);
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      csv: 'text/csv',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
    
    const blob = new Blob([content], { type: mimeTypes[formData.format] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${newReport.name.replace(/\s+/g, '_')}.${formData.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setGenerating(false);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate, view and download system reports</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Calendar size={20} />
          Generate Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reports</p>
              <p className="text-xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Performance</p>
              <p className="text-xl font-bold text-gray-900">{reports.filter(r => r.type === 'performance').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">User Reports</p>
              <p className="text-xl font-bold text-gray-900">{reports.filter(r => r.type === 'users').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Security Reports</p>
              <p className="text-xl font-bold text-gray-900">{reports.filter(r => r.type === 'security').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Generated Reports</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Report Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Size</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{report.name}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.type === 'performance' ? 'bg-blue-100 text-blue-700' :
                    report.type === 'users' ? 'bg-purple-100 text-purple-700' :
                    report.type === 'security' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.size}</td>
                <td className="px-6 py-4 text-sm">
                  <button 
                    onClick={() => handleDownload(report)}
                    disabled={downloading === report.id}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2 disabled:opacity-50"
                  >
                    {downloading === report.id ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download size={18} />
                        Download
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Generate New Report</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {reportTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setFormData({ ...formData, reportType: type.value })}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                        formData.reportType === type.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon size={20} className={formData.reportType === type.value ? 'text-blue-600' : 'text-gray-500'} />
                      <span className={`text-sm font-medium ${formData.reportType === type.value ? 'text-blue-700' : 'text-gray-700'}`}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={formData.dateRange}
                  onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {dateRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="flex gap-3">
                  {formats.map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setFormData({ ...formData, format: format.value })}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        formData.format === format.value 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {format.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeCharts}
                      onChange={(e) => setFormData({ ...formData, includeCharts: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Include Charts & Graphs</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeSummary}
                      onChange={(e) => setFormData({ ...formData, includeSummary: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Include Executive Summary</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                disabled={generating}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText size={18} />
                    Generate & Download
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
