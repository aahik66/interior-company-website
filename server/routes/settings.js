import express from "express";
import Setting from "../models/Setting.js";
import { adminRequired } from "../middleware/admin.js";

const router = express.Router();

const DEFAULT_SETTINGS = {
  companyName: "Dimension Composition",
  tagline: "Luxury Interior Architecture & Turnkey Design Studio",
  phoneNumber: "+880 1739-835017",
  secondaryPhoneNumber: "+880 1601-370090",
  whatsappNumber: "8801739835017",
  email: "contact@dimensioncomposition.com",
  address: "House -204, Port Road, Block-A, Bashundhara Riverview, Hashnabad, Keraniganj, Dhaka-1310",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  linkedinUrl: "https://linkedin.com",
  officeHours: "Sat - Thu: 9:30 AM - 7:30 PM (Friday Closed)",
  heroVideoUrl: "https://bdinterior.com/wp-content/uploads/2025/09/homepage-Video-3.mp4",
  heroPosterUrl: "/assets/hero.jpg",
  heroTitle: "Leading Interior Design Company in Bangladesh",
  heroSubtitle:
    "Award-winning interior architecture and turnkey design studio in Bangladesh. 15+ years experience, 700+ successful projects. Get expert design consultation for your dream home & corporate office.",
};

// Get settings (Public)
router.get("/", async (_req, res) => {
  try {
    let settings = await Setting.findOne().lean();
    if (!settings) {
      settings = await Setting.create(DEFAULT_SETTINGS);
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch settings", error: err.message });
  }
});

// Update settings (Admin Only)
router.put("/", adminRequired, async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(DEFAULT_SETTINGS);
    }

    const fields = [
      "companyName",
      "tagline",
      "phoneNumber",
      "secondaryPhoneNumber",
      "whatsappNumber",
      "email",
      "address",
      "facebookUrl",
      "instagramUrl",
      "youtubeUrl",
      "linkedinUrl",
      "officeHours",
      "heroVideoUrl",
      "heroPosterUrl",
      "heroTitle",
      "heroSubtitle",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    await settings.save();
    res.json({ message: "Site settings updated successfully", settings });
  } catch (err) {
    res.status(500).json({ message: "Failed to update settings", error: err.message });
  }
});

export default router;
