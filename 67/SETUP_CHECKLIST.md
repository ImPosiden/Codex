# 🚀 Supabase Integration Checklist

## ✅ Complete Integration

Your Next.js application now has Supabase authentication fully integrated. Follow these steps to get it running.

## Step 1: Get Supabase Credentials (5 minutes)

- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Create a new account or log in
- [ ] Create a new project (choose a region close to you)
- [ ] Wait for the project to initialize
- [ ] Go to **Settings → API**
- [ ] Copy **Project URL** (looks like `https://xxx.supabase.co`)
- [ ] Copy **anon public** key (under "Project API keys")

## Step 2: Update Environment Variables (2 minutes)

- [ ] Open `.env.local` in your project root
- [ ] Replace `NEXT_PUBLIC_SUPABASE_URL` with your Project URL
- [ ] Replace `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your anon key
- [ ] Save the file
- [ ] Example:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://abcxyz.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
  ```

## Step 3: Install Dependencies (3 minutes)

- [ ] Open terminal in project root
- [ ] Run: `npm install`
- [ ] Wait for installation to complete

## Step 4: Start Development Server (1 minute)

- [ ] Run: `npm run dev`
- [ ] Server should start on `http://localhost:3000`

## Step 5: Test Registration (5 minutes)

- [ ] Open browser to `http://localhost:3000/portal/signup`
- [ ] Fill in:
  - Full Name: `John Doe`
  - Email: `test@example.com`
  - Password: `TestPass123!` (must be 8+ chars)
  - Confirm Password: `TestPass123!`
  - Check "I agree to Terms of Service"
- [ ] Click **Create Account**
- [ ] You should see a message about checking email or be redirected
- [ ] Go to Supabase dashboard → **Authentication → Users**
- [ ] Verify your new user appears in the list

## Step 6: Test Login (3 minutes)

- [ ] Go to `http://localhost:3000/portal/login`
- [ ] Use the credentials you just created:
  - Email: `test@example.com`
  - Password: `TestPass123!`
- [ ] Click **Sign In**
- [ ] You should be redirected to `/portal/dashboard`

## Step 7: Test Logout (1 minute)

- [ ] Look for logout button in your navigation
- [ ] Click it
- [ ] You should be redirected to login page

## Step 8: Configure Email (Optional but Recommended)

To enable email confirmation:

- [ ] Go to Supabase dashboard → **Authentication → Email Templates**
- [ ] Under "Confirm signup", click the template
- [ ] Verify the confirmation link matches your domain
- [ ] Default is fine for local development
- [ ] For production, update to your domain

## What's Now Available

### Login/Signup Pages
- ✅ `/portal/login` - Full login with validation
- ✅ `/portal/signup` - Full registration with validation
- ✅ Error handling and loading states

### Auth System
- ✅ `useAuth()` hook - Access user anywhere
- ✅ `<ProtectedRoute>` - Protect pages from guests
- ✅ `<LogoutButton>` - Ready-to-use logout
- ✅ Middleware - Server-side protection

### Protected Routes (Default)
- `/portal/dashboard`
- `/portal/my-properties`
- `/portal/cart`
- `/portal/complaints`
- `/portal/property-form`
- `/admin/*`
- `/staff/*`

## How to Use in Your Code

### Access Current User
```tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <p>Loading...</p>;
  return <p>Welcome, {user?.email}!</p>;
}
```

### Protect a Page
```tsx
'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Dashboard</h1>
    </ProtectedRoute>
  );
}
```

### Add Logout
```tsx
import { LogoutButton } from '@/components/LogoutButton';

function Navbar() {
  return <LogoutButton />;
}
```

## Documentation Files

Inside your project:
- **`SUPABASE_SETUP.md`** - Complete setup guide
- **`ARCHITECTURE.md`** - Technical architecture & data flow
- **`INTEGRATION_SUMMARY.md`** - Overview of changes
- **`SETUP_CHECKLIST.md`** - This file

## Common Issues & Solutions

**Issue: "Missing Supabase environment variables"**
- Solution: Add credentials to `.env.local` and restart dev server

**Issue: Login/signup not working**
- Check browser console for error messages
- Verify credentials in `.env.local` are correct
- Make sure Supabase project is active

**Issue: Users stuck on login page**
- Check browser console (F12)
- Verify network requests succeed
- Check Supabase project status

**Issue: Email not being sent**
- Check Supabase **Auth → Email Templates**
- Verify SMTP settings if using custom domain
- Check spam folder

## Next Steps (Advanced)

1. **Password Reset**
   - Implement forgot password flow
   - See Supabase docs for `resetPasswordForEmail()`

2. **Social Login**
   - Add Google, GitHub, etc. in Supabase
   - Update config to enable providers

3. **User Profiles**
   - Create users table in Supabase
   - Store additional profile data
   - Sync with auth system

4. **Email Verification**
   - Enforce email verification
   - Check `email_confirmed_at` field

5. **Refresh Tokens**
   - Implement token refresh
   - Handle session expiration

## Useful Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Context API](https://react.dev/reference/react/useContext)
- [Supabase Dashboard](https://app.supabase.com)

## Support

If you run into issues:
1. Check the documentation files in this project
2. Check Supabase dashboard for errors
3. Look at browser console (F12) for error messages
4. Check Supabase Auth logs in the dashboard

---

**You're all set!** 🎉

Start by registering at `/portal/signup` to test the system.

Questions? Check the documentation files or Supabase docs.
