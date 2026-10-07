import { Link } from "react-router-dom";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineUserGroup,
} from "react-icons/hi";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-white py-16 sm:py-24 text-slate-800 border-b border-slate-100">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual & Experience Card (5 cols) */}
          <div data-aos="fade-right" className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
              <img
                src="/assets/projects/livingroom4.jpg"
                alt="Dimension Composition Luxury Interior Architecture"
                className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-600 font-bold shrink-0">
                    <HiOutlineSparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Turnkey Architecture Studio
                    </p>
                    <p className="text-xs text-slate-500">
                      Dhaka • Chittagong • Nationwide Execution
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="rounded-2xl bg-slate-900 text-white p-3.5 text-center shadow-sm">
                <p className="text-xl sm:text-2xl font-extrabold text-brand-400">10+</p>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">Years Experience</p>
              </div>
              <div className="rounded-2xl bg-slate-900 text-white p-3.5 text-center shadow-sm">
                <p className="text-xl sm:text-2xl font-extrabold text-brand-400">250+</p>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">Projects Delivered</p>
              </div>
              <div className="rounded-2xl bg-slate-900 text-white p-3.5 text-center shadow-sm">
                <p className="text-xl sm:text-2xl font-extrabold text-brand-400">100%</p>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">Turnkey Handover</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial & Value Pillars (7 cols) */}
          <div data-aos="fade-left" className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-700">
                <HiOutlineShieldCheck className="h-4 w-4" />
                About Dimension Composition
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Crafting Spaces with <span className="text-brand-600">Precision, Elegance</span> & Purpose
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At <strong>Dimension Composition</strong>, we believe every space holds the potential to inspire, comfort, and elevate human living. Founded by seasoned spatial architects, our firm delivers comprehensive <strong>turnkey interior architecture and design execution</strong> for luxury residential duplexes, private apartments, and corporate offices across Dhaka and all of Bangladesh.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We eliminate the stress of subcontracting by managing everything in-house—from initial 3D visualization and structural drawings to custom joinery, electrical layout, and final handover on guaranteed milestones.
            </p>

            {/* Core Value Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-brand-300 hover:bg-white shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-brand-500/15 flex items-center justify-center text-brand-600 shrink-0">
                    <HiOutlineCheckCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Turnkey Execution</h3>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  3D design, carpentry, electrical conduits, and finishing all under one roof.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-brand-300 hover:bg-white shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-brand-500/15 flex items-center justify-center text-brand-600 shrink-0">
                    <HiOutlineClock className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Milestone Timelines</h3>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Rigid scheduling with disciplined supervision ensuring on-time project handover.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-brand-600 hover:scale-105"
              >
                Learn More About Us
                <HiOutlineArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about#team"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                <HiOutlineUserGroup className="h-4 w-4 text-brand-600" />
                Meet Our Architects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
