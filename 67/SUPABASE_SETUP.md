# Supabase Integration Setup Guide

## Overview
This project now includes a complete Supabase authentication system with login, registration, and protected routes.

## What's Been Set Up

### 1. **Supabase Client** (`src/lib/supabaseClient.ts`)
- Creates and exports a Supabase client instance
- Uses environment variables for URL and API key

### 2. **Authentication Context** (`src/contexts/AuthContext.tsx`)
- Global auth state management using React Context
- Provides `useAuth()` hook for accessing user and auth functions
- Handles session persistence and real-time auth state updates

### 3. **Updated Pages**
- **Login** (`src/app/portal/login/page.tsx`): Email/password login with error handling
- **Signup** (`src/app/portal/signup/page.tsx`): User registration with password validation

### 4. **Protected Routes**
- Client-side protection via `ProtectedRoute` component
- Server-side protection via `middleware.ts`
- Automatic redirects to login for unauthenticated users

### 5. **Logout Functionality** (`src/components/LogoutButton.tsx`)
- Sign out button component ready to use in your navigation

### 6. **Root Layout** (`src/app/layout.tsx`)
- Wrapped with AuthProvider for global auth context

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project credentials:
   - **Project URL**: Found in Settings → API
   - **Anon Key**: Found in Settings → API

### 3. Add Environment Variables
Update `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Configure Authentication in Supabase
1. Go to **Authentication** → **Providers**
2. Enable **Email** (already enabled by default)
3. Go to **Email Templates** → **Confirm signup**
4. Update the confirmation link to point to your domain

### 5. Run the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000/portal/signup` to test registration.

## How to Use in Components

### Access Current User
```tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user, loading, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;
  
  return <div>Welcome, {user.email}!</div>;
}
```

### Protect a Route
```tsx
'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Protected content here</div>
    </ProtectedRoute>
  );
}
```

### Add Logout to Navigation
```tsx
import { LogoutButton } from '@/components/LogoutButton';

export function Navbar() {
  return (
    <nav>
      {/* Your nav content */}
      <LogoutButton />
    </nav>
  );
}
```

## Protected Routes Configuration

The following routes are protected by default (defined in `middleware.ts`):
- `/portal/dashboard`
- `/portal/my-properties`
- `/portal/cart`
- `/portal/complaints`
- `/portal/property-form`
- `/admin/*`
- `/staff/*`

To add more protected routes, update the `protectedRoutes` array in `middleware.ts`.

## Features

✅ **Email/Password Authentication**
- User registration with validation
- Secure password requirements
- Email verification support

✅ **Session Management**
- Automatic session persistence
- Real-time session state updates
- Secure sign out

✅ **Route Protection**
- Server-side middleware protection
- Client-side ProtectedRoute wrapper
- Automatic redirects

✅ **Error Handling**
- User-friendly error messages
- Form validation feedback
- Loading states

✅ **User Context**
- Global access to authenticated user
- Easy to integrate with existing components

## Next Steps

1. **Email Verification**: Configure email templates in Supabase
2. **Password Reset**: Implement password recovery flow
3. **Social Login**: Add OAuth providers (Google, GitHub, etc.)
4. **User Profiles**: Create a user profile page with profile pictures
5. **Role-Based Access**: Implement admin/staff roles

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` has the correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your development server after adding env vars

### Users stuck on login page
- Check browser console for errors
- Verify Supabase project is active
- Check that email/password match in Supabase dashboard

### Email not being sent
- Check Supabase **Auth → Email Templates** settings
- Verify SMTP settings if using custom email domain
- Check spam folder

## Documentation
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Context](https://react.dev/reference/react/useContext)
