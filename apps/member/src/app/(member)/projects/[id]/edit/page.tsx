"use client";

import { useState, useEffect } from "react";
import { updateProject } from "@/app/actions/project";
import { useAuth } from "@/lib/auth-utils";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  // Load project data
  useEffect(() => {
    const fetchProject = async () => {
      if (!user || !params.id) return;

      try {
        const response = await fetch(`/api/projects/${params.id}`);
        if (response.ok) {
          const project = await response.json();
          setName(project.name);
          setSlug(project.slug);
        } else {
          setError("Failed to load project");
        }
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProject();
  }, [user, params.id]);

  const canAutoSlug = !slugTouched;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const result = await updateProject(params.id, user.id, {
        name,
        slug: slugify(slug || name),
      });

      if (result.success) {
        router.push(`/projects/${params.id}`);
      } else {
        setError(result.error || "Failed to update project");
      }
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (canAutoSlug) setSlug(slugify(value));
  };

  const handleSlugChange = (value: string) => {
    setSlugTouched(true);
    setSlug(slugify(value));
  };

  if (authLoading || initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-600 dark:text-slate-400">Please sign in to edit projects</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <a
          href={`/projects/${params.id}`}
          className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </a>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Edit Project
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Update your project details
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-8">
        {error && (
          <div className="p-4 mb-6 bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 dark:border-red-400 rounded-lg">
            <p className="text-sm font-medium text-red-800 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="My Awesome Business"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
              required
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              This will be displayed on your review widget
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Project Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 px-3 py-3 rounded-l-xl border border-r-0 border-slate-300 dark:border-slate-600">
                ratecoo.com/
              </span>

              <input
                type="text"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                onBlur={() => setSlugTouched(true)}
                placeholder="my-awesome-business"
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-r-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                required
                pattern="[a-z0-9-]+"
                title="Only lowercase letters, numbers, and hyphens allowed"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Unique URL for your review page (lowercase, numbers, hyphens only)
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
            <a
              href={`/projects/${params.id}`}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </a>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}