import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineChevronRight,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineCube,
  HiOutlineClipboardCheck,
  HiOutlineBadgeCheck,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { API_BASE } from "../config/api";

// 4 Core About Categories matching bdinterior.com
const aboutTabs = [
  { id: "overview", label: "Overview", icon: HiOutlineEye },
  { id: "team", label: "Our Team", icon: HiOutlineUserGroup },
  { id: "quality-policy", label: "Quality Policy", icon: HiOutlineShieldCheck },
  { id: "career", label: "Career", icon: HiOutlineBriefcase },
];

// Team Members Dataset
const teamMembers = [
  {
    name: "Ar. Tanzim Rahman",
    role: "Founder & Principal Architect",
    education: "B.Arch (BUET), MIAB",
    experience: "12+ Years Experience",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Pioneering architectural minimalism and sustainable luxury residences across Dhaka's upscale neighborhoods.",
  },
  {
    name: "Fariha Chowdhury",
    role: "Head of Interior Architecture",
    education: "M.Sc Interior Design, UK",
    experience: "9+ Years Experience",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Specializing in ergonomic residential floor layouts, acoustic environments, and bespoke custom furniture curation.",
  },
  {
    name: "Engr. Mahmudul Hasan",
    role: "Chief Project & Execution Engineer",
    education: "B.Sc Civil Engineering (CUET)",
    experience: "10+ Years Experience",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Guarantees precision on-site execution, structural safety compliance, and zero-defect handover timelines.",
  },
  {
    name: "Shakil Ahmed",
    role: "Lead 3D Architectural Visualizer",
    education: "B.Sc Multimedia & Animation",
    experience: "7+ Years Experience",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: "Transforms blueprints into photorealistic 4K 3D renders, VR walkthroughs, and lifelike lighting simulations.",
  },
  {
    name: "Nusrat Jahan",
    role: "Senior Interior Stylist & Colorist",
    education: "Fine Arts & Spatial Design (DU)",
    experience: "6+ Years Experience",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Curates Italian marbles, customized textiles, bespoke wallpapers, and mood-adaptive lighting palettes.",
  },
  {
    name: "Rafiul Islam",
    role: "Quality Assurance Specialist",
    education: "Diploma in Materials & Wood Technology",
    experience: "8+ Years Experience",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    bio: "Ensures every batch of HPL, plywood, and Blum soft-close fittings meets international anti-moisture standards.",
  },
];

