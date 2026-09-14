import { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
} from "react-icons/hi";
import MediaUploader from "../../../components/admin/MediaUploader";

export default function TeamTab() {
  const { authFetch } = useAuth();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    education: "",
    experience: "",
    image: "",
    bio: "",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/team`);
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
      }
    } catch (err) {
      console.warn("Failed to fetch team members", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const openAddModal = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      education: "",
      experience: "5+ Years Experience",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      bio: "",
      order: team.length + 1,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || "",
      role: member.role || "",
      education: member.education || "",
      experience: member.experience || "",
      image: member.image || "",
      bio: member.bio || "",
      order: member.order || 0,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the team?`)) return;
    try {
      await authFetch(`${API_BASE}/team/${id}`, {
        method: "DELETE",
      });
      setTeam((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete team member");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      if (editingMember) {
        const updated = await authFetch(`${API_BASE}/team/${editingMember._id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        setTeam((prev) => prev.map((m) => (m._id === editingMember._id ? updated : m)));
      } else {
        const created = await authFetch(`${API_BASE}/team`, {
          method: "POST",
          body: JSON.stringify(formData),
        });
        setTeam((prev) => [...prev, created]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTeam = team.filter((m) => {
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      m.name?.toLowerCase().includes(query) ||
      m.role?.toLowerCase().includes(query) ||
      m.education?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Team Members Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Add, update, or remove architects, interior designers, site supervisors, and specialists shown on the About & Team page.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-brand-500/20 transition hover:scale-105"
        >
          <HiOutlinePlus className="h-4 w-4" /> Add Team Member
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-xs font-bold text-slate-600">
          Total Members: <span className="text-brand-600">{team.length}</span>
        </div>
        <div className="relative w-full sm:w-72">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by name, role, or qualification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Team Cards Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="mt-2 text-xs text-slate-500">Loading team members...</p>
        </div>
      ) : filteredTeam.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <HiOutlineUserGroup className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-2 text-sm font-bold text-slate-700">No team members found</h3>
          <p className="text-xs text-slate-500 mt-1">Click "Add Team Member" to introduce your first colleague.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTeam.map((member) => (
            <div
              key={member._id}
              className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo & Actions */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-20 w-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                      onError={(e) => {
                        e.target.src = "/assets/about.jpg";
                      }}
                    />
                    <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      #{member.order || 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(member)}
                      className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-brand-500 transition"
                      title="Edit Member"
                    >
                      <HiOutlinePencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(member._id, member.name)}
                      className="p-2 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                      title="Delete Member"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Member Details */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-500 transition">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-brand-600 mt-0.5">
                  {member.role}
                </p>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  {member.education && (
                    <div className="flex items-center gap-1.5">
                      <HiOutlineAcademicCap className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{member.education}</span>
                    </div>
                  )}
                  {member.experience && (
                    <div className="flex items-center gap-1.5">
                      <HiOutlineBriefcase className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <span>{member.experience}</span>
                    </div>
                  )}
                </div>

                {member.bio && (
                  <p className="mt-3 text-xs text-slate-500 line-clamp-3 leading-relaxed border-t border-slate-100 pt-2.5">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 animate-scaleUp max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {editingMember ? "Edit Team Member" : "Add New Team Member"}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in the professional details and portrait photo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                  {formError}
                </div>
              )}

              {/* Photo Uploader */}
              <div>
                <MediaUploader
                  label="Member Portrait Photo"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  helperText="Upload portrait photo from your computer or paste online image link."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ar. Tanzim Rahman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Principal Architect / Lead 3D Artist"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Education / Qualifications
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Arch (BUET), MIAB"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10+ Years Experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Display Order / Priority
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="1, 2, 3..."
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-0.5">Lower numbers show first on the team page.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Bio / Specialization Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Summary of architectural philosophy, residential design focus, or materials expertise..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-md shadow-brand-500/20 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
