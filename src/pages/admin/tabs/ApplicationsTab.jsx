import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { API_BASE } from "../../../config/api";
import {
  HiOutlineSearch,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineBriefcase,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineExternalLink,
  HiOutlineX,
} from "react-icons/hi";

export default function ApplicationsTab() {
  const { authFetch } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (statusFilter !== "all") queryParams.append("status", statusFilter);

      const res = await authFetch(`${API_BASE}/careers/applications?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load job applications");
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [search, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const res = await authFetch(`${API_BASE}/careers/applications/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
      );
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;
    try {
      const res = await authFetch(`${API_BASE}/careers/applications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete application");

      setApplications((prev) => prev.filter((app) => app._id !== id));
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp(null);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 border border-blue-200"><HiOutlineClock className="h-3.5 w-3.5" /> New</span>;
      case "reviewed":
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600 border border-amber-200"><HiOutlineCheckCircle className="h-3.5 w-3.5" /> Reviewed</span>;
      case "shortlisted":
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 border border-emerald-200"><HiOutlineCheckCircle className="h-3.5 w-3.5" /> Shortlisted</span>;
      case "rejected":
        return <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 border border-rose-200"><HiOutlineXCircle className="h-3.5 w-3.5" /> Rejected</span>;
      default:
        return null;
    }
  };

  const totalCount = applications.length;
  const newCount = applications.filter((a) => a.status === "new").length;
  const shortlistedCount = applications.filter((a) => a.status === "shortlisted").length;

  return (
    <div className="space-y-6">
      {/* Header & Stats Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Job Applications</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage candidates who applied for open career positions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white border border-slate-200 px-4 py-2 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total</p>
            <p className="text-lg font-extrabold text-slate-800">{totalCount}</p>
          </div>
          <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-2 text-center shadow-sm">
            <p className="text-[10px] font-bold text-blue-500 uppercase">New</p>
            <p className="text-lg font-extrabold text-blue-700">{newCount}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-2 text-center shadow-sm">
            <p className="text-[10px] font-bold text-emerald-500 uppercase">Shortlisted</p>
            <p className="text-lg font-extrabold text-emerald-700">{shortlistedCount}</p>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Status Filter */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by candidate name, email, phone, or job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-700 font-semibold bg-white focus:border-brand-500 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="new">New Only</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-600 font-semibold">
          {error}
        </div>
      )}

      {/* Applications List */}
      {loading ? (
        <div className="p-8 text-center text-slate-400 text-sm">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200">
          <HiOutlineBriefcase className="mx-auto h-10 w-10 text-slate-300 mb-2" />
          <p className="text-slate-600 font-semibold text-sm">No job applications found.</p>
          <p className="text-slate-400 text-xs mt-1">Applications submitted by job seekers will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="flex flex-col justify-between rounded-2xl bg-white p-5 border border-slate-200 shadow-sm transition hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold text-white tracking-wide">
                    {app.jobTitle}
                  </span>
                  {getStatusBadge(app.status)}
                </div>

                <h3 className="text-base font-bold text-slate-900">{app.name}</h3>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-2">
                    <HiOutlineMail className="h-4 w-4 text-brand-500 shrink-0" />
                    <a href={`mailto:${app.email}`} className="hover:underline font-medium text-slate-700 truncate">
                      {app.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <HiOutlinePhone className="h-4 w-4 text-brand-500 shrink-0" />
                    <a href={`tel:${app.phone}`} className="hover:underline font-medium text-slate-700">
                      {app.phone}
                    </a>
                  </p>
                  <p className="text-slate-500">
                    <span className="font-semibold text-slate-700">Experience:</span> {app.experience}
                  </p>
                  {app.portfolio && (
                    <p className="flex items-center gap-1.5 text-brand-500 font-semibold truncate">
                      <HiOutlineExternalLink className="h-3.5 w-3.5 shrink-0" />
                      <a href={app.portfolio} target="_blank" rel="noreferrer" className="hover:underline truncate">
                        View Portfolio/Resume
                      </a>
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 pt-1">
                    Applied: {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedApp(app)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-brand-500 py-1"
                >
                  <HiOutlineEye className="h-4 w-4" /> Details
                </button>

                <div className="flex items-center gap-1.5">
                  <select
                    value={app.status}
                    disabled={updatingId === app._id}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-bold text-slate-700 bg-slate-50 focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDelete(app._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
                    title="Delete Application"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedApp(null)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <HiOutlineX className="h-5 w-5" />
            </button>

            <div>
              <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold text-brand-500">
                {selectedApp.jobTitle}
              </span>
              <h3 className="mt-2 text-xl font-bold text-slate-900">{selectedApp.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Applied on {new Date(selectedApp.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 text-xs font-semibold">Email</span>
                <a href={`mailto:${selectedApp.email}`} className="font-bold text-brand-500 hover:underline">
                  {selectedApp.email}
                </a>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 text-xs font-semibold">Phone</span>
                <a href={`tel:${selectedApp.phone}`} className="font-bold text-slate-800 hover:underline">
                  {selectedApp.phone}
                </a>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 text-xs font-semibold">Experience</span>
                <span className="font-bold text-slate-800">{selectedApp.experience}</span>
              </div>
              {selectedApp.portfolio && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 text-xs font-semibold">Portfolio/Resume</span>
                  <a
                    href={selectedApp.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-brand-500 hover:underline flex items-center gap-1"
                  >
                    Open Link <HiOutlineExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>

            {selectedApp.coverLetter && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Cover Letter / Candidate Message
                </h4>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Status:</span>
                {getStatusBadge(selectedApp.status)}
              </div>

              <a
                href={`mailto:${selectedApp.email}?subject=Application update for ${encodeURIComponent(selectedApp.jobTitle)} at Dimension Composition`}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-500 transition"
              >
                <HiOutlineMail className="h-4 w-4" /> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
