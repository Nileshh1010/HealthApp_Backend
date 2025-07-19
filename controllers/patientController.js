import Symptom from "../models/Symptom.js";

export const reportSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    console.log("Patient ID before saving:", req.user.id);

    // Ensure patient id is trimmed to remove any newline or extra spaces
    const patientId = req.user.id.trim();

    const symptom = new Symptom({
      patient: patientId, // store cleaned ObjectId
      symptoms,
    });

    await symptom.save();

    res.status(201).json({ message: "Symptoms reported successfully" });
  } catch (err) {
    console.error("Error reporting symptoms:", err);
    res.status(500).json({ error: "Server error" });
  }
};
