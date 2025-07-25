import User from "../models/User.js";
import Symptom from "../models/Symptom.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPatientSymptoms = async (req, res) => {
  try {
    // Trim the id to remove unwanted newline or spaces
    const patientId = req.params.id.trim();

    const symptoms = await Symptom.find({ patient: patientId });

    res.json(symptoms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("name _id email specialization");
    res.json(doctors);
  } catch (error) {
    console.error("Fetch doctors error:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};