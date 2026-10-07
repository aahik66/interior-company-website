import {
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineClipboardCheck,
  HiOutlineThumbUp,
  HiOutlineScale,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useSettings } from "../context/SettingsContext";

const pillars = [
  {
    number: "01",
    title: "Thoughtful Space Planning",
    desc: "Every inch of your home is meticulously calculated so walking flow feels natural, storage is maximized, and there are no awkward dead corners or wasted areas.",
    icon: HiOutlineCube,
  },
  {
    number: "02",
    title: "Quality-Focused In-House Execution",
    desc: "We do not rely on uncoordinated third-party subcontractors. Our own master carpenters, electricians, and engineers construct joinery with millimeter tolerances.",
    icon: HiOutlineClipboardCheck,
  },
  {
    number: "03",
    title: "Design Around You",
    desc: "Your personal taste, daily family rituals, and functional lifestyle guide every drawing—creating a personalized sanctuary, never generic templates.",
    icon: HiOutlineThumbUp,
  },
  {
    number: "04",
    title: "Complete Turnkey Solutions",
    desc: "Single-point accountability from initial site visit, 2D working drawings, and 3D renders to material procurement, fabrication, and final key handover.",
    icon: HiOutlineUserGroup,
  },
  {
    number: "05",
    title: "5-Year Workmanship Warranty",
    desc: "Long-term peace of mind backed by our formal written guarantee covering all modular cabinetry, hydraulic fittings, and dedicated maintenance care.",
    icon: HiOutlineShieldCheck,
  },
  {
    number: "06",
    title: "Fixed BOQ & Price Transparency",
    desc: "Comprehensive itemized Bill of Quantities provided upfront with clear line-item rates, ensuring zero hidden costs or mid-project budget escalations.",
    icon: HiOutlineScale,
  },
];

export default function WhyChooseUs() {
  const { settings } = useSettings();
  const whatsappNum = settings?.whatsappNumber || "8801739835017";
  const companyName = settings?.companyName || "Dimension Composition";

  return (
    <section id="why-choose-us" className="relative w-full bg-[#f8fafc] py-16 sm:py-24 text-slate-900 border-y border-slate-200/80">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching bestinteriordesign.com.bd */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f15a24]">
            <span className="h-[2px] w-6 bg-[#f15a24]" />
            <span>Why Choose Us</span>
            <span className="h-[2px] w-6 bg-[#f15a24]" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Built on Trust, Craftsmanship <br className="hidden sm:inline" />
            <span className="text-slate-600 font-semibold">&amp; Dedicated Accountability</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Choosing an interior design company is not just about making a space look beautiful. 
            It is about finding a disciplined team that understands your needs, plans the space properly, 
            and takes full responsibility for the final result.
          </p>
        </div>

        {/* 6 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                data-aos="fade-up"
                data-aos-delay={idx * 60}
                className="group relative rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-orange-50 text-[#f15a24] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#f15a24] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{companyName}</span>
                  <span className="text-[#f15a24] font-bold">Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Banner Callout */}
        <div className="mt-14 sm:mt-16 rounded-2xl bg-slate-900 text-white p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Ready to Discuss Your Dream Home with Licensed Architects?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Book a complimentary floor plan analysis and get an itemized budget projection.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${whatsappNum}?text=Hello%20${encodeURIComponent(companyName)}!%20I%20would%20like%20to%20discuss%20my%20interior%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow transition"
            >
              <FaWhatsapp className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <Link
              to="/cost-calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold transition"
            >
              Calculate Cost Online
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
