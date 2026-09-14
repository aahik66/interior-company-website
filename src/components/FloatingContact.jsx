import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlinePhone, HiOutlineX, HiOutlineChatAlt2 } from "react-icons/hi";
import { useSettings } from "../context/SettingsContext";

export default function FloatingContact() {
  const { settings } = useSettings();
  const PHONE_NUMBER = settings?.phoneNumber || "+880 1739-835017";
  const SECONDARY_PHONE = settings?.secondaryPhoneNumber || "+880 1601-370090";
  const WHATSAPP_NUMBER = settings?.whatsappNumber || "8801739835017";

  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Hide tooltip after 8 seconds or on scroll
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTooltip(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openWhatsApp = (customMessage = "") => {
    const defaultMsg = "Hello Dimension Composition! I would like to consult about an interior design project.";
    const encoded = encodeURIComponent(customMessage || defaultMsg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none">
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-xs sm:max-w-sm rounded-3xl bg-white text-gray-900 shadow-2xl border border-gray-100 p-4 sm:p-5 animate-scaleUp">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/assets/logo.png"
                  alt="Dimension Composition"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl object-contain bg-white p-0.5 shadow-md"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 leading-tight">
                  Dimension Composition
                </h4>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Studio Online • Instant Reply
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition"
              aria-label="Close contact popup"
            >
              <HiOutlineX className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Message Options */}
          <div className="py-3 sm:py-4 space-y-2">
            <p className="text-xs text-gray-500 font-medium">
              Choose a quick consultation topic:
            </p>

            <button
              onClick={() =>
                openWhatsApp("Hello! I want to discuss a new residential interior design project.")
              }
              className="w-full text-left rounded-xl border border-gray-100 bg-gray-50/80 p-2.5 text-xs font-medium text-gray-800 transition hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span>New Home / Flat Interior Consultation</span>
            </button>

            <button
              onClick={() =>
                openWhatsApp("Hello! I want to share my floor plan and get an interior design quote.")
              }
              className="w-full text-left rounded-xl border border-gray-100 bg-gray-50/80 p-2.5 text-xs font-medium text-gray-800 transition hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span>Share Floor Plan & Get Quotation</span>
            </button>

            <button
              onClick={() =>
                openWhatsApp("Hello! I would like to inquire about commercial / office interior fitout.")
              }
              className="w-full text-left rounded-xl border border-gray-100 bg-gray-50/80 p-2.5 text-xs font-medium text-gray-800 transition hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span>Commercial / Office Interior Design</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => openWhatsApp()}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#25D366]/30 transition hover:bg-[#20bd5a] hover:scale-[1.02]"
            >
              <FaWhatsapp className="h-4 w-4" />
              Chat on WhatsApp
            </button>

            <a
              href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
              className="inline-flex h-9 px-2.5 items-center justify-center gap-1 rounded-xl bg-gray-100 text-gray-800 text-xs font-semibold transition hover:bg-brand-500 hover:text-white"
              title={`Call Main: ${PHONE_NUMBER}`}
              aria-label="Call studio main"
            >
              <HiOutlinePhone className="h-3.5 w-3.5" />
              <span>Call</span>
            </a>

            {SECONDARY_PHONE && (
              <a
                href={`tel:${SECONDARY_PHONE.replace(/\s+/g, "")}`}
                className="inline-flex h-9 px-2 items-center justify-center rounded-xl bg-gray-100 text-gray-700 text-xs font-bold transition hover:bg-brand-500 hover:text-white"
                title={`Call Secondary: ${SECONDARY_PHONE}`}
                aria-label="Call secondary phone"
              >
                2nd
              </a>
            )}
          </div>
        </div>
      )}

      {/* Floating Buttons Group */}
      <div className="flex items-center gap-3">
        {/* Subtle Tooltip Balloon */}
        {showTooltip && !isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hidden sm:flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-xs font-semibold text-gray-800 shadow-xl border border-gray-100 animate-fadeIn hover:bg-gray-50"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Need quick consultation? Chat with us!</span>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition duration-300 hover:scale-110 hover:bg-[#20bd5a]"
          aria-label="Open WhatsApp chat"
        >
          {/* Subtle Breathing Ripple Wave */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 blur-sm group-hover:opacity-60 animate-pulse" />

          {/* Online Notification Dot */}
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white" />
          </span>

          {isOpen ? (
            <HiOutlineX className="relative z-10 h-6 w-6 transition-transform duration-200" />
          ) : (
            <FaWhatsapp className="relative z-10 h-7 w-7 transition-transform duration-200 group-hover:rotate-6" />
          )}
        </button>
      </div>
    </div>
  );
}
