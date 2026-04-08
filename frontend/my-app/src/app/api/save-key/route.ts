import { NextResponse } from "next/server";
import mongoose from "mongoose";
import ApiKey from "@/model/Gemini"; // tera existing model
import { dbConnect } from "@/lib/dbConnect";


export async function POST(req:any) {
  try {
    await dbConnect() ;

    const { geminiApiKey } = await req.json();

    const saved = await ApiKey.create({ geminiApiKey });

    return NextResponse.json({
      success: true,
      key: saved.geminiApiKey,
    });

  } catch (err:any) {
    return NextResponse.json({ error: err.message });
  }
}