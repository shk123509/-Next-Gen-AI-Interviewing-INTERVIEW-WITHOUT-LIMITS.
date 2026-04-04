import { NextResponse } from "next/server";
import mongoose, { Schema, models, model } from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const MONGO_URI = process.env.MONGODB_URI!;

async function connectDB() {
  if (mongoose.connection?.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
}

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded.id;
}

/* ================= SCHEMAS (Ensuring they are registered) ================= */
const CodingTest = models.CodingTest || model("CodingTest", new Schema({ userId: Schema.Types.ObjectId, score: Number, status: String, createdAt: Date }));
const CommunicationTest = models.CommunicationTest || model("CommunicationTest", new Schema({ userId: Schema.Types.ObjectId, score: Number, createdAt: Date }));
const AptitudeTest = models.AptitudeTest || model("AptitudeTest", new Schema({ userId: Schema.Types.ObjectId, score: Number, createdAt: Date }));

export async function GET() {
  try {
    await connectDB();
    const userId = await getUserId();

    // Sabhi tests ek saath fetch karna (Parallel execution for speed)
    const [codingData, commData, aptiData] = await Promise.all([
      CodingTest.find({ userId, status: "completed" }).sort({ createdAt: -1 }),
      CommunicationTest.find({ userId }).sort({ createdAt: -1 }),
      AptitudeTest.find({ userId }).sort({ createdAt: -1 })
    ]);

    // 1. Latest Scores
    const latestCoding = codingData[0]?.score || 0;
    const latestComm = commData[0]?.score || 0;
    const latestApti = aptiData[0]?.score || 0;

    // 2. Calculations
    const totalScore = latestCoding + latestComm + latestApti;
    const maxPossible = 90; // (30 + 30 + 30 assume kar rahe hain)
    const percentage = Number(((totalScore / maxPossible) * 100).toFixed(1));

    // 3. Level Logic (Better ranges)
    let level = "Beginner";
    let color = "#ef4444"; // Red
    if (totalScore >= 70) {
        level = "Elite";
        color = "#8b5cf6"; // Purple
    } else if (totalScore >= 50) {
        level = "Advanced";
        color = "#3b82f6"; // Blue
    } else if (totalScore >= 30) {
        level = "Intermediate";
        color = "#eab308"; // Yellow
    }

    return NextResponse.json({
      success: true,
      data: {
        latestScores: {
          coding: latestCoding,
          communication: latestComm,
          aptitude: latestApti,
        },
        stats: {
          totalScore,
          percentage,
          level,
          statusColor: color,
          isPassed: totalScore >= 45, // Passing threshold
        },
        counts: {
          codingTests: codingData.length,
          commTests: commData.length,
          aptiTests: aptiData.length,
        },
        // Frontend charts ke liye history data
        history: {
            coding: codingData.slice(0, 5).map(t => t.score).reverse(),
            aptitude: aptiData.slice(0, 5).map(t => t.score).reverse(),
        }
      },
    });
  } catch (err: any) {
    console.error("Dashboard API Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message === "Unauthorized" ? "Please login again" : "Failed to fetch dashboard data" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}