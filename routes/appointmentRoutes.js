import express from "express";
import {
  createAppointment,
  acceptAppointment,
  rescheduleAppointment,
  completeAppointment,
  getPatientAppointments,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createAppointment);
router.get("/myappointments", protect, getPatientAppointments);
router.delete("/:id", protect, deleteAppointment); // new route

router.put("/:id/accept", protect, acceptAppointment);
router.put("/:id/reschedule", protect, rescheduleAppointment);
router.put("/:id/complete", protect, completeAppointment);

export default router;
