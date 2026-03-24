import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";

export async function GET(req: Request) {

  try {

    await dbConnect();

    // ✅ Next.js 15 fix
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    // Authorization header support (Postman)
    if (!token) {
      const authHeader = req.headers.get("authorization");

      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });

  } catch (error) {

    console.error("PROFILE ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}