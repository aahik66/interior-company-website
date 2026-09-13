import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

const signToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role || "user" },
    process.env.JWT_SECRET || "changeme",
    { expiresIn: "7d" }
  );

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered." });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: "user" });
    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to register", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = signToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role || "user" },
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to login", error: err.message });
  }
});

// Admin Setup / Initialization: Checks if any admin exists.
router.get("/admin-status", async (_req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: "admin" });
    res.json({ hasAdmin: adminCount > 0 });
  } catch (err) {
    res.status(500).json({ message: "Error checking admin status", error: err.message });
  }
});

// Setup First Admin
router.post("/setup-admin", async (req, res) => {
  try {
    const { name, email, password, setupKey } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const adminCount = await User.countDocuments({ role: "admin" });
    const expectedKey = process.env.ADMIN_SETUP_SECRET;

    // If an admin already exists and an setupKey is configured, require the key
    if (adminCount > 0) {
      if (!expectedKey || setupKey !== expectedKey) {
        return res
          .status(403)
          .json({ message: "Admin account already exists. Setup key required to create another admin." });
      }
    }

    let user = await User.findOne({ email });
    const hashed = await bcrypt.hash(password, 10);

    if (user) {
      user.name = name;
      user.password = hashed;
      user.role = "admin";
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password: hashed,
        role: "admin",
      });
    }

    const token = signToken(user);
    res.json({
      message: "Admin account successfully configured",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to setup admin", error: err.message });
  }
});

// Current User Profile Verification
router.get("/me", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving profile", error: err.message });
  }
});

export default router;
