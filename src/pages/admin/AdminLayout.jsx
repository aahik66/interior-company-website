import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import OverviewTab from "./tabs/OverviewTab";
import ProjectsTab from "./tabs/ProjectsTab";
import QuotesTab from "./tabs/QuotesTab";
import ContactsTab from "./tabs/ContactsTab";
import ReviewsTab from "./tabs/ReviewsTab";
import VideosTab from "./tabs/VideosTab";
import TeamTab from "./tabs/TeamTab";
import SettingsTab from "./tabs/SettingsTab";
import Logo from "../../components/Logo";

import {
  HiOutlineViewGrid,
  HiOutlineFolder,
  HiOutlineCalculator,
  HiOutlineMail,
  HiOutlineStar,
  HiOutlineVideoCamera,
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineX,
  HiOutlineExternalLink,
  HiOutlineShieldCheck,
} from "react-icons/hi";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { id: "overview", label: "Dashboard", icon: HiOutlineViewGrid },
    { id: "projects", label: "Projects & Portfolio", icon: HiOutlineFolder },
    { id: "quotes", label: "Cost Calculator Leads", icon: HiOutlineCalculator },
    { id: "contacts", label: "Contact Inquiries", icon: HiOutlineMail },
    { id: "reviews", label: "Client Reviews", icon: HiOutlineStar },
    { id: "videos", label: "Video Testimonials", icon: HiOutlineVideoCamera },
    { id: "team", label: "Team Members", icon: HiOutlineUserGroup },
    { id: "settings", label: "Website Settings", icon: HiOutlineCog },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900 font-sans">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Dimension Composition"
                className="h-11 w-11 rounded-xl object-contain bg-white p-0.5 shadow-md shadow-black/30"
              />
              <div>
                <h1 className="font-extrabold text-sm text-white tracking-wide">
                  DIMENSION
                </h1>
                <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">
                  Admin Console
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <HiOutlineX className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all select-none ${
                    isActive
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25 font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Live Site Button */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
          >
            <HiOutlineExternalLink className="h-4 w-4" /> View Live Website
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-8 w-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {user?.name ? user.name[0].toUpperCase() : "A"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user?.name || "Administrator"}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition flex-shrink-0"
              title="Sign Out"
            >
              <HiOutlineLogout className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <HiOutlineMenuAlt2 className="h-6 w-6" />
            </button>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
              Admin Portal /{" "}
              <span className="text-slate-900 capitalize">
                {navItems.find((n) => n.id === activeTab)?.label || "Overview"}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition shadow-sm"
            >
              <HiOutlineExternalLink className="h-3.5 w-3.5 text-brand-500" />
              Live Site
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold uppercase tracking-wide">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              System Online
            </div>
          </div>
        </header>

        {/* Tab View Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <OverviewTab
              setActiveTab={setActiveTab}
              onOpenNewProjectModal={() => {
                setActiveTab("projects");
                setIsAddModalOpen(true);
              }}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsTab
              isAddModalOpen={isAddModalOpen}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          )}

          {activeTab === "quotes" && <QuotesTab />}

          {activeTab === "contacts" && <ContactsTab />}

          {activeTab === "reviews" && <ReviewsTab />}

          {activeTab === "videos" && <VideosTab />}

          {activeTab === "team" && <TeamTab />}

          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
