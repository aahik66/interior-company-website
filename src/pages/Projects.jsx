import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { API_BASE } from "../config/api";
import ProjectModal from "../components/ProjectModal";
import {
  HiOutlineChevronRight,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

// Core 4 Sectors (Matching BD Interior's "Our Core Portfolio")
const coreSectors = [
  {
    id: "residence",
    title: "Residences",
    subtitle: "Apartments, Duplexes & Penthouses",
    image: "/assets/projects/bedroom3.jpeg",
    sectionTarget: "residence-portfolio",
  },
  {
    id: "office",
    title: "Offices",
    subtitle: "Corporate HQs & Executive Chambers",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    sectionTarget: "office-portfolio",
  },
  {
    id: "hotels",
    title: "Hotels",
    subtitle: "Boutique Hospitality & Luxury Suites",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    sectionTarget: "residence-portfolio",
  },
  {
    id: "restaurants",
    title: "Restaurants",
    subtitle: "Atmospheric Dining & Aesthetic Cafés",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    sectionTarget: "residence-portfolio",
  },
];

// Residence Sub-categories (Exact tabs from bdinterior.com/portfolio/)
const residenceTabs = [
  "All",
  "Bathroom",
  "Kitchen",
  "Balcony",
  "Dinner Wagon",
  "Wall Cabinet",
  "Dining Room",
  "Dressing Unit",
  "Family Living",
  "Folding Door",
  "Formal Living",
  "Lift Lobby",
  "TV Unit",
  "Bedroom",
  "Study Room",
  "Kids Bedroom",
];

// Office Sub-categories (Exact tabs from bdinterior.com/portfolio/)
const officeTabs = [
  "All",
  "Conference Room",
  "MD Room",
  "Workstations",
  "Reception",
];

// Curated Residence Projects Dataset
const residenceProjectsData = [
  {
    title: "Master Bedroom Suite",
    category: "Bedroom",
    image: "/assets/projects/bedroom3.jpeg",
    location: "Gulshan Modern Residence",
    duration: "40 Days",
    area: "420 sq.ft",
    description: "Layered linens, warm smoked oak paneling, and soft ambient 3000K recessed lighting for a peaceful luxury retreat.",
    materials: ["Smoked Oak Paneling", "Belgian Linen Upholstery", "LED Cove Lighting", "Brushed Brass Accents"],
    gallery: [
      "/assets/projects/bedroom3.jpeg",
      "/assets/projects/bedroom2.jpeg",
      "/assets/projects/bedroom6.jpeg",
      "/assets/projects/bedroom7.jpeg",
    ],
  },
  {
    title: "Coastal Minimalist Bedroom",
    category: "Bedroom",
    image: "/assets/projects/bedroom2.jpeg",
    location: "Banani Penthouse",
    duration: "35 Days",
    area: "380 sq.ft",
    description: "Natural white oak woodwork, micro-cement headboard, and floor-to-ceiling panoramic glass windows.",
    materials: ["Natural White Oak", "Matte Brass Hardware", "Linen Sheer Drapery", "Micro-cement Wall"],
    gallery: ["/assets/projects/bedroom2.jpeg", "/assets/projects/bedroom3.jpeg", "/assets/projects/bedroom5.jpeg"],
  },
  {
    title: "Acoustic Slat Loft Bedroom",
    category: "Bedroom",
    image: "/assets/projects/bedroom7.jpeg",
    location: "Dhanmondi Modern Duplex",
    duration: "45 Days",
    area: "510 sq.ft",
    description: "A pared-back loft master bedroom with soft acoustic walnut slatting and custom fluted wardrobe joinery.",
    materials: ["Acoustic Walnut Slatting", "Fluted Glass Doors", "Concealed LED Profiles", "Wool Rug"],
    gallery: ["/assets/projects/bedroom7.jpeg", "/assets/projects/bedroom6.jpeg", "/assets/projects/bedroom2.jpeg"],
  },
  {
    title: "Contemporary Family Living",
    category: "Family Living",
    image: "/assets/projects/livingroom4.jpg",
    location: "Bashundhara R/A Villa",
    duration: "55 Days",
    area: "680 sq.ft",
    description: "Spacious family lounge with comfortable low-profile sectional sofa, fluted wood backdrop, and acoustic acoustic paneling.",
    materials: ["Italian Porcelain Slabs", "Bouclé Sectional Fabric", "Black Walnut Slats", "Integrated Accent LED"],
    gallery: ["/assets/projects/livingroom4.jpg", "/assets/projects/livingroom3.jpg", "/assets/projects/living room.jpeg"],
  },
  {
    title: "Luxury Formal Living Suite",
    category: "Formal Living",
    image: "/assets/projects/livingroom3.jpg",
    location: "Baridhara Diplomatic Enclave",
    duration: "50 Days",
    area: "720 sq.ft",
    description: "Opulent formal living designed for distinguished hosting, featuring custom chandelier, marble accent wall, and velvet seating.",
    materials: ["Calacatta Gold Marble", "Custom Brass Chandelier", "Velvet Armchairs", "Hardwood Chevron Flooring"],
    gallery: ["/assets/projects/livingroom3.jpg", "/assets/projects/livingroom4.jpg", "/assets/projects/living room.jpeg"],
  },
  {
    title: "Cozy Penthouse Lounge",
    category: "Family Living",
    image: "/assets/projects/living room.jpeg",
    location: "Uttara Sector 4 Penthouse",
    duration: "35 Days",
    area: "480 sq.ft",
    description: "Warm and inviting space with customized wall entertainment panel and sun-drenched balcony integration.",
    materials: ["Muted Beige Paneling", "Textured Linen", "Dimmable Ambient Lighting"],
    gallery: ["/assets/projects/living room.jpeg", "/assets/projects/livingroom4.jpg"],
  },
  {
    title: "Island Modular Modern Kitchen",
    category: "Kitchen",
    image: "/assets/projects/kitchen1.jpeg",
    location: "Banani Lake View Apartment",
    duration: "45 Days",
    area: "260 sq.ft",
    description: "Sleek handle-less acrylic cabinetry, quartz waterfall counter island, and integrated European appliances.",
    materials: ["Anti-scratch Acrylic Shutters", "White Quartz Countertops", "Blum Soft-close Mechanisms"],
    gallery: ["/assets/projects/kitchen1.jpeg", "/assets/projects/kitchen2.jpeg", "/assets/projects/kitchen5.jpeg"],
  },
  {
    title: "Minimalist Matte Kitchen",
    category: "Kitchen",
    image: "/assets/projects/kitchen2.jpeg",
    location: "Dhanmondi Lakefront Villa",
    duration: "38 Days",
    area: "290 sq.ft",
    description: "High-pressure laminate cabinetry in charcoal gray and natural timber, with smart spice pullouts and pantry units.",
    materials: ["HPL Matte Laminate", "Granite Countertop", "Concealed Ventilation Chimney"],
    gallery: ["/assets/projects/kitchen2.jpeg", "/assets/projects/kitchen6.jpeg"],
  },
  {
    title: "Chef's Contemporary Kitchen",
    category: "Kitchen",
    image: "/assets/projects/kitchen5.jpeg",
    location: "Bashundhara R/A Duplex",
    duration: "40 Days",
    area: "320 sq.ft",
    description: "Spacious cooking layout with seamless breakfast counter bar, premium tiles, and ambient strip illumination.",
    materials: ["High-gloss Acrylic", "Spanish Backsplash Tiles", "Stainless Steel Sinks"],
    gallery: ["/assets/projects/kitchen5.jpeg", "/assets/projects/kitchen6.jpeg", "/assets/projects/kitchen1.jpeg"],
  },
  {
    title: "Sculptural Onyx Dining Room",
    category: "Dining Room",
    image: "/assets/projects/dining.jpeg",
    location: "Gulshan Avenue Residence",
    duration: "30 Days",
    area: "340 sq.ft",
    description: "Bespoke 8-seater solid wood and marble dining table with custom statement pendant lighting and mirror wall paneling.",
    materials: ["Polished Nero Marquina Marble", "Solid Teak Chairs", "Smoked Bronze Mirror"],
    gallery: ["/assets/projects/dining.jpeg", "/assets/projects/kitchen1.jpeg"],
  },
  {
    title: "Fluted Marble Floating TV Unit",
    category: "TV Unit",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    location: "Gulshan-2 Penthouse",
    duration: "18 Days",
    area: "140 sq.ft",
    description: "Backlit onyx panel with floating fluted console drawer, concealed wiring channels, and integrated soundbar shelf.",
    materials: ["Backlit Onyx Panel", "Fluted PU Painted Drawers", "Titanium Gold Inlay Profiles"],
    gallery: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Bronze Glass Living Wall Cabinet",
    category: "Wall Cabinet",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80",
    location: "Banani Lake Residence",
    duration: "20 Days",
    area: "160 sq.ft",
    description: "Floor-to-ceiling glass display cabinet with bronze aluminum frames and internal sensor-activated warm LED shelves.",
    materials: ["Smoked Tempered Glass", "Bronze Aluminum Frame", "Warm 2700K Sensor Strips"],
    gallery: ["https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Bespoke Dining Dinner Wagon",
    category: "Dinner Wagon",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    location: "Baridhara Luxury Flat",
    duration: "22 Days",
    area: "130 sq.ft",
    description: "Custom built-in dining dinner wagon with crockery display lighting, wine cooler slot, and cutlery drawers.",
    materials: ["Veneered MDF", "Gold Handle Trims", "Warm Soft LED"],
    gallery: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Luxury Dressing & Vanity Unit",
    category: "Dressing Unit",
    image: "/assets/projects/bridal.jpeg",
    location: "Bashundhara Luxury Estate",
    duration: "25 Days",
    area: "180 sq.ft",
    description: "Full height walk-in dressing wardrobe with sensor illumination, jewelry organizing island, and Hollywood vanity.",
    materials: ["Clear Glass Closet", "Rose Quartz Vanity Slab", "CRI 95+ Studio Lighting"],
    gallery: ["/assets/projects/bridal.jpeg", "/assets/projects/bridal5.jpeg"],
  },
  {
    title: "Spa-Inspired Ensuite Bathroom",
    category: "Bathroom",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    location: "Gulshan Residence",
    duration: "22 Days",
    area: "110 sq.ft",
    description: "Frameless rain shower cubicle, floating quartz vanity with undermount basin, and anti-fog LED touch mirror.",
    materials: ["Matte Charcoal Porcelain", "Quartz Vanity Slab", "Kohler Concealed Fixtures"],
    gallery: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Biophilic Green Balcony Garden",
    category: "Balcony",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    location: "Mirpur DOHS Duplex",
    duration: "15 Days",
    area: "120 sq.ft",
    description: "Outdoor artificial turf flooring, vertical wooden planter trellis, weather-resistant wicker chairs, and fairy lights.",
    materials: ["Weatherproof WPC Decking", "Vertical Wall Planters", "Natural Pebble Edging"],
    gallery: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Executive Library & Study Room",
    category: "Study Room",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    location: "Dhanmondi Historic Residence",
    duration: "25 Days",
    area: "210 sq.ft",
    description: "Custom floor-to-ceiling bookshelf with sliding ladder, acoustic upholstered wall, and ergonomic executive reading chair.",
    materials: ["Dark Walnut Veneer", "Acoustic Wall Fabric", "Matte Brass Reading Lamp"],
    gallery: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Playful Creative Kids Bedroom",
    category: "Kids Bedroom",
    image: "/assets/projects/bedroom5.jpeg",
    location: "Uttara Lake Residence",
    duration: "30 Days",
    area: "300 sq.ft",
    description: "Playful yet organized bedroom featuring custom bunk bed, built-in study desk, and interactive book cubbies.",
    materials: ["Eco-friendly Paint", "Birch Plywood Joinery", "Ergonomic Study Desk"],
    gallery: ["/assets/projects/bedroom5.jpeg", "/assets/projects/bedroom6.jpeg"],
  },
  {
    title: "Acoustic Acoustic Folding Door Partition",
    category: "Folding Door",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    location: "Gulshan Lake Penthouse",
    duration: "14 Days",
    area: "150 sq.ft",
    description: "Heavy-duty sliding folding glass partition separating formal living from dining, maximizing natural ventilation.",
    materials: ["Powder-coated Aluminum Track", "Laminated Sound-dampening Glass"],
    gallery: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Prestige Lift Lobby Entrance",
    category: "Lift Lobby",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    location: "Banani Luxury Complex",
    duration: "16 Days",
    area: "180 sq.ft",
    description: "Private floor residential lift lobby with bookmatched marble accent wall, warm lighting cove, and security foyer.",
    materials: ["Bookmatched Onyx", "Fluted Wall Profiles", "Recessed Downlights"],
    gallery: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"],
  },
];

// Curated Office Projects Dataset
const officeProjectsData = [
  {
    title: "Hi-Tech Executive Conference Room",
    category: "Conference Room",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80",
    location: "Gulshan-1 Corporate Tower",
    duration: "28 Days",
    area: "450 sq.ft",
    description: "Smart 16-seater motorized conference table with integrated pop-up power modules, acoustic acoustic baffles, and 4K display.",
    materials: ["Motorized Pop-up Modules", "Acoustic Ceiling Baffles", "Double-glazed Soundproof Glass"],
    gallery: ["https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Luxury Chairman & MD Room",
    category: "MD Room",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80",
    location: "Motijheel Financial HQ",
    duration: "30 Days",
    area: "520 sq.ft",
    description: "Distinguished executive chamber with genuine leather sofa set, Italian marble table, and private meeting nook.",
    materials: ["Genuine Italian Leather", "Statutario Marble Desk", "Wood Acoustic Paneling"],
    gallery: ["https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Agile Open-Plan Workstations",
    category: "Workstations",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80",
    location: "Tejgaon Commercial District",
    duration: "35 Days",
    area: "1800 sq.ft",
    description: "Modern 40-person workstation layout with ergonomic mesh chairs, fabric acoustic dividers, and smart raceway power cabling.",
    materials: ["Ergonomic Herman Miller Style Seating", "Fabric Acoustic Partitions", "Cable Raceway Desking"],
    gallery: ["https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80"],
  },
  {
    title: "Prestige Corporate Reception & Lounge",
    category: "Reception",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    location: "Banani 11 Tech Park",
    duration: "25 Days",
    area: "650 sq.ft",
    description: "Sculptural curved reception counter with backlit metal logo, warm hospitality lounge, and biometric visitor security gates.",
    materials: ["Curved Solid Surface Counter", "Backlit 3D Stainless Steel Logo", "Vertical Green Living Wall"],
    gallery: ["https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80"],
  },
];

const slugifyCategory = (name) =>
  name.toLowerCase().trim().replace(/\s+/g, "-");

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeResidenceTab, setActiveResidenceTab] = useState("All");
  const [activeOfficeTab, setActiveOfficeTab] = useState("All");
  const [dbProjects, setDbProjects] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { categorySlug } = useParams();

  // URL Route Param & Query handling
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetSlug = categorySlug || params.get("category");

    if (targetSlug) {
      const cleanTarget = targetSlug.toLowerCase().trim();
      const matchedOffice = officeTabs.find(
        (t) => slugifyCategory(t) === cleanTarget || t.toLowerCase() === cleanTarget
      );
      const matchedResidence = residenceTabs.find(
        (t) => slugifyCategory(t) === cleanTarget || t.toLowerCase() === cleanTarget
      );

      if (matchedOffice) {
        setActiveOfficeTab(matchedOffice);
        const officeEl = document.getElementById("office-portfolio");
        if (officeEl) officeEl.scrollIntoView({ behavior: "smooth" });
      } else if (matchedResidence) {
        setActiveResidenceTab(matchedResidence);
        const resEl = document.getElementById("residence-portfolio");
        if (resEl) resEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [categorySlug, location.search]);

  // Load database projects to merge
  useEffect(() => {
    fetch(`${API_BASE}/projects?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDbProjects(data);
      })
      .catch((err) => console.warn("Using offline portfolio records:", err.message));
  }, []);

  // Filtered Residence Projects
  const filteredResidenceProjects = useMemo(() => {
    let list = [...residenceProjectsData];
    // Merge DB projects that are residential
    dbProjects.forEach((dbp) => {
      const isOffice =
        dbp.category?.toLowerCase().includes("office") ||
        dbp.category?.toLowerCase().includes("conference");
      if (!isOffice && !list.some((p) => p.title?.toLowerCase() === dbp.title?.toLowerCase())) {
        list.unshift(dbp);
      }
    });

    if (activeResidenceTab === "All") return list;
    return list.filter(
      (p) =>
        p.category?.toLowerCase() === activeResidenceTab.toLowerCase() ||
        p.title?.toLowerCase().includes(activeResidenceTab.toLowerCase())
    );
  }, [activeResidenceTab, dbProjects]);

  // Filtered Office Projects
  const filteredOfficeProjects = useMemo(() => {
    let list = [...officeProjectsData];
    // Merge DB projects that are commercial/office
    dbProjects.forEach((dbp) => {
      const isOffice =
        dbp.category?.toLowerCase().includes("office") ||
        dbp.category?.toLowerCase().includes("conference") ||
        dbp.category?.toLowerCase().includes("workstation");
      if (isOffice && !list.some((p) => p.title?.toLowerCase() === dbp.title?.toLowerCase())) {
        list.unshift(dbp);
      }
    });

    if (activeOfficeTab === "All") return list;
    return list.filter(
      (p) =>
        p.category?.toLowerCase() === activeOfficeTab.toLowerCase() ||
        p.title?.toLowerCase().includes(activeOfficeTab.toLowerCase())
    );
  }, [activeOfficeTab, dbProjects]);

  // Scroll to section helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectResidenceTab = (tab) => {
    setActiveResidenceTab(tab);
    if (tab === "All") {
      navigate("/portfolio");
    } else {
      navigate(`/portfolio/category/${slugifyCategory(tab)}`);
    }
  };

  const handleSelectOfficeTab = (tab) => {
    setActiveOfficeTab(tab);
    if (tab === "All") {
      navigate("/portfolio");
    } else {
      navigate(`/portfolio/category/${slugifyCategory(tab)}`);
    }
  };

  const currentCategoryName =
    activeResidenceTab !== "All"
      ? activeResidenceTab
      : activeOfficeTab !== "All"
      ? activeOfficeTab
      : null;

  const categoryTitle = currentCategoryName
    ? `${currentCategoryName} Interior Design Projects in Dhaka | Dimension Composition`
    : "Interior Design Portfolio & Completed Projects in Dhaka | Dimension Composition";

  const categoryDesc = currentCategoryName
    ? `Explore luxury ${currentCategoryName.toLowerCase()} interior design projects completed by Dimension Composition in Dhaka, Bangladesh. Custom 3D layouts, premium woodwork & execution.`
    : "Explore luxury residential duplex apartments, corporate office interiors, penthouses, and commercial projects completed by Dimension Composition in Dhaka, Bangladesh.";

  const categoryCanonical = currentCategoryName
    ? `https://dimensioncomposition.com/portfolio/category/${slugifyCategory(currentCategoryName)}`
    : "https://dimensioncomposition.com/portfolio";

  const projectsSchema = [
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
          "name": currentCategoryName ? `Portfolio - ${currentCategoryName}` : "Portfolio & Projects",
          "item": categoryCanonical
        }
      ]
    }
  ];

  return (
    <main className="w-full min-h-screen bg-gray-50 text-gray-800">
      <SEOHead
        title={categoryTitle}
        description={categoryDesc}
        keywords={
          currentCategoryName
            ? `${currentCategoryName.toLowerCase()} interior design dhaka, ${currentCategoryName.toLowerCase()} decor bangladesh, completed ${currentCategoryName.toLowerCase()} projects, dimension composition`
            : "interior design portfolio dhaka, completed interior projects, residential interior gallery, office interior design dhaka, duplex interior bangladesh"
        }
        canonical={categoryCanonical}
        schema={projectsSchema}
      />
      {/* ========================================================
          1. PAGE HEADER (Matching BD Interior: Breadcrumb + Title)
          ======================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0b1325] pt-32 pb-16 text-white">
        <img
          src="/assets/projects/livingroom4.jpg"
          alt="Dimension Composition Portfolio Banner"
          className="absolute inset-0 h-full w-full object-cover opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1325]/85 via-[#0b1325]/95 to-[#0b1325]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb: Home > Portfolio */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            <Link to="/" className="hover:text-brand-500 transition">
              Home
            </Link>
            <HiOutlineChevronRight className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-brand-500 font-bold">Portfolio</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Our <span className="text-brand-500">Portfolio</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
                Dimension Composition portfolio displays our firm's distinguished interior design & architectural projects. Explore inspiring spaces and bespoke craftsmanship.
              </p>
            </div>

            {/* Direct WhatsApp Consultation */}
            <a
              href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20am%20exploring%20your%20portfolio%20and%20would%20like%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 text-sm font-bold shadow-lg shadow-green-900/30 transition hover:scale-105 self-start md:self-auto"
            >
              <FaWhatsapp className="h-5 w-5" />
              Direct WhatsApp Query
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. OUR CORE PORTFOLIO
          Matching BD Interior:
          - 4 Sector Cards (Residences, Offices, Hotels, Restaurants)
          - Mouse Cursor Hover Effect: elementor-animation-pop (pop/pulse zoom!)
          ======================================================== */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Core Portfolio
          </h2>
          <div className="w-16 h-1 bg-brand-500 mx-auto mt-3 rounded-full" />
          <p className="mt-3 text-xs sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Experience our specialized interior excellence across key residential, corporate, and commercial sectors.
          </p>
        </div>

        {/* 4 Core Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {coreSectors.map((sector) => (
            <div
              key={sector.id}
              onClick={() => scrollToSection(sector.sectionTarget)}
              className="group cursor-pointer flex flex-col items-center text-center"
            >
              {/* Image Container with BD Interior's Pop Animation Effect */}
              <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 shadow-md border border-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:border-brand-300">
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="h-full w-full object-cover elementor-animation-pop transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Sector Title with Hover Color Change */}
              <h3 className="mt-4 text-lg sm:text-2xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-brand-500 flex items-center gap-1.5">
                <span>{sector.title}</span>
                <span className="text-brand-500 font-bold transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </h3>
              <p className="mt-1 text-xs text-gray-500 font-medium">
                {sector.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. PORTFOLIO UNDER RESIDENCE
          Matching BD Interior:
          - Heading: "Portfolio Under Residence"
          - Horizontal Tab Bar: All, Bathroom, Kitchen, Balcony, Dinner Wagon, etc.
          - Project Cards: with elementor-animation-pop hover effect + bottom bar with "Title →"
          ======================================================== */}
      <section id="residence-portfolio" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-t border-gray-200">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Portfolio Under Residence
          </h2>
          <div className="w-14 h-1 bg-brand-500 mx-auto mt-2 rounded-full" />
        </div>

        {/* BD Interior Tab Navigation for Residence: Swipeable on mobile, wrapped on desktop */}
        <div className="bd-tab-nav-wrapper overflow-x-auto no-scrollbar pb-3 pt-1 mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <ul className="flex sm:flex-wrap flex-nowrap items-center sm:justify-center justify-start gap-2 list-none p-0 m-0 w-max sm:w-auto">
            {residenceTabs.map((tab) => {
              const isActive = activeResidenceTab.toLowerCase() === tab.toLowerCase();
              return (
                <li key={tab} className="inline-block shrink-0">
                  <button
                    onClick={() => handleSelectResidenceTab(tab)}
                    className={`cursor-pointer px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 select-none whitespace-nowrap ${
                      isActive
                        ? "bg-brand-500 text-white shadow-sm border border-brand-500"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-brand-400 hover:text-brand-500"
                    }`}
                  >
                    {tab}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Residence Cards Grid (Clean, Fresh Architectural Polish) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResidenceProjects.map((project, idx) => (
            <article
              key={project._id || project.title + idx}
              data-aos="fade-up"
              data-aos-delay={30 + (idx % 6) * 30}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bd-item-card rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview Container with BD Interior POP Animation */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover elementor-animation-pop transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category badge */}
                <span className="absolute top-3 left-3 rounded-md bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {project.category}
                </span>

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <span className="rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                    View Gallery ↗
                  </span>
                </div>
              </div>

              {/* Clean Item Bottom Bar with Title & Arrow */}
              <div className="p-4 bg-white border-t border-slate-100 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 text-center flex items-center justify-center gap-1.5 group-hover:text-brand-500 transition-colors">
                    <span>{project.title}</span>
                    <span className="text-brand-500 font-bold transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </h3>
                  {project.location && (
                    <p className="mt-1 text-xs text-slate-500 text-center font-normal truncate">
                      {project.location}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. PORTFOLIO UNDER OFFICE
          Matching BD Interior:
          - Heading: "Portfolio Under Office"
          - Horizontal Tab Bar: All, Conference Room, MD Room, Workstations, Reception
          - Project Cards: with elementor-animation-pop hover effect + bottom bar with "Title →"
          ======================================================== */}
      <section id="office-portfolio" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 border-t border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Portfolio Under Office
          </h2>
          <div className="w-12 h-0.5 bg-brand-500 mx-auto mt-2" />
        </div>

        {/* BD Interior Tab Navigation for Office: Swipeable on mobile, wrapped on desktop */}
        <div className="bd-tab-nav-wrapper overflow-x-auto no-scrollbar pb-3 pt-1 mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <ul className="flex sm:flex-wrap flex-nowrap items-center sm:justify-center justify-start gap-2 list-none p-0 m-0 w-max sm:w-auto">
            {officeTabs.map((tab) => {
              const isActive = activeOfficeTab.toLowerCase() === tab.toLowerCase();
              return (
                <li key={tab} className="inline-block shrink-0">
                  <button
                    onClick={() => handleSelectOfficeTab(tab)}
                    className={`cursor-pointer px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 select-none whitespace-nowrap ${
                      isActive
                        ? "bg-brand-500 text-white shadow-sm border border-brand-500"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-brand-400 hover:text-brand-500"
                    }`}
                  >
                    {tab}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Office Cards Grid (Clean, Fresh Architectural Polish) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOfficeProjects.map((project, idx) => (
            <article
              key={project._id || project.title + idx}
              data-aos="fade-up"
              data-aos-delay={30 + (idx % 4) * 30}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bd-item-card rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview Container with BD Interior POP Animation */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover elementor-animation-pop transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category badge */}
                <span className="absolute top-3 left-3 rounded-md bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {project.category}
                </span>

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <span className="rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                    View Gallery ↗
                  </span>
                </div>
              </div>

              {/* Clean Item Bottom Bar with Title & Arrow */}
              <div className="p-4 bg-white border-t border-slate-100 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 text-center flex items-center justify-center gap-1.5 group-hover:text-brand-500 transition-colors">
                    <span>{project.title}</span>
                    <span className="text-brand-500 font-bold transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </h3>
                  {project.location && (
                    <p className="mt-1 text-xs text-slate-500 text-center font-normal truncate">
                      {project.location}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. GET YOUR INTERIOR COST IDEAS & FREE CONSULTATION CTA
          (Matching BD Interior's Bottom Section)
          ======================================================== */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#0b1325] via-[#111e38] to-[#0b1325] p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <span className="rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
                Turnkey Interior Solutions
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold mt-3 text-white leading-tight">
                Get Your Interior Cost Ideas & Free Consultation
              </h2>
              <p className="mt-3 text-xs sm:text-base text-gray-300 leading-relaxed">
                Connect directly with our senior architects at <strong>Dimension Composition</strong>. Get an instant layout consultation, material selection guide, and accurate budget estimation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/cost-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-6 py-3.5 text-sm font-bold shadow-xl transition hover:scale-105"
              >
                Cost Calculator →
              </Link>
              <a
                href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20would%20like%20a%20free%20design%20consultation%20and%20cost%20estimate."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 text-sm font-bold shadow-xl transition hover:scale-105"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}
