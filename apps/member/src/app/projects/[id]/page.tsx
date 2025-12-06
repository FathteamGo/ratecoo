"use client";

import { ArrowLeft, Copy, Code2, Star, TrendingUp, MessageSquare, ExternalLink, Check } from "lucide-react";
import { useState } from "react";

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<script src="https://cdn.ratecoo.com/widget.js" data-project="${params.id}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </a>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Project #{params.id}
            </h2>
            <p className="text-slate-600 mt-1">Manage your reviews and widget</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`https://ratecoo.com/${params.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Public Page
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
            </div>
            <p className="text-sm font-medium text-slate-600">Total Reviews</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">0</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-slate-600">Avg Rating</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">0.0</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-slate-600">This Month</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">0</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium opacity-90">Widget Status</p>
          </div>
          <p className="text-2xl font-bold">Active</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Recent Reviews</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            
            {/* Empty State */}
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-slate-400" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">
                No reviews yet
              </h4>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Start collecting reviews by embedding the widget on your website
              </p>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold"
              >
                <Code2 className="w-5 h-5" />
                Copy Embed Code
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Embed Code */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Embed Code</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Copy and paste this code into your website's HTML
            </p>
            <div className="relative">
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto">
                <code>{embedCode}</code>
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Copied to clipboard!
              </p>
            )}
          </div>

          {/* Widget Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Widget Preview</h3>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-900">5.0</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Based on <span className="font-semibold">0 reviews</span>
              </p>
              <button className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Write a Review
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-4">
              This is how your widget will appear on your website
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                ⚙️ Widget Settings
              </button>
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                🎨 Customize Design
              </button>
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                📧 Email Templates
              </button>
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                🗑️ Delete Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
