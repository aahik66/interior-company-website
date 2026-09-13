import { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import {
  HiOutlineFolder,
  HiOutlineCalculator,
  HiOutlineMail,
  HiOutlineStar,
  HiOutlineVideoCamera,
  HiOutlinePlus,
  HiOutlineCog,
  HiOutlineArrowRight,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

export default function OverviewTab({ setActiveTab, onOpenNewProjectModal }) {
  const { authFetch } = useAuth();
  const [stats, setStats] = useState({
    projectsCount: 0,
    quotesCount: 0,
    contactsCount: 0,
    reviewsCount: 0,
    videosCount: 0,
  });
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverview() {
      setLoading(true);
      try {
        const [projRes, quotesRes, contactRes, revRes, vidRes] = await Promise.allSettled([
          fetch(`${API_BASE}/projects`),
          authFetch(`${API_BASE}/quotes`),
          authFetch(`${API_BASE}/contact`),
          fetch(`${API_BASE}/reviews`),
          fetch(`${API_BASE}/videos`),
        ]);

        const projects = projRes.status === "fulfilled" && projRes.value.ok ? await projRes.value.json() : [];
        const quotes = quotesRes.status === "fulfilled" && quotesRes.value ? quotesRes.value : [];
        const contacts = contactRes.status === "fulfilled" && contactRes.value ? contactRes.value : [];
        const reviews = revRes.status === "fulfilled" && revRes.value.ok ? await revRes.value.json() : [];
        const videos = vidRes.status === "fulfilled" && vidRes.value.ok ? await vidRes.value.json() : [];

        setStats({
          projectsCount: Array.isArray(projects) ? projects.length : 0,
          quotesCount: Array.isArray(quotes) ? quotes.length : 0,
          contactsCount: Array.isArray(contacts) ? contacts.length : 0,
          reviewsCount: Array.isArray(reviews) ? reviews.length : 0,
          videosCount: Array.isArray(videos) ? videos.length : 0,
        });

        setRecentQuotes(Array.isArray(quotes) ? quotes.slice(0, 5) : []);
        setRecentContacts(Array.isArray(contacts) ? contacts.slice(0, 5) : []);
      } catch (err) {
        console.warn("Error loading overview data", err);
      } finally {
        setLoading(false);
      }
    }

    loadOverview();
  }, [authFetch]);

  const cards = [
    {
      title: "Portfolio Projects",
      count: stats.projectsCount,
      icon: HiOutlineFolder,
      color: "from-blue-600 to-indigo-600",
      tab: "projects",
    },
    {
      title: "Cost Estimator Leads",
      count: stats.quotesCount,
      icon: HiOutlineCalculator,
      color: "from-amber-500 to-orange-600",
      tab: "quotes",
    },
    {
      title: "Contact Messages",
      count: stats.contactsCount,
      icon: HiOutlineMail,
      color: "from-emerald-500 to-teal-600",
      tab: "contacts",
    },
    {
      title: "Client Reviews",
      count: stats.reviewsCount,
      icon: HiOutlineStar,
      color: "from-purple-500 to-pink-600",
      tab: "reviews",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Welcome */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
            Overview Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
            Welcome to Dimension Composition Console
          </h2>
          <p className="mt-1 text-sm text-slate-300 max-w-xl">
            Manage your interior portfolio, respond to new Cost Calculator quotation leads, inspect client inquiries, and update site settings in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenNewProjectModal}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-lg shadow-brand-500/20 transition hover:scale-105"
          >
            <HiOutlinePlus className="h-4 w-4" /> Add New Project
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-4 py-2.5 text-xs sm:text-sm font-semibold transition"
          >
            <HiOutlineCog className="h-4 w-4" /> Edit Site Settings
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => setActiveTab(card.tab)}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {card.title}
                </span>
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-black text-slate-900">
                  {loading ? "..." : card.count}
                </span>
                <span className="text-xs font-semibold text-brand-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Manage <HiOutlineArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two column recent activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Latest Cost Estimates</h3>
              <p className="text-xs text-slate-500">Clients who generated estimates via Cost Calculator</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("quotes")}
              className="text-xs font-bold text-brand-500 hover:underline"
            >
              View All
            </button>
          </div>

          {loading ? (
            <p className="text-xs text-slate-400 py-6 text-center">Loading recent quotes...</p>
          ) : recentQuotes.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No cost calculator estimates recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {recentQuotes.map((q) => {
                const phoneDigits = q.phone?.replace(/\D/g, "");
                const waLink = `https://wa.me/${phoneDigits.startsWith("88") ? phoneDigits : `88${phoneDigits}`}?text=${encodeURIComponent(
                  `Hello ${q.name}! Thank you for using Dimension Composition's cost calculator. We noticed you calculated an estimate for ${q.size} (${q.packageType}). Would you like to schedule a free 3D design consultation?`
                )}`;

                return (
                  <div
                    key={q._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{q.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600 border border-brand-200/60">
                          {q.packageType || "Standard"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {q.location} • {q.size} • ৳{q.totalEstimatedLow?.toLocaleString()} - ৳{q.totalEstimatedHigh?.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm transition"
                      >
                        <FaWhatsapp className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Contact Messages */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Inquiries</h3>
              <p className="text-xs text-slate-500">Messages received from the website contact form</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("contacts")}
              className="text-xs font-bold text-brand-500 hover:underline"
            >
              View All
            </button>
          </div>

          {loading ? (
            <p className="text-xs text-slate-400 py-6 text-center">Loading inquiries...</p>
          ) : recentContacts.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No contact inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div
                  key={c._id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{c.name}</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 italic">
                    "{c.message}"
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                    {c.phone && <span>📞 {c.phone}</span>}
                    <span>✉️ {c.email}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
