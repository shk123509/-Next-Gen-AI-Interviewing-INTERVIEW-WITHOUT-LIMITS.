import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- 1. GET: Profile Fetch ---
export async function GET(req: Request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return NextResponse.json({ success: false, message: "No token provided" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}

// --- 2. POST: Profile Update (Handles Text & Multipart Image) ---
export async function POST(req: Request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    
    const contentType = req.headers.get("content-type") || "";
    let updateData: any = {};

    if (contentType.includes("multipart/form-data")) {
      // PHOTO UPLOAD HANDLE
      const formData = await req.formData();
      const file = formData.get("image") as File;

      if (!file) {
        return NextResponse.json({ success: false, message: "No image file found" }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "user_profiles" },
          (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        Readable.from(buffer).pipe(uploadStream);
      });

      updateData.profilePic = uploadResult.secure_url;

    } else {
      // TEXT SETTINGS HANDLE
      try {
        const body = await req.json();
        if (body.username) updateData.username = body.username;
        if (body.email) updateData.email = body.email;
      } catch (jsonErr) {
        return NextResponse.json({ success: false, message: "Invalid JSON structure" }, { status: 400 });
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: false, message: "No data provided" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "SYSTEM_UPDATED",
      user: updatedUser,
      profilePic: updatedUser.profilePic
    });

  } catch (error: any) {
    console.error("UPDATE ERROR LOG:", error);
    return NextResponse.json({ success: false, message: error.message || "Server Error" }, { status: 500 });
  }
}