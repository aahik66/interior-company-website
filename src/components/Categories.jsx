import { Link } from "react-router-dom";

const categories = [
  {
    name: "Bedroom",
    image: "/assets/categories/bedroom.jpg",
    description: "Soft palettes, sculptural bedside lighting, and bespoke wardrobes tailored to your rituals.",
  },
  {
    name: "Living Room",
    image: "/assets/categories/living-room.jpg",
    description: "Layered seating, curated art, and lighting that sets the mood from sunrise to after-hours.",
  },
  {
    name: "Bridal Room",
    image: "/assets/categories/bridal-room.jpg",
    description: "Calm, elegant suites with romantic textures, concealed storage, and flattering lighting.",
  },
  {
    name: "Kitchen",
    image: "/assets/categories/kitchen.jpg",
    description: "Streamlined cabinetry, stone islands, and integrated appliances for effortless hosting.",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="w-full bg-white py-12 sm:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
            Design categories
          </p>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl tracking-tight">
            Crafted for every room that matters
          </h2>
          <p className="text-sm sm:text-base text-gray-600 sm:max-w-3xl sm:mx-auto">
            From calm bedrooms to statement dining rooms, we tailor textures, light, and flow to the way you live.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, idx) => (
            <Link
              key={category.name}
              to={`/portfolio?category=${encodeURIComponent(category.name)}`}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              data-aos="fade-up"
              data-aos-delay={80 + idx * 40}
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-52 w-full object-cover elementor-animation-pop transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-900 shadow">
                  {idx + 1}
                </span>
              </div>
              <div className="space-y-2 px-5 pb-6 pt-4">
                <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
