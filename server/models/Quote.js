import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, default: "Dhaka, Bangladesh" },
    size: { type: String, default: "" },
    packageType: { type: String, default: "" },
    totalEstimatedLow: { type: Number, default: 0 },
    totalEstimatedHigh: { type: Number, default: 0 },
    roomCounts: { type: mongoose.Schema.Types.Mixed, default: {} },
    selectedAddons: { type: mongoose.Schema.Types.Mixed, default: {} },
    roomBreakdowns: [{ type: mongoose.Schema.Types.Mixed }],
    status: {
      type: String,
      enum: ["new", "contacted", "in_discussion", "converted", "closed"],
      default: "new",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
