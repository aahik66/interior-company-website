import { useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi";

export default function Hero() {
  const { settings } = useSettings();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const emailAddress = settings?.email || "contact@dimensioncomposition.com";
  const phoneNumber = settings?.phoneNumber || "+880 1739-835017";
  const secondaryPhone = settings?.secondaryPhoneNumber || "+880 1601-370090";
  const heroVideoUrl =
    settings?.heroVideoUrl ||
    "https://bdinterior.com/wp-content/uploads/2025/09/homepage-Video-3.mp4";
  const heroPosterUrl = settings?.heroPosterUrl || "/assets/hero.jpg";

  const heroTitle = settings?.heroTitle !== undefined ? settings.heroTitle : "Leading Interior Design Company in Bangladesh";
  const heroSubtitle =
    settings?.heroSubtitle !== undefined
      ? settings.heroSubtitle
      : "Award-winning interior architecture and turnkey design studio in Bangladesh. 15+ years experience, 700+ successful projects. Get expert design consultation for your dream home & corporate office.";
  const heroBadge = settings?.heroBadge !== undefined ? settings.heroBadge : "Welcome to Dimension Composition";
  const showHeroTitle = settings?.showHeroTitle !== false && Boolean(heroTitle?.trim());
  const showHeroSubtitle = settings?.showHeroSubtitle !== false && Boolean(heroSubtitle?.trim());
  const showHeroBadge = settings?.showHeroBadge !== false && Boolean(heroBadge?.trim());
  const highlightWord = settings?.heroHighlightText?.trim();

  const renderTitle = () => {
    if (!heroTitle) return null;
    if (highlightWord && heroTitle.toLowerCase().includes(highlightWord.toLowerCase())) {
      const escaped = highlightWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escaped})`, "gi");
      const parts = heroTitle.split(regex);
      return parts.map((part, i) =>
        part.toLowerCase() === highlightWord.toLowerCase() ? (
          <span key={i} className="text-brand-500">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      );
    }
    return heroTitle;
  };

  return (
    <div className="relative w-full bg-slate-950 text-white overflow-hidden select-none">
      {/* 1. Minimalist Top Ticker */}
      <div className="relative z-30 w-full bg-[#071322]/90 backdrop-blur-sm border-b border-white/10 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-2 overflow-hidden">
            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-brand-400 transition"
              title="Email Us"
            >
              <HiOutlineMail className="h-3.5 w-3.5 text-brand-500 flex-shrink-0" />
              <span className="font-medium">{emailAddress}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-200 ml-auto">
            <a
              href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
              className="flex items-center gap-1 text-slate-200 hover:text-brand-400 transition"
              title="Main Hotline"
            >
              <HiOutlinePhone className="h-3 w-3 text-brand-500 flex-shrink-0" />
              <span>{phoneNumber}</span>
            </a>
            {secondaryPhone && (
              <a
                href={`tel:${secondaryPhone.replace(/\s+/g, "")}`}
                className="hidden sm:inline-flex items-center gap-1 text-slate-400 hover:text-brand-400 transition"
                title="Secondary Line"
              >
                <span>/ {secondaryPhone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Hero Video Banner */}
      <section className="relative isolate flex min-h-[82vh] sm:min-h-[86vh] w-full flex-col justify-center items-center overflow-hidden">
        {/* Background Video Walkthrough (Configurable via Admin Panel) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            key={heroVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={() => setIsVideoLoaded(true)}
            poster={heroPosterUrl}
            className="h-full w-full object-cover scale-105 transition duration-1000"
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Clean, balanced overlay for video visibility & crisp typography */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/40 backdrop-brightness-[0.98]" />

        {/* Subtle Ambient Light */}
        <div className="absolute top-1/4 left-10 z-10 h-72 w-96 rounded-full bg-brand-500/10 blur-[130px] pointer-events-none" />

        {/* Left-Corner Minimalist Content Container */}
        <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 my-auto">
          <div className="max-w-2xl text-left space-y-4 sm:space-y-5">
            {/* Minimalist Pill Badge */}
            {showHeroBadge && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-200 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                <span>{heroBadge}</span>
              </div>
            )}

            {/* Dynamic H1 Heading */}
            {showHeroTitle && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-[1.2] drop-shadow-md">
                {renderTitle()}
              </h1>
            )}

            {/* Dynamic Subtitle Paragraph */}
            {showHeroSubtitle && (
              <p className="text-xs sm:text-sm md:text-[15px] text-slate-300 leading-relaxed font-normal max-w-xl">
                {heroSubtitle}
              </p>
            )}

            {/* Action Button: Explore Portfolio */}
            <div className="pt-1.5 sm:pt-2">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 hover:bg-white/15 hover:border-white/40 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-[13px] font-medium text-slate-200 hover:text-white backdrop-blur-md transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Portfolio</span>
                <HiOutlineArrowRight className="h-3.5 w-3.5 text-slate-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
