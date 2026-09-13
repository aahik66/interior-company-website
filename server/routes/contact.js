import express from "express";
import Contact from "../models/Contact.js";
import { adminRequired } from "../middleware/admin.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Public: Submit inquiry form
router.post("/", async (req, res) => {
  const { name, email, phone, projectType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  try {
    const entry = await Contact.create({
      name,
      email,
      phone: phone || "",
      projectType: projectType || "",
      message,
    });

    const { EMAIL_USER, EMAIL_PASS, NOTIFICATION_EMAIL } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS) {
      return res.status(201).json({
        message: "Inquiry received successfully. Our team will contact you shortly.",
        id: entry._id,
        emailStatus: "saved_without_smtp",
      });
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const targetRecipient = NOTIFICATION_EMAIL || EMAIL_USER;

    const companyMail = {
      from: `"Dimension Composition" <${EMAIL_USER}>`,
      to: targetRecipient,
      subject: `New Interior Inquiry from ${name}`,
      html: `
        <h2>New Client Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "Not provided"}</p>
        <p><b>Project Type:</b> ${projectType || "Not provided"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    };

    setImmediate(async () => {
      try {
        await transporter.sendMail(companyMail);
      } catch (err) {
        console.error("Email notification failed:", err.message);
      }
    });

    return res.status(201).json({
      message: "Thank you for reaching out! We will contact you soon.",
      id: entry._id,
      emailStatus: "queued",
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ message: "Unable to process request right now." });
  }
});

// Admin: Get all inquiries
router.get("/", adminRequired, async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { projectType: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 }).lean();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact inquiries", error: err.message });
  }
});

// Admin: Delete inquiry
router.delete("/:id", adminRequired, async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Inquiry not found" });
    res.json({ message: "Inquiry deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete inquiry", error: err.message });
  }
});

export default router;
