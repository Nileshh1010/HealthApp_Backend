import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

  const models = await genAI.listModels();
  console.log("Available models:", models);
}

listModels();
