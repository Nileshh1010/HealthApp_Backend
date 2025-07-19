import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rescheduled", "completed"],
    default: "pending",
  },
  reason: {
    type: String,
  },
  advice: {
    type: String, // For doctor prescriptions or advice
  },
});

export default mongoose.model("Appointment", appointmentSchema);
