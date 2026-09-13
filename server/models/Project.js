import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    duration: { type: String, default: "45 Days" },
    materials: [{ type: String }],
    gallery: [{ type: String }],
    area: { type: String, default: "450 sq.ft" },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
