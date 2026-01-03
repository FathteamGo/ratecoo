"use client";

import { useMemo, useState } from "react";
import { createProject } from "@/app/actions/project";
import { ArrowLeft, Sparkles, Code, Globe } from "lucide-react";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewProjectPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canAutoSlug = useMemo(() => !slugTouched, [slugTouched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await createProject("user-1", name, slugify(slug || name), "free");

      if (result.success) {
        window.location.href = `/projects/${result.projectId}`;
      } else {
        setError(result.error || "Failed to create project");
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <a
          href="/dashboard"
          className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </a>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create New Project
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Set up a new review widget for your website
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-8 space-y-6"
          >
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 dark:border-red-400 rounded-lg">
                <p className="text-sm font-medium text-red-800 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

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

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/50">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              What's Next?
            </h3>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <span>Get your embed code</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <span>Add it to your website</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <span>Start collecting reviews!</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg dark:shadow-2xl dark:shadow-slate-950/50">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Included Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full"></div>
                Customizable widget design
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full"></div>
                Email notifications
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full"></div>
                Analytics dashboard
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full"></div>
                Mobile responsive
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
