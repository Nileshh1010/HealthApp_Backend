import mongoose from "mongoose";

const symptomSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Symptom", symptomSchema);
