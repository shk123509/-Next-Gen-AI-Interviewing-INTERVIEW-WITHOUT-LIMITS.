import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { dbConnect } from "@/lib/dbConnect";
import { AptitudeTest } from "@/model/Aptitute"; // ✅ FIXED NAME

// -------- HELPER: VALIDATE QUESTIONS --------
function validateQuestions(questions: any[]) {
    return (
        Array.isArray(questions) &&
        questions.length > 0 &&
        questions.every(q =>
            typeof q.question === "string" &&
            Array.isArray(q.options) &&
            q.options.length === 4 &&
            ["A", "B", "C", "D"].includes(q.correctAnswer)
        )
    );
}

export async function POST(
    req: NextRequest,
    { params }: { params: { userId: string } } // ✅ FIXED PARAM TYPE
) {
    try {
        await dbConnect();

        const body = await req.json();

        const apiKey = body.apiKey || process.env.GEMINI_API_KEY; // ✅ ENV fallback
        if (!apiKey) {
            return NextResponse.json({ error: "API key missing" }, { status: 400 });
        }

         const resolvedParams = await params;
        const userId = resolvedParams.userId;

        if (!userId) {
            return NextResponse.json({ error: "User ID missing" }, { status: 400 });
        }

        // ✅ Remove old ongoing tests
        await AptitudeTest.deleteMany({ userId, status: "ongoing" });

        const genAI = new GoogleGenerativeAI(apiKey);

        const aiModel = genAI.getGenerativeModel({
            model: "gemini-flash-latest" // ✅ STABLE MODEL
        });

        // ✅ REDUCED QUESTIONS (FASTER + NO TIMEOUT)
        const prompt = `Generate EXACTLY 30 UNIQUE high-level aptitude MCQs.

Rules:

Topics must include:
Quantitative Aptitude (profit-loss, time & work, speed-distance, probability, permutations & combinations)
Logical Reasoning (coding-decoding, series, puzzles, blood relations, directions)
Analytical Reasoning (data interpretation, statements & conclusions)

Difficulty: Engineering level (GATE, CAT, placements)

Each question must be tricky, concept-based, non-repetitive
Each question must have EXACTLY 4 options
correctAnswer must be one of: A, B, C, D
NO explanations
NO markdown
NO extra text

Output strictly JSON array:

[
{
"question": "string",
"options": ["A", "B", "C", "D"],
"correctAnswer": "A"
}
]`;

        // -------- AI CALL --------
        const result = await aiModel.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.8,
            }
        });

        const text = result.response.text();

        // -------- SAFE JSON PARSE --------
        let questionsArr;

        try {
            questionsArr = JSON.parse(text);
        } catch (err) {
            console.error("❌ JSON Parse Error:", text);
            return NextResponse.json({
                error: "Invalid AI response format"
            }, { status: 500 });
        }

        // -------- VALIDATION --------
        if (!validateQuestions(questionsArr)) {
            console.error("❌ Invalid Questions Format:", questionsArr);
            return NextResponse.json({
                error: "AI returned invalid question structure"
            }, { status: 500 });
        }

        // -------- SAVE TO DB --------
        const newTest = await AptitudeTest.create({
            userId,
            questions: questionsArr
        });

        // -------- RESPONSE --------
        return NextResponse.json({
            testId: newTest._id,
            questions: questionsArr.map((q: any) => ({
                question: q.question,
                options: q.options,
            }))
        });

    } catch (err: any) {
        console.error("🚨 START ERROR:", err);

        return NextResponse.json({
            error: "AI Generation failed. Try again.",
            details: err.message
        }, { status: 500 });
    }
}