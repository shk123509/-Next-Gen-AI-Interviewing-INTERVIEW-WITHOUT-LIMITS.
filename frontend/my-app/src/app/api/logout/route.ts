import { NextResponse } from "next/server";

export async function POST() {
  try {

    const res = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    // ✅ delete cookie
    res.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0), // important
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res;

  } catch (error: any) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}