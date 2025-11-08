import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ["article", "product", "note", "video", "todo"], required: true },
  title: String,
  url: String,
  content: { text: String, summary: String },
  metadata: { author: String, tags: [String], date: Date },
  productInfo: { price: Number, currency: String, brand: String },
  ocrText: String,
  vectorId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Item", itemSchema);
