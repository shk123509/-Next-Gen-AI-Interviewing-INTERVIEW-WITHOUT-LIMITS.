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

/* ================= SCHEMAS ================= */
// Base schema for shared fields
const baseSchema = new Schema({ 
  userId: { type: String, required: true }, 
  score: { type: Number, default: 0 }, 
  status: { type: String, default: "ongoing" }, 
  createdAt: { type: Date, default: Date.now } 
}, { timestamps: true });

// 🔥 FIX: Collection names ko manually define kar rahe hain (3rd Argument)
// Taaki Dashboard wahi data read kare jo Submit API save kar raha hai.
const CodingTest = models.CodingTest || model("CodingTest", baseSchema, "codingtests");
const CommunicationTest = models.CommunicationTest || model("CommunicationTest", baseSchema, "communicationtests");
const AptitudeTest = models.AptitudeTest || model("AptitudeTest", baseSchema, "aptitudetests");

export async function GET() {
  try {
    await connectDB();
    const userId = await getUserId();

    // Debugging (Console mein check karein ki userId kya aa rahi hai)
    console.log("Fetching data for User:", userId);

    const [codingData, commData, aptiData] = await Promise.all([
      CodingTest.find({ userId, status: "completed" }).sort({ createdAt: -1 }),
      CommunicationTest.find({ userId }).sort({ createdAt: -1 }),
      AptitudeTest.find({ userId, status: "completed" }).sort({ createdAt: -1 })
    ]);

    // Debugging (Check karein kya data mil raha hai)
    console.log("Apti Results Found:", aptiData.length);

    const latestCoding = codingData[0]?.score || 0;
    const latestComm = commData[0]?.score || 0;
    const latestApti = aptiData[0]?.score || 0;

    const totalScore = latestCoding + latestComm + latestApti;
    const maxPossible = 90; 
    const percentage = Number(((totalScore / maxPossible) * 100).toFixed(1));

    let level = "Beginner";
    let color = "#ef4444"; 
    if (totalScore >= 70) { level = "Elite"; color = "#8b5cf6"; }
    else if (totalScore >= 50) { level = "Advanced"; color = "#3b82f6"; }
    else if (totalScore >= 30) { level = "Intermediate"; color = "#eab308"; }

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
          isPassed: totalScore >= 45,
        },
        counts: {
          codingTests: codingData.length,
          commTests: commData.length,
          aptiTests: aptiData.length,
        },
        history: {
            coding: codingData.slice(0, 5).map(t => t.score).reverse(),
            aptitude: aptiData.slice(0, 5).map(t => t.score).reverse(),
        }
      },
    });
  } catch (err: any) {
    console.error("Dashboard API Error:", err.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}