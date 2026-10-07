import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineAcademicCap,
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineScale,
  HiOutlineClock,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

// Leadership & Architectural Team
const teamMembers = [
  {
    name: "Engr. Kawsar Ahmed",
    role: "CEO",
    education: "BSc in Engineering",
    experience: "20+ Years in Practice",
    image: "/assets/team/kawsar-ahmed.jpg",
    bio: "Overseeing structural ergonomics, spatial planning, and turnkey project administration for luxury residences in Dhaka.",
  },
  {
    name: "Ar. Anisur Rahman",
    role: "Founder & Principal Architect",
    education: "BSc in Architecture",
    experience: "15+ Years in Practice",
    image: "/assets/team/anisur-rahman.jpg",
    bio: "Leading residential design direction, minimalist spatial flow, and material innovation across high-end Dhaka residences.",
  },
  {
    name: "Engr. Shohid Bin Ali Sumon",
    role: "Project Coordinator",
    education: "BSc in Civil Engineering",
    experience: "5+ Years in Practice",
    image: "/assets/team/shohid-sumon.jpg",
    bio: "Supervising on-site structural coordination, carpentry craftsmanship, and rigorous quality inspection protocols.",
  },
];

// Quality & Construction Standards
const qualityStandards = [
  {
    icon: HiOutlineShieldCheck,
    title: "5-Year Workmanship Warranty",
    desc: "Formal 5-year guarantee covering all custom modular cabinetry, wall joinery, and structural fittings.",
    tag: "Written Warranty",
  },
  {
    icon: HiOutlineCube,
    title: "Grade-A Core Materials",
    desc: "Strictly marine-grade Gorjan plywood, high-pressure laminates (HPL), and imported German hardware (Blum & Häfele).",
    tag: "Authentic Sourcing",
  },
  {
    icon: HiOutlineClipboardList,
    title: "4-Stage On-Site Inspection",
    desc: "Rigorous quality audits: Raw Material Check, Frame Leveling, Surface Finish Review, and Pre-Handover Sign-off.",
    tag: "Quality Audit",
  },
  {
    icon: HiOutlineScale,
    title: "Fixed Itemized BOQ",
    desc: "Detailed Bill of Quantities provided upfront with transparent line-item pricing and zero hidden cost escalations.",
    tag: "Price Integrity",
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, number: "01", label: "Studio Philosophy", icon: HiOutlineOfficeBuilding },
    { id: 1, number: "02", label: "Architectural Leadership", icon: HiOutlineUserGroup },
    { id: 2, number: "03", label: "Construction & Standards", icon: HiOutlineShieldCheck },
  ];

  return (
    <section id="about" className="relative w-full bg-[#f8fafc] py-20 sm:py-28 text-slate-800 border-b border-slate-200">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. REFINED ARCHITECTURAL HEADER
            ======================================================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">
            <span>Dimension Composition</span>
            <span className="w-8 h-[1px] bg-slate-300" />
            <span>Architectural Studio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Built on Craftsmanship. <br className="hidden sm:inline" />
            <span className="text-slate-600 font-semibold">Engineered for Modern Living.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A premier turnkey interior architecture studio based in Dhaka. We combine licensed architectural planning, authentic materials, and dedicated site supervision to deliver enduring residences and corporate environments.
          </p>
        </div>

        {/* ========================================================
            2. EDITORIAL STEP SWITCHER (Clean Architectural Tabs)
            ======================================================== */}
        <div className="border-b border-slate-200 mb-10 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative pb-4 sm:pb-5 text-left transition-colors whitespace-nowrap flex items-center gap-2.5 sm:gap-3 ${
                    isActive ? "text-slate-950" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className={`text-xs font-mono font-bold ${
                    isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                  }`}>
                    {tab.number}
                  </span>
                  <Icon className={`h-4 w-4 ${isActive ? "text-slate-900" : "text-slate-400"}`} />
                  <span className="text-sm sm:text-base font-bold tracking-tight">
                    {tab.label}
                  </span>
                  
                  {/* Active Underline Indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            3. TAB CONTENT
            ======================================================== */}
        <div className="transition-all duration-300">

          {/* TAB 0: STUDIO PHILOSOPHY */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Practice & Approach
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 leading-snug">
                    Turnkey Architectural Execution from Concept to Commissioning
                  </h3>
                </div>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    In Bangladesh, residential fit-outs are often compromised by fragmented contracting—designers hand over drawings, while third-party carpenters and electricians work without structural oversight. This creates costly rework, material compromises, and missed deadlines.
                  </p>
                  <p>
                    <strong>Dimension Composition</strong> operates on a fully unified turnkey model. Our in-house team of architects, structural coordinators, and master craftsmen take single-point responsibility for your home: from working blueprints and 3D renderings to material import, joinery fabrication, and final handover.
                  </p>
                </div>

                {/* Core Execution Benchmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-bold shrink-0">
                        <HiOutlineCheck className="h-3.5 w-3.5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">In-House Production</h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Custom woodwork and modular joinery crafted under strict dimensional tolerances.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-bold shrink-0">
                        <HiOutlineClock className="h-3.5 w-3.5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Guaranteed Milestones</h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Structured project schedule with scheduled site checkpoints and on-time delivery.
                    </p>
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActiveTab(1)}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 text-xs sm:text-sm transition"
                  >
                    Next: Meet Our Architects
                    <HiOutlineArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    to="/about"
                    className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition underline underline-offset-4"
                  >
                    Read Detailed Studio Profile
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual & Verification */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src="/assets/projects/livingroom4.jpg"
                      alt="Dimension Composition Finished Residential Architecture"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-[11px] font-medium px-3 py-1 rounded-md backdrop-blur-sm">
                      Turnkey Residence • Dhaka
                    </div>
                  </div>

                  <div className="p-5 grid grid-cols-3 divide-x divide-slate-100 text-center">
                    <div>
                      <p className="text-xl sm:text-2xl font-extrabold text-slate-900">10+</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">Years Practice</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-extrabold text-slate-900">250+</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">Completed</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-extrabold text-slate-900">100%</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">Turnkey</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: ARCHITECTURAL LEADERSHIP */}
          {activeTab === 1 && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Studio Principals
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    Licensed Architects & Engineering Leadership
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                    Every project is personally directed by graduate spatial architects and structural engineers with formal degrees and decades of field practice.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab(0)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                  >
                    ← Overview
                  </button>
                  <button
                    onClick={() => setActiveTab(2)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 transition"
                  >
                    Next: Standards →
                  </button>
                </div>
              </div>

              {/* 3 Real Leadership Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        width="600"
                        height="450"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-2.5 left-2.5 bg-slate-900/85 text-white text-[11px] font-medium px-2.5 py-1 rounded">
                        {member.experience}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {member.name}
                        </h4>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">
                          {member.role}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                          <HiOutlineAcademicCap className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{member.education}</span>
                        </p>
                        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Dimension Composition</span>
                        <a
                          href={`https://wa.me/8801739835017?text=Hello%20${encodeURIComponent(member.name)},%20I%20would%20like%20to%20consult%20regarding%20my%20interior%20project.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-900 font-bold hover:text-slate-600 transition"
                        >
                          Consult Architect →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CONSTRUCTION & STANDARDS */}
          {activeTab === 2 && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Quality Benchmarks
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    Authentic Materials & Engineering Rigor
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                    We eliminate common local construction shortcuts by using verifiable raw materials, transparent pricing, and structured quality milestones.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab(1)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                  >
                    ← Principals
                  </button>
                  <Link
                    to="/about#quality-policy"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 transition"
                  >
                    Full Quality Policy →
                  </Link>
                </div>
              </div>

              {/* 4 Architectural Standard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {qualityStandards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {item.tag}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                        <HiOutlineCheck className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                        <span>Enforced on All Contracts</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Studio Material Inspection Invite */}
              <div className="rounded-xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    Inspect Raw Materials at Our Studio
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    We welcome prospective homeowners to inspect physical cross-sections of our Gorjan plywood, Blum hydraulic hinges, and HPL catalogs prior to signing.
                  </p>
                </div>
                <a
                  href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20would%20like%20to%20schedule%20a%20material%20sample%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white hover:bg-slate-100 text-slate-900 px-5 py-2.5 text-xs sm:text-sm font-bold transition shrink-0 shadow-sm"
                >
                  <FaWhatsapp className="h-4 w-4 text-[#25D366]" />
                  Schedule Studio Visit
                </a>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================
            4. CLEAN FOOTER NAVIGATION
            ======================================================== */}
        <div className="mt-12 pt-6 border-t border-slate-200 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-slate-500 font-medium">
          <span>Looking for detailed corporate background or careers?</span>
          <Link
            to="/about"
            className="font-bold text-slate-900 hover:underline flex items-center gap-1"
          >
            Visit Our Full About Page <HiOutlineArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
