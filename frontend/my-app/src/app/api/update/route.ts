import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
  try {
    await dbConnect();

    // ✅ Get token safely
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("TOKEN:", token); // 🔥 debug

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    // ✅ Verify token safely
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("DECODED:", decoded);
    } catch (err) {
      console.log("JWT ERROR:", err);
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // ✅ Parse body safely
    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { username, email } = body;

    if (!username || !email) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    // ✅ Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser._id.toString() !== decoded.id) {
      return NextResponse.json(
        { success: false, message: "Email already in use" },
        { status: 400 }
      );
    }

    // ✅ Update user
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { username, email },
      { new: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server crash" },
      { status: 500 }
    );
  }
}