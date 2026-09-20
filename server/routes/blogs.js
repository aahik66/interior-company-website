import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// Helper slugify
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const { category, search, admin } = req.query;
    let query = admin === "true" ? {} : { isPublished: true };

    if (category && category !== "All") {
      query.category = { $regex: new RegExp(category, "i") };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs", details: err.message });
  }
});

// Get single blog by slug or id
router.get("/:slugOrId", async (req, res) => {
  try {
    const { slugOrId } = req.params;
    let blog = await Blog.findOne({ slug: slugOrId });
    if (!blog && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slugOrId);
    }

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog post", details: err.message });
  }
});

// Create new blog post
router.post("/", async (req, res) => {
  try {
    const {
      title,
      category,
      image,
      summary,
      content,
      tags,
      author,
      readTime,
      seoTitle,
      seoDescription,
      seoKeywords,
      isPublished,
    } = req.body;

    if (!title || !category || !image || !summary || !content) {
      return res.status(400).json({ error: "Title, category, image, summary, and content are required" });
    }

    let baseSlug = slugify(title);
    let slug = baseSlug;
    let count = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const formattedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim())
      : [];

    const newBlog = new Blog({
      title,
      slug,
      author: author || "Dimension Composition Editorial",
      category,
      image,
      summary,
      content,
      tags: formattedTags,
      readTime: readTime || "5 min read",
      seoTitle: seoTitle || "",
      seoDescription: seoDescription || "",
      seoKeywords: seoKeywords || "",
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog post", details: err.message });
  }
});

// Update blog post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.tags && typeof updateData.tags === "string") {
      updateData.tags = updateData.tags.split(",").map((t) => t.trim());
    }

    if (updateData.title) {
      const existing = await Blog.findById(id);
      if (existing && existing.title !== updateData.title) {
        let baseSlug = slugify(updateData.title);
        let slug = baseSlug;
        let count = 1;
        while (await Blog.findOne({ slug, _id: { $ne: id } })) {
          slug = `${baseSlug}-${count++}`;
        }
        updateData.slug = slug;
      }
    }

    const updated = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog post", details: err.message });
  }
});

// Delete blog post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted successfully", id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog post", details: err.message });
  }
});

export default router;
