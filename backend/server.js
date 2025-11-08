import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import captureRoutes from "./routes/captureRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.use("/api/v1/capture", captureRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/search", searchRoutes);

app.get("/", (req, res) => res.send("🧠 Project Synapse API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
