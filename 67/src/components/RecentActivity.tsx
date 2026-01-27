import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    { id: 1, user: 'John Smith', action: 'Created new service', timestamp: '2 hours ago', status: 'completed' },
    { id: 2, user: 'Jane Doe', action: 'Updated user permissions', timestamp: '4 hours ago', status: 'completed' },
    { id: 3, user: 'Mike Johnson', action: 'System backup initiated', timestamp: '6 hours ago', status: 'pending' },
    { id: 4, user: 'Sarah Williams', action: 'Generated monthly report', timestamp: '1 day ago', status: 'completed' },
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="text-green-600" size={18} />;
    if (status === 'pending') return <Clock className="text-yellow-600" size={18} />;
    return <AlertCircle className="text-red-600" size={18} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
            {getStatusIcon(activity.status)}
            <div className="flex-1">
              <p className="text-gray-900 font-medium">{activity.user}</p>
              <p className="text-gray-600 text-sm">{activity.action}</p>
            </div>
            <p className="text-gray-500 text-sm whitespace-nowrap">{activity.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
