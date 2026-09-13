import { useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import {
  HiOutlinePhone,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi";

export default function Hero() {
  const { settings } = useSettings();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const phoneNumber = settings?.phoneNumber || "+8801700000000";
  const heroVideoUrl =
    settings?.heroVideoUrl ||
    "https://bdinterior.com/wp-content/uploads/2025/09/homepage-Video-3.mp4";
  const heroPosterUrl = settings?.heroPosterUrl || "/assets/hero.jpg";

  return (
    <div className="relative w-full bg-slate-950 text-white overflow-hidden select-none">
      {/* 1. Minimalist Top Ticker */}
      <div className="relative z-30 w-full bg-[#071322]/90 backdrop-blur-sm border-b border-white/10 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-4 sm:gap-6 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 text-brand-400 font-medium">
              <HiOutlineCheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              1st ISO Certified Quality Standards
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              • 2 Years Free Warranty
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-amber-300/90 font-medium">
              ★ 700+ Projects Handed Over
            </span>
          </div>

          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-1.5 text-[11px] font-medium text-slate-200 hover:text-brand-400 transition ml-auto"
          >
            <HiOutlinePhone className="h-3 w-3 text-brand-500 flex-shrink-0" />
            <span>Hotline: {phoneNumber}</span>
          </a>
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
            {/* Minimalist Pill Badge (No AI Spark Icon) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-200 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span>Welcome to Dimension Composition</span>
            </div>

            {/* Slightly Smaller, Clean H1 Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-[1.2] drop-shadow-md">
              Leading Interior Design <br className="hidden sm:inline" />
              Company in{" "}
              <span className="text-brand-500">
                Bangladesh
              </span>
            </h1>

            {/* Refined, Slightly Smaller Paragraph */}
            <p className="text-xs sm:text-sm md:text-[15px] text-slate-300 leading-relaxed font-normal max-w-xl">
              Award-winning interior architecture and turnkey design studio in Bangladesh. 15+ years experience, 700+ successful projects. Get expert design consultation for your dream home &amp; corporate office.
            </p>

            {/* Single Minimalist Action Button: Explore Portfolio */}
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
