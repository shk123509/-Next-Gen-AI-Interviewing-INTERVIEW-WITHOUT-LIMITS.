import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration (Inko Vercel ke Environment Variables mein zaroor daalein)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: Request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) token = authHeader.split(" ")[1];
    }

    if (!token) return NextResponse.json({ success: false, message: "No token" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password");

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}

// --- UPDATED POST: Handles both Profile Data and Photo ---
export async function POST(req: Request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    
    // 🛠️ CHECK CONTENT TYPE: FormData (for Photo) or JSON (for text)
    const contentType = req.headers.get("content-type") || "";
    let updateData: any = {};

    if (contentType.includes("multipart/form-data")) {
      // HANDLE PHOTO UPLOAD
      const formData = await req.formData();
      const file = formData.get("image") as File;

      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const uploadResult: any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: "user_profiles" }, (error : any, result : any) => {
            if (error) reject(error);
            else resolve(result);
          }).end(buffer);
        });

        updateData.profilePic = uploadResult.secure_url;
      }
    } else {
      // HANDLE TEXT UPDATE (Username/Email)
      const body = await req.json();
      updateData.username = body.username;
      updateData.email = body.email;
    }

    // Database update
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "SYSTEM_UPDATED",
      user: updatedUser,
      profilePic: updatedUser.profilePic // Frontend expects this for avatar update
    });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ success: false, message: error.message || "Server Error" }, { status: 500 });
  }
}