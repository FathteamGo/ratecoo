"use client";

import { useState, useEffect } from "react";
import { getUserProjects, deleteProject } from "@/app/actions/project";
import { useAuth } from "@/lib/use-auth";
import { FolderKanban, Plus, Edit, Trash2, Eye, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  settings: any;
  apiKey: string | null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      fetchProjects();
    }
  }, [user, authLoading]);

  const fetchProjects = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const result = await getUserProjects(user.id);
      
      if (result.success) {
        setProjects(result.projects);
      } else {
        setError(result.error || "Failed to fetch projects");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone and will permanently remove all associated data.")) return;
    
    try {
      const result = await deleteProject(id, user?.id || "");
      
      if (result.success) {
        setProjects(prev => prev.filter(project => project.id !== id));
      } else {
        setError(result.error || "Failed to delete project");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-600 dark:text-slate-400">Please sign in to view your projects</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Projects</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your review collection widgets
          </p>
        </div>
        <Link 
          href="/projects/new"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Project</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Slug</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Created</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-900 dark:text-white">{project.name}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                      {project.slug}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/projects/${project.id}`}
                          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`https://ratecoo.com/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {projects.length === 0 && !loading && (
            <div className="text-center py-12">
              <FolderKanban className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No projects yet</h3>
              <p className="text-slate-600 dark:text-slate-400">Get started by creating your first project.</p>
              <Link 
                href="/projects/new"
                className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
              >
                Create Project
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}