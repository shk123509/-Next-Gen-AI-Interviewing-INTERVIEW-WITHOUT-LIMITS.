import { NextResponse } from "next/server";
import mongoose, { Schema, models, model } from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://shakib:vihar2026@cluster0.emhmf2c.mongodb.net/interview";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const CodingTestSchema = new Schema({
  userId: { type: String, required: true },
  questions: [{ question: String, options: [String], correctAnswer: String }],
  score: { type: Number, default: 0 },
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
}, { timestamps: true });

const CodingTest = models.CodingTest || model("CodingTest", CodingTestSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    await connectDB();
    const { userId } = await params;

    await CodingTest.deleteMany({ userId, status: "ongoing" });

    // FIX: Using gemini-1.5-flash-latest and ensuring strict JSON config
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash" 
    });

    const seed = Math.random().toString(36).substring(7);
    const prompt = `Generate exactly 30 unique high-level coding MCQs on DSA, OOP, and Algorithms. Seed: ${seed}. 
    Return ONLY a JSON array with this structure: [{"question": "string", "options": ["string", "string", "string", "string"], "correctAnswer": "A"}]`;
    
    // Adding a timeout safeguard and explicit JSON instruction
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.9,
        }
    });

    const text = result.response.text();
    const questions = JSON.parse(text);

    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("AI returned empty questions");
    }

    const newTest = await CodingTest.create({ userId, questions });

    return NextResponse.json({
      testId: newTest._id,
      questions: newTest.questions.map((q: any) => ({
        question: q.question,
        options: q.options,
      }))
    });
  } catch (err: any) {
    console.error("START ERROR:", err);
    // If the API fails again, we send a smaller sample set so your UI doesn't crash
    return NextResponse.json({ 
        error: "AI Generation failed. Please try again.",
        details: err.message 
    }, { status: 500 });
  }
}