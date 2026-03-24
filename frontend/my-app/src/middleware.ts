import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // public routes
  const publicRoutes = ["/login", "/signup"];

  // agar login hai aur login page open kar raha
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // agar login nahi hai aur protected route open kar raha
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/platform/:path*",
    "/main/:path*",
    "/login",
    "/signup",
    "/enterprise",
    "/certificate"
  ],
};