import type { Metadata } from "next";
import "./globals.css";
import { requireAuth } from "@/lib/auth-utils";

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
      <body className="bg-slate-50">
        <div className="flex h-screen">
          <aside className="w-64 bg-white border-r border-slate-200">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-slate-900">RateCoo</h1>
            </div>
            <nav className="px-4 py-8 space-y-2">
              <a
                href="/dashboard"
                className="block px-4 py-2 text-sm font-medium text-slate-900 rounded-md bg-slate-100"
              >
                Dashboard
              </a>
              <a
                href="/projects"
                className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md"
              >
                Projects
              </a>
            </nav>
          </aside>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
