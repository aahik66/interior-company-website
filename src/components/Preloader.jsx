import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader presentation
    document.body.style.overflow = "hidden";

    // Progress counter animation from 0 to 100% over ~1.3s
    const startTime = performance.now();
    const duration = 1300;

    let animFrame;
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        // Start smooth cinematic fade out
        setTimeout(() => {
          setIsFading(true);
          document.body.style.overflow = "";

          // Remove entirely from DOM after transition finishes
          setTimeout(() => {
            setIsVisible(false);
          }, 700);
        }, 200);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#060c17] flex flex-col items-center justify-center text-white select-none transition-all duration-700 ease-out ${
        isFading ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient Architectural Light Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-sm sm:max-w-md animate-fadeIn">
        {/* Crest Logo with Slow-Motion Light Sweep */}
        <div className="mb-5 flex justify-center">
          <Logo
            className="h-20 w-20 sm:h-24 sm:w-24"
            rounded="rounded-2xl"
            imgClassName="p-2"
          />
        </div>

        {/* Brand Title */}
        <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-[0.24em] text-white">
          Dimension
          <span className="block text-xs sm:text-sm font-semibold tracking-[0.3em] text-slate-300 mt-1">
            Composition
          </span>
        </h1>

        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400 mt-2">
          Luxury Interior Architecture & Turnkey Studio
        </p>

        {/* Precision Progress Bar */}
        <div className="mt-7 w-48 sm:w-60 h-[2.5px] bg-white/10 rounded-full overflow-hidden mx-auto relative">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-brand-500 to-amber-300 rounded-full shadow-[0_0_12px_rgba(241,90,36,0.8)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Counter */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-400 mt-2.5 px-1">
          <span className="text-slate-400 font-sans tracking-normal">
            {progress < 40
              ? "Drafting blueprints..."
              : progress < 80
              ? "Rendering spaces..."
              : "Welcome to studio"}
          </span>
          <span className="text-brand-400 font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
