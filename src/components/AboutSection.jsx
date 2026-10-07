import { Link } from "react-router-dom";
import {
  HiOutlineOfficeBuilding,
  HiOutlineShieldCheck,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineAcademicCap,
  HiOutlineCube,
  HiOutlineClipboardCheck,
  HiOutlineScale,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

// Leadership & Architectural Principals Dataset
const leaders = [
  {
    name: "Engr. Kawsar Ahmed",
    role: "Chief Executive Officer (CEO)",
    degree: "BSc in Engineering",
    experience: "20+ Years Field Practice",
    image: "/assets/team/kawsar-ahmed.jpg",
    bio: "Directs structural ergonomics, spatial engineering, acoustic integrity, and turnkey project administration for luxury residences across Dhaka.",
  },
  {
    name: "Ar. Anisur Rahman",
    role: "Founder & Principal Architect",
    degree: "BSc in Architecture",
    experience: "15+ Years Field Practice",
    image: "/assets/team/anisur-rahman.jpg",
    bio: "Leads residential design direction, minimalist spatial choreography, and material innovation for high-profile duplexes and modern apartments.",
  },
  {
    name: "Engr. Shohid Bin Ali Sumon",
    role: "Project Coordinator & Site Engineer",
    degree: "BSc in Civil Engineering",
    experience: "5+ Years Field Practice",
    image: "/assets/team/shohid-sumon.jpg",
    bio: "Supervises on-site structural coordination, carpentry craftsmanship, millimeter tolerances, and rigorous quality inspection protocols.",
  },
];

// Architectural Construction & Quality Benchmarks
const qualityStandards = [
  {
    icon: HiOutlineShieldCheck,
    title: "5-Year Workmanship Warranty",
    desc: "Formal written warranty covering all custom modular cabinetry, wall joinery, and structural fittings.",
    label: "Guaranteed Warranty",
  },
  {
    icon: HiOutlineCube,
    title: "Grade-A Core Materials",
    desc: "Marine-grade Gorjan plywood, high-pressure laminates (HPL), and imported German hardware (Blum & Häfele).",
    label: "Authentic Sourcing",
  },
  {
    icon: HiOutlineClipboardCheck,
    title: "4-Stage On-Site Inspection",
    desc: "Structured quality audits: Raw Material Check, Frame Leveling, Surface Finish Review, and Final Pre-Handover Sign-off.",
    label: "Quality Audit",
  },
  {
    icon: HiOutlineScale,
    title: "Fixed Itemized BOQ",
    desc: "Transparent Bill of Quantities provided upfront with clear line-item pricing and zero hidden cost escalations.",
    label: "Price Integrity",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#fcfcfd] py-20 sm:py-28 text-slate-900 border-b border-slate-200/90 select-none"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            MASTER SECTION HEADER (Custom Architectural Identity)
            ======================================================== */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-3">
            <span>Dimension Composition</span>
            <span className="w-8 h-[1px] bg-slate-300" />
            <span>Studio Profile</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
            Architectural Precision. <br className="hidden sm:inline" />
            <span className="text-slate-600 font-semibold">Crafted for Discerning Living.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A comprehensive turnkey interior architecture and construction studio based in Dhaka. 
            We bridge the gap between creative architectural drawings and master carpentry execution 
            under the personal oversight of licensed engineers and architects.
          </p>
        </div>

        {/* ========================================================
            DHAP 01 / STEP 1: STUDIO OVERVIEW & PHILOSOPHY
            ======================================================== */}
        <div className="mb-20 sm:mb-28 pb-16 sm:pb-24 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f15a24] bg-orange-50 px-2.5 py-1 rounded border border-orange-200/60">
              ধাপ ০১ • Studio Philosophy
            </span>
            <span className="h-[1px] flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                  Single-Point Turnkey Responsibility from Concept to Handover
                </h3>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  In Bangladesh, residential fit-outs frequently suffer from fragmented management—designers produce drawings, while uncoordinated contractors and carpenters compromise on structural details and material grades.
                </p>
                <p>
                  At <strong>Dimension Composition</strong>, we eliminate this friction entirely. Our in-house team handles 
                  architectural spatial planning, detailed working drawings, 3D visualization, material import, modular joinery 
                  fabrication, and dedicated on-site civil execution under one unified contract.
                </p>
              </div>

              {/* 2 Core Practice Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 shrink-0">
                      <HiOutlineOfficeBuilding className="h-4 w-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">In-House Joinery Workshop</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    Custom modular cabinetry and architectural wood panelling manufactured under millimeter precision.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 shrink-0">
                      <HiOutlineShieldCheck className="h-4 w-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Strict Milestone Delivery</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    Legally committed project timeline with weekly stage reports and zero handover delay.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual & Verified Studio Metrics */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src="/assets/projects/livingroom4.jpg"
                    alt="Dimension Composition Finished Residential Architecture in Dhaka"
                    width="600"
                    height="450"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/90 text-white text-[11px] font-medium px-3 py-1 rounded backdrop-blur-sm">
                    Luxury Turnkey Residence • Dhaka
                  </div>
                </div>

                <div className="p-5 grid grid-cols-3 divide-x divide-slate-100 text-center">
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-950">10+</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Years Practice</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-950">250+</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Handed Over</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-950">100%</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Turnkey Fit-Out</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            DHAP 02 / STEP 2: ARCHITECTURAL LEADERSHIP & ENGINEERS
            ======================================================== */}
        <div className="mb-20 sm:mb-28 pb-16 sm:pb-24 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f15a24] bg-orange-50 px-2.5 py-1 rounded border border-orange-200/60">
              ধাপ ০২ • Architectural Leadership
            </span>
            <span className="h-[1px] flex-1 bg-slate-200" />
          </div>

          <div className="max-w-3xl mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">
              Directed by Graduate Architects & Structural Engineers
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Every project is personally spearheaded by qualified engineering and architectural leaders with university degrees and over two decades of combined on-site execution experience.
            </p>
          </div>

          {/* 3 Real Leadership Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={leader.image}
                    alt={`${leader.name} - ${leader.role}`}
                    width="600"
                    height="450"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-950/85 text-white text-[11px] font-medium px-2.5 py-1 rounded">
                    {leader.experience}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-slate-950 leading-snug">
                      {leader.name}
                    </h4>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">
                      {leader.role}
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 font-medium">
                      <HiOutlineAcademicCap className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{leader.degree}</span>
                    </p>
                    <p className="text-xs sm:text-[13px] text-slate-600 mt-3 leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Dimension Composition</span>
                    <a
                      href={`https://wa.me/8801739835017?text=Hello%20${encodeURIComponent(leader.name)},%20I%20would%20like%20to%20consult%20regarding%20my%20interior%20project.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#f15a24] transition"
                    >
                      <FaWhatsapp className="h-3.5 w-3.5 text-[#25D366]" />
                      Direct WhatsApp Consult →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            DHAP 03 / STEP 3: QUALITY BENCHMARKS & MATERIAL RIGOR
            ======================================================== */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f15a24] bg-orange-50 px-2.5 py-1 rounded border border-orange-200/60">
              ধাপ ০৩ • Quality & Material Rigor
            </span>
            <span className="h-[1px] flex-1 bg-slate-200" />
          </div>

          <div className="max-w-3xl mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">
              Authentic Raw Materials & Zero Compromise Standards
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              We eliminate hidden contractor shortcuts by enforcing certified materials, formal written warranties, and transparent milestone inspections.
            </p>
          </div>

          {/* 4 Architectural Benchmark Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {qualityStandards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200/90 bg-white p-5 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.label}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-950 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                    <HiOutlineCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Enforced on All Contracts</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Studio Material Inspection Invite Banner */}
          <div className="rounded-2xl bg-slate-950 text-white p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-400 uppercase">
                <HiOutlineLocationMarker className="h-4 w-4" />
                <span>Bashundhara Riverview Studio & Workshop</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                Inspect Raw Materials in Person Before Signing
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                We invite homeowners to physically inspect cross-sections of our Gorjan marine plywood, German Blum hydraulic fittings, and high-pressure laminate boards at our Dhaka studio before making any commitments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20would%20like%20to%20schedule%20a%20material%20sample%20inspection%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 px-6 py-3 text-xs sm:text-sm font-bold transition shadow-sm"
              >
                <FaWhatsapp className="h-4 w-4 text-[#25D366]" />
                Schedule Studio Visit
              </a>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 px-5 py-3 text-xs sm:text-sm font-semibold text-white transition"
              >
                Full Corporate Page <HiOutlineArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
