import mongoose from "mongoose";

const videoTestimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    quote: { type: String, required: true },
    project: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    location: { type: String, default: "Dhaka, Bangladesh" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("VideoTestimonial", videoTestimonialSchema);
