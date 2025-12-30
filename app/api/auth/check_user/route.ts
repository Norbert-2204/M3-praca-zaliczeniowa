import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json();

    if (!identifier) {
      return NextResponse.json(
        { error: "Identifier is required" },
        { status: 400 }
      );
    }

    const isEmail = identifier.includes("@");

    const user = await prisma.user.findFirst({
      where: isEmail ? { email: identifier } : { phone: identifier },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });

    if (!user) {
      return NextResponse.json({ exists: false });
    }

    const response = NextResponse.json({
      exists: true,
      type: isEmail ? "email" : "phone",
      user,
    });
    const cookieStore = await cookies();
    cookieStore.set({
      name: "pendingUser",
      value: String(user.id),
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 5,
    });

    return response;
  } catch (error) {
    console.error("CHECK_USER_ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
