import express from "express";
import TeamMember from "../models/TeamMember.js";
import { adminRequired } from "../middleware/admin.js";

const router = express.Router();

const DEFAULT_TEAM = [
  {
    name: "Engr. Kawsar Ahmed",
    role: "CEO",
    education: "BSc in Engineering",
    experience: "20+ Years Experience",
    image: "/assets/team/kawsar-ahmed.jpg",
    bio: "Specializing in ergonomic residential floor layouts, acoustic environments, and bespoke custom furniture curation.",
    order: 1,
  },
  {
    name: "Ar. Anisur Rahman",
    role: "Founder & Principal Architect",
    education: "BSc in Architecture",
    experience: "15+ Years Experience",
    image: "/assets/team/anisur-rahman.jpg",
    bio: "Pioneering architectural minimalism and sustainable luxury residences across Dhaka's upscale neighborhoods.",
    order: 2,
  },
  {
    name: "Engr. Shohid Bin Ali Sumon",
    role: "Project Coordinator",
    education: "BSc in Civil",
    experience: "5+ Years Experience",
    image: "/assets/team/shohid-sumon.jpg",
    bio: "Supervising turnkey site execution, structural coordination, and timely handover.",
    order: 3,
  },
];

// GET all team members (Public)
router.get("/", async (_req, res) => {
  try {
    let list = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    // Auto-seed if empty
    if (list.length === 0) {
      await TeamMember.insertMany(DEFAULT_TEAM);
      list = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch team members", error: err.message });
  }
});

// CREATE team member (Admin Only)
router.post("/", adminRequired, async (req, res) => {
  try {
    const { name, role, education, experience, image, bio, order } = req.body;
    if (!name || !role) {
      return res.status(400).json({ message: "Name and Role are required." });
    }

    const member = await TeamMember.create({
      name,
      role,
      education: education || "",
      experience: experience || "",
      image: image || "",
      bio: bio || "",
      order: Number(order) || 0,
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to create team member", error: err.message });
  }
});

// UPDATE team member (Admin Only)
router.put("/:id", adminRequired, async (req, res) => {
  try {
    const { name, role, education, experience, image, bio, order } = req.body;
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        education,
        experience,
        image,
        bio,
        order: Number(order) || 0,
      },
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Failed to update team member", error: err.message });
  }
});

// DELETE team member (Admin Only)
router.delete("/:id", adminRequired, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete team member", error: err.message });
  }
});

export default router;
