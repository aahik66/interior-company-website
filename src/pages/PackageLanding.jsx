import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { API_BASE } from "../config/api";
import { trackLead, trackContact, trackViewContent } from "../utils/pixel";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import SEOHead from "../components/SEOHead";
import {
  HiOutlineCheckCircle,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineBadgeCheck,
  HiOutlineArrowRight,
  HiOutlineCheck,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

// Pre-configured High-ROI Interior Campaign Packages
export const CAMPAIGN_PACKAGES = {
  "luxury-apartment": {
    slug: "luxury-apartment",
    title: "Luxury Apartment Interior Package",
    banglaTitle: "লাক্সারি অ্যাপার্টমেন্ট ইন্টেরিয়র সলিউশন",
    tagline: "৩ ও ৪ বেডরুমের ফ্ল্যাটের জন্য পূর্ণাঙ্গ টার্নকি ইন্টেরিয়র আর্কিটেকচার",
    priceRange: "৳১,২০০ - ৳২,২০০ / sq.ft",
    deliveryTime: "৪৫ - ৬০ কার্যদিবস",
    bestFor: "1,200 sq.ft থেকে 3,500 sq.ft রেসিডেন্সিয়াল ফ্ল্যাট",
    heroImage: "/assets/categories/living-room.jpg",
    features: [
      "কমপ্লিট 3D ফটোরিয়্যালিস্টিক ডিজাইন ও ২ বার রিভিশন সুবিধা",
      "ইতালিয়ান মার্বেল ও অ্যাক্রিলিক ফিনিশ মডুলার কিচেন",
      "মাস্টার বেডরুমে ফ্লুটেড উড প্যানেলিং ও অ্যাম্বিয়েন্ট লাইটিং",
      "প্রিমিয়াম ড্রপ সিলিং ও ২700K ওয়ার্ম আর্কিটেকচারাল লাইট",
      "হিডেন ওয়্যারিং সহ আধুনিক সলিড উড টিভি কেবিনেট",
      "১০ বছরের ম্যাটেরিয়াল ওয়্যারেন্টি ও লাইফটাইম সাপোর্ট",
    ],
    scope: [
      {
        title: "১. আর্কিটেকচারাল প্ল্যানিং ও ৩ডি",
        desc: "স্পেস অপটিমাইজেশন, 3D রেন্ডার এবং সম্পূর্ণ আর্কিটেকচারাল ওয়ার্কিং ড্রয়িং।",
      },
      {
        title: "২. উডেন ফার্নিচার ও কার্পেন্ট্রি",
        desc: "ওয়াটারপ্রুফ প্লাইউড, অ্যাক্রিলিক শিট ও হেফেল (Hafele) সফট-ক্লোজ ফিটিংস।",
      },
      {
        title: "৩. সিলিং ও ফলস লাইটিং",
        desc: "জিপসাম ফলস সিলিং, কোভ লাইটিং, স্পটলাইট ও ম্যাগনেটিক ট্র্যাক লাইট।",
      },
      {
        title: "৪. টার্নকি প্রজেক্ট ম্যানেজমেন্ট",
        desc: "ডেডিকেটেড সাইট ইঞ্জিনিয়ার তদারকি ও সময়মতো জিরো-ডিফেক্ট হ্যান্ডওভার।",
      },
    ],
  },
  "duplex-home": {
    slug: "duplex-home",
    title: "Exclusive Duplex & Villa Interior",
    banglaTitle: "এক্সক্লুসিভ ডুপ্লেক্স হোম ও ভিলা ডিজাইন",
    tagline: "রাজকীয় ডাবল-হাইট লাউঞ্জ, ঝাড়বাতি ও স্মার্ট হোমের সমন্বয়ে আধুনিক রূপান্তর",
    priceRange: "৳১,৬০০ - ৳২,৮০০ / sq.ft",
    deliveryTime: "৬০ - ৯০ কার্যদিবস",
    bestFor: "2,500 sq.ft থেকে 6,000 sq.ft ডুপ্লেক্স বাড়ি ও পেন্টহাউস",
    heroImage: "/assets/categories/dining.jpg",
    features: [
      "ডাবল-হাইট লিভিং সিলিং ও সেন্ট্রাল লাক্সারি লাইটিং সেটআপ",
      "টেম্পার্ড গ্লাস ও উডেন ফ্লোরিং সহ কাস্টম ডুপ্লেক্স সিঁড়ি",
      "স্মার্ট হোম অটোমেশন ও টাচ-কন্ট্রোল লাইটিং ইনফ্রাস্ট্রাকচার",
      "লাক্সারি ওয়াক-ইন ক্লোজেট ও ড্রেসিং স্পেস ডিজাইন",
      "সাউন্ড-প্রুফ ফ্যামিলি লাউঞ্জ ও হোম থিয়েটার অ্যাকোস্টিক",
      "প্রিমিয়াম আর্কিটেকচারাল কনসাল্টেশন ও অন-সাইট সুপারভিশন",
    ],
    scope: [
      {
        title: "১. ড্রিম হোম কনসেপচুয়াল ড্রয়িং",
        desc: "ডুপ্লেক্সের প্রতিটি কোণার জন্য কাস্টমাইজড থ্রিডি এবং লাইটিং লেআউট।",
      },
      {
        title: "২. সেন্ট্রাল লিভিং ও স্টেয়ারকেস",
        desc: "গ্র্যান্ড সিঁড়ি রূপান্তর, গ্লাস রেলিং এবং দৃষ্টিনন্দন মার্বেল ক্ল্যাডিং।",
      },
      {
        title: "৩. মাস্টার ও প্রেসিডেন্সিয়াল স্যুট",
        desc: "টেক্সচার্ড ওয়াল ফিনিশ, সাউন্ড ড্যাম্পেনিং ও রিচ ওয়ালনাট কেবিনেটরি।",
      },
      {
        title: "৪. প্রিমিয়াম মেটেরিয়াল সিলেকশন",
        desc: "ব্র্যান্ডেড সিরামিক, অ্যান্টি-স্ক্র্যাচ শিট এবং হাই-এন্ড ইলেকট্রিকাল ফিটিংস।",
      },
    ],
  },
  "commercial-office": {
    slug: "commercial-office",
    title: "Modern Corporate Office & Studio Interior",
    banglaTitle: "আধুনিক অফিস ও কমার্শিয়াল স্পেস রূপান্তর",
    tagline: "কাজের পরিবেশ ও ব্র্যান্ড ভ্যালু বাড়ানোর জন্য প্রফেশনাল স্পেস প্ল্যানিং",
    priceRange: "৳৯০০ - ৳১,৮০০ / sq.ft",
    deliveryTime: "৩০ - ৫০ কার্যদিবস",
    bestFor: "1,000 sq.ft থেকে 10,000 sq.ft কর্পোরেট অফিস ও শোরুম",
    heroImage: "/assets/categories/bedroom.jpg",
    features: [
      "এর্গোনোমিক ওয়ার্কস্টেশন ও আধুনিক অ্যাকোস্টিক পার্টিশন",
      "এক্সিকিউটিভ ডিরেক্টর রুম ও সাউন্ডপ্রুফ বোর্ড রুম কনফারেন্স সেটআপ",
      "ব্র্যান্ড আইডেন্টিটি অনুযায়ী রিসেপশন ও ক্লায়েন্ট লাউঞ্জ",
      "সেন্ট্রাল ক্যাবলিং ম্যানেজমেন্ট ও এনার্জি এফিশিয়েন্ট LED লাইটিং",
      "অফিসিয়াল ক্যাফেটেরিয়া ও রিল্যাক্সেশন কর্নার",
      "দ্রুততম সময়ে হ্যান্ডওভারের নিশ্চয়তা",
    ],
    scope: [
      {
        title: "১. ওয়ার্কস্পেস প্ল্যানিং",
        desc: "কর্মীদের কাজের গতি ও ক্লায়েন্ট ইম্প্রেশন বৃদ্ধির নিখুঁত আর্কিটেকচার।",
      },
      {
        title: "২. গ্লাস ও অ্যাকোস্টিক পার্টিশন",
        desc: "অ্যালুমিনিয়াম ফ্রেমলেস গ্লাস ও সাউন্ড-অ্যাবজরবিং প্যানেল স্থাপন।",
      },
      {
        title: "৩. মডুলার অফিস ফার্নিচার",
        desc: "মডার্ন ওয়ার্কস্টেশন, এক্সিকিউটিভ টেবিল ও ফায়ার-রেজিস্ট্যান্ট সিলিং।",
      },
      {
        title: "৪. ফাস্ট-ট্র্যাক এক্সিকিউশন",
        desc: "নির্ধারিত ডেডলাইনের মধ্যে অফিস ওপেনিং নিশ্চিত করার নিশ্চয়তা।",
      },
    ],
  },
};

export default function PackageLanding() {
  const { packageSlug } = useParams();
  const { settings } = useSettings();

  // Selected package fallback to luxury apartment
  const selectedSlug = packageSlug && CAMPAIGN_PACKAGES[packageSlug] ? packageSlug : "luxury-apartment";
  const pkg = CAMPAIGN_PACKAGES[selectedSlug];

  const WHATSAPP_NUM = settings?.whatsappNumber || "8801739835017";
  const PHONE_NUM = settings?.phoneNumber || "+880 1739-835017";

  // Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "Dhaka",
    sizeSqft: "",
    serviceType: pkg.title,
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Track Meta Pixel ViewContent on package load
  useEffect(() => {
    trackViewContent(pkg.title, "Facebook Ad Package");
  }, [pkg.title]);

  const handleWhatsAppClick = (customNote = "") => {
    const message = `Hello Dimension Composition! I saw your ${pkg.title} on Facebook. I would like to get a design consultation and estimate.${
      customNote ? ` Note: ${customNote}` : ""
    }`;
    trackContact("WhatsApp", `${pkg.slug}-landing`);
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCallClick = () => {
    trackContact("Phone Call", `${pkg.slug}-landing`);
    window.location.href = `tel:${PHONE_NUM.replace(/\s+/g, "")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setErrorMsg("অনুগ্রহ করে আপনার নাম এবং মোবাইল নম্বর দিন।");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          notes: `[Facebook Campaign Lead - ${pkg.title}] ${form.notes || ""}`,
        }),
      });

      if (!res.ok) {
        throw new Error("কোটেশন সাবমিট হতে সমস্যা হয়েছে।");
      }

      // Track Meta Pixel Lead Event!
      trackLead({
        content_name: pkg.title,
        content_category: "Package Campaign",
        space_size: form.sizeSqft,
        location: form.location,
      });

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || "সমস্যা হয়েছে, অনুগ্রহ করে সরাসরি ফোন বা হোয়াটসঅ্যাপে যোগাযোগ করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-gray-100 selection:bg-brand-500 selection:text-white">
      <SEOHead
        title={`${pkg.title} | Dimension Composition`}
        description={pkg.tagline}
        keywords="interior design package dhaka, flat interior cost, apartment interior bangladesh, luxury interior design"
        canonical="https://dimensioncomposition.com/packages"
      />

      {/* 1. Trust & Urgency Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-600 via-amber-600 to-brand-500 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center shadow-lg">
        <span className="inline-flex items-center gap-2">
          <HiOutlineSparkles className="h-4 w-4 animate-spin" />
          <span>ফেসবুক ক্যাম্পেইন অফার: এই মাসে ফ্রি ৩ডি লেআউট কনসাল্টেশন ও স্পট বুকিংয়ে বিশেষ ডিসকাউন্ট!</span>
        </span>
      </div>

      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-500/20 text-brand-400 border border-brand-500/30">
              <HiOutlineBadgeCheck className="h-4 w-4" /> {pkg.banglaTitle}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {pkg.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              {pkg.tagline}
            </p>

            {/* Quick Spec Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-slate-200 flex items-center gap-2">
                <span className="text-brand-400 font-bold">খরচ রেঞ্জ:</span> {pkg.priceRange}
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-slate-200 flex items-center gap-2">
                <HiOutlineClock className="h-4 w-4 text-brand-400" />
                <span className="text-brand-400 font-bold">হ্যান্ডওভার:</span> {pkg.deliveryTime}
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-slate-200 flex items-center gap-2">
                <HiOutlineShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>১০ বছর ম্যাটেরিয়াল ওয়ারেন্টি</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => {
                  const formEl = document.getElementById("lead-form-section");
                  if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-amber-600 px-8 py-4 font-bold text-white shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] transition"
              >
                <span>ফ্রি কোটেশন ও কনসাল্টেশন বুক করুন</span>
                <HiOutlineArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => handleWhatsAppClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-8 py-4 font-bold text-white shadow-xl shadow-[#25D366]/25 hover:bg-[#20ba59] hover:scale-[1.02] transition"
              >
                <FaWhatsapp className="h-5 w-5" />
                <span>হোয়াটসঅ্যাপে সরাসরি কথা বলুন</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Package Highlights & Feature Breakdown */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            এই প্যাকেজের অধীনে যা যা অন্তর্ভুক্ত পাচ্ছেন
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            স্বচ্ছ মূল্য ও নিখুঁত ফিনিশিং নিশ্চয়তায় আমাদের পূর্ণাঙ্গ আর্কিটেকচারাল ওয়ার্কফ্রেম
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-16">
          {pkg.features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 hover:border-brand-500/40 transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 flex-shrink-0 mt-0.5">
                <HiOutlineCheck className="h-5 w-5" />
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-200">{feat}</p>
            </div>
          ))}
        </div>

        {/* Step-by-Step Scope Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pkg.scope.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-5 space-y-3"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                ধাপ ০{idx + 1}
              </span>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Before & After Transformation */}
      <section className="py-12 border-t border-b border-white/10 bg-[#0a0f1d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              আমাদের বাস্তব প্রজেক্ট রূপান্তর (Before & After)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              স্লাইডার টেনে দেখুন কীভাবে সাধারণ স্পেস আর্কিটেকচারাল মাস্টাপিসে পরিণত হয়
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* 5. High-Converting Instant Consultation Lead Form */}
      <section id="lead-form-section" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-b from-[#131b2e] to-[#0c1220] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
              ফ্রি প্রজেক্ট এস্টিমেট ও কনসাল্টেশন
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              আপনার ড্রিম হোমের তথ্য দিন
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              ফর্মটি পূরণ করলে আমাদের সিনিয়র ইন্টেরিয়র আর্কিটেক্ট ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-8 text-center space-y-4">
              <HiOutlineCheckCircle className="h-16 w-16 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">ধন্যবাদ! আপনার রিকোয়েস্ট গ্রহণ করা হয়েছে।</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                আমাদের প্রতিনিধি দ্রুত আপনার সাথে ফোনে যোগাযোগ করবেন। জরুরি প্রয়োজনে নিচের হোয়াটসঅ্যাপ বাটনে মেসেজ দিন।
              </p>
              <button
                onClick={() => handleWhatsAppClick("আমি ফর্ম সাবমিট করেছি, দ্রুত আলোচনা করতে চাই।")}
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white shadow-lg"
              >
                <FaWhatsapp className="h-5 w-5" />
                <span>হোয়াটসঅ্যাপে আপডেট দিন</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {errorMsg && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-300 text-center">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. মোঃ আশিকুর রহমান"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    মোবাইল নম্বর (হোয়াটসঅ্যাপ নম্বর হলে ভালো হয়) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    ফ্ল্যাট বা স্পেসের আনুমানিক সাইজ (Sq.ft)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1850 sq.ft বা 3 Bed"
                    value={form.sizeSqft}
                    onChange={(e) => setForm({ ...form, sizeSqft: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    প্রজেক্টের এলাকা / লোকেশন
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. বসুন্ধরা, গুলশান, মিরপুর, উত্তরা..."
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  বিশেষ কোনো চাহিদা বা নির্দেশনা (ঐচ্ছিক)
                </label>
                <textarea
                  rows="3"
                  placeholder="আপনার বিশেষ কোনো পছন্দ বা বাজেট সম্পর্কে লিখতে পারেন..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-brand-500 via-amber-500 to-brand-600 py-4 font-bold text-white shadow-xl shadow-brand-500/30 hover:opacity-95 transition text-base"
              >
                {isSubmitting ? "সাবমিট হচ্ছে..." : "ফ্রি ডিজাইন কনসাল্টেশন রিকোয়েস্ট করুন"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 6. Sticky Mobile Bottom Floating Bar (Crucial for Facebook Ad Conversions!) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0a0f1d]/95 backdrop-blur-md border-t border-white/10 py-2.5 px-4 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
        <button
          onClick={handleCallClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/10 text-white font-bold text-xs"
        >
          <HiOutlinePhone className="h-4 w-4 text-brand-400" />
          <span>কল করুন</span>
        </button>

        <button
          onClick={() => handleWhatsAppClick()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs"
        >
          <FaWhatsapp className="h-4 w-4" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => {
            const formEl = document.getElementById("lead-form-section");
            if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex-1 inline-flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-brand-500 to-amber-600 text-white font-bold text-xs"
        >
          <span>কোটেশন</span>
        </button>
      </div>

      {/* Bottom Padding for Mobile Sticky Bar */}
      <div className="h-16 sm:hidden" />
    </div>
  );
}
