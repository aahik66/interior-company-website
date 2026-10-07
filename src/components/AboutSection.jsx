import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineShieldCheck,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineAcademicCap,
  HiOutlineCube,
  HiOutlinePhone,
  HiOutlineClipboardCheck,
  HiOutlineScale,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { API_BASE } from "../config/api";
import { useSettings } from "../context/SettingsContext";

// Fallback Leadership & Architectural Principals Dataset
const defaultLeaders = [
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

export default function AboutSection() {
  const { settings } = useSettings();
  const whatsappNum = settings?.whatsappNumber || "8801739835017";
  const companyName = settings?.companyName || "Dimension Composition";

  const [teamMembers, setTeamMembers] = useState(() => {
    try {
      const cached = localStorage.getItem("dc_team_members_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_e) {}
    return defaultLeaders;
  });

  useEffect(() => {
    fetch(`${API_BASE}/team?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeamMembers(data);
          try {
            localStorage.setItem("dc_team_members_cache", JSON.stringify(data));
          } catch (_e) {}
        }
      })
      .catch((err) => console.warn("Using offline team records:", err.message));
  }, []);
  return (
    <section
      id="about"
      className="relative w-full bg-white py-16 sm:py-24 text-slate-900 border-b border-slate-200/80 select-none"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. TWO-COLUMN EDITORIAL SHOWCASE (Exact bestinteriordesign.com.bd flow)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Narrative, 4 Badges & Direct Leadership Box */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f15a24]">
                <span className="h-[2px] w-6 bg-[#f15a24]" />
                <span>About {companyName}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.2]">
                Trusted Interior Design Company <br className="hidden sm:inline" />
                <span className="text-slate-600 font-semibold">in Bangladesh</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              <strong>{companyName}</strong> is a leading interior design company in Dhaka, Bangladesh, 
              creating thoughtful spaces that respond to how people live, work, and experience their surroundings. 
              With <strong>10+ years of experience</strong> and <strong>250+ completed projects</strong>, we provide 
              comprehensive turnkey interior solutions across Bangladesh. From site visits and 3D concepts to final execution, 
              we focus on quality, functionality, client satisfaction, and dedicated after-sales service.
            </p>

            {/* 4 Architectural Assurance Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-slate-50/70 p-3.5">
                <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#f15a24] shrink-0 shadow-xs">
                  <HiOutlineBadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">ISO-Grade Quality Rigor</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Supervised by licensed engineers</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-slate-50/70 p-3.5">
                <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#f15a24] shrink-0 shadow-xs">
                  <HiOutlineCube className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">100% In-House Workshop</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Millimeter joinery precision</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-slate-50/70 p-3.5">
                <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#f15a24] shrink-0 shadow-xs">
                  <HiOutlineShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">5-Year Written Warranty</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Dedicated post-handover care</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-slate-50/70 p-3.5">
                <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#f15a24] shrink-0 shadow-xs">
                  <HiOutlineScale className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Fixed Itemized BOQ</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Zero hidden cost escalations</p>
                </div>
              </div>
            </div>

            {/* Natural Human Touch: Need Any Help / Leadership Card */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-slate-100">
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex-1">
                <img
                  src="/assets/team/kawsar-ahmed.jpg"
                  alt="Engr. Kawsar Ahmed - CEO & Founder"
                  className="h-12 w-12 rounded-full object-cover border border-white shadow-xs"
                />
                <div className="leading-tight">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Need Any Help?
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    Engr. Kawsar Ahmed <span className="text-xs text-slate-500 font-medium">| CEO &amp; Founder</span>
                  </h4>
                  <a
                    href="tel:+8801739835017"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f15a24] hover:underline mt-1"
                  >
                    <HiOutlinePhone className="h-3.5 w-3.5" />
                    <span>+880 1739-835017</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20would%20like%20to%20consult%20regarding%20an%20interior%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 text-xs sm:text-sm font-bold shadow-xs transition"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 transition"
                >
                  More About Us <HiOutlineArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Architectural Showcase with Floating Experience Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-xl group">
              <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-slate-100">
                <img
                  src="/assets/projects/livingroom4.jpg"
                  alt="Dimension Composition Finished Residential Architecture in Dhaka"
                  width="700"
                  height="900"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Floating Architectural Badge (Exact to reference design) */}
              <div className="absolute top-5 right-5 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-lg border border-slate-200/80 text-center select-none">
                <p className="text-2xl sm:text-3xl font-black text-slate-950 leading-none">10+</p>
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-1">
                  Years of Experience
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <p className="text-xs font-black text-[#f15a24]">250+ Projects</p>
                  <p className="text-[9px] text-slate-500 font-medium">100% Handed Over</p>
                </div>
              </div>

              {/* Bottom Project Tag */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/85 backdrop-blur-md p-3.5 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold">Turnkey Luxury Residence</p>
                  <p className="text-[11px] text-slate-300">Gulshan-2, Dhaka</p>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
                  In-House Fitout
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================
            2. ARCHITECTURAL LEADERSHIP SHOWCASE (Integrated Naturally)
            ======================================================== */}
        <div className="pt-12 sm:pt-16 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#f15a24]">
                Professional Leadership
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-1">
                Directed by Graduate Architects &amp; Civil Engineers
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Every residential and corporate project is personally coordinated by qualified engineering leaders with university degrees and over two decades of field experience.
              </p>
            </div>
            <Link
              to="/about#team"
              className="text-xs sm:text-sm font-bold text-[#f15a24] hover:underline flex items-center gap-1 shrink-0"
            >
              View Full Team &amp; Credentials <HiOutlineArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((leader) => (
              <div
                key={leader._id || leader.id || leader.name}
                className="group rounded-2xl overflow-hidden bg-slate-50/60 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={leader.image || "/assets/team/kawsar-ahmed.jpg"}
                    alt={`${leader.name} - ${leader.role}`}
                    width="600"
                    height="450"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-950/85 text-white text-[11px] font-medium px-2.5 py-1 rounded">
                    {leader.experience || "Senior Specialist"}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-950 leading-snug">
                      {leader.name}
                    </h4>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">
                      {leader.role}
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 font-medium">
                      <HiOutlineAcademicCap className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{leader.education || leader.degree || "Professional Architect"}</span>
                    </p>
                    <p className="text-xs sm:text-[13px] text-slate-600 mt-3 leading-relaxed">
                      {leader.bio || "Dedicated architectural coordinate handling spatial layout and turnkey finishing."}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">{companyName}</span>
                    <a
                      href={`https://wa.me/${whatsappNum}?text=Hello%20${encodeURIComponent(leader.name)},%20I%20would%20like%20to%20consult%20regarding%20my%20interior%20project.`}
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

      </div>
    </section>
  );
}
