import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { AptitudeTest } from "@/model/AptituteSumbit"; // ✅ FIXED

export async function POST(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    await dbConnect();

    const { testId } = await params;

    if (!testId) {
      return NextResponse.json(
        { error: "testId is required in URL" },
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

    const test = await AptitudeTest.findById(testId);

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

    if (totalQuestions === 0) {
      return NextResponse.json(
        { error: "No questions found in test" },
        { status: 400 }
      );
    }

    // ✅ LENGTH VALIDATION
    if (answers.length !== totalQuestions) {
      return NextResponse.json(
        { error: "Answers count mismatch" },
        { status: 400 }
      );
    }

    // ✅ VALID OPTIONS CHECK
    const validOptions = ["A", "B", "C", "D"];
    if (!answers.every((a: string) => validOptions.includes(a))) {
      return NextResponse.json(
        { error: "Invalid answers provided" },
        { status: 400 }
      );
    }

    // -------- SCORE CALC --------
    let score = 0;

    test.questions.forEach((q: any, i: number) => {
      if (answers[i] === q.correctAnswer) {
        score++;
      }
    });

    // -------- PASS LOGIC (DYNAMIC) --------
    const passThreshold = Math.ceil(totalQuestions * 0.6); // 60%

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
        ? "Congratulations! You qualified for the next round."
        : `Failed. You need at least ${passThreshold} marks to pass.`,
    });

  } catch (err: any) {
    console.error("SUBMIT ERROR:", err);

    return NextResponse.json(
      {
        error: "Failed to submit quiz",
        details: err.message,
      },
      { status: 500 }
    );
  }
}