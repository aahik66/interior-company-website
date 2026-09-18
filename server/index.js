import dns from "node:dns";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });

import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/reviews.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";
import quoteRoutes from "./routes/quotes.js";
import videoRoutes from "./routes/videos.js";
import settingRoutes from "./routes/settings.js";
import uploadRoutes from "./routes/upload.js";
import teamRoutes from "./routes/team.js";
import careerRoutes from "./routes/careers.js";
import { seedProjects } from "./utils/seedProjects.js";

const app = express();
const PORT = process.env.PORT || 5000;

console.log("MongoDB URI loaded:", process.env.MONGO_URI ? "YES" : "NO");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// Serve uploaded user images and videos statically
const uploadsDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// API Status
app.get("/api", (_req, res) =>
  res.json({
    message: "Dimension Composition API is running",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      projects: "/api/projects",
      quotes: "/api/quotes",
      reviews: "/api/reviews",
      videos: "/api/videos",
      contact: "/api/contact",
      settings: "/api/settings",
      upload: "/api/upload",
      careers: "/api/careers",
    },
  })
);
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/careers", careerRoutes);

// Hostinger & Production Single-Port Serving
// Serves built React static assets from ../dist when deployed
const distPath = path.join(__dirname, "../dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Catch-all route to serve index.html for client-side routing (React Router)
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
  console.log("Serving static frontend from ../dist");
}

async function start() {
  let mongoUri = process.env.MONGO_URI;
  let mongoMemoryServer;

  try {
    if (mongoUri) {
      try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB Atlas/Production");
      } catch (err) {
        console.warn(
          "Primary MongoDB connection failed, falling back to temporary MongoDB server:",
          err.message
        );
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        mongoMemoryServer = await MongoMemoryServer.create();
        mongoUri = mongoMemoryServer.getUri();
        await mongoose.connect(mongoUri);
        console.log("Connected to temporary MongoDB");
      }
    } else {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongoMemoryServer = await MongoMemoryServer.create();
      mongoUri = mongoMemoryServer.getUri();
      console.log("No MONGO_URI found, starting temporary MongoDB server");
      await mongoose.connect(mongoUri);
      console.log("Connected to temporary MongoDB");
    }

    await seedProjects();
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Server failed to start", err);
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
    }
    process.exit(1);
  }
}

start();
