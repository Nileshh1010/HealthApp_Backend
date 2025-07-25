import genAI from "../utils/gemini.js";
import AIConsultation from "../models/AIConsultation.js";

export const getHealthAdvice = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: "Symptoms are required" });
    }

    const prompt = `A patient reports these symptoms: ${symptoms}. In under 100 words, provide a brief summary of the most likely cause and basic care advice.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const aiAdvice = result.response.text();

    // Save consultation to DB
    await AIConsultation.create({
      user: req.user.id, // captured from auth middleware
      symptoms,
      advice: aiAdvice,
    });

    res.json({ advice: aiAdvice });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to get AI advice" });
  }
};

export const getConsultationCount = async (req, res) => {
  try {
    const count = await AIConsultation.countDocuments();
    res.json({ totalConsultations: count });
  } catch (error) {
    console.error("Consultation count error:", error);
    res.status(500).json({ error: "Failed to get consultation count" });
  }
};
