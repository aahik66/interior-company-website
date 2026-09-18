import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { adminRequired } from "../middleware/admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Disk Storage Configuration
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    // Generate clean, collision-free filename
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e6);
    cb(null, `${sanitizedBase}_${uniqueSuffix}${ext}`);
  },
});

// File filter (images and videos)
const fileFilter = (_req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|webp|gif|svg|mp4|webm|mov|ogg)$/i;
  const isExtAllowed = allowedExtensions.test(path.extname(file.originalname));
  if (isExtAllowed) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Supported types: JPG, PNG, WEBP, GIF, SVG, MP4, WEBM, MOV"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 150 * 1024 * 1024, // 150MB max (supports high-res photos and hero videos)
  },
  fileFilter,
});

import { uploadFileToHostinger } from "../utils/hostingerUpload.js";

// Upload Single File (Image or Video)
router.post("/single", adminRequired, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file was uploaded." });
    }

    const fileUrl = await uploadFileToHostinger(req.file.path, req.file.filename);
    res.json({
      message: "File uploaded successfully to Hostinger storage",
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (err) {
    res.status(500).json({ message: "File upload failed", error: err.message });
  }
});

// Upload Multiple Files (e.g. Project Gallery)
router.post("/multiple", adminRequired, upload.array("files", 12), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const fileResults = [];
    for (const file of req.files) {
      const url = await uploadFileToHostinger(file.path, file.filename);
      fileResults.push({ url, filename: file.filename, size: file.size });
    }

    res.json({
      message: `${req.files.length} files uploaded successfully to Hostinger storage`,
      urls: fileResults.map((f) => f.url),
      files: fileResults,
    });
  } catch (err) {
    res.status(500).json({ message: "Multiple file upload failed", error: err.message });
  }
});

export default router;
