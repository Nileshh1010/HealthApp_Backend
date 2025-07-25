// models/AIConsultation.js
import mongoose from "mongoose";

const aiConsultationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who used AI
    symptoms: String,
    advice: String,
  },
  { timestamps: true }
);

export default mongoose.model("AIConsultation", aiConsultationSchema);
