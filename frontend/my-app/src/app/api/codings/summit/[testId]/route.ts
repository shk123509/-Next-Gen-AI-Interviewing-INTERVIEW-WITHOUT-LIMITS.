import { NextResponse } from "next/server";
import mongoose, { models, model, Schema } from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://shakib:vihar2026@cluster0.emhmf2c.mongodb.net/interview";

/* ================= DATABASE SCHEMA ================= */
const CodingTestSchema = new Schema({
  userId: { type: String, required: true },
  questions: [{
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
  }],
  userAnswers: { type: [String], default: [] },
  score: { type: Number, default: 0 },
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  passed: { type: Boolean, default: false },
}, { timestamps: true });

const CodingTest = models.CodingTest || model("CodingTest", CodingTestSchema);

/* ================= MONGODB CONNECTION ================= */
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
}

/* ================= SUBMIT API HANDLER ================= */
// FIXED: params ko Promise type diya gaya hai
export async function POST(req: Request, { params }: { params: Promise<{ testId: string }> }) {
  try {
    await connectDB();
    
    // 1. 🔥 FIXED: Await params to get testId
    const resolvedParams = await params;
    const testId = resolvedParams.testId;

    const body = await req.json();
    const { answers } = body; 

    if (!testId) {
      return NextResponse.json({ error: "testId is required in URL" }, { status: 400 });
    }

    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: "Answers array is required" }, { status: 400 });
    }

    // 2. Find the specific test in DB
    const test = await CodingTest.findById(testId);

    if (!test) {
      return NextResponse.json({ error: "Test not found in database" }, { status: 404 });
    }

    if (test.status === "completed") {
      return NextResponse.json({ error: "This test has already been submitted" }, { status: 400 });
    }

    // 3. Calculate Score
    let score = 0;
    const totalQuestions = test.questions.length;

    test.questions.forEach((q: any, i: number) => {
      // Comparison: Agar user ka answer DB ke correct answer se match kare
      if (answers[i] === q.correctAnswer) {
        score++;
      }
    });

    // 4. Update Test Data
    test.userAnswers = answers;
    test.score = score;
    test.status = "completed";
    
    // Dashboard Logic: User must score 20 or more to pass
    test.passed = score >= 20;

    // 5. Save final results to MongoDB
    await test.save();

    // 6. Return response
    return NextResponse.json({
      success: true,
      score: score,
      total: totalQuestions,
      pass: test.passed,
      message: test.passed 
        ? "Congratulations! You qualified for the next round." 
        : "Failed. You need at least 20 marks to proceed."
    });

  } catch (err: any) {
    console.error("SUBMIT ERROR:", err);
    return NextResponse.json({ 
      error: "Failed to submit quiz", 
      details: err.message 
    }, { status: 500 });
  }
}