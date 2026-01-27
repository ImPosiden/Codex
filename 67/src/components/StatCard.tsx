import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
}

export default function StatCard({ icon: Icon, label, value, change }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-green-600 text-sm mt-2">{change}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <Icon className="text-blue-600" size={28} />
        </div>
      </div>
    </div>
  );
}
