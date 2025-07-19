import genAI from "../utils/gemini.js";

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

    res.json({ advice: aiAdvice });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to get AI advice" });
  }
};
