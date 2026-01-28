import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect /portal/dashboard to /portal/
  if (pathname === '/portal/dashboard') {
    return NextResponse.redirect(new URL('/portal/', request.url));
  }

  // Protected routes that require authentication
  const protectedRoutes = [
    '/portal/',
    '/portal/my-properties',
    '/portal/cart',
    '/portal/complaints',
    '/portal/property-form',
    '/admin',
    '/staff',
  ];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Check if user has auth token in cookies
  const authToken = request.cookies.get('sb-auth-token')?.value || 
                    request.cookies.get('sb-access-token')?.value;
  
  const hasSession = !!authToken;

  // If accessing protected route without session, redirect to login
  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL('/portal/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and trying to access login/signup, redirect to dashboard
  if ((pathname === '/portal/login' || pathname === '/portal/signup') && hasSession) {
    return NextResponse.redirect(new URL('/portal/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)',
  ],
};
