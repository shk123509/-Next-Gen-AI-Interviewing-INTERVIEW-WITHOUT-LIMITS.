import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";
import Certificate from "@/model/Certificate";

export async function POST() {

  try {

    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success:false, message:"No token" },
        { status:401 }
      );
    }

    const decoded:any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { success:false, message:"User not found" },
        { status:404 }
      );
    }

    // check existing certificate
    let cert = await Certificate.findOne({ userId:user._id });

    if (!cert) {

      const now = new Date();

      cert = await Certificate.create({

        userId: user._id,
        username: user.username,
        email: user.email,

        certificateId: "CERT-" + Date.now(),

        issuedDate: now.toLocaleDateString(),

        issuedTime: now.toLocaleTimeString(),

        title: "Certificate of Completion",

        course: "AI Voice Interview Mastery",

        description:
          `This certificate is proudly awarded to ${user.username} for demonstrating exceptional dedication and successfully completing the AI Voice Interview Training Program. 

Through this achievement, you have showcased strong problem-solving abilities, communication skills, and the capability to perform in real-world AI-driven interview environments.`

      });

    }

    return NextResponse.json({
      success:true,
      certificate:cert
    });

  } catch (error:any) {

    console.error(error);

    return NextResponse.json(
      { success:false, message:"Server error" },
      { status:500 }
    );

  }

}