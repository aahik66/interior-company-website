import { useState, useRef, useCallback } from "react";
import { HiOutlineArrowSmRight, HiOutlineClock } from "react-icons/hi";

const transformations = [
  {
    id: "living-room",
    title: "Penthouse Living Lounge",
    subtitle: "Gulshan Residence • 720 sq.ft",
    beforeImage: "/assets/transformations/before_living_room.jpg",
    afterImage: "/assets/transformations/after_living_room.jpg",
    description:
      "Transforming a bare, unpolished concrete shell with dangling conduits into an ultra-luxury, sun-bathed living retreat featuring Italian marble flooring, bespoke fluted oak paneling, and warm ambient coves.",
    duration: "55 Days",
    keyHighlights: ["Italian Marble Floor", "Fluted Oak Walls", "Custom Lighting", "Sheer Drapery"],
  },
  {
    id: "bedroom",
    title: "Tranquil Master Sanctuary",
    subtitle: "Banani Suite • 460 sq.ft",
    beforeImage: "/assets/transformations/before_bedroom.jpg",
    afterImage: "/assets/transformations/after_bedroom.jpg",
    description:
      "From rough brickwork and raw unfinished ceiling to a serene, acoustically tuned master bedroom with textured micro-cement walls, rich walnut joinery, and soothing 2700K indirect illumination.",
    duration: "40 Days",
    keyHighlights: ["Textured Wall Finish", "Walnut Joinery", "Acoustic Insulation", "Plush Parquet Floor"],
  },
];

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const currentItem = transformations[activeTab];

  const handleMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      let pos = (x / width) * 100;
      if (pos < 0) pos = 0;
      if (pos > 100) pos = 100;
      setSliderPosition(pos);
    },
    []
  );

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <section id="transformations" className="relative w-full bg-[#08121f] text-white py-24 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-brand-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 h-96 w-96 rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3" data-aos="fade-up">
          <span className="inline-flex items-center rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-400 ring-1 ring-brand-500/20">
            Before & After Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Witness the <span className="text-brand-400">Transformation</span>
          </h2>
          <p className="max-w-2xl text-base text-gray-400">
            Drag the slider left and right to discover how Dimension Composition turns empty, raw spaces into refined architectural masterworks.
          </p>

          {/* Transformation Tab Switchers */}
          <div className="mt-4 flex items-center justify-center gap-3 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            {transformations.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(idx);
                  setSliderPosition(50);
                }}
                className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition ${
                  activeTab === idx
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Showcase Container */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          {/* Interactive Split Slider */}
          <div
            data-aos="fade-right"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative select-none overflow-hidden rounded-3xl shadow-2xl border border-white/15 aspect-[16/10] sm:aspect-[16/9] cursor-ew-resize group bg-gray-900"
          >
            {/* After Image (Background, Full) */}
            <img
              src={currentItem.afterImage}
              alt={`${currentItem.title} After`}
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              draggable="false"
            />
            {/* After Label */}
            <div className="absolute top-5 right-5 z-20 rounded-full bg-brand-500/85 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur shadow-lg pointer-events-none">
              After (সম্পূর্ণ রূপান্তর)
            </div>

            {/* Before Image (Foreground, Clipped via slider position) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentItem.beforeImage}
                alt={`${currentItem.title} Before`}
                className="absolute inset-0 h-full w-full object-cover max-w-none"
                style={{
                  width: containerRef.current
                    ? `${containerRef.current.getBoundingClientRect().width}px`
                    : "100%",
                }}
                draggable="false"
              />
              {/* Before Label */}
              <div className="absolute top-5 left-5 z-20 rounded-full bg-black/75 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-gray-200 backdrop-blur shadow-lg">
                Before (কাজের পূর্বে)
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-md pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag Handle Knob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-2xl ring-4 ring-brand-500/40 transition group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M8 9l-4 3 4 3m8-6l4 3-4 3"
                  />
                </svg>
              </div>
            </div>

            {/* Subtle Drag Hint at bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black/60 px-4 py-1 text-[11px] text-gray-300 backdrop-blur pointer-events-none sm:opacity-90 opacity-70">
              ◀ স্লাইডারটি ডানে-বামে ড্র্যাগ করুন ▶
            </div>
          </div>

          {/* Transformation Details & Story */}
          <div data-aos="fade-left" className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                {currentItem.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {currentItem.title}
              </h3>
            </div>

            <p className="text-base text-gray-300/90 leading-relaxed">
              {currentItem.description}
            </p>

            {/* Key Specs Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="flex items-center gap-2 text-sm text-gray-300">
                  <HiOutlineClock className="h-5 w-5 text-brand-400" />
                  কাজের সময়সীমা (Timeline)
                </span>
                <span className="text-sm font-bold text-white">
                  {currentItem.duration}
                </span>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  মূল পরিবর্তন ও উপাদানসমূহ (Highlights)
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentItem.keyHighlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500/15 border border-brand-500/25 px-2.5 py-1 text-xs font-medium text-brand-200"
                    >
                      <span className="h-1 w-1 rounded-full bg-brand-400" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA to Contact/WhatsApp */}
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-500/25 transition hover:bg-brand-600 hover:scale-[1.02]"
              >
                Start Your Space Transformation
                <HiOutlineArrowSmRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
