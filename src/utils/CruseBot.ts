import { GoogleGenerativeAI } from "@google/generative-ai";

async function askGemini(
  prompt: string,
  key: string = "AIzaSyA8eCQFL_x0vSHQuB6UokQYuqDq_nCWz4E"
): Promise<string> {
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

export { askGemini };
