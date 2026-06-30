import { NextRequest, NextResponse } from "next/server";
import JobAnalysis from "@/model/JobAnalysis";
import { dbConnect } from "@/lib/dbConnect";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();

const userId =
  (formData.get("userId") as string) || "";

const jobDescription =
  (formData.get("jobDescription") as string) || "";

let resumeText = "";

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job Description is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
You are an expert recruiter.

Analyze the Job Description and Resume.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText || ""}

Return ONLY valid JSON.

{
  "requiredSkills": [],
  "missingSkills": [],
  "strengths": [],
  "interviewQuestions": [],
  "improvementPlan": []
}

Do not include markdown.
Do not include explanation.
Do not include code fences.
Do not include any text before or after JSON.
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const text = result.response.text();

    console.log("Gemini Response:");
    console.log(text);

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      return NextResponse.json(
        {
          error: "Invalid JSON returned from Gemini",
          rawResponse: text,
        },
        {
          status: 500,
        }
      );
    }

    const requiredSkills =
      analysis.requiredSkills || [];

    const matchedSkills =
      requiredSkills.filter(
        (skill: string) =>
          resumeText
            ?.toLowerCase()
            .includes(skill.toLowerCase())
      );

    const matchScore =
      requiredSkills.length > 0
        ? Math.round(
            (matchedSkills.length /
              requiredSkills.length) *
              100
          )
        : 0;

    const saved =
      await JobAnalysis.create({
        userId,
        jobDescription,
        resumeText,

        matchScore,

        requiredSkills,

        missingSkills:
          analysis.missingSkills || [],

        strengths:
          analysis.strengths || [],

        interviewQuestions:
          analysis.interviewQuestions || [],

        improvementPlan:
          analysis.improvementPlan || [],
      });

    return NextResponse.json(saved);

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error: "Analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}