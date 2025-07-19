import express from "express";
import { reportSymptoms } from "../controllers/patientController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/reportSymptoms", authMiddleware, reportSymptoms);

export default router;
