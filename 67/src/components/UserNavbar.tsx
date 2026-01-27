'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/portal" className="text-2xl font-bold text-blue-600">
            ServiceHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/portal" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/portal/catalog" className="text-gray-700 hover:text-blue-600 font-medium">
              Services
            </Link>
            <Link href="/portal/pricing" className="text-gray-700 hover:text-blue-600 font-medium">
              Pricing
            </Link>
            <Link href="/portal/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/portal/login"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-medium"
            >
              Login
            </Link>
            <Link
              href="/portal/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/portal"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/portal/catalog"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Services
            </Link>
            <Link
              href="/portal/pricing"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Pricing
            </Link>
            <Link
              href="/portal/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              About
            </Link>
            <div className="flex gap-2 pt-2">
              <Link
                href="/portal/login"
                className="flex-1 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-center font-medium"
              >
                Login
              </Link>
              <Link
                href="/portal/signup"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
