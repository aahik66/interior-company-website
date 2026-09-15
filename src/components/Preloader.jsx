import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState("loading"); // 'loading' | 'contentFade' | 'curtainSlide'

  useEffect(() => {
    // Lock scroll during preloader presentation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress counter animation from 0 to 100% with smooth organic easing
    const startTime = performance.now();
    const duration = 1400; // 1.4s smooth load

    let animFrame;
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);
      // Premium cubic ease-out curve for natural deceleration
      const eased = 1 - Math.pow(1 - t, 3);
      const pct = Math.min(100, Math.round(eased * 100));
      setProgress(pct);

      if (t < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);

        // Phase 1: Gracefully fade & lift the center logo + typography
        setTimeout(() => {
          setStage("contentFade");

          // Phase 2: Ultra-smooth architectural curtain slide-up
          setTimeout(() => {
            setStage("curtainSlide");
            document.body.style.overflow = originalOverflow || "";

            // Phase 3: Completely unmount from DOM after transition finishes
            setTimeout(() => {
              setIsVisible(false);
            }, 950);
          }, 250);
        }, 150);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = originalOverflow || "";
    };
  }, []);

  if (!isVisible) return null;

  const isContentHidden = stage === "contentFade" || stage === "curtainSlide";
  const isCurtainUp = stage === "curtainSlide";

  return (
    <div
      className={`fixed inset-0 z-[99999] pointer-events-none select-none transition-opacity duration-300 ${
        isCurtainUp ? "pointer-events-none" : "pointer-events-auto"
      }`}
      aria-hidden="true"
    >
      {/* Architectural Cinematic Curtain (Slides Up with Luxury Easing) */}
      <div
        className={`absolute inset-0 bg-[#060c17] flex flex-col items-center justify-center will-change-transform ${
          isCurtainUp
            ? "-translate-y-full transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]"
            : "translate-y-0"
        }`}
      >
        {/* Leading Golden Architectural Beam at bottom edge of sliding curtain */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent shadow-[0_0_25px_rgba(241,90,36,0.9)] transition-opacity duration-500 ${
            isCurtainUp ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Ambient Architectural Atmospheric Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-600/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Center Presentation Stage */}
        <div
          className={`relative z-10 text-center px-4 max-w-sm sm:max-w-md transition-all duration-700 ease-out will-change-transform ${
            isContentHidden
              ? "opacity-0 -translate-y-8 scale-95 blur-[2px]"
              : "opacity-100 translate-y-0 scale-100 blur-0"
          }`}
        >
          {/* Crest Logo with Slow-Motion Light Sweep */}
          <div className="mb-5 flex justify-center">
            <div className="relative">
              <Logo
                className="h-20 w-20 sm:h-24 sm:w-24 shadow-2xl shadow-brand-500/20"
                rounded="rounded-2xl"
                imgClassName="p-2"
              />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-500/30 to-amber-400/20 blur-md -z-10 animate-pulse" />
            </div>
          </div>

          {/* Brand Title */}
          <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-[0.24em] text-white">
            Dimension
            <span className="block text-xs sm:text-sm font-semibold tracking-[0.3em] text-slate-300 mt-1">
              Composition
            </span>
          </h1>

          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-400 mt-2">
            Luxury Interior Architecture & Turnkey Studio
          </p>

          {/* Precision Architectural Progress Bar */}
          <div className="mt-8 w-52 sm:w-64 h-[3px] bg-white/10 rounded-full overflow-hidden mx-auto relative p-[0.5px]">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-brand-500 to-amber-300 rounded-full shadow-[0_0_15px_rgba(241,90,36,0.9)] transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Precision Phase Status & Percentage Counter */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-400 mt-3 px-1">
            <span className="text-slate-300 font-sans tracking-normal transition-all duration-300">
              {progress < 35
                ? "Drafting blueprints..."
                : progress < 75
                ? "Rendering spaces..."
                : progress < 100
                ? "Polishing finishes..."
                : "Welcome to studio"}
            </span>
            <span className="text-brand-400 font-bold tabular-nums tracking-normal">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

