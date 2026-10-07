import { useState } from "react";
import { trackLead } from "../utils/pixel";
import { HiOutlinePhone, HiOutlineMail, HiOutlineArrowRight, HiOutlineLocationMarker } from "react-icons/hi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { API_BASE } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";

export default function ContactSection() {
  const { settings } = useSettings();
  const { isAuthenticated, authFetch } = useAuth();

  const mainPhone = settings?.phoneNumber || "+880 1739-835017";
  const secondaryPhone = settings?.secondaryPhoneNumber || "+880 1601-370090";
  const whatsappNum = settings?.whatsappNumber || "8801739835017";
  const emailAddr = settings?.email || "contact@dimensioncomposition.com";
  const officeAddress =
    settings?.address ||
    "House -204, Port Road, Block-A, Bashundhara Riverview, Hashnabad, Keraniganj, Dhaka-1310";

  const contactInfo = [
    {
      icon: FaWhatsapp,
      label: "Official WhatsApp",
      value: mainPhone,
      href: `https://wa.me/${whatsappNum}?text=Hello%20Dimension%20Composition!%20I%20am%20interested%20in%20your%20interior%20design%20services`,
    },
    {
      icon: HiOutlinePhone,
      label: "Main Hotline",
      value: mainPhone,
      href: `tel:${mainPhone.replace(/\s+/g, "")}`,
    },
    {
      icon: HiOutlinePhone,
      label: "Secondary Phone",
      value: secondaryPhone,
      href: `tel:${secondaryPhone.replace(/\s+/g, "")}`,
    },
    {
      icon: HiOutlineLocationMarker,
      label: "Studio Office Address",
      value: officeAddress,
      href: `https://maps.google.com/?q=${encodeURIComponent(officeAddress)}`,
    },
    {
      icon: HiOutlineMail,
      label: "Studio Email",
      value: emailAddr,
      href: `mailto:${emailAddr}`,
    },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setStatus({ type: "error", message: "Please log in to send a message." });
      return;
    }
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      await authFetch(`${API_BASE}/contact`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      trackLead({
        content_name: formData.projectType || "Contact Section Inquiry",
        content_category: "Contact Form",
      });
      setStatus({
        type: "success",
        message: "Message sent successfully. We will contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-gray-900 py-12 sm:py-20 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800" />
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div data-aos="fade-right" className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
            Let's talk about your space
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight">Tell us about your project</h2>
          <p className="text-sm sm:text-base text-gray-200/80">
            Share a few details and we’ll schedule a consultation to understand your goals, budget, and timeline.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-xs sm:text-sm" htmlFor="contact-name">
                Full name
                <input
                  required
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-xs sm:text-sm" htmlFor="contact-email">
                Email
                <input
                  required
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-xs sm:text-sm sm:col-span-2" htmlFor="contact-phone">
                Phone (optional)
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  placeholder="Enter your phone number (e.g. +880 1712-345678)"
                  value={formData.phone}
                  onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-xs sm:text-sm" htmlFor="contact-project-type">
              Project type
              <input
                type="text"
                id="contact-project-type"
                name="projectType"
                placeholder="e.g. Residential Apartment, Duplex, Corporate Office"
                value={formData.projectType}
                onChange={(e) => setFormData((f) => ({ ...f, projectType: e.target.value }))}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs sm:text-sm" htmlFor="contact-message">
              Tell us more
              <textarea
                required
                rows={4}
                id="contact-message"
                name="message"
                placeholder="Tell us about your project requirements..."
                value={formData.message}
                onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
              />
            </label>
            {status.message && (
              <p className={`text-sm ${status.type === "error" ? "text-red-400" : "text-green-200"}`}>
                {status.message}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || !isAuthenticated}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending..." : isAuthenticated ? "Send message" : "Login to send"}
              <HiOutlineArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div
          data-aos="fade-left"
          className="flex flex-col gap-6 sm:gap-7 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur"
        >
          <div className="space-y-5 sm:space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">Direct contact</p>
            <div className="grid gap-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 transition hover:-translate-y-0.5 hover:border-brand-400 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-200/80">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-100">
            <p className="font-semibold text-white">Dimension Composition • Interior Design Studio</p>
            <p className="mt-1 text-gray-200/80">
              Dimension Composition creates modern and elegant living spaces through remote consultations and personalized on-site design services.
            </p>
          </div>
        </div>
      </div>

      {/* Google Maps Location Embed */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div
          data-aos="fade-up"
          className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">
                Find Us on Map
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Studio Location & Directions
              </h3>
            </div>
            <a
              href="https://share.google/87jB2rW9qSHbPTqSX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition"
            >
              Open in Google Maps →
            </a>
          </div>
          <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.162202662292!2d90.43053613558244!3d23.675650680796256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b96d6d28b9d3%3A0x1c706776e12518a5!2sCity%20Convention%20Hall%20%26%20Rooftop%20Restaurant!5e1!3m2!1sen!2sbd!4v1791349226037!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Dimension Composition Studio Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

