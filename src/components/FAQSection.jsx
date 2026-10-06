import React, { useState } from "react";
import { HiChevronDown, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export const faqData = [
  {
    question: "Why is Dimension Composition considered the best interior company in Dhaka?",
    answer:
      "Dimension Composition combines 15+ years of architectural excellence with 700+ handed-over projects across Bangladesh. We provide comprehensive turnkey interior solutions managed by certified architects and engineers, featuring immersive 3D walkthroughs, transparent milestone-based budgeting, bespoke carpentry, and an industry-leading 2-year warranty."
  },
  {
    question: "How much does interior design cost per square foot in Dhaka, Bangladesh?",
    answer:
      "Turnkey interior design costs typically range from ৳1,200 to ৳2,800+ per sq. ft. depending on material specifications, woodwork grade (Gorjon/Marine ply, HPL, Acrylic, Lacquer finish), ceiling design, and lighting fixtures. You can instantly estimate your apartment or duplex budget using our online Interior Cost Calculator."
  },
  {
    question: "What types of residential and commercial spaces do you design?",
    answer:
      "We specialize in both luxury residential (duplex houses, modern apartments, penthouses, modular kitchens, master suites) and corporate commercial architecture (modern ergonomic offices, executive conference rooms, retail showrooms, restaurants, and hospitality spaces)."
  },
  {
    question: "Which areas in Dhaka and Bangladesh do you cover?",
    answer:
      "While our main architectural office is located in Bashundhara Riverview (Keraniganj, Dhaka), our execution teams actively serve all prime areas including Gulshan, Banani, Uttara, Dhanmondi, Bashundhara R/A, DOHS, Mirpur, and provide turnkey execution across all divisions of Bangladesh including Chittagong and Sylhet."
  },
  {
    question: "How long does a complete interior project take to complete?",
    answer:
      "A standard 1,500 - 2,500 sq. ft. residential apartment typically requires 45 to 75 working days from 3D design approval to turnkey handover. Commercial office projects are scheduled with fast-track milestone timelines to minimize client downtime."
  },
  {
    question: "Do you offer warranty and after-handover maintenance?",
    answer:
      "Yes. Every turnkey project executed by Dimension Composition includes a 2-year free service warranty covering craftsmanship, hardware fittings, and structural carpentry, backed by our dedicated maintenance team."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="w-full bg-slate-900 py-16 sm:py-24 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-400">
            <HiOutlineQuestionMarkCircle className="h-4 w-4" />
            Got Questions? We Have Answers
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Frequently Asked <span className="text-brand-500">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about interior design costs, timelines, architectural consultation, and execution in Dhaka, Bangladesh.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-brand-500/50 bg-slate-800/80 shadow-lg shadow-brand-500/10"
                    : "border-slate-800 bg-slate-800/40 hover:border-slate-700 hover:bg-slate-800/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-slate-100 flex-1">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-brand-500 border-brand-500 text-white"
                        : "border-slate-700 bg-slate-900 text-slate-400"
                    }`}
                  >
                    <HiChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-700/50 pt-3 animate-fadeIn">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick CTA footer inside FAQ */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-800/60 via-slate-800 to-slate-800/60 border border-slate-700 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Have a specific architectural query?</h4>
            <p className="text-xs sm:text-sm text-slate-400">Speak directly with our senior design team today.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/cost-calculator"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold transition hover:scale-105"
            >
              Estimate Cost Online
            </Link>
            <a
              href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20have%20an%20interior%20design%20query."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow transition hover:scale-105"
            >
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
