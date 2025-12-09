"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Plus, Edit, Trash2, Eye, Star } from "lucide-react";
import { ReviewModal } from "@/components";

interface Review {
  id: string;
  project_id: string;
  customer_name: string;
  rating: number;
  comment: string | null;
  source: string;
  status: string;
  is_featured: boolean;
  created_at: string;
  project_name: string | null;
}

interface Project {
  id: string;
  name: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    fetchReviews();
    fetchProjects();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/reviews");
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    try {
      const response = await fetch(`/api/reviews?id=${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Failed to delete review");
      
      fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleAddReview = useCallback(() => {
    setSelectedReview(null);
    setIsModalOpen(true);
  }, []);

  const handleEditReview = useCallback((review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSaveReview = async (reviewData: Partial<Review>) => {
    try {
      let response;
      
      if (selectedReview?.id) {
        response = await fetch("/api/reviews", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: selectedReview.id, ...reviewData }),
        });
      } else {
        response = await fetch("/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        });
      }
      
      if (!response.ok) {
        throw new Error(selectedReview?.id ? "Failed to update review" : "Failed to create review");
      }
      
      fetchReviews();
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reviews Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage all customer reviews
          </p>
        </div>
        <button 
          onClick={handleAddReview}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Review
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
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Rating</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Comment</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Project</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Source</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Date</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900 dark:text-white">{review.customer_name}</div>
                  </td>
                  <td className="py-4 px-6">
                    {renderStars(review.rating)}
                  </td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 max-w-xs truncate">
                    {review.comment}
                  </td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                    {review.project_name || "Unknown Project"}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 capitalize">
                    {review.source}
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditReview(review)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(review.id)}
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
        
        {reviews.length === 0 && !loading && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No reviews found</h3>
            <p className="text-slate-600 dark:text-slate-400">Get started by adding a new review.</p>
          </div>
        )}
      </div>
      
      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveReview}
        initialData={selectedReview}
        projects={projects}
      />
    </div>
  );
}