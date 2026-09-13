import { useState, useEffect } from "react";
import { API_BASE } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import { useSettings } from "../../../context/SettingsContext";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
  HiOutlineCheck,
} from "react-icons/hi";
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import MediaUploader from "../../../components/admin/MediaUploader";

export default function SettingsTab() {
  const { authFetch } = useAuth();
  const { refreshSettings } = useSettings();

  const [form, setForm] = useState({
    companyName: "Dimension Composition",
    tagline: "Luxury Interior Architecture & Turnkey Design Studio",
    phoneNumber: "+8801700000000",
    whatsappNumber: "8801700000000",
    email: "contact@dimensioncomposition.com",
    address: "House #42, Road #11, Block D, Banani, Dhaka-1213, Bangladesh",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
    linkedinUrl: "https://linkedin.com",
    officeHours: "Sat - Thu: 9:30 AM - 7:30 PM (Friday Closed)",
    heroVideoUrl: "https://bdinterior.com/wp-content/uploads/2025/09/homepage-Video-3.mp4",
    heroPosterUrl: "/assets/hero.jpg",
    heroTitle: "Leading Interior Design Company in Bangladesh",
    heroSubtitle:
      "Award-winning interior architecture and turnkey design studio in Bangladesh. 15+ years experience, 700+ successful projects. Get expert design consultation for your dream home & corporate office.",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/settings`);
        if (res.ok) {
          const data = await res.json();
          setForm((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.warn("Error loading settings", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await authFetch(`${API_BASE}/settings`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setSuccessMsg("Website settings successfully saved and applied to entire website!");
      refreshSettings();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
        <p className="mt-2 text-xs text-slate-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Global Website Configurations
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Changes made here instantly update the website header, floating WhatsApp buttons, footer contact details, and contact page.
        </p>
      </div>

      {successMsg && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs sm:text-sm text-emerald-700 flex items-center gap-2">
          <HiOutlineCheck className="h-5 w-5 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs sm:text-sm text-red-600">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Identity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            1. Brand Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Communication */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            2. Direct Communication (WhatsApp & Phone)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaWhatsapp className="text-[#25D366]" /> WhatsApp Number (Digits only with country code)
              </label>
              <input
                type="text"
                required
                placeholder="8801700000000"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value.replace(/\D/g, "") })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">Example: 8801712345678 (no + sign or spaces)</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <HiOutlinePhone className="text-brand-500" /> Display Hotline Phone Number
              </label>
              <input
                type="text"
                required
                placeholder="+880 1700-000000"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <HiOutlineMail className="text-blue-500" /> Primary Contact Email
              </label>
              <input
                type="email"
                required
                placeholder="contact@dimensioncomposition.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Office Working Hours</label>
              <input
                type="text"
                placeholder="Sat - Thu: 9:30 AM - 7:30 PM"
                value={form.officeHours}
                onChange={(e) => setForm({ ...form, officeHours: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="text-xs sm:text-sm">
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <HiOutlineLocationMarker className="text-red-500" /> Studio Office Address
            </label>
            <input
              type="text"
              required
              placeholder="House #42, Road #11, Block D, Banani, Dhaka-1213, Bangladesh"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            3. Social Media Handles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaFacebook className="text-[#1877F2]" /> Facebook Page URL
              </label>
              <input
                type="url"
                value={form.facebookUrl}
                onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaInstagram className="text-[#E4405F]" /> Instagram Profile URL
              </label>
              <input
                type="url"
                value={form.instagramUrl}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaYoutube className="text-[#CD201F]" /> YouTube Channel URL
              </label>
              <input
                type="url"
                value={form.youtubeUrl}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaLinkedin className="text-[#0A66C2]" /> LinkedIn Company URL
              </label>
              <input
                type="url"
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* 4. Hero Banner & Background Video Customization */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>4. Hero Background Video & Media</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize the video and poster image shown in the homepage hero banner.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <MediaUploader
                label="Hero Background Video (.mp4 format)"
                isVideo
                accept="video/*"
                value={form.heroVideoUrl || ""}
                onChange={(url) => setForm({ ...form, heroVideoUrl: url })}
                helperText="Upload an MP4 video directly from your computer or paste an external video link."
              />
            </div>

            <div>
              <MediaUploader
                label="Hero Fallback Poster Image"
                accept="image/*"
                value={form.heroPosterUrl || ""}
                onChange={(url) => setForm({ ...form, heroPosterUrl: url })}
                helperText="Shown before video loads or on slower mobile connections. Upload image or paste link."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Hero Main Headline (H1)
              </label>
              <input
                type="text"
                placeholder="Leading Interior Design Company in Bangladesh"
                value={form.heroTitle || ""}
                onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Hero Subtitle Description
              </label>
              <textarea
                rows={2}
                placeholder="Award-winning interior architecture and turnkey design studio in Bangladesh..."
                value={form.heroSubtitle || ""}
                onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:scale-105 disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Website Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
