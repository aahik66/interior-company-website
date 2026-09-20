import { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineSearch,
  HiOutlineDocumentText,
  HiOutlineUpload,
} from "react-icons/hi";

export default function BlogsTab() {
  const { authFetch } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Residential",
    image: "",
    summary: "",
    content: "",
    author: "Dimension Composition Editorial",
    readTime: "5 min read",
    tags: "Interior, Design, Dhaka",
    isPublished: true,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const categories = ["All", "Residential", "Commercial", "Budget Guides", "Materials", "Architecture"];

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await authFetch(`${API_BASE}/blogs?admin=true`);
      if (Array.isArray(data)) {
        setBlogs(data);
      }
    } catch {
      const res = await fetch(`${API_BASE}/blogs?admin=true`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      category: "Residential",
      image: "/assets/projects/livingroom4.jpg",
      summary: "",
      content: "",
      author: "Dimension Composition Editorial",
      readTime: "5 min read",
      tags: "Interior, Design, Dhaka",
      isPublished: true,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      category: blog.category || "Residential",
      image: blog.image || "",
      summary: blog.summary || "",
      content: blog.content || "",
      author: blog.author || "Dimension Composition Editorial",
      readTime: blog.readTime || "5 min read",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      isPublished: blog.isPublished !== undefined ? blog.isPublished : true,
      seoTitle: blog.seoTitle || "",
      seoDescription: blog.seoDescription || "",
      seoKeywords: blog.seoKeywords || "",
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const bodyData = new FormData();
    bodyData.append("image", file);

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: bodyData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.summary || !formData.content) {
      alert("Please fill in title, summary, and article content.");
      return;
    }

    try {
      const url = editingBlog ? `${API_BASE}/blogs/${editingBlog._id}` : `${API_BASE}/blogs`;
      const method = editingBlog ? "PUT" : "POST";

      const res = await authFetch(url, {
        method,
        body: JSON.stringify(formData),
      });

      if (res._id || res.message) {
        setModalOpen(false);
        fetchBlogs();
      } else {
        alert("Failed to save blog post.");
      }
    } catch (err) {
      alert(err.message || "Failed to save blog post.");
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      const updatedStatus = !blog.isPublished;
      await authFetch(`${API_BASE}/blogs/${blog._id}`, {
        method: "PUT",
        body: JSON.stringify({ isPublished: updatedStatus }),
      });

      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? { ...b, isPublished: updatedStatus } : b))
      );
    } catch (err) {
      alert("Error toggling publish status: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await authFetch(`${API_BASE}/blogs/${id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete blog post.");
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = categoryFilter === "All" || b.category === categoryFilter;
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HiOutlineDocumentText className="h-6 w-6 text-brand-500" />
            Blog Posts Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish, edit, and optimize articles for website visitors & Google search ranking.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm shadow-md transition hover:scale-105"
        >
          <HiOutlinePlus className="h-5 w-5" />
          Create New Article
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List Table */}
      {loading ? (
        <div className="p-12 text-center text-slate-500">Loading blog articles...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center text-slate-500">
          No blog posts found matching your filter.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  <th className="p-4">Article</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Read Time</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="h-12 w-16 object-cover rounded-lg border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 line-clamp-1">{blog.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{blog.summary}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                        {blog.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
                          blog.isPublished
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        }`}
                      >
                        {blog.isPublished ? (
                          <>
                            <HiOutlineEye className="h-3.5 w-3.5" /> Published
                          </>
                        ) : (
                          <>
                            <HiOutlineEyeOff className="h-3.5 w-3.5" /> Draft
                          </>
                        )}
                      </button>
                    </td>

                    <td className="p-4 text-slate-600 text-xs font-medium">
                      {blog.readTime || "5 min read"}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(blog)}
                          className="p-2 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition"
                          title="Edit Article"
                        >
                          <HiOutlinePencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Article"
                        >
                          <HiOutlineTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Blog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:border-brand-500 focus:outline-none"
                    placeholder="e.g. Top 10 Interior Design Trends in Dhaka for 2026"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:border-brand-500 focus:outline-none"
                  >
                    {categories.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:border-brand-500 focus:outline-none"
                    placeholder="e.g. 5 min read"
                  />
                </div>

                {/* Image Banner */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Cover Banner Image *
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:border-brand-500 focus:outline-none"
                      placeholder="Image URL or upload file..."
                    />
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer text-sm font-semibold transition">
                      <HiOutlineUpload className="h-4 w-4" />
                      {uploading ? "Uploading..." : "Browse"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Summary */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Short Excerpt / Summary *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:border-brand-500 focus:outline-none"
                    placeholder="Brief 1-2 sentence preview for search results & card views..."
                  />
                </div>

                {/* Full Article Content */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Article Content (HTML / Text) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:border-brand-500 focus:outline-none font-mono"
                    placeholder="Use <h2>, <h3>, <p>, <ul> tags to format your article..."
                  />
                </div>

                {/* Author & Tags */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:border-brand-500 focus:outline-none"
                    placeholder="Trends, Luxury, Kitchen"
                  />
                </div>
              </div>

              {/* Advanced SEO Overrides (Accordion) */}
              <div className="border-t border-slate-200 pt-4 mt-6">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-600 mb-3">
                  🔍 Optional Custom SEO Overrides
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Custom SEO Title (Leave empty for auto-generated title)
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      placeholder="e.g. Best Interior Trends in Dhaka for 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Custom SEO Meta Description (Leave empty for auto-generated description)
                    </label>
                    <input
                      type="text"
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      placeholder="Custom google search preview snippet..."
                    />
                  </div>
                </div>
              </div>

              {/* Status & Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="h-4 w-4 rounded text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm font-semibold text-slate-800">Publish immediately to website</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl shadow-md transition hover:scale-105"
                  >
                    {editingBlog ? "Save Changes" : "Create Article"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
