import express from "express";
import Item from "../models/Item.js";
const router = express.Router();

// simple list endpoint
router.get("/", async (req, res) => {
  const items = await Item.find({}).sort({ createdAt: -1 }).limit(100);
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const it = await Item.findById(req.params.id);
  if (!it) return res.status(404).json({ message: "Not found" });
  res.json(it);
});

export default router;
