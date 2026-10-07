import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const services = [
  {
    name: "Home Interior Design",
    slug: "living-room",
    image: "/assets/categories/living-room.jpg",
    description: "Tailored residential spaces for luxury duplexes, modern flats, and penthouses. Balanced spatial flow, bespoke joinery, and ambient illumination.",
    tag: "Residential",
  },
  {
    name: "Office & Corporate Interior",
    slug: "commercial",
    image: "/assets/projects/livingroom3.jpg",
    description: "High-performance commercial workstations, executive director suites, and acoustic conference rooms engineered for productivity.",
    tag: "Commercial",
  },
  {
    name: "Modular Kitchen Design",
    slug: "kitchen",
    image: "/assets/categories/kitchen.jpg",
    description: "Ergonomic island layouts with imported German Blum & Häfele hydraulic hardware, quartz stone counters, and moisture-resistant HPL cabinetry.",
    tag: "Modular Joinery",
  },
  {
    name: "Master Bedroom & Suite",
    slug: "bedroom",
    image: "/assets/categories/bedroom.jpg",
    description: "Floor-to-ceiling custom wardrobes, upholstered headboard accent panels, integrated vanity dressers, and calming layered lighting.",
    tag: "Private Spaces",
  },
  {
    name: "Living & Dining Lounge",
    slug: "dining",
    image: "/assets/categories/bridal-room.jpg",
    description: "Statement dinner wagons, crockery showcases, fluted wood acoustic TV feature walls, and sliding glass architectural partitions.",
    tag: "Entertainment",
  },
  {
    name: "Restaurant & Showroom Interior",
    slug: "showroom",
    image: "/assets/projects/livingroom4.jpg",
    description: "Experiential retail showrooms and boutique restaurants designed to maximize customer footfall, atmospheric mood, and brand prestige.",
    tag: "Hospitality",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="w-full bg-white py-16 sm:py-24 border-b border-slate-200/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-14 px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference website */}
        <div className="flex flex-col items-center text-center space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f15a24]">
            <span className="h-[2px] w-6 bg-[#f15a24]" />
            <span>Our Services &amp; Expertise</span>
            <span className="h-[2px] w-6 bg-[#f15a24]" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Best Interior Design Services <br className="hidden sm:inline" />
            <span className="text-slate-600 font-semibold">in Bangladesh</span>
          </h2>

          <p className="max-w-3xl text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            From luxury residential homes to corporate offices and commercial showrooms, we provide complete turnkey interior solutions across Dhaka and Bangladesh. Our services include site visits, 2D/3D design, material selection, custom joinery, and professional execution.
          </p>
        </div>

        {/* 6 Services Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <Link
              key={service.name}
              to={`/portfolio`}
              className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              data-aos="fade-up"
              data-aos-delay={idx * 60}
            >
              <div>
                <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
                  <img
                    src={service.image}
                    alt={`${service.name} - Dimension Composition Interior Architecture Dhaka`}
                    width="600"
                    height="375"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                    {service.tag}
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#f15a24] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#f15a24] transition-colors">
                  <span>Explore Design Solutions</span>
                  <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
