import { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlinePhotograph,
  HiOutlineExternalLink,
} from "react-icons/hi";
import MediaUploader from "../../../components/admin/MediaUploader";
import GalleryUploader from "../../../components/admin/GalleryUploader";

const CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Hospitality",
  "Office",
  "Architectural",
  "Living Room",
  "Kitchen",
  "Bedroom",
];

export default function ProjectsTab({ isAddModalOpen, setIsAddModalOpen }) {
  const { authFetch } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Residential",
    image: "",
    location: "Dhaka, Bangladesh",
    area: "1800 sq.ft",
    duration: "45 Days",
    description: "",
    materials: "",
    gallery: [],
    tags: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.warn("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "Residential",
      image: "",
      location: "Dhaka, Bangladesh",
      area: "1800 sq.ft",
      duration: "45 Days",
      description: "",
      materials: "Burmese Teak, Italian Marble, Matte Black Metal",
      gallery: [],
      tags: "Luxury, Minimalist, Turnkey",
    });
    setFormError("");
    setIsAddModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      category: project.category || "Residential",
      image: project.image || "",
      location: project.location || "",
      area: project.area || "",
      duration: project.duration || "",
      description: project.description || "",
      materials: Array.isArray(project.materials) ? project.materials.join(", ") : project.materials || "",
      gallery: Array.isArray(project.gallery) ? project.gallery : [],
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : project.tags || "",
    });
    setFormError("");
    setIsAddModalOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await authFetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete project");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const payload = {
      ...formData,
      materials: typeof formData.materials === "string" 
        ? formData.materials.split(",").map((s) => s.trim()).filter(Boolean)
        : formData.materials || [],
      gallery: Array.isArray(formData.gallery)
        ? formData.gallery.filter(Boolean)
        : typeof formData.gallery === "string"
        ? formData.gallery.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      tags: typeof formData.tags === "string"
        ? formData.tags.split(",").map((s) => s.trim()).filter(Boolean)
        : formData.tags || [],
    };

    try {
      if (editingProject) {
        const updated = await authFetch(`${API_BASE}/projects/${editingProject._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setProjects((prev) => prev.map((p) => (p._id === editingProject._id ? updated : p)));
      } else {
        const created = await authFetch(`${API_BASE}/projects`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setProjects((prev) => [created, ...prev]);
      }
      setIsAddModalOpen(false);
    } catch (err) {
      setFormError(err.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter projects by search and category
  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      selectedCategory === "All" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Portfolio & Projects Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Add, edit, or remove interior projects displayed across the website and portfolio page.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-brand-500/20 transition hover:scale-105"
        >
          <HiOutlinePlus className="h-4 w-4" /> Add New Project
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Project Table / Cards */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="mt-2 text-xs text-slate-500">Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <HiOutlinePhotograph className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-2 text-sm font-bold text-slate-700">No projects found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your category or search filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[700px]">
              <thead className="bg-slate-50 text-[11px] sm:text-xs font-bold uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Area & Duration</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/60 transition">
                    {/* Project Thumbnail & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-12 w-16 object-cover rounded-lg border border-slate-200 bg-slate-100 flex-shrink-0"
                          onError={(e) => {
                            e.target.src = "/assets/projects/livingroom1.jpeg";
                          }}
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{p.description || "Luxury interior design"}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600 border border-brand-200/50">
                        {p.category}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4 text-slate-600 font-medium">{p.location || "Dhaka"}</td>

                    {/* Area & Duration */}
                    <td className="py-3 px-4 text-slate-600">
                      <div>{p.area || "1500 sq.ft"}</div>
                      <div className="text-[11px] text-slate-400">{p.duration || "45 Days"}</div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          className="p-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition"
                          title="Edit Project"
                        >
                          <HiOutlinePencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p._id, p.title)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete Project"
                        >
                          <HiOutlineTrash className="h-4 w-4" />
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

      {/* Add / Edit Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>
                <p className="text-xs text-slate-500">
                  Provide the project title, category, high-resolution image URL, and specifications.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-600">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Minimalist Master Suite, Banani"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Office">Office</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Architectural">Architectural</option>
                  </select>
                </div>
              </div>

              <div>
                <MediaUploader
                  label="Cover Image (Primary Display)"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  helperText="Upload from your computer or paste an online image URL."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Gulshan-2, Dhaka"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Floor Area
                  </label>
                  <input
                    type="text"
                    placeholder="2200 sq.ft"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Project Duration
                  </label>
                  <input
                    type="text"
                    placeholder="50 Days"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of interior styling, architectural approach, and client brief..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Materials Used (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Burmese Teak, White Statuario Marble, Brushed Brass"
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <GalleryUploader
                  label="Project Gallery Photos"
                  gallery={formData.gallery}
                  onChange={(urls) => setFormData({ ...formData, gallery: urls })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-md shadow-brand-500/20 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
