'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function StaffNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/staff" className="text-2xl font-bold">
              ServiceHub Staff
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/staff" className="hover:text-indigo-200 transition">
              Dashboard
            </Link>
            <Link href="/staff/tickets" className="hover:text-indigo-200 transition">
              Tickets
            </Link>
            <Link href="/staff/reports" className="hover:text-indigo-200 transition">
              Reports
            </Link>
            <Link href="/staff/settings" className="hover:text-indigo-200 transition">
              Settings
            </Link>
            <Link href="/" className="hover:text-indigo-200 transition font-semibold">
              Back to Portal Selection
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-600 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/staff"
              className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/staff/tickets"
              className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Tickets
            </Link>
            <Link
              href="/staff/reports"
              className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Reports
            </Link>
            <Link
              href="/staff/settings"
              className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Settings
            </Link>
            <Link
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition font-semibold"
            >
              Back to Portal Selection
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
