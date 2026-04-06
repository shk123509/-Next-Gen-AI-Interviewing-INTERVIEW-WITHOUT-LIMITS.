import { NextRequest, NextResponse } from "next/server"; // NextRequest use kar build safety ke liye
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

// 🔥 FIX: context ka type Promise hona chahiye Next.js 15 mein
export async function POST(
  req: NextRequest, 
  { params }: { params: Promise<{ userId: string }> } 
) {
  try {
    await connectDB();
    
    // 🔥 FIX: params ko await karna zaroori hai
    const resolvedParams = await params;
    const userId = resolvedParams.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    await CodingTest.deleteMany({ userId, status: "ongoing" });

    const aiModel = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest" // Stable model name use kar
    });

    const seed = Math.random().toString(36).substring(7);
    const prompt = `Generate exactly 30 unique high-level coding MCQs on DSA, OOP, and Algorithms. Seed: ${seed}. 
    Return ONLY a JSON array with this structure: [{"question": "string", "options": ["string", "string", "string", "string"], "correctAnswer": "A"}]
    Do not return empty json.`;
    
    const result = await aiModel.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.9,
        }
    });

    const text = result.response.text();
    const questionsArr = JSON.parse(text);

    if (!Array.isArray(questionsArr) || questionsArr.length === 0) {
        throw new Error("AI returned empty questions");
    }

    // 🔥 SAVE ACTION: Pura array save kar context ke saath
    const newTest = await CodingTest.create({ 
      userId, 
      questions: questionsArr 
    });

    return NextResponse.json({
      testId: newTest._id,
      questions: questionsArr.map((q: any) => ({
        question: q.question,
        options: q.options,
      }))
    });
  } catch (err: any) {
    console.error("START ERROR:", err);
    return NextResponse.json({ 
        error: "AI Generation failed. Please try again.",
        details: err.message 
    }, { status: 500 });
  }
}