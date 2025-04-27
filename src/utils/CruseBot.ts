import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyA8eCQFL_x0vSHQuB6UokQYuqDq_nCWz4E");

async function askGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

(async () => {
  const answer = await askGemini(
    "generate a ascii art of sun"
  );
  console.log(answer);
})();
