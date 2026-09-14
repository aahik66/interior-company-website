import express from "express";
import TeamMember from "../models/TeamMember.js";
import { adminRequired } from "../middleware/admin.js";

const router = express.Router();

const DEFAULT_TEAM = [
  {
    name: "Ar. Tanzim Rahman",
    role: "Founder & Principal Architect",
    education: "B.Arch (BUET), MIAB",
    experience: "12+ Years Experience",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Pioneering architectural minimalism and sustainable luxury residences across Dhaka's upscale neighborhoods.",
    order: 1,
  },
  {
    name: "Fariha Chowdhury",
    role: "Head of Interior Architecture",
    education: "M.Sc Interior Design, UK",
    experience: "9+ Years Experience",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Specializing in ergonomic residential floor layouts, acoustic environments, and bespoke custom furniture curation.",
    order: 2,
  },
  {
    name: "Engr. Mahmudul Hasan",
    role: "Chief Project & Execution Engineer",
    education: "B.Sc Civil Engineering (CUET)",
    experience: "10+ Years Experience",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Guarantees precision on-site execution, structural safety compliance, and zero-defect handover timelines.",
    order: 3,
  },
  {
    name: "Shakil Ahmed",
    role: "Lead 3D Architectural Visualizer",
    education: "B.Sc Multimedia & Animation",
    experience: "7+ Years Experience",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: "Transforms blueprints into photorealistic 4K 3D renders, VR walkthroughs, and lifelike lighting simulations.",
    order: 4,
  },
  {
    name: "Nusrat Jahan",
    role: "Senior Interior Stylist & Colorist",
    education: "Fine Arts & Spatial Design (DU)",
    experience: "6+ Years Experience",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Curates Italian marbles, customized textiles, bespoke wallpapers, and mood-adaptive lighting palettes.",
    order: 5,
  },
  {
    name: "Rafiul Islam",
    role: "Quality Assurance Specialist",
    education: "Diploma in Materials & Wood Technology",
    experience: "8+ Years Experience",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    bio: "Ensures every batch of HPL, plywood, and Blum soft-close fittings meets international anti-moisture standards.",
    order: 6,
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
