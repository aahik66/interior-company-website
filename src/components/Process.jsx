import {
  HiOutlineChatAlt2,
  HiOutlinePencilAlt,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

const steps = [
  {
    number: "01",
    title: "Consultation & Space Analysis",
    description: "Detailed on-site walkthrough to analyze your space, understand family rituals or business workflow, and map out budget goals.",
    icon: HiOutlineChatAlt2,
  },
  {
    number: "02",
    title: "Concept & 3D Visualization",
    description: "Architectural 2D space planning, realistic photorealistic 3D walkthrough renderings, and curated material sample palettes.",
    icon: HiOutlinePencilAlt,
  },
  {
    number: "03",
    title: "Detailed Planning & Fixed BOQ",
    description: "Itemized Bill of Quantities with transparent line-item pricing, architectural working drawings, and agreed project timeline.",
    icon: HiOutlineClipboardList,
  },
  {
    number: "04",
    title: "Professional On-Site Execution",
    description: "In-house joinery fabrication at our workshop, site framing, electrical integration, and 4-stage quality inspections.",
    icon: HiOutlineCog,
  },
  {
    number: "05",
    title: "Handover & 5-Year Support",
    description: "Zero-defect final walkthrough, thorough deep cleaning, key handover, 5-year written warranty, and continuous after-sales care.",
    icon: HiOutlineBadgeCheck,
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full bg-[#f8fafc] py-16 sm:py-24 border-b border-slate-200/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 sm:gap-16 px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching bestinteriordesign.com.bd */}
        <div className="flex flex-col items-center text-center space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f15a24]">
            <span className="h-[2px] w-6 bg-[#f15a24]" />
            <span>Work Methodology</span>
            <span className="h-[2px] w-6 bg-[#f15a24]" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Best Interior Design Process <br className="hidden sm:inline" />
            <span className="text-slate-600 font-semibold">— From Concept to Key Handover</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            From initial concept to final completion, your project follows a clear, practical, and disciplined workflow tailored to your exact lifestyle and investment level.
          </p>
        </div>

        {/* 5 Sequential Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                data-aos="fade-up"
                data-aos-delay={idx * 60}
                className="group relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#f15a24] transition-colors">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#f15a24] border border-orange-100 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#f15a24] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Phase {step.number}</span>
                  <span className="text-slate-700">Milestone</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
