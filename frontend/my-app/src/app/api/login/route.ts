import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();
    console.log("Incoming email:", email);
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    // ✅ Cookie set (DEV SAFE)
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false, // dev me false rakho
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error: any) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


