import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineLocationMarker, HiOutlineClock, HiOutlineEye } from "react-icons/hi";
import { API_BASE } from "../config/api";
import ProjectModal from "./ProjectModal";

const fallbackProjects = [
  {
    _id: "p1",
    title: "Sunlit Studio Lounge",
    category: "Living Room",
    image: "/assets/projects/livingroom3.jpg",
    location: "Dhanmondi Lakefront Villa",
    area: "530 sq.ft",
    duration: "45 Days",
    description: "Open-plan lounge anchored by clean geometric lines, high ceilings, natural textures, and bespoke floating media joinery.",
    gallery: ["/assets/projects/livingroom3.jpg", "/assets/projects/livingroom4.jpg", "/assets/projects/dining.jpeg"],
    materials: ["Floating Veneer Console", "Terrazzo Side Elements", "Brushed Bronze Accents"],
  },
  {
    _id: "p2",
    title: "Master Bedroom Suite",
    category: "Bedroom",
    image: "/assets/projects/bedroom3.jpeg",
    location: "Gulshan Modern Residence",
    area: "420 sq.ft",
    duration: "40 Days",
    description: "Layered linens, warm smoked oak paneling, and soft ambient 3000K recessed lighting for a peaceful luxury retreat.",
    gallery: ["/assets/projects/bedroom3.jpeg", "/assets/projects/bedroom2.jpeg", "/assets/projects/bedroom6.jpeg"],
    materials: ["Smoked Oak Paneling", "Belgian Linen Upholstery", "LED Cove Lighting"],
  },
  {
    _id: "p3",
    title: "Modern Minimalist Island Kitchen",
    category: "Kitchen",
    image: "/assets/projects/kitchen1.jpeg",
    location: "Bashundhara R/A Duplex",
    area: "320 sq.ft",
    duration: "35 Days",
    description: "Seamless matte graphite acrylic cabinetry, imported quartz waterfall island counter, and integrated smart appliances.",
    gallery: ["/assets/projects/kitchen1.jpeg", "/assets/projects/kitchen5.jpeg"],
    materials: ["Quartz Stone Island", "Anti-fingerprint Acrylic", "Blum Hydraulic Fittings"],
  },
  {
    _id: "p4",
    title: "Executive Corporate Boardroom",
    category: "Office",
    image: "/assets/projects/livingroom4.jpg",
    location: "Banani Commercial Suite",
    area: "650 sq.ft",
    duration: "30 Days",
    description: "Acoustically engineered conference room with integrated AV technology, fluted wall acoustics, and ergonomic executive seating.",
    gallery: ["/assets/projects/livingroom4.jpg", "/assets/projects/living room.jpeg"],
    materials: ["Acoustic Fluted Panels", "Natural Teak Table", "Concealed Cable Raceways"],
  },
  {
    _id: "p5",
    title: "Open-Plan Living & Dining Lounge",
    category: "Living Room",
    image: "/assets/projects/dining.jpeg",
    location: "Uttara Sector-4 Residence",
    area: "720 sq.ft",
    duration: "50 Days",
    description: "Cohesive spatial transition between formal family dining and casual living with custom marble dining table and accent lighting.",
    gallery: ["/assets/projects/dining.jpeg", "/assets/projects/livingroom3.jpg"],
    materials: ["Imported Italian Marble", "Bespoke Dining Joinery", "Warm Ambient Pendants"],
  },
  {
    _id: "p6",
    title: "Contemporary Minimalist Suite",
    category: "Bedroom",
    image: "/assets/projects/bedroom6.jpeg",
    location: "Baridhara DOHS Apartment",
    area: "380 sq.ft",
    duration: "35 Days",
    description: "Floor-to-ceiling wardrobe with tinted glass doors, concealed LED wardrobe illumination, and ergonomic floating dressing unit.",
    gallery: ["/assets/projects/bedroom6.jpeg", "/assets/projects/bedroom7.jpeg"],
    materials: ["Smoked Glass Profiles", "Micro-cement Headboard", "Warm Walnut Veneer"],
  },
];

const FILTER_TABS = ["All", "Living Room", "Bedroom", "Kitchen", "Office"];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/projects?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => console.warn("Using offline portfolio projects", err));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return projects.slice(0, 6);
    return projects
      .filter((p) => p.category?.toLowerCase() === activeTab.toLowerCase())
      .slice(0, 6);
  }, [projects, activeTab]);

  return (
    <section id="featured-projects" className="relative w-full bg-[#fafafa] py-16 sm:py-24 border-b border-slate-200/80">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f15a24]">
              <span className="h-[2px] w-6 bg-[#f15a24]" />
              <span>Realized Portfolios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.2]">
              Recently Completed <br className="hidden sm:inline" />
              <span className="text-slate-600 font-semibold">Interior Projects</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Explore our completed residential and commercial spaces across Dhaka, designed with architectural precision and bespoke craftsmanship.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab
                    ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project._id || project.id || idx}
              data-aos="fade-up"
              data-aos-delay={(idx % 3) * 60}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image || "/assets/projects/livingroom3.jpg"}
                  alt={project.title}
                  width="600"
                  height="412"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                  {project.category || "Interior"}
                </div>

                {/* View Overlay Hint */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                    <HiOutlineEye className="h-4 w-4 text-[#f15a24]" /> View Details
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#f15a24] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  
                  {project.location && (
                    <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <HiOutlineLocationMarker className="h-3.5 w-3.5 text-[#f15a24] shrink-0" />
                      <span>{project.location}</span>
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  {project.area && <span>Area: <strong className="text-slate-800">{project.area}</strong></span>}
                  {project.duration && (
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="h-3.5 w-3.5 text-slate-400" />
                      {project.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 text-sm font-bold shadow-lg shadow-slate-900/10 transition-all hover:gap-3"
          >
            <span>Explore All Portfolio Projects ({projects.length})</span>
            <HiOutlineArrowRight className="h-4 w-4 text-brand-400" />
          </Link>
        </div>

      </div>

      {/* Interactive Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
