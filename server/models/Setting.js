import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: "Dimension Composition" },
    tagline: { type: String, default: "Luxury Interior Architecture & Turnkey Design Studio" },
    phoneNumber: { type: String, default: "+880 1739-835017" },
    secondaryPhoneNumber: { type: String, default: "+880 1601-370090" },
    whatsappNumber: { type: String, default: "8801739835017" },
    email: { type: String, default: "contact@dimensioncomposition.com" },
    address: {
      type: String,
      default: "House -204, Port Road, Block-A, Bashundhara Riverview, Hashnabad, Keraniganj, Dhaka-1310",
    },
    facebookUrl: { type: String, default: "https://facebook.com" },
    instagramUrl: { type: String, default: "https://instagram.com" },
    youtubeUrl: { type: String, default: "https://youtube.com" },
    linkedinUrl: { type: String, default: "https://linkedin.com" },
    officeHours: { type: String, default: "Sat - Thu: 9:30 AM - 7:30 PM (Friday Closed)" },
    // Hero Banner Customization
    heroVideoUrl: {
      type: String,
      default: "https://bdinterior.com/wp-content/uploads/2025/09/homepage-Video-3.mp4",
    },
    heroPosterUrl: {
      type: String,
      default: "/assets/hero.jpg",
    },
    heroTitle: {
      type: String,
      default: "Leading Interior Design Company in Bangladesh",
    },
    heroSubtitle: {
      type: String,
      default:
        "Award-winning interior architecture and turnkey design studio in Bangladesh. 15+ years experience, 700+ successful projects. Get expert design consultation for your dream home & corporate office.",
    },
    heroBadge: {
      type: String,
      default: "Welcome to Dimension Composition",
    },
    heroHighlightText: {
      type: String,
      default: "Bangladesh",
    },
    showHeroTitle: {
      type: Boolean,
      default: true,
    },
    showHeroSubtitle: {
      type: Boolean,
      default: true,
    },
    showHeroBadge: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
