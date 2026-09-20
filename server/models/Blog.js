import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, default: "Dimension Composition Editorial" },
    category: { type: String, required: true, default: "Interior Design" },
    image: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    readTime: { type: String, default: "5 min read" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
