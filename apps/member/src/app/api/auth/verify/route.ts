import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // Check for NextAuth session cookie
  const sessionCookie = request.cookies.get('next-auth.session-token') || 
                       request.cookies.get('__Secure-next-auth.session-token');
  
  // Also check for our custom login status cookie
  const loginStatusCookie = request.cookies.get('user_login_status');
  
  // If either cookie exists and is valid, return success
  if (sessionCookie || (loginStatusCookie && loginStatusCookie.value === 'authenticated')) {
    return NextResponse.json({ authenticated: true });
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 });
}