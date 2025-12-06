"use client";

import { TrendingUp, Star, FolderKanban, Activity, ArrowUpRight, Eye } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Projects */}
        <div className="group relative bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +0%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">Total Projects</p>
            <p className="text-3xl font-bold text-slate-900">0</p>
          </div>
        </div>

        {/* Total Reviews */}
        <div className="group relative bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +0%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">Total Reviews</p>
            <p className="text-3xl font-bold text-slate-900">0</p>
          </div>
        </div>

        {/* Average Rating */}
        <div className="group relative bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +0%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">Avg. Rating</p>
            <p className="text-3xl font-bold text-slate-900">0.0</p>
          </div>
        </div>

        {/* Current Plan */}
        <div className="group relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-70" />
            </div>
            <p className="text-sm font-medium opacity-90 mb-1">Current Plan</p>
            <p className="text-3xl font-bold">Free</p>
            <a href="#" className="text-xs font-medium hover:underline mt-2 inline-block">
              Upgrade to Pro →
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a href="/projects/new" className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Create Project</p>
                  <p className="text-xs text-slate-600">Start collecting reviews</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            <a href="/projects" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">View Projects</p>
                  <p className="text-xs text-slate-600">Manage existing projects</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            Recent Activity
          </h3>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">No activity yet</p>
            <p className="text-sm text-slate-500 mt-2">Create your first project to get started</p>
          </div>
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">🚀 Getting Started with RateCoo</h3>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Follow these simple steps to start collecting authentic reviews from your customers
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3 font-bold">
                  1
                </div>
                <p className="font-semibold mb-1">Create a Project</p>
                <p className="text-sm text-blue-100">Setup your first review widget</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3 font-bold">
                  2
                </div>
                <p className="font-semibold mb-1">Embed the Code</p>
                <p className="text-sm text-blue-100">Add widget to your website</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3 font-bold">
                  3
                </div>
                <p className="font-semibold mb-1">Collect Reviews</p>
                <p className="text-sm text-blue-100">Watch your reviews grow!</p>
              </div>
            </div>
            <a 
              href="/projects/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
            >
              Create Your First Project
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
