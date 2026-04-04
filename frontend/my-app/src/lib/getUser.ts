import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.id;
  } catch {
    throw new Error("Invalid token");
  }
}