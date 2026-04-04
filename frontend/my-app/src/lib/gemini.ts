import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateCodingQuestions() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Generate exactly 30 UNIQUE coding MCQ questions.

Rules:
- Topics: DSA, OOP, algorithms
- Difficulty: engineering level
- Each question must have 4 options
- Include correctAnswer
- No repetition
- Output ONLY JSON array

Format:
[
 {
   "question": "...",
   "options": ["A", "B", "C", "D"],
   "correctAnswer": "A"
 }
]
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const clean = text.replace(/```json|```/g, "");

  return JSON.parse(clean);
}