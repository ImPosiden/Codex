'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LogoutButton } from '@/components/LogoutButton';

/**
 * Example component showing how to use the auth system
 * You can use this as a template for integrating auth into your pages
 */
export function AuthExampleComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-4 text-center">Loading user info...</div>;
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">User Information</h2>
      
      {user ? (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Email:</p>
            <p className="font-medium">{user.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">User ID:</p>
            <p className="font-medium text-xs">{user.id}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Last Sign In:</p>
            <p className="font-medium">
              {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}
            </p>
          </div>

          <LogoutButton />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">You are not logged in</p>
          <a
            href="/portal/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </a>
        </div>
      )}
    </div>
  );
}
