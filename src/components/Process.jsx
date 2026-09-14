import {
  HiOutlineChatAlt2,
  HiOutlinePencilAlt,
  HiOutlineCog,
  HiOutlineHome,
} from "react-icons/hi";

const steps = [
  {
    title: "Consultation",
    description: "We listen, learn, and map out your lifestyle, project scope, and investment level.",
    icon: HiOutlineChatAlt2,
  },
  {
    title: "Design Planning",
    description: "Concept boards, material palettes, spatial planning, and 3D visuals to align on direction.",
    icon: HiOutlinePencilAlt,
  },
  {
    title: "Execution",
    description: "Procurement, vendor coordination, and site supervision to keep quality and timelines tight.",
    icon: HiOutlineCog,
  },
  {
    title: "Delivery",
    description: "Styling, handover, and post-install walkthroughs to ensure every detail feels perfect.",
    icon: HiOutlineHome,
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full bg-transparent py-12 sm:py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
            Our process
          </p>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl tracking-tight">
            From first conversation to final reveal
          </h2>
          <p className="text-sm sm:text-base text-gray-600 sm:max-w-3xl sm:mx-auto">
            A seamless, guided journey with transparent milestones, so you always know what happens next.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                data-aos="fade-up"
                data-aos-delay={80 + idx * 60}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-brand-accent opacity-0 transition group-hover:opacity-100" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 ring-1 ring-brand-100">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                  0{idx + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

