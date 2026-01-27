'use client';

import { User, Settings, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Admin Portal</h1>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-800">
            <Bell size={20} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <Settings size={20} />
          </button>
          <div className="flex items-center gap-2 pl-4 border-l">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Admin User</p>
              <p className="text-gray-500 text-xs">Online</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
