import { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import {
  HiOutlineSearch,
  HiOutlineTrash,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineEye,
  HiOutlineX,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

const STATUS_COLORS = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  in_discussion: "bg-purple-50 text-purple-700 border-purple-200",
  converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function QuotesTab() {
  const { authFetch } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState(null);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const data = await authFetch(`${API_BASE}/quotes`);
      if (Array.isArray(data)) {
        setQuotes(data);
      }
    } catch (err) {
      console.warn("Failed to fetch quotes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await authFetch(`${API_BASE}/quotes/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      setQuotes((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status: newStatus } : q))
      );
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete lead from "${name}"?`)) return;
    try {
      await authFetch(`${API_BASE}/quotes/${id}`, {
        method: "DELETE",
      });
      setQuotes((prev) => prev.filter((q) => q._id !== id));
      if (selectedQuote?._id === id) setSelectedQuote(null);
    } catch (err) {
      alert(err.message || "Failed to delete lead");
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    const matchesSearch =
      !search ||
      q.name?.toLowerCase().includes(search.toLowerCase()) ||
      q.phone?.includes(search) ||
      q.location?.toLowerCase().includes(search.toLowerCase()) ||
      q.email?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Cost Calculator Leads & Estimates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Every visitor estimate calculated on the website is stored here with direct WhatsApp follow-up.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Total Leads:</span>
          <span className="px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 font-extrabold text-xs">
            {quotes.length}
          </span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {["all", "new", "contacted", "in_discussion", "converted", "closed"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap capitalize transition ${
                statusFilter === st
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search lead by name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="mt-2 text-xs text-slate-500">Loading cost estimates...</p>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-sm font-bold text-slate-700">No estimation leads found</p>
          <p className="text-xs text-slate-500 mt-1">Visitors who complete the Cost Calculator will show up here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[850px]">
              <thead className="bg-slate-50 text-[11px] sm:text-xs font-bold uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Client Contact</th>
                  <th className="py-3.5 px-4">Flat Specs</th>
                  <th className="py-3.5 px-4">Estimated Range</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuotes.map((q) => {
                  const phoneDigits = q.phone?.replace(/\D/g, "") || "";
                  const waNumber = phoneDigits.startsWith("88") ? phoneDigits : `88${phoneDigits}`;
                  const waText = encodeURIComponent(
                    `Hello ${q.name}! Thank you for estimating your interior project with Dimension Composition. We noticed you calculated an estimate for ${q.size} (${q.packageType}) at approx ৳ ${q.totalEstimatedLow?.toLocaleString()} - ${q.totalEstimatedHigh?.toLocaleString()} BDT. Would you like to discuss the design details with our senior architect?`
                  );

                  return (
                    <tr key={q._id} className="hover:bg-slate-50/60 transition">
                      {/* Client Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{q.name}</div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span>📞 {q.phone}</span>
                          <span>•</span>
                          <span>{q.location || "Dhaka"}</span>
                        </div>
                      </td>

                      {/* Specs */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{q.size || "1800 sq.ft"}</div>
                        <div className="text-[11px] text-brand-600 font-bold uppercase">{q.packageType || "Standard"}</div>
                      </td>

                      {/* Estimated Price */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        ৳ {q.totalEstimatedLow?.toLocaleString()} - {q.totalEstimatedHigh?.toLocaleString()}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={q.status || "new"}
                          onChange={(e) => handleStatusChange(q._id, e.target.value)}
                          className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider focus:outline-none cursor-pointer ${
                            STATUS_COLORS[q.status || "new"]
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_discussion">In Discussion</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      {/* Submission Date */}
                      <td className="py-3.5 px-4 text-[11px] text-slate-500 whitespace-nowrap">
                        {new Date(q.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {/* 1-Click WhatsApp follow-up */}
                          <a
                            href={`https://wa.me/${waNumber}?text=${waText}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm transition"
                            title="Message on WhatsApp"
                          >
                            <FaWhatsapp className="h-3.5 w-3.5" /> WhatsApp
                          </a>

                          {/* Inspect details */}
                          <button
                            type="button"
                            onClick={() => setSelectedQuote(q)}
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition"
                            title="View Full Calculation Breakdown"
                          >
                            <HiOutlineEye className="h-4 w-4" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(q._id, q.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Delete Lead"
                          >
                            <HiOutlineTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed Quote Breakdown Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Lead Details: {selectedQuote.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Generated on {new Date(selectedQuote.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Phone</span>
                  <p className="font-bold text-slate-900">{selectedQuote.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                  <p className="font-bold text-slate-900">{selectedQuote.email}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Location</span>
                  <p className="font-bold text-slate-900">{selectedQuote.location}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Package</span>
                  <p className="font-bold text-brand-600 uppercase">{selectedQuote.packageType}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-400 font-bold">Estimated Cost</span>
                  <div className="text-xl font-extrabold">
                    ৳ {selectedQuote.totalEstimatedLow?.toLocaleString()} - {selectedQuote.totalEstimatedHigh?.toLocaleString()} BDT
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-brand-500 text-white">
                  {selectedQuote.size}
                </span>
              </div>

              {/* Room Breakdown Table if present */}
              {selectedQuote.roomBreakdowns && selectedQuote.roomBreakdowns.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Itemized Room Choices:</h4>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                        <tr>
                          <th className="p-2.5">Room</th>
                          <th className="p-2.5">Qty</th>
                          <th className="p-2.5">Selected Features</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedQuote.roomBreakdowns.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-2.5 font-bold text-slate-900">{item.room}</td>
                            <td className="p-2.5">{item.count}</td>
                            <td className="p-2.5 text-slate-500">
                              {Array.isArray(item.features) ? item.features.join(", ") : "Standard"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
