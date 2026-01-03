"use client";

import { ArrowLeft, Copy, Code2, Star, TrendingUp, MessageSquare, ExternalLink, Check, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/use-auth";

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [copied, setCopied] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  const embedCode = `<script src="https://cdn.ratecoo.com/widget.js" data-project="${params.id}"></script>`;

  useEffect(() => {
    const fetchProject = async () => {
      if (!user || !params.id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          // Verify that the user owns this project
          if (data.user_id !== user.id) {
            setError("Project not found or access denied");
          } else {
            setProject(data);
          }
        } else {
          setError("Failed to load project");
        }
      } catch (err) {
        setError("An error occurred while fetching project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [user, params.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-600 dark:text-slate-400">Please sign in to view project details</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </a>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Project Details
            </h2>
          </div>
        </div>
        
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </a>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {project?.name || `Project #${params.id}`}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your reviews and widget</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/projects/${params.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit Project
          </a>
          <a
            href={`https://ratecoo.com/${project?.slug || params.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Public Page
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Reviews</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-950/50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg Rating</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">0.0</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-950/50 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">This Month</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Reviews</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View All
              </button>
            </div>
            
            {/* Empty State */}
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-slate-400 dark:text-slate-500" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No reviews yet
              </h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Start collecting reviews by embedding the widget on your website
              </p>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-400/30 transition-all duration-300 font-semibold"
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Embed Code</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Copy and paste this code into your website's HTML
            </p>
            <div className="relative">
              <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 dark:text-slate-300 p-4 rounded-xl text-xs overflow-x-auto border border-transparent dark:border-slate-800">
                <code>{embedCode}</code>
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Copied to clipboard!
              </p>
            )}
          </div>

          {/* Widget Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Widget Preview</h3>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">5.0</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Based on <span className="font-semibold">0 reviews</span>
              </p>
              <button className="w-full py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                Write a Review
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-4">
              This is how your widget will appear on your website
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <a href={`/projects/${params.id}/edit`} className="w-full block px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                ✏️ Edit Project
              </a>
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                ⚙️ Widget Settings
              </button>
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                🎨 Customize Design
              </button>
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                📧 Email Templates
              </button>
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to delete this project? This action cannot be undone and will permanently remove all associated data.')) {
                    // In a real implementation, we would call the delete API here
                    alert('Project deletion would happen here in a full implementation');
                  }
                }}
                className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
              >
                🗑️ Delete Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
