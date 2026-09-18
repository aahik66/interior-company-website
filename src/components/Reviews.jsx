import { useEffect, useState } from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config/api";

const StarDisplay = ({ value }) => {
  const rating = Math.max(1, Math.min(5, Math.round(value || 0)));
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, idx) =>
        idx < rating ? (
          <HiStar key={idx} className="h-4 w-4" />
        ) : (
          <HiOutlineStar key={idx} className="h-4 w-4 text-gray-300" />
        )
      )}
    </div>
  );
};

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, user, authFetch } = useAuth();

  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/reviews?t=${Date.now()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to load reviews");
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load all reviews on mount so the homepage always reflects the latest client feedback.
  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return setError("Please log in to submit a review.");
    setSubmitting(true);
    setError("");
    try {
      await authFetch(`${API_BASE}/reviews`, {
        method: "POST",
        body: JSON.stringify({
          rating: Number(form.rating),
          comment: form.comment,
        }),
      });
      setForm({ rating: 5, comment: "" });
      loadReviews();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="w-full bg-white py-12 sm:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
            Reviews
          </p>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl tracking-tight">
            Feedback from real clients
          </h2>
          <p className="text-sm sm:text-base text-gray-600 sm:max-w-3xl sm:mx-auto">
            Only authenticated users can submit reviews. All reviews are stored securely in our database.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {loading && <p className="text-gray-600">Loading reviews...</p>}
            {!loading && reviews.length === 0 && (
              <p className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                No reviews yet. Be the first to share your experience.
              </p>
            )}
            {!loading &&
              reviews.map((review) => (
                <article
                  key={review._id}
                  className="rounded-3xl border border-gray-100 bg-gray-50 p-5 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)]"
                  data-aos="fade-up"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <StarDisplay value={review.rating} />
                  </div>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                </article>
              ))}
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)]">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
              Share your experience
            </p>
            <h3 className="mt-2 text-xl font-semibold text-gray-900">
              {isAuthenticated ? `Hi ${user?.name?.split(" ")[0] || "there"}` : "Login required"}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              We publish only authenticated reviews. Your name will appear with your feedback.
            </p>

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2 text-sm text-gray-700" htmlFor="review-rating">
                Rating
                <select
                  id="review-rating"
                  name="rating"
                  value={form.rating}
                  onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 focus:border-brand-500 focus:outline-none"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value} Stars
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-700" htmlFor="review-comment">
                Comment
                <textarea
                  required
                  rows={4}
                  id="review-comment"
                  name="comment"
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  placeholder="Tell us about your project and experience..."
                  className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 focus:border-brand-500 focus:outline-none"
                />
              </label>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={!isAuthenticated || submitting}
                className="w-full rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : isAuthenticated ? "Submit Review" : "Login to review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

