import express from "express";
import Project from "../models/Project.js";
import { adminRequired } from "../middleware/admin.js";

const router = express.Router();

// Get projects (Public)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category.toLowerCase() !== "all") {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 }).lean();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err.message });
  }
});

// Get single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch project", error: err.message });
  }
});

// Create new project (Admin Only)
router.post("/", adminRequired, async (req, res) => {
  try {
    const { title, image, category, description, location, duration, materials, gallery, area, tags } =
      req.body;

    if (!title || !image || !category) {
      return res.status(400).json({ message: "Title, image, and category are required." });
    }

    const newProject = await Project.create({
      title,
      image,
      category,
      description: description || "",
      location: location || "",
      duration: duration || "45 Days",
      materials: Array.isArray(materials) ? materials : materials ? materials.split(",").map((s) => s.trim()) : [],
      gallery: Array.isArray(gallery) ? gallery : gallery ? gallery.split(",").map((s) => s.trim()) : [],
      area: area || "1500 sq.ft",
      tags: Array.isArray(tags) ? tags : tags ? tags.split(",").map((s) => s.trim()) : [],
    });

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: "Failed to create project", error: err.message });
  }
});

// Update project (Admin Only)
router.put("/:id", adminRequired, async (req, res) => {
  try {
    const { title, image, category, description, location, duration, materials, gallery, area, tags } =
      req.body;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (title) project.title = title;
    if (image) project.image = image;
    if (category) project.category = category;
    if (description !== undefined) project.description = description;
    if (location !== undefined) project.location = location;
    if (duration !== undefined) project.duration = duration;
    if (area !== undefined) project.area = area;

    if (materials !== undefined) {
      project.materials = Array.isArray(materials)
        ? materials
        : materials.split(",").map((s) => s.trim());
    }

    if (gallery !== undefined) {
      project.gallery = Array.isArray(gallery)
        ? gallery
        : gallery.split(",").map((s) => s.trim());
    }

    if (tags !== undefined) {
      project.tags = Array.isArray(tags) ? tags : tags.split(",").map((s) => s.trim());
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to update project", error: err.message });
  }
});

// Delete project (Admin Only)
router.delete("/:id", adminRequired, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project", error: err.message });
  }
});

export default router;
