import express from "express";
import { getAllPatients, getPatientSymptoms } from "../controllers/doctorController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/patients", authMiddleware, getAllPatients);
router.get("/patientSymptoms/:id", authMiddleware, getPatientSymptoms);

export default router;
