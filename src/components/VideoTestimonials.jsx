import { useState, useEffect } from "react";
import { FaPlay, FaYoutube } from "react-icons/fa";
import { HiOutlineX, HiOutlineArrowRight, HiOutlineStar } from "react-icons/hi";
import { API_BASE } from "../config/api";

/**
 * Helper to extract YouTube Video ID from any standard link format:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - Direct VIDEO_ID
 */
export function extractYoutubeId(url) {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.length === 11 && !trimmed.includes("/") && !trimmed.includes("?")) {
    return trimmed;
  }
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : trimmed;
}

// 9 Testimonial Items matching the reference screenshot design
const testimonials = [
  {
    id: "v1",
    quote: "DIMENSION COMPOSITION IS WHAT I TRUST",
    clientName: "Engr. Tanvir & Sabrina Ahmed",
    project: "Gulshan-2 Duplex Residence",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with any YouTube URL
    thumbnail: "/assets/projects/livingroom3.jpg",
    location: "Gulshan, Dhaka",
  },
  {
    id: "v2",
    quote: "SURPRISED AT EVERY STEP",
    clientName: "Dr. Kazi Mahfuzur Rahman",
    project: "Consultation & Corporate Office",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    thumbnail: "/assets/projects/kitchen1.jpeg",
    location: "Banani, Dhaka",
  },
  {
    id: "v3",
    quote: "WORTHY DECISION",
    clientName: "Mr. & Mrs. Faruque Hassan",
    project: "Minimalist Master Suite",
    youtubeUrl: "https://www.youtube.com/watch?v=tgbNymZ7vqY",
    thumbnail: "/assets/projects/bedroom6.jpeg",
    location: "Dhanmondi, Dhaka",
  },
  {
    id: "v4",
    quote: "COULDN'T EXPECT MORE",
    clientName: "Ashraful & Munira Islam",
    project: "Turnkey Apartment Fitout",
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnail: "/assets/projects/livingroom4.jpg",
    location: "Uttara, Dhaka",
  },
  {
    id: "v5",
    quote: "SUCH AN AMIABLE, SUPPORTIVE TEAM",
    clientName: "The Chowdhury Family",
    project: "Open-plan Living & Dining Lounge",
    youtubeUrl: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    thumbnail: "/assets/projects/dining.jpeg",
    location: "Bashundhara R/A",
  },
  {
    id: "v6",
    quote: "100 OUT OF 100!",
    clientName: "Kazi Shafiqul Alam",
    project: "Tech Hub & Executive Boardroom",
    youtubeUrl: "https://www.youtube.com/watch?v=6v2L2UGZJAM",
    thumbnail: "/assets/projects/living room.jpeg",
    location: "Tejgaon Commercial Area",
  },
  {
    id: "v7",
    quote: "IMPRESSED WITH FIRST IMPRESSION",
    clientName: "Rezaul Karim & Family",
    project: "Penthouse Skyline Terrace Lounge",
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    thumbnail: "/assets/projects/bedroom7.jpeg",
    location: "Baridhara DOHS",
  },
  {
    id: "v8",
    quote: "CARING BEYOND BUSINESS",
    clientName: "Nazma Begum & Daughters",
    project: "Modern Island Kitchen Suite",
    youtubeUrl: "https://www.youtube.com/watch?v=9YffrCViTVk",
    thumbnail: "/assets/projects/kitchen5.jpeg",
    location: "Mirpur DOHS",
  },
  {
    id: "v9",
    quote: "TOILED WITH UTMOST SINCERITY",
    clientName: "Syed Anwar Hossain",
    project: "Classic & Contemporary Fusion Home",
    youtubeUrl: "https://www.youtube.com/watch?v=lF_wT8tE0w0",
    thumbnail: "/assets/projects/bridal.jpeg",
    location: "Mohakhali DOHS",
  },
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [items, setItems] = useState(testimonials);

  // Load video testimonials from API if available
  useEffect(() => {
    fetch(`${API_BASE}/videos?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => console.warn("Could not load dynamic videos", err));
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    if (activeVideo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  const activeVideoId = activeVideo ? extractYoutubeId(activeVideo.youtubeUrl) : null;

  return (
    <section id="testimonials" className="relative w-full bg-[#fdfdfd] py-12 sm:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header matching screenshot */}
        <div className="flex flex-col items-center text-center space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-500">
            <span className="h-0.5 w-6 bg-brand-500" />
            <span>Client Testimonials</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Satisfaction Knows No Bounds
          </h2>

          <p className="max-w-2xl text-xs sm:text-base text-gray-500 leading-relaxed font-normal px-2">
            Clients are our most valued assets. We feel exceedingly fulfilled when their genuine joy pours out of the brims following each successful project handover.
          </p>
        </div>

        {/* Video Testimonials Grid (3 x 3 Cards) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, idx) => {
            const videoId = extractYoutubeId(item.youtubeUrl);
            const fallbackThumbnail = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : item.thumbnail;

            return (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={60 + (idx % 3) * 60}
                onClick={() => setActiveVideo(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-brand-500/40"
              >
                {/* 16:9 Thumbnail Image Wrapper */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
                  <img
                    src={item.thumbnail || fallbackThumbnail}
                    alt={item.quote}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      if (e.target.src !== fallbackThumbnail) {
                        e.target.src = fallbackThumbnail;
                      }
                    }}
                  />

                  {/* Stylized Architectural Angle Banner with Brand Terracotta accent */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Stylized Diagonal Orange Brand Shape (matches screenshot) */}
                  <div
                    className="absolute -top-12 -right-12 h-36 w-44 bg-gradient-to-bl from-brand-500 via-brand-500/90 to-transparent opacity-90 transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                  />

                  {/* Watermark Quote Icon */}
                  <span className="absolute top-2 left-4 text-5xl font-serif text-white/20 select-none pointer-events-none leading-none">
                    “
                  </span>

                  {/* Top Quote Headline Banner in Bold font */}
                  <div className="absolute top-4 right-4 z-10 max-w-[70%] text-right">
                    <span className="inline-block font-black text-xs sm:text-sm uppercase tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
                      {item.quote}
                    </span>
                  </div>

                  {/* Center Glowing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-white/90 bg-black/35 text-white backdrop-blur-sm shadow-2xl transition duration-300 group-hover:scale-115 group-hover:bg-brand-500 group-hover:border-brand-500">
                      {/* Pulse Ring */}
                      <span className="absolute -inset-1 rounded-full bg-white/40 opacity-0 transition group-hover:opacity-100 group-hover:animate-ping" />
                      <FaPlay className="h-5 w-5 sm:h-6 sm:w-6 text-white ml-1 transition duration-300" />
                    </div>
                  </div>

                  {/* Brand signature logo stamp at bottom */}
                  <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest text-white uppercase">
                    <FaYoutube className="h-3 w-3 text-red-500" />
                    <span>Dimension Video</span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 right-4 z-10 text-[11px] font-medium text-white/90 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                    Watch Review ↗
                  </div>
                </div>

                {/* Card Sub-Info Bar */}
                <div className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-gray-100">
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand-500 transition truncate">
                      {item.clientName}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {item.project} • {item.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <HiOutlineStar key={s} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom "Watch More →" Button (matching screenshot) */}
        <div className="mt-10 sm:mt-12 flex justify-center" data-aos="fade-up">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition duration-300 hover:bg-brand-600 hover:scale-105 active:scale-95"
          >
            <span>Watch More</span>
            <HiOutlineArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SEAMLESS IN-WEBSITE YOUTUBE VIDEO MODAL PLAYER */}
      {/* ========================================================= */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          {/* Modal Card */}
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-950 border border-white/20 shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-5 py-3 sm:py-4 bg-gray-900/90 text-white">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  <FaYoutube className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-base font-bold text-white truncate">
                    {activeVideo.quote}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 truncate">
                    {activeVideo.clientName} • {activeVideo.project}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition ml-2"
                aria-label="Close Video Player"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            {/* Embedded 16:9 YouTube Player */}
            <div className="relative aspect-[16/9] w-full bg-black">
              {activeVideoId ? (
                <iframe
                  className="h-full w-full border-0"
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.quote}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  Video URL not found.
                </div>
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-xs text-gray-400 border-t border-white/5">
              <span className="text-[11px] sm:text-xs">Dimension Composition Client Review Video</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="font-medium text-brand-400 hover:underline"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
