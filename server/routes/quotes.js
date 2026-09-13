import express from "express";
import Quote from "../models/Quote.js";
import { adminRequired } from "../middleware/admin.js";

const router = express.Router();

// Public: Submit cost calculator estimate
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      size,
      packageType,
      totalEstimatedLow,
      totalEstimatedHigh,
      roomCounts,
      selectedAddons,
      roomBreakdowns,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone number are required." });
    }

    const quote = await Quote.create({
      name,
      email,
      phone,
      location: location || "Dhaka, Bangladesh",
      size: size || "",
      packageType: packageType || "",
      totalEstimatedLow: Number(totalEstimatedLow) || 0,
      totalEstimatedHigh: Number(totalEstimatedHigh) || 0,
      roomCounts: roomCounts || {},
      selectedAddons: selectedAddons || {},
      roomBreakdowns: roomBreakdowns || [],
    });

    res.status(201).json({
      message: "Quote estimate recorded successfully",
      id: quote._id,
      quote,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to record quote", error: err.message });
  }
});

// Admin: Get all quotes
router.get("/", adminRequired, async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const quotes = await Quote.find(filter).sort({ createdAt: -1 }).lean();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch quotes", error: err.message });
  }
});

// Admin: Update quote status or notes
router.patch("/:id/status", adminRequired, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    if (status) quote.status = status;
    if (notes !== undefined) quote.notes = notes;

    await quote.save();
    res.json({ message: "Quote status updated", quote });
  } catch (err) {
    res.status(500).json({ message: "Failed to update quote status", error: err.message });
  }
});

// Admin: Delete quote
router.delete("/:id", adminRequired, async (req, res) => {
  try {
    const deleted = await Quote.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Quote not found" });
    res.json({ message: "Quote deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete quote", error: err.message });
  }
});

export default router;
