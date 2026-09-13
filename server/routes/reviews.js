import express from "express";
import Review from "../models/Review.js";
import { adminRequired } from "../middleware/admin.js";

const router = express.Router();

// Get reviews (Public: returns approved reviews; Admin: can view all)
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : { status: "approved" };
    const reviews = await Review.find(filter).sort({ createdAt: -1 }).lean();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
});

// Admin: Get all reviews regardless of status
router.get("/all", adminRequired, async (_req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all reviews", error: err.message });
  }
});

// Submit review (Public or Authenticated)
router.post("/", async (req, res) => {
  try {
    const { name, rating, comment, designation, project } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "Name, rating, and comment are required." });
    }
    const cappedRating = Math.max(1, Math.min(5, Number(rating)));
    const review = await Review.create({
      name,
      rating: cappedRating,
      comment,
      designation: designation || "Verified Client",
      project: project || "Interior Design",
      status: "approved", // default approved or pending
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit review", error: err.message });
  }
});

// Admin: Toggle review approval
router.patch("/:id/status", adminRequired, async (req, res) => {
  try {
    const { status, isFeatured } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (status) review.status = status;
    if (isFeatured !== undefined) review.isFeatured = isFeatured;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to update review status", error: err.message });
  }
});

// Admin: Delete review
router.delete("/:id", adminRequired, async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete review", error: err.message });
  }
});

export default router;
