# Integration Examples

This file shows how to integrate the new Supabase auth system with your existing components.

## Example 1: Update UserNavbar to Show User Email

**File: `src/components/UserNavbar.tsx`**

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LogoutButton } from '@/components/LogoutButton';

export function UserNavbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">ServiceHub</h1>
          
          <div className="flex items-center gap-4">
            {!loading && user && (
              <>
                <span className="text-gray-700">{user.email}</span>
                <LogoutButton />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

## Example 2: Add Auth Status to Dashboard

**File: `src/app/portal/dashboard/page.tsx`**

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { UserNavbar } from '@/components/UserNavbar';
import { Sidebar } from '@/components/Sidebar';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <UserNavbar />
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            
            {user && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-gray-700">
                  Logged in as: <strong>{user.email}</strong>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  User ID: {user.id}
                </p>
              </div>
            )}

            {/* Rest of your dashboard content */}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
```

## Example 3: Create a Profile Page

**File: `src/app/portal/profile/page.tsx`** (new file)

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LogoutButton } from '@/components/LogoutButton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-2xl mx-auto px-4 py-6 flex items-center gap-4">
            <Link href="/portal/dashboard" className="hover:text-blue-600">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto p-8">
          {user && (
            <div className="space-y-6">
              {/* User Info Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">User ID</label>
                    <p className="text-sm font-mono text-gray-700">{user.id}</p>
                  </div>

                  {user.user_metadata?.full_name && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="text-lg">{user.user_metadata.full_name}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Sign In</label>
                    <p className="text-lg">
                      {user.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleString()
                        : 'Never'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
                
                <div className="space-y-3">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-left transition-colors">
                    Change Password
                  </button>
                  
                  <button className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-left transition-colors">
                    Update Email
                  </button>

                  <div className="border-t pt-3">
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
```

## Example 4: Create a Protected Settings Page

**File: `src/app/portal/settings/page.tsx`** (update if exists)

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useState } from 'react';

export default function Settings() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save preferences to Supabase
    console.log('Saving preferences:', preferences);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: e.target.checked,
                  })
                }
              />
              <span>Receive email notifications</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences.pushNotifications}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    pushNotifications: e.target.checked,
                  })
                }
              />
              <span>Receive push notifications</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences.newsletter}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    newsletter: e.target.checked,
                  })
                }
              />
              <span>Subscribe to newsletter</span>
            </label>

            <button
              type="submit"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
```

## Example 5: Public Page That Shows Auth Status

**File: `src/app/portal/about/page.tsx`** (update if exists)

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function About() {
  const { user, loading } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">About ServiceHub</h1>

      {/* Auth Status Banner */}
      {!loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          {user ? (
            <p className="text-gray-700">
              Welcome back, <strong>{user.email}</strong>!{' '}
              <Link href="/portal/dashboard" className="text-blue-600 hover:underline">
                Go to Dashboard →
              </Link>
            </p>
          ) : (
            <p className="text-gray-700">
              Not logged in yet?{' '}
              <Link href="/portal/login" className="text-blue-600 hover:underline">
                Sign in here →
              </Link>
            </p>
          )}
        </div>
      )}

      {/* Rest of your about content */}
      <p className="text-lg text-gray-600">
        Welcome to ServiceHub, your platform for property services and management.
      </p>
    </div>
  );
}
```

## Example 6: Admin-Only Component

**File: `src/components/AdminOnly.tsx`** (new file)

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AdminOnly({ children, fallback }: AdminOnlyProps) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Check if user is admin (you can add a role field to user metadata)
  const isAdmin = user?.user_metadata?.role === 'admin';

  if (!isAdmin) {
    return fallback || <div>You don't have permission to view this content.</div>;
  }

  return <>{children}</>;
}
```

## How to Use These Examples

1. Copy the code from the examples above
2. Create or update the files in your `src/` directory
3. Adjust styling and layout to match your needs
4. Import components as needed

## Common Patterns

### Check if User is Logged In
```tsx
const { user, loading } = useAuth();
if (user) { /* Show authenticated content */ }
```

### Protect an Entire Page
```tsx
<ProtectedRoute>
  {/* Page content */}
</ProtectedRoute>
```

### Add Logout
```tsx
import { LogoutButton } from '@/components/LogoutButton';
<LogoutButton />
```

### Access User Data
```tsx
const { user } = useAuth();
console.log(user?.email);
console.log(user?.id);
console.log(user?.user_metadata?.full_name);
```

---

These examples give you a starting point for integrating authentication throughout your application.
