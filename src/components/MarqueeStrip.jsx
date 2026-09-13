export default function MarqueeStrip() {
  const items = [
    "DIMENSION COMPOSITION",
    "BESPOKE RESIDENCES",
    "ARCHITECTURAL RIGOR",
    "MINIMAL LUXURY",
    "SPATIAL HARMONY",
    "TURNKEY FIT-OUT",
    "CUSTOM JOINERY",
    "LIGHTING ARCHITECTURE",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#07101b] py-5 border-y border-white/10 select-none">
      {/* Side Fade Gradients for smooth infinite look */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-[#07101b] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-[#07101b] to-transparent" />

      <div className="flex w-max items-center animate-marquee1 hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-8 mx-3 sm:mx-4">
            <span
              className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] transition duration-300 ${
                idx % 2 === 0
                  ? "text-white/90 hover:text-brand-400"
                  : "text-gray-400/80 hover:text-brand-300"
              }`}
            >
              {text}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
