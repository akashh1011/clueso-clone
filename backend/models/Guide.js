import mongoose from "mongoose";

const StepSchema = new mongoose.Schema({
  elementText: { type: String, default: "" },
  elementTag: { type: String, default: "" },
  url: { type: String, required: true },
  order: { type: Number, required: true },
  description: { type: String },
});

const GuideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  steps: [StepSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Guide", GuideSchema);
