import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    // File ko buffer mein convert karo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // File name unique banao (taaki overlap na ho)
    const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    
    // Public/uploads folder ka path (Ensure karo ye folder 'public' ke andar ho)
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Agar folder nahi hai toh bana do
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    // Ye URL frontend ko wapas bhejenge
    const fileUrl = `/uploads/${fileName}`;

    // --- YAHAN APNA DATABASE UPDATE KARO ---
    // Example: await db.user.update({ where: { id: userId }, data: { profilePic: fileUrl } })
    // ---------------------------------------

    return NextResponse.json({ 
      success: true, 
      profilePic: fileUrl,
      message: "Image uploaded successfully" 
    });

  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}