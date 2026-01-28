'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/portal/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
            {!loading && user ? (
              // Logged In - Show User Info and Logout
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 pl-4 border-l">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : !loading ? (
              // Not Logged In - Show Login/Signup
              <>
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
              </>
            ) : (
              // Loading state
              <div className="animate-pulse">
                <div className="h-10 w-24 bg-gray-200 rounded"></div>
              </div>
            )}
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
            <div className="border-t pt-2">
              {!loading && user ? (
                // Logged In - Show User Info and Logout
                <>
                  <div className="px-4 py-2">
                    <p className="font-semibold text-gray-800">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors text-left"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : !loading ? (
                // Not Logged In - Show Login/Signup
                <div className="flex gap-2">
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
              ) : (
                // Loading state
                <div className="animate-pulse">
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
