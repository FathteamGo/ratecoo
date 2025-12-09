"use client";

import Link from "next/link";
import { BarChart3, Users, FolderKanban, MessageSquare, TrendingUp, Activity, Settings, Shield, ArrowRight } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage users, projects, and reviews across the platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all"
          >
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-green-400 dark:text-green-600 bg-green-950/30 dark:bg-green-50 px-2 py-1 rounded-full">
                +12%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">1,234</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Active this month</p>
          </div>
        </div>

        {/* Total Projects */}
        <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-green-400 dark:text-green-600 bg-green-950/30 dark:bg-green-50 px-2 py-1 rounded-full">
                +8%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Projects</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">567</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Across all users</p>
          </div>
        </div>

        {/* Total Reviews */}
        <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 dark:from-yellow-500/10 dark:to-orange-500/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-green-400 dark:text-green-600 bg-green-950/30 dark:bg-green-50 px-2 py-1 rounded-full">
                +24%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Reviews</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">45.2K</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">This month</p>
          </div>
        </div>

        {/* Avg Rating */}
        <div className="group relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 opacity-70" />
            </div>
            <p className="text-sm font-medium opacity-90 mb-1">Platform Avg</p>
            <p className="text-3xl font-bold">4.8★</p>
            <p className="text-xs opacity-75 mt-2">Out of 5.0</p>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Section */}
        <Link href="/users" className="group">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-100 dark:to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Users</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Manage user accounts, tiers, and permissions. View user activity and analytics.
            </p>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                <span>1,234 active users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                <span>156 new this month</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Projects Section */}
        <Link href="/projects" className="group">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-100 dark:to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FolderKanban className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Projects</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Monitor all projects, view widget performance, and manage project settings.
            </p>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-500 rounded-full"></div>
                <span>567 total projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-500 rounded-full"></div>
                <span>89 inactive (30+ days)</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Reviews Section */}
        <Link href="/reviews" className="group">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500 transition-all duration-300 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-100 dark:to-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Reviews</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Approve pending reviews, moderate content, and manage review settings.
            </p>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-600 dark:bg-orange-500 rounded-full"></div>
                <span>45.2K total reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-600 dark:bg-orange-500 rounded-full"></div>
                <span>23 pending approval</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Activity & System Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500 dark:text-blue-600" />
              Recent Activity
            </h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              { label: "New user registered", time: "2 minutes ago", icon: "👤" },
              { label: "Project created", time: "15 minutes ago", icon: "📁" },
              { label: "Review submitted", time: "32 minutes ago", icon: "⭐" },
              { label: "User upgraded to Pro", time: "1 hour ago", icon: "✨" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500 dark:text-green-600" />
              System Health
            </h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              Details
            </button>
          </div>

          <div className="space-y-4">
            {[
              { label: "API Uptime", status: "99.99%", color: "green" },
              { label: "Database", status: "Healthy", color: "green" },
              { label: "Queue Service", status: "Healthy", color: "green" },
              { label: "CDN Cache Hit Rate", status: "98.5%", color: "green" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 bg-${item.color}-500 rounded-full`}></div>
                  <span className={`text-sm font-semibold text-${item.color}-600 dark:text-${item.color}-400`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Documentation */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-2xl shadow-lg border border-transparent dark:border-slate-800 p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">API Documentation</h3>
            <p className="text-slate-300 dark:text-slate-400">
              Use these endpoints to integrate with RateCoo
            </p>
          </div>
          <a href="#" className="text-blue-400 dark:text-blue-300 hover:text-blue-300 dark:hover:text-blue-200 font-medium">
            Full Docs →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { method: "GET", endpoint: "/api/custom/widget/:projectId", desc: "Get widget data" },
            { method: "POST", endpoint: "/api/reviews", desc: "Submit a review" },
            { method: "GET", endpoint: "/api/projects/:id/reviews", desc: "Fetch project reviews" },
            { method: "PUT", endpoint: "/api/reviews/:id", desc: "Update review status" },
          ].map((api, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                  api.method === "GET" ? "bg-blue-500/30 text-blue-200" :
                  api.method === "POST" ? "bg-green-500/30 text-green-200" :
                  "bg-yellow-500/30 text-yellow-200"
                }`}>
                  {api.method}
                </span>
                <code className="text-xs font-mono text-slate-300">{api.endpoint}</code>
              </div>
              <p className="text-sm text-slate-400">{api.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


