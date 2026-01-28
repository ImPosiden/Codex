# Supabase Integration Architecture

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 ← Wrapped with AuthProvider
│   ├── portal/
│   │   ├── login/
│   │   │   └── page.tsx          ← Supabase login integration
│   │   ├── signup/
│   │   │   └── page.tsx          ← Supabase registration
│   │   ├── dashboard/
│   │   │   └── page.tsx          ← Protected route
│   │   └── ...
│   └── ...
├── components/
│   ├── LogoutButton.tsx           ← Logout functionality
│   ├── ProtectedRoute.tsx         ← Route protection wrapper
│   ├── AuthExampleComponent.tsx   ← Example usage
│   └── ...
├── contexts/
│   └── AuthContext.tsx            ← Global auth state & useAuth hook
├── lib/
│   └── supabaseClient.ts          ← Supabase client initialization
└── ...

middleware.ts                       ← Server-side route protection
.env.local                         ← Environment variables
```

## Data Flow

### Registration Flow
```
User fills signup form
        ↓
handleSubmit() validates input
        ↓
supabase.auth.signUp() called
        ↓
Supabase creates user & sends confirmation email
        ↓
User redirected to login page
        ↓
User confirms email & logs in
```

### Login Flow
```
User fills login form
        ↓
handleSubmit() submits credentials
        ↓
supabase.auth.signInWithPassword() called
        ↓
Supabase validates credentials
        ↓
Session created & stored in browser
        ↓
AuthContext updates with user info
        ↓
User redirected to dashboard
```

### Route Protection Flow
```
User tries to access protected route (e.g., /portal/dashboard)
        ↓
middleware.ts checks for session
        ↓
No session? → Redirect to /portal/login
        ↓
Yes session? → Allow access
```

## Component Integration Examples

### Example 1: Add Logout to Navigation
```tsx
// In your Navbar component
import { LogoutButton } from '@/components/LogoutButton';

export function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <h1>Logo</h1>
      <LogoutButton />
    </nav>
  );
}
```

### Example 2: Show User Email
```tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';

export function Profile() {
  const { user, loading } = useAuth();
  
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;
  
  return <p>Welcome, {user.email}!</p>;
}
```

### Example 3: Protect a Page
```tsx
'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Dashboard</h1>
      {/* Your protected content */}
    </ProtectedRoute>
  );
}
```

## State Management

### AuthContext Provides
```typescript
{
  user: User | null,           // Currently logged in user
  loading: boolean,             // Loading state
  signOut: () => Promise<void>  // Logout function
}
```

### User Object Contains
```typescript
{
  id: string,                   // Unique user ID
  email: string,                // User email
  phone?: string,               // User phone (optional)
  last_sign_in_at?: string,     // Last login timestamp
  user_metadata?: {},           // Custom user data
  // ... more fields
}
```

## Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Application                           │
│  ┌────────────────────────────────────────────────────┐ │
│  │           Root Layout (AuthProvider)                │ │
│  │  ┌──────────────────────────────────────────────┐  │ │
│  │  │         Protected Routes / Pages             │  │ │
│  │  │  ┌────────────────────────────────────────┐  │  │ │
│  │  │  │   ProtectedRoute / useAuth()           │  │  │ │
│  │  │  │   Access: user, loading, signOut()     │  │  │ │
│  │  │  └────────────────────────────────────────┘  │  │ │
│  │  └──────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                           ↕
                    middleware.ts
                 (Route protection)
                           ↕
┌─────────────────────────────────────────────────────────┐
│              Supabase Backend                            │
│  ┌────────────────────────────────────────────────────┐ │
│  │  • User Authentication                             │ │
│  │  • Session Management                              │ │
│  │  • Email Verification                              │ │
│  │  • Password Reset                                  │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note**: These are prefixed with `NEXT_PUBLIC_` so they're available in the browser. They contain no sensitive data (not the service role key).

## API Calls Summary

### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: { full_name: 'John Doe' }
  }
});
```

### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

### Sign Out
```typescript
await supabase.auth.signOut();
```

### Get Current User
```typescript
const { data: { user } } = await supabase.auth.getUser();
```

### Get Session
```typescript
const { data: { session } } = await supabase.auth.getSession();
```

## Security Considerations

✅ **Implemented**
- Client-side session validation
- Server-side middleware protection
- Automatic session persistence
- Secure logout
- Password validation

🔒 **Additional Recommendations**
- Use HTTPS in production
- Keep anon key in `.env.local` (not committed to git)
- Implement password reset flow
- Add rate limiting on auth endpoints
- Use email verification
- Monitor suspicious login attempts

## Troubleshooting Checklist

- [ ] `.env.local` has correct Supabase credentials
- [ ] `npm install` was run to install dependencies
- [ ] Development server was restarted after env changes
- [ ] Supabase project is active and not paused
- [ ] Email authentication is enabled in Supabase
- [ ] Checking browser DevTools console for errors
- [ ] Verifying that login/signup pages are accessible

---

For complete setup instructions, see `SUPABASE_SETUP.md`
