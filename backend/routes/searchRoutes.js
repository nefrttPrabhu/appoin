import express from "express";
import Item from "../models/Item.js";
const router = express.Router();

// Very simple full-text search placeholder (case-insensitive substring search)
// For prototype only: later replace with vector+text blended search.
router.post("/", async (req, res) => {
  const { query } = req.body;
  if (!query) return res.json([]);
  const q = query.toLowerCase();
  const results = await Item.find({
    $or: [
      { "title": { $regex: q, $options: "i" } },
      { "content.text": { $regex: q, $options: "i" } },
      { "ocrText": { $regex: q, $options: "i" } }
    ]
  }).limit(100);
  res.json(results);
});

export default router;
