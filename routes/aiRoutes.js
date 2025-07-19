import express from "express";
import { getHealthAdvice } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/getAdvice", authMiddleware, getHealthAdvice);

export default router;
