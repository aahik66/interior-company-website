import { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import {
  HiOutlineStar,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlinePlus,
} from "react-icons/hi";

export default function ReviewsTab() {
  const { authFetch } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    designation: "Homeowner",
    project: "Gulshan Duplex Interior",
    rating: 5,
    comment: "",
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await authFetch(`${API_BASE}/reviews/all`);
      if (Array.isArray(data)) {
        setReviews(data);
      }
    } catch {
      // Fallback to public endpoint if needed
      const res = await fetch(`${API_BASE}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "approved" ? "pending" : "approved";
    try {
      await authFetch(`${API_BASE}/reviews/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: nextStatus } : r))
      );
    } catch (err) {
      alert(err.message || "Failed to update review status");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    try {
      await authFetch(`${API_BASE}/reviews/${id}`, {
        method: "DELETE",
      });
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete review");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const created = await authFetch(`${API_BASE}/reviews`, {
        method: "POST",
        body: JSON.stringify(newReview),
      });
      setReviews([created, ...reviews]);
      setIsAddOpen(false);
      setNewReview({
        name: "",
        designation: "Homeowner",
        project: "Residential Interior",
        rating: 5,
        comment: "",
      });
    } catch (err) {
      alert(err.message || "Failed to add review");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Client Testimonials & Reviews
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage customer feedback displayed on the homepage review slider.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-brand-500/20 transition hover:scale-105"
        >
          <HiOutlinePlus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      {/* Review List */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="mt-2 text-xs text-slate-500">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-sm font-bold text-slate-700">No client reviews yet</p>
          <p className="text-xs text-slate-500 mt-1">Add a testimonial to showcase on the homepage.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{r.name}</h4>
                    <p className="text-[11px] text-slate-500">{r.designation} • {r.project}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(r._id, r.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-amber-400 my-2">
                  {[...Array(r.rating || 5)].map((_, i) => (
                    <HiOutlineStar key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 italic line-clamp-3">
                  "{r.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    r.status === "approved"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {r.status || "approved"}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleStatus(r._id, r.status)}
                  className="font-bold text-slate-600 hover:text-brand-600 transition"
                >
                  {r.status === "approved" ? "Unpublish" : "Approve & Publish"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Add Client Review</h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahfuzur Rahman"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="Homeowner, Gulshan"
                    value={newReview.designation}
                    onChange={(e) => setNewReview({ ...newReview, designation: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rating (1 to 5)</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none bg-white"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Name</label>
                <input
                  type="text"
                  placeholder="Duplex Interior, Banani"
                  value={newReview.project}
                  onChange={(e) => setNewReview({ ...newReview, project: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Statement *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Client feedback and experience working with Dimension Composition..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-md shadow-brand-500/20"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
