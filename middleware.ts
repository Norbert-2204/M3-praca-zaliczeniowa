import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  if (
    url.startsWith("/api/product") ||
    url.startsWith("/api/brand") ||
    url.startsWith("/api/categories") ||
    url.startsWith("/(public)")
  ) {
    return NextResponse.next();
  }

  if (url.startsWith("/api/cart") || url.startsWith("/api/order")) {
    const cookie = req.cookies.get("session");
    if (!cookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}
