import type { Metadata } from "next";
import "./globals.css";
import { requireAuth } from "@/lib/auth-utils";
import { LayoutDashboard, FolderKanban, Settings, LogOut, Star, Bell, User } from "lucide-react";
import { StarryBackground, ThemeToggle } from "@ratecoo/ui";

export const metadata: Metadata = {
  title: "Dashboard - RateCoo",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 antialiased relative">
        <StarryBackground />
        <div className="flex h-screen relative z-10">
          {/* Sidebar */}
          <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    RateCoo
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Member Portal</p>
                </div>
              </div>
              <ThemeToggle />
            </div>

            <nav className="p-4 space-y-2">
              <a
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </a>
              <a
                href="/projects"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
              >
                <FolderKanban className="w-5 h-5" />
                Projects
              </a>
              <a
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
                Settings
              </a>
            </nav>

            {/* User Profile at Bottom */}
            <div className="absolute bottom-0 w-72 p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">User Account</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">Free Plan</p>
                </div>
                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {/* Top Bar */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-4 sticky top-0 z-10 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back!</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Manage your reviews and projects</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <a 
                    href="/projects/new"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-medium text-sm"
                  >
                    + New Project
                  </a>
                </div>
              </div>
            </header>

            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
