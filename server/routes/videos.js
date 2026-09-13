import express from "express";
import VideoTestimonial from "../models/VideoTestimonial.js";
import { adminRequired } from "../middleware/admin.js";

const router = express.Router();

const DEFAULT_VIDEOS = [
  {
    quote: "DIMENSION COMPOSITION IS WHAT I TRUST",
    clientName: "Engr. Tanvir & Sabrina Ahmed",
    project: "Gulshan-2 Duplex Residence",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/assets/projects/livingroom3.jpg",
    location: "Gulshan, Dhaka",
    order: 1,
  },
  {
    quote: "SURPRISED AT EVERY STEP",
    clientName: "Dr. Kazi Mahfuzur Rahman",
    project: "Consultation & Corporate Office",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    thumbnail: "/assets/projects/kitchen1.jpeg",
    location: "Banani, Dhaka",
    order: 2,
  },
  {
    quote: "WORTHY DECISION",
    clientName: "Mr. & Mrs. Faruque Hassan",
    project: "Minimalist Master Suite",
    youtubeUrl: "https://www.youtube.com/watch?v=tgbNymZ7vqY",
    thumbnail: "/assets/projects/bedroom6.jpeg",
    location: "Dhanmondi, Dhaka",
    order: 3,
  },
  {
    quote: "COULDN'T EXPECT MORE",
    clientName: "Ashraful & Munira Islam",
    project: "Turnkey Apartment Fitout",
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnail: "/assets/projects/livingroom4.jpg",
    location: "Uttara, Dhaka",
    order: 4,
  },
  {
    quote: "EXCEEDED OUR EXPECTATIONS",
    clientName: "Dr. Nazmul & Nasreen Huda",
    project: "Contemporary Luxury Penthouse",
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    thumbnail: "/assets/projects/bedroom5.jpeg",
    location: "Bashundhara R/A, Dhaka",
    order: 5,
  },
];

// Get all video testimonials (Public)
router.get("/", async (_req, res) => {
  try {
    let videos = await VideoTestimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      // Seed default videos into DB for easy editing
      await VideoTestimonial.insertMany(DEFAULT_VIDEOS);
      videos = await VideoTestimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    }
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
});

// Admin: Get all videos (including inactive)
router.get("/all", adminRequired, async (_req, res) => {
  try {
    const videos = await VideoTestimonial.find().sort({ order: 1, createdAt: -1 }).lean();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all videos", error: err.message });
  }
});

// Admin: Add video testimonial
router.post("/", adminRequired, async (req, res) => {
  try {
    const { clientName, quote, project, youtubeUrl, thumbnail, location, order } = req.body;
    if (!clientName || !quote || !youtubeUrl) {
      return res.status(400).json({ message: "Client name, quote, and YouTube URL are required." });
    }

    const video = await VideoTestimonial.create({
      clientName,
      quote,
      project: project || "Interior Design",
      youtubeUrl,
      thumbnail: thumbnail || "",
      location: location || "Dhaka, Bangladesh",
      order: Number(order) || 0,
      isActive: true,
    });

    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: "Failed to create video testimonial", error: err.message });
  }
});

// Admin: Update video testimonial
router.put("/:id", adminRequired, async (req, res) => {
  try {
    const { clientName, quote, project, youtubeUrl, thumbnail, location, order, isActive } = req.body;
    const video = await VideoTestimonial.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (clientName) video.clientName = clientName;
    if (quote) video.quote = quote;
    if (project !== undefined) video.project = project;
    if (youtubeUrl) video.youtubeUrl = youtubeUrl;
    if (thumbnail !== undefined) video.thumbnail = thumbnail;
    if (location !== undefined) video.location = location;
    if (order !== undefined) video.order = Number(order);
    if (isActive !== undefined) video.isActive = Boolean(isActive);

    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Failed to update video testimonial", error: err.message });
  }
});

// Admin: Delete video testimonial
router.delete("/:id", adminRequired, async (req, res) => {
  try {
    const deleted = await VideoTestimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video testimonial deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete video testimonial", error: err.message });
  }
});

export default router;
