import type { Metadata } from "next";
import "./globals.css";
import { LayoutDashboard, Users, FolderKanban, MessageSquare, Settings, LogOut, Shield, AlertCircle, Bell, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard - RateCoo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 antialiased">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-72 bg-white border-r border-slate-200 shadow-lg overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    RateCoo
                  </h1> 
                  <p className="text-xs text-slate-500">Admin Panel</p>
                </div>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              <a
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl shadow-lg shadow-slate-900/30 transition-all duration-300"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </a>
              <a
                href="/admin/users"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                Users
              </a>
              <a
                href="/admin/projects"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-300"
              >
                <FolderKanban className="w-5 h-5" />
                Projects
              </a>
              <a
                href="/admin/reviews"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5" />
                Reviews
              </a>
            </nav>

            <div className="border-t border-slate-200 p-4 mt-4">
              <p className="text-xs font-semibold text-slate-600 mb-2 px-4">Tools</p>
              <a
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
                Settings
              </a>
            </div>

            {/* Admin Profile at Bottom */}
            <div className="absolute bottom-0 w-72 p-4 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
                  <p className="text-xs text-slate-500 truncate">Super Admin</p>
                </div>
                <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors flex-shrink-0">
                  <LogOut className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {/* Top Bar */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Platform Management</h2>
                  <p className="text-sm text-slate-600">Monitor and manage RateCoo platform</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <AlertCircle className="w-5 h-5 text-slate-600" />
                  </button>
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
