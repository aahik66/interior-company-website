import { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import {
  HiOutlineSearch,
  HiOutlineTrash,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi";

export default function ContactsTab() {
  const { authFetch } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await authFetch(`${API_BASE}/contact`);
      if (Array.isArray(data)) {
        setContacts(data);
      }
    } catch (err) {
      console.warn("Failed to fetch contact inquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete inquiry from "${name}"?`)) return;
    try {
      await authFetch(`${API_BASE}/contact/${id}`, {
        method: "DELETE",
      });
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete inquiry");
    }
  };

  const filteredContacts = contacts.filter((c) => {
    return (
      !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.message?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Contact Form Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Messages and consultation requests sent by clients through the Contact Us form.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Total Inquiries:</span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs">
            {contacts.length}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search inquiries by name, email, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="mt-2 text-xs text-slate-500">Loading messages...</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-sm font-bold text-slate-700">No contact inquiries found</p>
          <p className="text-xs text-slate-500 mt-1">New submissions will appear here automatically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredContacts.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                      {c.name ? c.name[0].toUpperCase() : "C"}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                      <span className="text-[11px] text-slate-400">
                        {new Date(c.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(c._id, c.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Delete message"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>

                {c.projectType && (
                  <div className="mt-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                      Project: {c.projectType}
                    </span>
                  </div>
                )}

                <p className="mt-3 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 whitespace-pre-wrap leading-relaxed">
                  "{c.message}"
                </p>
              </div>

              {/* Action Links */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <a
                  href={`mailto:${c.email}?subject=Inquiry Response from Dimension Composition`}
                  className="inline-flex items-center gap-1 text-brand-600 hover:underline"
                >
                  <HiOutlineMail className="h-4 w-4" /> Reply Email
                </a>

                {c.phone ? (
                  <a
                    href={`tel:${c.phone}`}
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900"
                  >
                    <HiOutlinePhone className="h-4 w-4" /> Call {c.phone}
                  </a>
                ) : (
                  <span className="text-slate-400 text-[11px]">No phone given</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
