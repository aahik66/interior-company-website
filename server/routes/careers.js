import express from "express";
import JobApplication from "../models/JobApplication.js";
import { adminRequired } from "../middleware/admin.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Public: Submit Job Application
router.post("/apply", async (req, res) => {
  const { jobTitle, name, email, phone, experience, portfolio, coverLetter } = req.body;

  if (!jobTitle || !name || !email || !phone) {
    return res.status(400).json({ message: "Job title, name, email, and phone are required." });
  }

  try {
    const application = await JobApplication.create({
      jobTitle,
      name,
      email,
      phone,
      experience: experience || "Not specified",
      portfolio: portfolio || "",
      coverLetter: coverLetter || "",
    });

    // Send Professional HTML Email Notification if SMTP configured
    const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT, NOTIFICATION_EMAIL } = process.env;

    if (EMAIL_USER && EMAIL_PASS) {
      const transporter = EMAIL_HOST
        ? nodemailer.createTransport({
            host: EMAIL_HOST,
            port: Number(EMAIL_PORT) || 465,
            secure: (Number(EMAIL_PORT) || 465) === 465,
            auth: { user: EMAIL_USER, pass: EMAIL_PASS },
          })
        : nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || "gmail",
            auth: { user: EMAIL_USER, pass: EMAIL_PASS },
          });

      const recipient = NOTIFICATION_EMAIL || EMAIL_USER;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; }
            .container { max-width: 650px; background: #ffffff; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
            .header { background: #0f172a; padding: 30px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
            .badge { display: inline-block; background: #f97316; color: #ffffff; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-top: 10px; }
            .content { padding: 30px; color: #334155; line-height: 1.6; }
            .info-grid { background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px; margin-bottom: 24px; }
            .info-row { display: flex; margin-bottom: 12px; font-size: 14px; }
            .info-row:last-child { margin-bottom: 0; }
            .label { font-weight: 700; color: #64748b; width: 140px; shrink: 0; }
            .value { font-weight: 600; color: #0f172a; flex: 1; }
            .value a { color: #f97316; text-decoration: none; word-break: break-all; }
            .cover-box { background: #ffffff; border-left: 4px solid #f97316; padding: 16px; border-radius: 4px; font-style: italic; color: #475569; font-size: 14px; margin-top: 10px; }
            .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
            .btn { display: inline-block; background: #0f172a; color: #ffffff !important; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Dimension Composition</h1>
              <div class="badge">New Job Application</div>
            </div>
            <div class="content">
              <h2 style="margin-top:0; color:#0f172a; font-size:18px;">Application for: <span style="color:#f97316;">${jobTitle}</span></h2>
              <p style="font-size:14px; color:#64748b; margin-bottom:20px;">A candidate has submitted a job application on your website.</p>
              
              <div class="info-grid">
                <div class="info-row"><div class="label">Applicant Name:</div><div class="value">${name}</div></div>
                <div class="info-row"><div class="label">Email Address:</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
                <div class="info-row"><div class="label">Phone Number:</div><div class="value"><a href="tel:${phone}">${phone}</a></div></div>
                <div class="info-row"><div class="label">Experience:</div><div class="value">${experience}</div></div>
                ${portfolio ? `<div class="info-row"><div class="label">Portfolio / Link:</div><div class="value"><a href="${portfolio}" target="_blank">${portfolio}</a></div></div>` : ""}
                <div class="info-row"><div class="label">Applied Date:</div><div class="value">${new Date().toLocaleString()}</div></div>
              </div>

              ${coverLetter ? `
                <h3 style="font-size:15px; color:#0f172a; margin-bottom:6px;">Cover Letter / Candidate Statement:</h3>
                <div class="cover-box">${coverLetter.replace(/\n/g, "<br>")}</div>
              ` : ""}

              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Regarding your application for ${encodeURIComponent(jobTitle)} at Dimension Composition" class="btn">Reply to Applicant</a>
              </div>
            </div>
            <div class="footer">
              This email was automatically generated by Dimension Composition Career Portal.
            </div>
          </div>
        </body>
        </html>
      `;

      setImmediate(async () => {
        try {
          await transporter.sendMail({
            from: `"Dimension Composition Careers" <${EMAIL_USER}>`,
            to: recipient,
            replyTo: email,
            subject: `💼 New Job Application: ${jobTitle} - ${name}`,
            html: htmlContent,
          });
        } catch (err) {
          console.error("Job Application email notification error:", err.message);
        }
      });
    }

    res.status(201).json({
      message: "Application submitted successfully! Our HR team will review your profile.",
      application,
    });
  } catch (error) {
    console.error("Job application error:", error);
    res.status(500).json({ message: "Unable to submit application right now." });
  }
});

// Admin: Get all applications
router.get("/applications", adminRequired, async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { jobTitle: { $regex: search, $options: "i" } },
      ];
    }

    const applications = await JobApplication.find(filter).sort({ createdAt: -1 }).lean();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job applications", error: err.message });
  }
});

// Admin: Update application status
router.patch("/applications/:id/status", adminRequired, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: "Failed to update application status", error: err.message });
  }
});

// Admin: Delete application
router.delete("/applications/:id", adminRequired, async (req, res) => {
  try {
    const deleted = await JobApplication.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete application", error: err.message });
  }
});

export default router;
