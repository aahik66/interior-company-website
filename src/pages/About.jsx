import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import {
  HiOutlineChevronRight,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineClock,
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

const TEAM_CACHE_KEY = "dc_team_members_cache";

const normalizeTeamImage = (imgUrl = "", name = "") => {
  if (!imgUrl) return "/assets/team/kawsar-ahmed.jpg";
  const str = (imgUrl + " " + name).toLowerCase();
  if (str.includes("swapno-puron-5") || str.includes("kawsar")) {
    return "/assets/team/kawsar-ahmed.jpg";
  }
  if (str.includes("swapno-puron-8") || str.includes("anisur")) {
    return "/assets/team/anisur-rahman.jpg";
  }
  if (str.includes("69034") || str.includes("shohid")) {
    return "/assets/team/shohid-sumon.jpg";
  }
  return imgUrl;
};

// Real Team Members Dataset
const defaultTeamMembers = [
  {
    _id: "6aa7786f3cc116e47fbb4a0a",
    name: "Engr. Kawsar Ahmed",
    role: "CEO",
    education: "BSc in Engineering",
    experience: "20+ Years Experience",
    image: "/assets/team/kawsar-ahmed.jpg",
    bio: "Specializing in ergonomic residential floor layouts, acoustic environments, and bespoke custom furniture curation.",
    order: 1,
  },
  {
    _id: "6aa7786f3cc116e47fbb4a09",
    name: "Ar. Anisur Rahman",
    role: "Founder & Principal Architect",
    education: "BSc in Architecture",
    experience: "15+ Years Experience",
    image: "/assets/team/anisur-rahman.jpg",
    bio: "Pioneering architectural minimalism and sustainable luxury residences across Dhaka's upscale neighborhoods.",
    order: 2,
  },
  {
    _id: "6aacd591394307bf7d21686b",
    name: "Engr. Shohid Bin Ali Sumon",
    role: "Project Coordinator",
    education: "BSc in Civil",
    experience: "5+ Years Experience",
    image: "/assets/team/shohid-sumon.jpg",
    bio: "Supervising turnkey site execution, structural coordination, and timely handover.",
    order: 3,
  },
];

const getCachedTeam = () => {
  if (typeof window === "undefined") return defaultTeamMembers;
  try {
    const cached = localStorage.getItem(TEAM_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((m) => ({
          ...m,
          image: normalizeTeamImage(m.image, m.name),
        }));
      }
    }
  } catch (_err) {
    // fallback to default
  }
  return defaultTeamMembers;
};

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
  const [teamList, setTeamList] = useState(getCachedTeam);
  const location = useLocation();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE}/team?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const normalized = data.map((m) => ({
              ...m,
              image: normalizeTeamImage(m.image, m.name),
            }));
            setTeamList(normalized);
            try {
              localStorage.setItem(TEAM_CACHE_KEY, JSON.stringify(normalized));
            } catch (_e) {}
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic team members, using cached/defaults:", err);
      }
    };
    fetchTeam();
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab") || hash;

    if (tabParam && aboutTabs.some((t) => t.id === tabParam)) {
      const timer = setTimeout(() => {
        setActiveTab(tabParam);
        const sectionEl = document.getElementById(tabParam);
        if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.search]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const sectionEl = document.getElementById(tabId);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const aboutSchema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://dimensioncomposition.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Us",
          "item": "https://dimensioncomposition.com/about"
        }
      ]
    }
  ];

  return (
    <main className="w-full min-h-screen bg-white text-slate-800">
      <SEOHead
        title="About Dimension Composition | Best Interior Design Firm in Dhaka"
        description="Learn about Dimension Composition, our team of expert architects, quality policy, and luxury residential & commercial interior design execution standards in Dhaka, Bangladesh."
        keywords="about dimension composition, interior design team dhaka, top architects bangladesh, interior design company history, luxury interior firm"
        canonical="https://dimensioncomposition.com/about"
        schema={aboutSchema}
      />
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
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
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
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <HiOutlineCheckCircle className="h-5 w-5 text-brand-500" />
                    Turnkey Execution
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Design, 3D renders, carpentry, electrics, and finishing under one roof.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <HiOutlineClock className="h-5 w-5 text-brand-500" />
                    Guaranteed Timeline
                  </h3>
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
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
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
                    src={normalizeTeamImage(member.image, member.name)}
                    alt={member.name}
                    width="600"
                    height="450"
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
                    <p className="text-xs font-bold text-brand-600 mt-0.5">
                      {member.role}
                    </p>
                    {Boolean(member.education?.trim()) && (
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                        <HiOutlineAcademicCap className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{member.education}</span>
                      </p>
                    )}
                    {Boolean(member.bio?.trim()) && (
                      <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-600">Dimension Composition</span>
                    <a
                      href={`https://wa.me/8801739835017?text=Hello%20${encodeURIComponent(member.name)},%20I%20would%20like%20to%20consult%20regarding%20my%20interior%20project.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 font-bold hover:underline flex items-center gap-1"
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
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
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
              <div className="h-10 w-10 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center mb-4">
                <HiOutlineShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">5-Year Workmanship Warranty</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Comprehensive 5-year guarantee covering all bespoke modular carpentry, joinery, and structural fittings.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition">
              <div className="h-10 w-10 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center mb-4">
                <HiOutlineCube className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Grade-A Raw Materials</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We strictly use High-Pressure Laminates (HPL), anti-fungal boards, and imported German fittings (Blum & Hafele).
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition">
              <div className="h-10 w-10 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center mb-4">
                <HiOutlineClipboardCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">4-Stage Quality Audit</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Every project passes Raw Material Verification, Frame Leveling Audit, Surface Finish Review, and Final Inspection.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition">
              <div className="h-10 w-10 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center mb-4">
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
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
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
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
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
                    <span className="text-xs text-slate-500 font-medium">Immediate Joining</span>
                    <a
                      href={whatsappApply}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 text-xs font-semibold shadow-sm transition"
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
