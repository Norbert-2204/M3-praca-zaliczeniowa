import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

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

    return NextResponse.json({
      exists: true,
      type: isEmail ? "email" : "phone",
      user: user,
    });
  } catch (error) {
    console.error("CHECK_USER_ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
