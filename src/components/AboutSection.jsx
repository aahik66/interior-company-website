import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineCube,
  HiOutlineClipboardCheck,
  HiOutlineBadgeCheck,
  HiOutlineEye,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

// Real Team Members
const teamMembers = [
  {
    name: "Engr. Kawsar Ahmed",
    role: "CEO",
    education: "BSc in Engineering",
    experience: "20+ Years Experience",
    image: "/assets/team/kawsar-ahmed.jpg",
    bio: "Specializing in ergonomic residential floor layouts, acoustic environments, and bespoke custom furniture curation.",
  },
  {
    name: "Ar. Anisur Rahman",
    role: "Founder & Principal Architect",
    education: "BSc in Architecture",
    experience: "15+ Years Experience",
    image: "/assets/team/anisur-rahman.jpg",
    bio: "Pioneering architectural minimalism and sustainable luxury residences across Dhaka's upscale neighborhoods.",
  },
  {
    name: "Engr. Shohid Bin Ali Sumon",
    role: "Project Coordinator",
    education: "BSc in Civil",
    experience: "5+ Years Experience",
    image: "/assets/team/shohid-sumon.jpg",
    bio: "Supervising turnkey site execution, structural coordination, and timely handover on site.",
  },
];

// Quality Standards
const qualityStandards = [
  {
    icon: HiOutlineShieldCheck,
    title: "5-Year Workmanship Warranty",
    desc: "Comprehensive 5-year guarantee covering all bespoke modular carpentry, joinery, and structural fittings.",
    badge: "Guaranteed",
  },
  {
    icon: HiOutlineCube,
    title: "Grade-A Raw Materials",
    desc: "We strictly use Marine-Grade Gorjan Plywood, High-Pressure Laminates (HPL), and imported German fittings (Blum & Hafele).",
    badge: "Premium Grade",
  },
  {
    icon: HiOutlineClipboardCheck,
    title: "4-Stage Quality Audit",
    desc: "Every project passes Raw Material Verification, Frame Leveling Audit, Surface Finish Review, and Final Handover Inspection.",
    badge: "Zero Defect",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "Zero Hidden Costs Guarantee",
    desc: "Our detailed Bill of Quantities (BOQ) is fully transparent. No unexpected cost escalations during execution.",
    badge: "Transparent",
  },
];

