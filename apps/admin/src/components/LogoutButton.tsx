'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogoutButton({ variant = 'icon' }: { variant?: 'icon' | 'full' }) {
  const handleLogout = async () => {
    // Sign out using NextAuth
    await signOut({ redirect: false });
    // Clear the login status cookie
    document.cookie = 'admin_login_status=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to sign in page
    window.location.href = '/auth/signin';
  };

  if (variant === 'full') {
    return (
      <button
        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    );
  }

  return (
    <button
      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5 text-slate-600 dark:text-slate-400" />
    </button>
  );
}