// Career Positions Dataset
const jobOpenings = [
  {
    title: "Senior Interior Architect",
    department: "Design & Architecture",
    type: "Full-Time",
    location: "Dhaka, Bangladesh",
    experience: "3-5 Years",
    qualification: "B.Arch or Diploma in Architecture",
    description: "Lead high-end residential and corporate interior concepts, client presentations, and working drawing approvals.",
  },
  {
    title: "3D Visualizer & Render Artist",
    department: "Visualization Studio",
    type: "Full-Time",
    location: "Dhaka, Bangladesh",
    experience: "2-4 Years",
    qualification: "Expert in 3ds Max, V-Ray / Corona & SketchUp",
    description: "Develop photorealistic interior renderings, walkthrough animations, and lighting setup for luxury apartments.",
  },
  {
    title: "Site Execution Supervisor",
    department: "Project Management",
    type: "Full-Time",
    location: "Dhaka, Bangladesh",
    experience: "2-4 Years",
    qualification: "Diploma in Civil Engineering / Interior Tech",
    description: "Supervise carpentry teams, electrical conduits, ceiling framing, and enforce zero-defect finishing standards on site.",
  },
  {
    title: "Client Relationship & Sales Executive",
    department: "Business Development",
    type: "Full-Time",
    location: "Dhaka, Bangladesh",
    experience: "1-3 Years",
    qualification: "Bachelor's Degree in Marketing or Architecture",
    description: "Consult prospective homeowners and corporate clients, prepare design estimates, and oversee project onboarding.",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState("overview");
  const [teamList, setTeamList] = useState(teamMembers);
  const location = useLocation();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE}/team`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setTeamList(data);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic team members, using defaults:", err);
      }
    };
    fetchTeam();
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab") || hash;

    if (tabParam && aboutTabs.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
      const sectionEl = document.getElementById(tabParam);
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash, location.search]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const sectionEl = document.getElementById(tabId);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-800">
      {/* ========================================================
          1. ABOUT HERO BANNER (Clean, Fresh, Architectural)
          ======================================================== */}
      <section className="relative isolate overflow-hidden bg-slate-900 pt-32 pb-16 text-white">
        <img
          src="/assets/about.jpg"
          alt="About Dimension Composition"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 mb-4">
            <Link to="/" className="hover:text-brand-500 transition">
              Home
            </Link>
            <HiOutlineChevronRight className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-brand-500 font-semibold">About Us</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                About <span className="text-brand-500">Dimension Composition</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Discover our firm's journey, multidisciplinary architectural team, rigorous quality standards, and career opportunities across Bangladesh.
              </p>
            </div>

            <a
              href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 text-sm font-semibold shadow transition hover:scale-105 self-start md:self-auto"
            >
              <FaWhatsapp className="h-4 w-4" />
              Direct Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CATEGORY TAB NAVIGATION BAR (Clean & Fresh)
          ======================================================== */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2.5 sm:py-3 gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {aboutTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors shrink-0 ${
                    isActive
                      ? "bg-brand-500 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* ========================================================
            CATEGORY 1: OVERVIEW (Clean, Human, Realistic Copy)
            ======================================================== */}
        <section id="overview" className="scroll-mt-32">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-500">
              Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Designing Spaces with Precision & Artistry
            </h2>
            <div className="w-12 h-0.5 bg-brand-500 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Narrative */}
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p className="text-base font-semibold text-slate-900">
                At <strong>Dimension Composition</strong>, we believe every space holds the potential to inspire, comfort, and elevate human living.
              </p>
              <p>
                Founded by experienced spatial architects, our firm provides comprehensive <strong>turnkey interior design and architectural execution</strong> across Dhaka and throughout Bangladesh. From upscale duplexes, penthouses, and private apartments to corporate headquarters and commercial retail, our work is defined by exacting craftsmanship and enduring materials.
              </p>
              <p>
                We bridge the gap between creative 3D visualization and real-world execution. Every detail—from acoustic wall paneling and bespoke modular cabinetry to warm recessed lighting—is tailored to the client's functional needs and aesthetic vision.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <HiOutlineCheckCircle className="h-5 w-5 text-brand-500" />
                    Turnkey Execution
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">Design, 3D renders, carpentry, electrics, and finishing under one roof.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <HiOutlineClock className="h-5 w-5 text-brand-500" />
                    Guaranteed Timeline
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">Rigid project milestone tracking with on-time delivery assurance.</p>
                </div>
              </div>
            </div>

            {/* Right Visual & Key Statistics */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-slate-200 group">
                <img
                  src="/assets/projects/livingroom4.jpg"
                  alt="Dimension Composition Interior Craftsmanship"
                  className="w-full h-72 sm:h-96 object-cover elementor-animation-pop transition-transform duration-500"
                />
              </div>

              {/* Stat Cards */}
              <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-xl bg-slate-900 text-white p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-2xl font-bold text-brand-500">10+</p>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Years Experience</p>
                </div>
                <div className="rounded-xl bg-slate-900 text-white p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-2xl font-bold text-brand-500">250+</p>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Projects Delivered</p>
                </div>
                <div className="rounded-xl bg-slate-900 text-white p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-2xl font-bold text-brand-500">99%</p>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CATEGORY 2: OUR TEAM (Clean, Professional Portraits)
            ======================================================== */}
        <section id="team" className="scroll-mt-32 pt-8 border-t border-slate-200">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-500">
              People
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Our Team
            </h2>
            <div className="w-12 h-0.5 bg-brand-500 mx-auto mt-2" />
            <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
              Our multidisciplinary team unites certified architects, 3D artists, structural engineers, and master craftsmen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamList.map((member, idx) => (
              <div
                key={member._id || member.name || idx}
                data-aos="fade-up"
                data-aos-delay={30 + (idx % 3) * 30}
                className="group rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Team Photo with BD Interior elementor-animation-pop on hover */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover elementor-animation-pop transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100 flex items-end p-4">
                    <span className="text-xs font-medium text-white">
                      {member.experience}
                    </span>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-500 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-500 mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <HiOutlineAcademicCap className="h-3.5 w-3.5 text-slate-400" />
                      {member.education}
                    </p>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-600">Dimension Composition</span>
                    <a
                      href={`https://wa.me/8801739835017?text=Hello%20${encodeURIComponent(member.name)},%20I%20would%20like%20to%20consult%20regarding%20my%20interior%20project.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-500 font-semibold hover:underline flex items-center gap-1"
                    >
                      Consult →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            CATEGORY 3: QUALITY POLICY (Clean Outline Icons)
            ======================================================== */}
        <section id="quality-policy" className="scroll-mt-32 pt-8 border-t border-slate-200">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-500">
              Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Quality Policy
            </h2>
            <div className="w-12 h-0.5 bg-brand-500 mx-auto mt-2" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 px-2">
              We uphold strict benchmarks in material authenticity, structural endurance, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition">
              <div className="h-10 w-10 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
                <HiOutlineShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">5-Year Workmanship Warranty</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Comprehensive 5-year guarantee covering all bespoke modular carpentry, joinery, and structural fittings.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition">
              <div className="h-10 w-10 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
                <HiOutlineCube className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Grade-A Raw Materials</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We strictly use High-Pressure Laminates (HPL), anti-fungal boards, and imported German fittings (Blum & Hafele).
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition">
              <div className="h-10 w-10 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
                <HiOutlineClipboardCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">4-Stage Quality Audit</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Every project passes Raw Material Verification, Frame Leveling Audit, Surface Finish Review, and Final Inspection.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition">
              <div className="h-10 w-10 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
                <HiOutlineBadgeCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Zero Hidden Costs Guarantee</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Our detailed Bill of Quantities (BOQ) is fully transparent. No unexpected cost escalations during execution.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            CATEGORY 4: CAREER (Clean, Professional Job Cards)
            ======================================================== */}
        <section id="career" className="scroll-mt-32 pt-8 border-t border-slate-200">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-500">
              Opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Careers
            </h2>
            <div className="w-12 h-0.5 bg-brand-500 mx-auto mt-2" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 px-2">
              Build your career alongside experienced spatial designers in an inspiring studio environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {jobOpenings.map((job) => {
              const applyMsg = encodeURIComponent(
                `Hello Dimension Composition HR! I am applying for the "${job.title}" role.`
              );
              const whatsappApply = `https://wa.me/8801739835017?text=${applyMsg}`;

              return (
                <div
                  key={job.title}
                  className="rounded-xl bg-white p-5 sm:p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">
                          {job.department}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">
                          {job.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-medium shrink-0">
                        {job.type}
                      </span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                      <p>
                        <strong className="text-slate-700">Experience:</strong> {job.experience}
                      </p>
                      <p>
                        <strong className="text-slate-700">Requirements:</strong> {job.qualification}
                      </p>
                      <p className="flex items-center gap-1">
                        <HiOutlineLocationMarker className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-400">Immediate Joining</span>
                    <a
                      href={whatsappApply}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 text-xs font-semibold shadow-sm transition"
                    >
                      Apply via WhatsApp →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
