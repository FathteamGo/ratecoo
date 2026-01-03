'use client';

import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      // Sign out using API route
      await fetch('/api/auth/signout', { method: 'POST' });
      // Clear the login status cookie
      document.cookie = 'user_login_status=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // Redirect to sign in page
      window.location.href = '/auth/signin';
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if API call fails, clear cookie and redirect
      document.cookie = 'user_login_status=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/auth/signin';
    }
  };

  return (
    <button 
      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 text-slate-600 dark:text-slate-400" />
    </button>
  );
}