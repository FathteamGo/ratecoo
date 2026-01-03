import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Clear the login status cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('user_login_status', '', {
      maxAge: 0, // Expire immediately
      path: '/',
      sameSite: 'lax',
    });
    
    // Also clear the NextAuth session cookie if it exists
    response.cookies.set('next-auth.session-token', '', {
      maxAge: 0, // Expire immediately
      path: '/',
      sameSite: 'lax',
    });
    
    response.cookies.set('__Secure-next-auth.session-token', '', {
      maxAge: 0, // Expire immediately
      path: '/',
      sameSite: 'lax',
    });
    
    return response;
  } catch (error) {
    console.error('Sign out error:', error);
    return NextResponse.json({ success: false, error: 'Sign out failed' }, { status: 500 });
  }
}