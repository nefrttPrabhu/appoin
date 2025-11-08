import express from "express";
import { captureContent } from "../controllers/captureController.js";
const router = express.Router();

router.post("/", captureContent);

export default router;
