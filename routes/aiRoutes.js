import express from "express";
import { getHealthAdvice, getConsultationCount } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/getAdvice", authMiddleware, getHealthAdvice);
router.get("/consultationCount", authMiddleware, getConsultationCount);
export default router;
