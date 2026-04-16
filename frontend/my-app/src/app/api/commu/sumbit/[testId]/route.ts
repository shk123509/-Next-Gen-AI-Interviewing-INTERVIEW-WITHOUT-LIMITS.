import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { CommunicationTest } from "@/model/CommunocationSumbit";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    await dbConnect();

    const { testId } = await params;

    if (!testId) {
      return NextResponse.json(
        { error: "testId is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { answers } = body;

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Answers array is required" },
        { status: 400 }
      );
    }

    const test = await CommunicationTest.findById(testId);

    if (!test) {
      return NextResponse.json(
        { error: "Test not found" },
        { status: 404 }
      );
    }

    if (test.status === "completed") {
      return NextResponse.json(
        { error: "Test already submitted" },
        { status: 400 }
      );
    }

    const totalQuestions = test.questions.length;

    if (answers.length !== totalQuestions) {
      return NextResponse.json(
        { error: "Answers count mismatch" },
        { status: 400 }
      );
    }

    // -------- BASIC SCORING (TEMP LOGIC) --------
    // 👉 abhi ke liye simple scoring (length based)
    let score = 0;

    answers.forEach((ans: string) => {
      if (typeof ans === "string" && ans.trim().length > 20) {
        score++; // meaningful answer
      }
    });

    // -------- PASS LOGIC --------
    const passThreshold = Math.ceil(totalQuestions * 0.6);

    test.userAnswers = answers;
    test.score = score;
    test.status = "completed";
    test.passed = score >= passThreshold;

    await test.save();

    return NextResponse.json({
      success: true,
      score,
      total: totalQuestions,
      pass: test.passed,
      message: test.passed
        ? "Good communication skills!"
        : "Work on clarity and detail in your answers.",
    });

  } catch (err: any) {
    console.error("SUBMIT ERROR:", err);

    return NextResponse.json(
      {
        error: "Failed to submit communication test",
        details: err.message,
      },
      { status: 500 }
    );
  }
}