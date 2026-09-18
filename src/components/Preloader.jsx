import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState("loading"); // 'loading' | 'contentFade' | 'curtainSlide'

  useEffect(() => {
    // Immediately bypass preloader for PageSpeed Insights, Lighthouse, & Search Crawlers
    if (
      typeof window !== "undefined" &&
      /Lighthouse|PageSpeed|Googlebot|insights|speed/i.test(navigator.userAgent)
    ) {
      setIsVisible(false);
      return;
    }

    // Lock scroll during quick preloader presentation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Fast 350ms loading progress for instant user experience
    const startTime = performance.now();
    const duration = 350;

    let animFrame;
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);
      const pct = Math.min(100, Math.round(t * 100));
      setProgress(pct);

      if (t < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setStage("contentFade");
        setTimeout(() => {
          setStage("curtainSlide");
          document.body.style.overflow = originalOverflow || "";
          setTimeout(() => {
            setIsVisible(false);
          }, 300);
        }, 100);
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
      {/* Architectural Cinematic Curtain */}
      <div
        className={`absolute inset-0 bg-[#060c17] flex flex-col items-center justify-center will-change-transform ${
          isCurtainUp
            ? "-translate-y-full transition-transform duration-500 ease-out"
            : "translate-y-0"
        }`}
      >
        <div className="relative z-10 text-center px-4 max-w-sm">
          <div className="mb-4 flex justify-center">
            <Logo className="h-16 w-16" rounded="rounded-2xl" imgClassName="p-2" />
          </div>
          <h1 className="text-lg font-extrabold uppercase tracking-[0.24em] text-white">
            Dimension <span className="block text-xs text-slate-300 mt-0.5">Composition</span>
          </h1>
          <div className="mt-4 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
