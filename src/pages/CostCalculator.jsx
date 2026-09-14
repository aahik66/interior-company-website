import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config/api";
import {
  HiOutlineChevronRight,
  HiOutlineCalculator,
  HiOutlineCheckCircle,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlinePhone,
  HiOutlinePrinter,
  HiOutlineSparkles,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

// 1. Home Size Options (with size multipliers)
const sizeOptions = [
  { label: "800 - 1,000 sq.ft", value: "800-1000", multiplier: 0.9, avgSqft: 900 },
  { label: "1,000 - 1,200 sq.ft", value: "1000-1200", multiplier: 1.0, avgSqft: 1100 },
  { label: "1,200 - 1,500 sq.ft", value: "1200-1500", multiplier: 1.2, avgSqft: 1350 },
  { label: "1,500 - 1,800 sq.ft", value: "1500-1800", multiplier: 1.45, avgSqft: 1650 },
  { label: "1,800 - 2,200 sq.ft", value: "1800-2200", multiplier: 1.75, avgSqft: 2000 },
  { label: "2,200 - 2,800 sq.ft", value: "2200-2800", multiplier: 2.1, avgSqft: 2500 },
  { label: "2,800+ sq.ft (Duplex/Penthouse)", value: "2800+", multiplier: 2.6, avgSqft: 3000 },
];

// Flat Status Options
const flatStatuses = [
  { id: "ready", label: "Ready for Interior", desc: "Handover complete, ready for woodwork" },
  { id: "under_construction", label: "Under Construction", desc: "Handover in 3 to 12 months" },
  { id: "not_ready", label: "Bare Shell / Old Flat", desc: "Requires civil/renovation work" },
];

// Room Definitions with Initial Counts
const roomTypes = [
  { id: "living", label: "Living Room", defaultCount: 1, baseCost: 40000 },
  { id: "kitchen", label: "Kitchen", defaultCount: 1, baseCost: 35000 },
  { id: "bedroom", label: "Bedrooms", defaultCount: 3, baseCost: 30000 },
  { id: "dining", label: "Dining Room", defaultCount: 1, baseCost: 25000 },
  { id: "bathroom", label: "Bathrooms", defaultCount: 2, baseCost: 15000 },
  { id: "foyer", label: "Foyer & Entry Lobby", defaultCount: 1, baseCost: 15000 },
  { id: "family_living", label: "Family Living", defaultCount: 0, baseCost: 25000 },
];

// Room Add-on Features with Pricing (BDT) matching BD Interior
const roomAddonsData = {
  living: {
    roomName: "Living Room",
    features: [
      { id: "l_ceiling", label: "Wooden False Ceiling with Cove LED", price: 40000 },
      { id: "l_tv", label: "Feature TV Unit with Console Drawer", price: 50000 },
      { id: "l_door", label: "Folding / Sliding Glass Partition Door", price: 100000 },
      { id: "l_showpiece", label: "Showpieces & Artifacts Display Cabinet", price: 25000 },
      { id: "l_panel", label: "Fluted Wood Acoustic Wall Paneling", price: 25000 },
      { id: "l_paint", label: "Luxury Plastic Emulsion Wall Paint", price: 15000 },
    ],
  },
  kitchen: {
    roomName: "Kitchen",
    features: [
      { id: "k_cabinet", label: "Modular HPL/Acrylic Cabinetry & Island", price: 140000 },
      { id: "k_accessories", label: "Blum/Hafele SS Baskets & Pullouts", price: 40000 },
      { id: "k_chimney", label: "Concealed Duct Hood & Quartz Top Prep", price: 35000 },
    ],
  },
  bedroom: {
    roomName: "Bedrooms",
    features: [
      { id: "b_cabinet", label: "Floor-to-Ceiling Wardrobe with Dressing", price: 90000 },
      { id: "b_ceiling", label: "Wooden False Ceiling with Cove Lighting", price: 40000 },
      { id: "b_bedhead", label: "Upholstered Bed Headboard Wall Panel", price: 30000 },
      { id: "b_study", label: "Built-in Study Desk & Floating Shelf", price: 25000 },
      { id: "b_wallpaper", label: "Imported Textured Wallpaper Feature Wall", price: 20000 },
      { id: "b_paint", label: "Eco-friendly Odorless Premium Wall Paint", price: 15000 },
    ],
  },
  dining: {
    roomName: "Dining Room",
    features: [
      { id: "d_wagon", label: "Dining Dinner Wagon & Crockery Display", price: 60000 },
      { id: "d_ceiling", label: "Wooden Drop Ceiling with Chandelier Slot", price: 35000 },
      { id: "d_basin", label: "Handwash Basin Vanity Cabinet & Mirror", price: 25000 },
      { id: "d_panel", label: "Bronze Mirror & Wood Wall Accent", price: 20000 },
    ],
  },
  bathroom: {
    roomName: "Bathrooms",
    features: [
      { id: "ba_shower", label: "Toughened Glass Shower Enclosure", price: 35000 },
      { id: "ba_vanity", label: "Floating Quartz Basin Vanity & LED Mirror", price: 25000 },
    ],
  },
  foyer: {
    roomName: "Foyer & Entry Lobby",
    features: [
      { id: "f_shoerack", label: "Built-in Shoe Rack with Foyer Display", price: 30000 },
      { id: "f_ceiling", label: "Entry Drop Ceiling with Welcome Spotlight", price: 20000 },
      { id: "f_panel", label: "Vertical Wooden Slat Divider Partition", price: 20000 },
    ],
  },
  family_living: {
    roomName: "Family Living",
    features: [
      { id: "fl_floor", label: "Raised Japanese Wooden Floor Platform", price: 50000 },
      { id: "fl_tv", label: "Entertainment TV Wall Panel", price: 45000 },
      { id: "fl_ceiling", label: "Ambient Wooden Ceiling with Dimmers", price: 35000 },
    ],
  },
};

// 3 Quality Packages matching BD Interior
const packages = [
  {
    id: "standard",
    name: "Standard Package",
    tagline: "Essential High Quality",
    modifier: 1.0,
    features: [
      "Malaysian Gorjon Plywood & HPL Finish",
      "Standard Soft-close Hinges & Drawer Runners",
      "Berger Luxury Silk Emulsion Paint",
      "Recessed LED Spot & Strip Illumination",
      "1-Year Free Maintenance Service",
    ],
  },
  {
    id: "superior",
    name: "Superior Package",
    tagline: "Most Popular Choice",
    isPopular: true,
    modifier: 1.25,
    features: [
      "Action TESA Grade-A Moisture-Resistant HDHMR",
      "Austrian Blum / Hafele Soft-Close Hardware",
      "Anti-scratch Acrylic & Lacquered Finish Shutters",
      "3000K Warm Dim-to-Warm Lighting Scheme",
      "5-Year Workmanship Warranty",
    ],
  },
  {
    id: "signature",
    name: "Signature Luxury",
    tagline: "Architectural Ultra-Luxury",
    modifier: 1.55,
    features: [
      "Imported Italian Statuario Marble Accents",
      "Handcrafted Natural Wood Veneer Paneling",
      "Motorized Sliding Systems & Sensor Wardrobes",
      "Smart Home Automation & Scene Lighting Integration",
      "Lifetime Structural Guarantee & Priority VIP Care",
    ],
  },
];

export default function CostCalculator() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 States
  const [selectedSize, setSelectedSize] = useState("1200-1500");
  const [selectedFlatStatus, setSelectedFlatStatus] = useState("ready");
  const [roomCounts, setRoomCounts] = useState({
    living: 1,
    kitchen: 1,
    bedroom: 3,
    dining: 1,
    bathroom: 2,
    foyer: 1,
    family_living: 0,
  });

  // Step 2 States (Selected Add-ons mapped by room)
  const [selectedAddons, setSelectedAddons] = useState({
    living: ["l_tv", "l_ceiling"],
    kitchen: ["k_cabinet", "k_accessories"],
    bedroom: ["b_cabinet", "b_ceiling"],
    dining: ["d_wagon"],
    bathroom: ["ba_vanity"],
    foyer: ["f_shoerack"],
    family_living: [],
  });

  // Step 3 State (Selected Package)
  const [selectedPackage, setSelectedPackage] = useState("superior");

  // Step 4 States (Contact Info)
  const [contact, setContact] = useState({
    name: "",
    email: "",
    countryCode: "+880",
    phone: "",
    location: "Dhaka",
  });

  // Calculation Math
  const calculationResults = useMemo(() => {
    const sizeObj = sizeOptions.find((s) => s.value === selectedSize) || sizeOptions[2];
    const sizeMultiplier = sizeObj.multiplier;
    const pkgObj = packages.find((p) => p.id === selectedPackage) || packages[1];
    const packageModifier = pkgObj.modifier;

    let subtotal = 0;
    const roomBreakdowns = [];

    // Calculate room costs
    roomTypes.forEach((room) => {
      const count = roomCounts[room.id] || 0;
      if (count > 0) {
        const roomAddonData = roomAddonsData[room.id];
        let addonsTotal = 0;
        const chosenFeatures = [];

        if (roomAddonData) {
          const activeIds = selectedAddons[room.id] || [];
          roomAddonData.features.forEach((feat) => {
            if (activeIds.includes(feat.id)) {
              addonsTotal += feat.price;
              chosenFeatures.push(feat);
            }
          });
        }

        // Single room cost = (base cost + addons) * sizeMultiplier
        const singleRoomCost = (room.baseCost + addonsTotal) * sizeMultiplier;
        const totalRoomCost = singleRoomCost * count;
        subtotal += totalRoomCost;

        roomBreakdowns.push({
          room: room.label,
          count,
          singleCost: Math.round(singleRoomCost * packageModifier),
          totalCost: Math.round(totalRoomCost * packageModifier),
          features: chosenFeatures.map((f) => f.label),
        });
      }
    });

    const finalEstimatedTotal = Math.round(subtotal * packageModifier);
    const lowRange = Math.round(finalEstimatedTotal * 0.95);
    const highRange = Math.round(finalEstimatedTotal * 1.08);
    const perSqftRate = Math.round(finalEstimatedTotal / (sizeObj.avgSqft || 1350));

    return {
      sizeObj,
      pkgObj,
      roomBreakdowns,
      finalEstimatedTotal,
      lowRange,
      highRange,
      perSqftRate,
    };
  }, [selectedSize, roomCounts, selectedAddons, selectedPackage]);

  // Room Count handlers
  const handleCountChange = (roomId, delta) => {
    setRoomCounts((prev) => {
      const current = prev[roomId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [roomId]: next };
    });
  };

  // Add-on Toggle handler
  const handleToggleAddon = (roomId, featureId) => {
    setSelectedAddons((prev) => {
      const currentList = prev[roomId] || [];
      const exists = currentList.includes(featureId);
      const nextList = exists
        ? currentList.filter((id) => id !== featureId)
        : [...currentList, featureId];
      return { ...prev, [roomId]: nextList };
    });
  };

  // WhatsApp Send Estimate
  const handleSendWhatsApp = () => {
    const summaryText = `*Dimension Composition Interior Estimate*
Client Name: ${contact.name || "Valued Client"}
Location: ${contact.location || "Dhaka"}
Home Size: ${calculationResults.sizeObj.label}
Package: ${calculationResults.pkgObj.name}
Total Estimate Range: ৳ ${calculationResults.lowRange.toLocaleString()} - ৳ ${calculationResults.highRange.toLocaleString()} BDT
Estimated Per Sq.Ft: ৳ ${calculationResults.perSqftRate.toLocaleString()} / sft

I would like to discuss this estimate with a Senior Architect.`;

    const url = `https://wa.me/8801739835017?text=${encodeURIComponent(summaryText)}`;
    window.open(url, "_blank");
  };

  const handleShowFinalEstimate = () => {
    setCurrentStep(5);
    // Persist lead to backend API so admin can follow up in Admin Panel
    fetch(`${API_BASE}/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: contact.name || "Anonymous Client",
        email: contact.email || "client@inquiry.com",
        phone: contact.phone || "Not Provided",
        location: contact.location || "Dhaka, Bangladesh",
        size: calculationResults.sizeObj?.label || "",
        packageType: calculationResults.pkgObj?.name || "",
        totalEstimatedLow: calculationResults.lowRange || 0,
        totalEstimatedHigh: calculationResults.highRange || 0,
        roomCounts,
        selectedAddons,
        roomBreakdowns: calculationResults.roomBreakdowns || [],
      }),
    }).catch((err) => console.warn("Could not save quote lead:", err));
  };

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-800">
      {/* 1. Header Banner */}
      <section className="relative isolate overflow-hidden bg-slate-900 pt-28 pb-12 sm:pt-32 sm:pb-16 text-white">
        <img
          src="/assets/projects/livingroom4.jpg"
          alt="Interior Cost Calculator"
          className="absolute inset-0 h-full w-full object-cover opacity-20 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 mb-4">
            <Link to="/" className="hover:text-brand-500 transition">
              Home
            </Link>
            <HiOutlineChevronRight className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-brand-500 font-semibold">Cost Calculator</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
                <HiOutlineCalculator className="h-4 w-4" />
                Instant Price Engine
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Calculate Your Dream Space <span className="text-brand-500">Cost Instantly</span>
              </h1>
              <p className="mt-3 max-w-2xl text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                Transparent, itemized interior budget estimation for apartments, duplexes, and penthouses in Bangladesh. Choose your home size, select rooms, customize add-ons, and get accurate figures.
              </p>
            </div>

            <a
              href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20would%20like%20a%20free%20cost%20estimation%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 text-sm font-semibold shadow transition hover:scale-105 self-start md:self-auto"
            >
              <FaWhatsapp className="h-4 w-4" />
              Direct Architect Query
            </a>
          </div>
        </div>
      </section>

      {/* 2. Step Progress Bar */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="mx-auto w-full max-w-4xl px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between sm:justify-center sm:gap-8 overflow-x-auto no-scrollbar">
            {[
              { num: 1, title: "Size & Rooms" },
              { num: 2, title: "Add-ons" },
              { num: 3, title: "Package" },
              { num: 4, title: "Contact" },
              { num: 5, title: "Estimate" },
            ].map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div
                  key={step.num}
                  onClick={() => {
                    if (step.num < currentStep) setCurrentStep(step.num);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 ${
                    isCurrent
                      ? "text-brand-500 font-bold"
                      : isDone
                      ? "text-slate-800 font-medium"
                      : "text-slate-400 font-normal"
                  }`}
                >
                  <div
                    className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-brand-500 text-white shadow"
                        : isDone
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}
                  >
                    {isDone ? "✓" : step.num}
                  </div>
                  <span className="text-[11px] sm:text-xs">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Wizard Content Body */}
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* STEP 1: SIZE, STATUS & ROOMS */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
                Step 1 of 5
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Select Home Size & Rooms
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Specify your apartment area and room count to calculate initial woodwork and spatial volume.
              </p>
            </div>

            {/* Home Size Select */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                1. Select Flat / Home Size (Sq.Ft)
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium"
              >
                {sizeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Flat Status */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className="block text-sm font-bold text-slate-900 mb-3">
                2. Select Flat Readiness Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {flatStatuses.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setSelectedFlatStatus(st.id)}
                    className={`cursor-pointer rounded-lg p-4 border transition-all ${
                      selectedFlatStatus === st.id
                        ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <p className="text-sm font-bold text-slate-900">{st.label}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms Selector */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className="block text-sm font-bold text-slate-900 mb-3">
                3. Select Rooms to Design
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roomTypes.map((room) => {
                  const count = roomCounts[room.id] || 0;
                  return (
                    <div
                      key={room.id}
                      className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/50"
                    >
                      <span className="text-sm font-semibold text-slate-900">
                        {room.label}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleCountChange(room.id, -1)}
                          disabled={count === 0}
                          className="h-8 w-8 rounded-md bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-sm font-bold text-slate-900">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCountChange(room.id, 1)}
                          className="h-8 w-8 rounded-md bg-brand-500 text-white font-bold hover:bg-brand-600 flex items-center justify-center shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 text-sm font-bold shadow transition hover:scale-105"
              >
                Continue to Room Add-ons <HiOutlineArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ROOM ADD-ONS (Only for selected rooms!) */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
                Step 2 of 5
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Select Design Options & Add-ons
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Choose the specific furniture, ceiling, and wall paneling work you want in each room.
              </p>
            </div>

            {/* Render sections for rooms with count > 0 */}
            <div className="space-y-6">
              {roomTypes.map((room) => {
                const count = roomCounts[room.id] || 0;
                if (count === 0) return null;
                const addonInfo = roomAddonsData[room.id];
                if (!addonInfo) return null;

                const chosen = selectedAddons[room.id] || [];

                return (
                  <div
                    key={room.id}
                    className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-brand-500" />
                        Add-ons for {addonInfo.roomName} ({count} {count > 1 ? "Rooms" : "Room"})
                      </h3>
                      <span className="text-xs text-slate-500">
                        {chosen.length} selected
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {addonInfo.features.map((feat) => {
                        const isChecked = chosen.includes(feat.id);
                        return (
                          <label
                            key={feat.id}
                            onClick={() => handleToggleAddon(room.id, feat.id)}
                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${
                              isChecked
                                ? "border-brand-500 bg-brand-50/40 text-slate-900"
                                : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="mt-1 h-4 w-4 rounded text-brand-500 focus:ring-brand-500 border-slate-300"
                            />
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm font-semibold">{feat.label}</p>
                              <p className="text-xs text-brand-600 font-bold mt-0.5">
                                + ৳ {feat.price.toLocaleString()} BDT
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white text-slate-700 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50 transition"
              >
                <HiOutlineArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 text-sm font-bold shadow transition hover:scale-105"
              >
                Choose Quality Package <HiOutlineArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PICK YOUR PACKAGE */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
                Step 3 of 5
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Pick Your Quality Package
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Select your preferred grade of boards, fittings, and surface finishes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => {
                const isSelected = selectedPackage === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`cursor-pointer rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between relative ${
                      isSelected
                        ? "border-brand-500 bg-white shadow-xl ring-2 ring-brand-500 -translate-y-1"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    {pkg.isPopular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                      <p className="text-xs text-brand-600 font-semibold mt-0.5">
                        {pkg.tagline}
                      </p>

                      <div className="my-4 border-t border-slate-100 pt-4 space-y-2.5">
                        {pkg.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <HiOutlineCheckCircle className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <div
                        className={`w-full py-2 rounded-lg text-xs font-bold text-center transition ${
                          isSelected
                            ? "bg-brand-500 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select Package"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white text-slate-700 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50 transition"
              >
                <HiOutlineArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 text-sm font-bold shadow transition hover:scale-105"
              >
                Review & Contact Details <HiOutlineArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT INFO */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
                Step 4 of 5
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Your Estimate Is Almost Ready
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Provide your contact details to view the personalized itemized cost summary and download the PDF.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder="e.g. Shakil Ahmed"
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-xs font-bold text-slate-600">
                      +880
                    </span>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      placeholder="01712345678"
                      className="w-full rounded-r-lg border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Flat / Property Location in Bangladesh *
                </label>
                <input
                  type="text"
                  value={contact.location}
                  onChange={(e) => setContact({ ...contact, location: e.target.value })}
                  placeholder="e.g. Gulshan-2, Banani, Uttara Sector 4, Bashundhara R/A"
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white text-slate-700 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50 transition"
              >
                <HiOutlineArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleShowFinalEstimate}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white px-7 py-3 text-sm font-bold shadow transition hover:scale-105"
              >
                Show My Final Estimate →
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: FINAL ESTIMATE (Itemized Breakdown matching BD Interior) */}
        {currentStep === 5 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
                Calculation Complete
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                Your Final Interior Estimate
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Personalized cost assessment for <strong>{contact.name || "Client"}</strong> ({contact.location || "Dhaka"})
              </p>
            </div>

            {/* Highlighted Price Card */}
            <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-slate-800 text-center relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                Total Estimated Cost Range
              </span>
              <div className="mt-3 flex flex-wrap items-baseline justify-center gap-2">
                <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white break-words">
                  ৳ {calculationResults.lowRange.toLocaleString()} - {calculationResults.highRange.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm text-brand-400 font-bold">BDT</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-300">
                Approx. <strong>৳ {calculationResults.perSqftRate.toLocaleString()} / sq.ft</strong> based on {calculationResults.sizeObj.label} ({calculationResults.pkgObj.name})
              </p>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 text-xs sm:text-sm font-bold shadow-lg transition hover:scale-105"
                >
                  <FaWhatsapp className="h-5 w-5" /> Send Quote via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 px-6 py-3.5 text-xs sm:text-sm font-bold shadow transition"
                >
                  <HiOutlinePrinter className="h-5 w-5" /> Print / Save Estimate
                </button>
              </div>
            </div>

            {/* Room by Room Breakdown Table */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 pb-3 border-b border-slate-100">
                Itemized Room Breakdown
              </h3>
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[480px]">
                  <thead className="bg-slate-50 text-[11px] sm:text-xs font-bold uppercase text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3 sm:px-4">Room Space</th>
                      <th className="py-3 px-3 sm:px-4">Quantity</th>
                      <th className="py-3 px-3 sm:px-4">Selected Features</th>
                      <th className="py-3 px-3 sm:px-4 text-right">Estimated Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {calculationResults.roomBreakdowns.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-3 px-3 sm:px-4 font-bold text-slate-900">{item.room}</td>
                        <td className="py-3 px-3 sm:px-4">{item.count}</td>
                        <td className="py-3 px-3 sm:px-4 text-[11px] sm:text-xs text-slate-500 max-w-xs">
                          {item.features.length > 0 ? item.features.join(", ") : "Standard Layout"}
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-right font-bold text-slate-900 whitespace-nowrap">
                          ৳ {item.totalCost.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recalculate Button */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-semibold text-brand-500 hover:underline"
              >
                ← Edit Choices & Recalculate
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
