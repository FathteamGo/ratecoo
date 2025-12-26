import { NextRequest, NextResponse } from "next/server";

/**
 * Admin panel middleware
 * Protects admin routes and ensures only admins can access
 */

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Skip middleware for API routes and static assets
  if (url.pathname.startsWith('/api') || 
      url.pathname.includes('.') ||
      url.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Skip middleware for auth routes
  if (url.pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get('next-auth.session-token') || 
                       request.cookies.get('__Secure-next-auth.session-token');
  
  // Also check for our custom login status cookie
  const loginStatusCookie = request.cookies.get('admin_login_status');
  
  // If no session cookie and no login status cookie, redirect to login
  if (!sessionCookie && loginStatusCookie?.value !== 'authenticated') {
    const loginUrl = new URL('/auth/signin', url.origin);
    return NextResponse.redirect(loginUrl);
  }

  // If there's either session cookie or valid login status cookie, allow the request to proceed
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
};