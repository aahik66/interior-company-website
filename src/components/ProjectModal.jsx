import { useState, useEffect } from "react";
import {
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineTemplate,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

export default function ProjectModal({ project, onClose }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Gallery array fallback
  const gallery =
    project?.gallery && project.gallery.length > 0
      ? project.gallery
      : [project?.image || "/assets/projects/livingroom4.jpg"];

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveImageIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [gallery.length, onClose]);

  if (!project) return null;

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  // Materials fallback
  const materials =
    project.materials && project.materials.length > 0
      ? project.materials
      : [
          "Natural Wood Paneling",
          "Polished Italian Marble",
          "Recessed LED Lighting",
          "Acoustic Fabrics",
          "Brushed Brass Accents",
        ];

  const whatsappMessage = encodeURIComponent(
    `Hello Dimension Composition! I am interested in learning more about the "${project.title}" (${project.category}) interior design project.`
  );
  const whatsappUrl = `https://wa.me/8801700000000?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 flex flex-col max-h-[96vh] sm:max-h-[92vh] w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-white text-gray-900 shadow-2xl overflow-hidden border border-white/20 animate-scaleUp">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50/90">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="rounded-full bg-brand-500/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-brand-500 shrink-0">
              {project.category}
            </span>
            {project.location && (
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-500 truncate">
                <HiOutlineLocationMarker className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                <span className="truncate">{project.location}</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-200/70 text-gray-600 transition hover:bg-gray-300 hover:text-gray-900 shrink-0 ml-2"
            aria-label="Close modal"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-4 py-5 sm:px-8 sm:py-6 space-y-6 sm:space-y-8">
          {/* Main Gallery Showcase */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg aspect-[16/10] sm:aspect-[16/9] max-h-[440px]">
              <img
                src={gallery[activeImageIdx]}
                alt={`${project.title} - view ${activeImageIdx + 1}`}
                className="h-full w-full object-cover transition duration-500"
              />

              {/* Counter Pill */}
              <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {activeImageIdx + 1} / {gallery.length}
              </div>

              {/* Navigation Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/80 hover:scale-105"
                    aria-label="Previous image"
                  >
                    <HiOutlineChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/80 hover:scale-105"
                    aria-label="Next image"
                  >
                    <HiOutlineChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative h-18 w-26 sm:h-20 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      activeImageIdx === idx
                        ? "border-brand-500 ring-2 ring-brand-500/30 shadow-md scale-[1.03]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Title & Description */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              {project.title}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-3xl">
              {project.description ||
                "A thoughtfully tailored interior crafted by Dimension Composition, balancing spatial ergonomics, ambient illumination, and bespoke finishes."}
            </p>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4">
            <div className="rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50/80 p-3 sm:p-4 transition hover:bg-brand-50/50">
              <div className="flex items-center gap-1.5 text-brand-500 mb-1">
                <HiOutlineClock className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Timeline
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {project.duration || "45 Days"}
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50/80 p-3 sm:p-4 transition hover:bg-brand-50/50">
              <div className="flex items-center gap-1.5 text-brand-500 mb-1">
                <HiOutlineTemplate className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Area / Scale
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {project.area || "450 sq.ft"}
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50/80 p-3 sm:p-4 transition hover:bg-brand-50/50">
              <div className="flex items-center gap-1.5 text-brand-500 mb-1">
                <HiOutlineCheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Style / Type
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-gray-900 truncate">
                {project.category}
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50/80 p-3 sm:p-4 transition hover:bg-brand-50/50">
              <div className="flex items-center gap-1.5 text-brand-500 mb-1">
                <HiOutlineLocationMarker className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Location
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-gray-900 truncate">
                {project.location || "Dhaka, Bangladesh"}
              </p>
            </div>
          </div>

          {/* Materials & Finishes Section */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-800">
              Materials & Craftsmanship (ব্যবহৃত ম্যাটেরিয়ালস)
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {materials.map((mat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl border border-brand-100 bg-brand-50/70 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium text-brand-900"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4">
          <p className="text-xs text-gray-500 hidden sm:block">
            Looking for something similar? Get in touch with our design team.
          </p>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto rounded-full border border-gray-300 px-5 py-2.5 text-xs sm:text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Close
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600 hover:scale-[1.02]"
            >
              <FaWhatsapp className="h-4 w-4" />
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
