"use client";

import { useState, useEffect, useCallback } from "react";
import { FolderKanban, Plus, Edit, Trash2, Eye } from "lucide-react";
import { ProjectModal } from "@/components";

interface Project {
  id: string;
  name: string;
  slug: string;
  user_id: string;
  api_key: string;
  created_at: string;
  user_name: string | null;
  user_email: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Failed to delete project");
      
      fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleAddProject = useCallback(() => {
    setSelectedProject(null);
    setIsModalOpen(true);
  }, []);

  const handleEditProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSaveProject = async (projectData: Partial<Project>) => {
    try {
      let response;
      
      if (selectedProject?.id) {
        response = await fetch("/api/projects", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: selectedProject.id, ...projectData }),
        });
      } else {
        response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        });
      }
      
      if (!response.ok) {
        throw new Error(selectedProject?.id ? "Failed to update project" : "Failed to create project");
      }
      
      fetchProjects();
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage all user projects
          </p>
        </div>
        <button 
          onClick={handleAddProject}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Project</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Slug</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Owner</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">API Key</th>
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
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{project.user_name || "Unknown"}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{project.user_email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-slate-700 dark:text-slate-300">
                    {project.api_key?.substring(0, 10)}...
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
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
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No projects found</h3>
            <p className="text-slate-600 dark:text-slate-400">Get started by adding a new project.</p>
          </div>
        )}
      </div>
      
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveProject}
        initialData={selectedProject}
        users={users}
      />
    </div>
  );
}