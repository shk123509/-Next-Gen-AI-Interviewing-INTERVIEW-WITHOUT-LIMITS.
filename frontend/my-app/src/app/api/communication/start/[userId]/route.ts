import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { dbConnect } from "@/lib/dbConnect";
import { CommunicationTest } from "@/model/Communication";

// -------- VALIDATION --------
function validateQuestions(questions: any[]) {
  return (
    Array.isArray(questions) &&
    questions.length > 0 &&
    questions.every(q => typeof q.question === "string")
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await dbConnect();

    const { userId } = await params;

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    const body = await req.json();
    const apiKey = body.apiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key missing" }, { status: 400 });
    }

    await CommunicationTest.deleteMany({ userId, status: "ongoing" });

    const genAI = new GoogleGenerativeAI(apiKey);

    const aiModel = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    });

    // ✅ FIXED PROMPT (NO MCQ)
    const prompt = `Generate EXACTLY 30 UNIQUE high-level communication (verbal ability) MCQs.

Use randomization seed:

Strict Rules:

Topics must include:
Reading Comprehension (short passages with inference-based questions)
Grammar (error detection, sentence correction)
Vocabulary (synonyms, antonyms, contextual usage)
Sentence Completion (advanced, context-heavy)
Para Jumbles (sentence ordering)
Critical Reasoning (assumptions, conclusions, strengthen/weaken arguments)
Difficulty: Engineering level (GATE, CAT, top placements)
Questions must be:
Concept-based and inference-heavy
Not direct or memory-based
Real exam-style with traps
Non-repetitive in pattern
Reading Comprehension:
Include at least 5 passages (3–5 lines each)
Each passage must have 1 question only
Each question must:
Have EXACTLY 4 options
Options must be close/confusing (no obvious answers)
Avoid overly simple grammar questions
correctAnswer:
Must be one of: A, B, C, D
Distribute answers evenly (no patterns)
STRICTLY AVOID:
Repeated question structures
Very easy/basic English questions
Explanations
Headings
Markdown or backticks
Any text outside JSON

Output Format (STRICT JSON ONLY):

[
{
"question": "string",
"options": ["Option A", "Option B", "Option C", "Option D"],
"correctAnswer": "A"
}
]

Ensure valid JSON
Ensure EXACTLY 30 questions (not 29, not 31)`;

    const result = await aiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const text = result.response.text();

    let questionsArr;

    try {
      questionsArr = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON Parse Error:", text);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 }
      );
    }

    if (!validateQuestions(questionsArr)) {
      return NextResponse.json(
        { error: "Invalid question structure" },
        { status: 500 }
      );
    }

    const newTest = await CommunicationTest.create({
      userId,
      questions: questionsArr
    });

    return NextResponse.json({
      testId: newTest._id,
      questions: questionsArr
    });

  } catch (err: any) {
    console.error("🚨 ERROR:", err);

    return NextResponse.json(
      {
        error: "AI Generation failed",
        details: err.message
      },
      { status: 500 }
    );
  }
}