export default function AboutSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 0, label: "Studio Overview", number: "01", icon: HiOutlineEye },
    { id: 1, label: "Principal Architects", number: "02", icon: HiOutlineUserGroup },
    { id: 2, label: "Quality & Engineering", number: "03", icon: HiOutlineShieldCheck },
  ];

  return (
    <section id="about" className="relative w-full overflow-hidden bg-slate-50 py-16 sm:py-24 text-slate-800 border-b border-slate-200">
      {/* Architectural Grid Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. SECTION HEADER
            ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 mb-3.5">
            <HiOutlineSparkles className="h-4 w-4 text-brand-600" />
            About Dimension Composition
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Designing Spaces with <span className="text-brand-600">Precision, Artistry</span> & Integrity
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            From spatial planning to turnkey execution in Dhaka, discover our studio philosophy, experienced architectural leadership, and strict quality benchmarks.
          </p>
        </div>

        {/* ========================================================
            2. STEP NAVIGATION SWITCHER (Step-by-Step Tabs)
            ======================================================== */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="inline-flex flex-wrap sm:flex-nowrap p-1.5 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/50 gap-1.5 max-w-full">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span className={`text-[10px] sm:text-xs font-extrabold tracking-wider px-1.5 py-0.5 rounded ${
                    isActive ? "bg-brand-500 text-slate-950 font-black" : "bg-slate-100 text-slate-500"
                  }`}>
                    {step.number}
                  </span>
                  <Icon className={`h-4 w-4 ${isActive ? "text-brand-400" : "text-slate-400"}`} />
                  <span className="whitespace-nowrap">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            3. TAB CONTENT PANELS
            ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-6 sm:p-10 lg:p-12 transition-all duration-500">
          
          {/* STEP 0: STUDIO OVERVIEW */}
          {activeStep === 0 && (
            <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  Studio Vision & Turnkey Approach
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                  Bridging the Gap Between Creative 3D Vision & Flawless On-Site Reality
                </h3>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  At <strong>Dimension Composition</strong>, we believe every residence or corporate space holds the potential to inspire, comfort, and elevate human living. Founded by licensed spatial architects, our firm delivers comprehensive <strong>turnkey interior architecture and construction</strong> throughout Dhaka and nationwide across Bangladesh.
                </p>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We eliminate the stress of dealing with unverified third-party contractors. From initial floor plan layout, electrical conduit drawings, and 3D renderings to custom master carpentry and final paint coating, everything is executed under our unified supervision.
                </p>

                {/* Core Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-brand-500/15 flex items-center justify-center text-brand-600 shrink-0 font-bold">
                        <HiOutlineCheckCircle className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">End-to-End Turnkey</h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Design, 3D visualization, material procurement, carpentry, and electrical works all handled under one contract.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-brand-500/15 flex items-center justify-center text-brand-600 shrink-0 font-bold">
                        <HiOutlineClock className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Disciplined Handover</h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Rigid project milestone tracking ensuring your flat or duplex is handed over without unnecessary delays.
                    </p>
                  </div>
                </div>

                {/* Next Step Nav */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-slate-950 font-extrabold px-6 py-3 text-xs sm:text-sm shadow-md transition hover:scale-105"
                  >
                    Next: Meet Our Architects
                    <HiOutlineArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    to="/about"
                    className="text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition flex items-center gap-1"
                  >
                    View Complete About Page →
                  </Link>
                </div>
              </div>

              {/* Right Visual & Key Statistics */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group aspect-[4/3]">
                  <img
                    src="/assets/projects/livingroom4.jpg"
                    alt="Dimension Composition Studio Workmanship"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                    <div>
                      <p className="text-xs uppercase font-extrabold tracking-widest text-brand-400">
                        Signature Projects
                      </p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        Luxury Living in Gulshan, Banani, Uttara & Dhanmondi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-slate-900 text-white p-3.5 text-center shadow-sm">
                    <p className="text-xl sm:text-2xl font-black text-brand-400">10+</p>
                    <p className="text-[10px] sm:text-xs text-slate-300 font-medium mt-0.5">Years Experience</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900 text-white p-3.5 text-center shadow-sm">
                    <p className="text-xl sm:text-2xl font-black text-brand-400">250+</p>
                    <p className="text-[10px] sm:text-xs text-slate-300 font-medium mt-0.5">Projects Handed</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900 text-white p-3.5 text-center shadow-sm">
                    <p className="text-xl sm:text-2xl font-black text-brand-400">99%</p>
                    <p className="text-[10px] sm:text-xs text-slate-300 font-medium mt-0.5">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: PRINCIPAL ARCHITECTS & LEADERSHIP */}
          {activeStep === 1 && (
            <div data-aos="fade-up" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    Our Key Leadership
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    The Multidisciplinary Minds Behind Every Blueprinted Space
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                    Every project is supervised by certified graduate architects and civil engineers with decades of hands-on structural expertise.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveStep(0)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 transition"
                  >
                    ← Studio Overview
                  </button>
                  <button
                    onClick={() => setActiveStep(2)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold px-4 py-2 transition"
                  >
                    Next: Quality Policy →
                  </button>
                </div>
              </div>

              {/* 3 Real Leadership Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teamMembers.map((member, idx) => (
                  <div
                    key={member.name}
                    className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 hover:border-brand-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Portrait Photo */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        width="600"
                        height="450"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                        <span className="text-xs font-semibold text-brand-400 bg-slate-950/80 px-2.5 py-1 rounded-md backdrop-blur-sm">
                          {member.experience}
                        </span>
                      </div>
                    </div>

                    {/* Bio & Credentials */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-600 transition">
                          {member.name}
                        </h4>
                        <p className="text-xs font-extrabold text-brand-700 mt-0.5">
                          {member.role}
                        </p>
                        <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 font-medium">
                          <HiOutlineAcademicCap className="h-4 w-4 text-brand-600 shrink-0" />
                          <span>{member.education}</span>
                        </p>
                        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Verified Architect</span>
                        <a
                          href={`https://wa.me/8801739835017?text=Hello%20${encodeURIComponent(member.name)},%20I%20would%20like%20to%20consult%20regarding%20my%20interior%20project.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-brand-600 font-bold hover:text-brand-700"
                        >
                          Consult via WhatsApp →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: QUALITY & ENGINEERING STANDARDS */}
          {activeStep === 2 && (
            <div data-aos="fade-up" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    Engineering & Material Protocols
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Our 4 Non-Negotiable Quality Commitments
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                    We eliminate the typical compromises of the local interior market by locking in authentic materials, written warranties, and transparent pricing.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 transition"
                  >
                    ← Principal Architects
                  </button>
                  <Link
                    to="/about#quality-policy"
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold px-4 py-2 transition"
                  >
                    View Policy Details →
                  </Link>
                </div>
              </div>

              {/* 4 Quality Benchmark Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {qualityStandards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 hover:border-brand-300 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="h-10 w-10 rounded-xl bg-brand-500/15 text-brand-600 flex items-center justify-center font-bold">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-brand-100 text-brand-800">
                            {item.badge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                        <HiOutlineCheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>Enforced on All Projects</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Material Trust Callout */}
              <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Want to inspect our raw material samples in person?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    Visit our studio or schedule a site inspection to examine our Gorjan plywood cross-sections, German Blum fittings, and HPL catalogs.
                  </p>
                </div>
                <a
                  href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20would%20like%20to%20schedule%20a%20material%20sample%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-slate-950 px-5 py-2.5 text-xs sm:text-sm font-extrabold shadow-md transition shrink-0"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Schedule Material Visit
                </a>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================
            4. FOOTER STORY LINK
            ======================================================== */}
        <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm font-medium text-slate-500">
          <span>Looking for careers or detailed architectural history?</span>
          <Link
            to="/about"
            className="font-bold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1"
          >
            Explore our complete About Us page <HiOutlineArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
