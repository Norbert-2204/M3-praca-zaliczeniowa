import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Missing identifier or password" },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const isEmail = cleanIdentifier.includes("@");

    const user = await prisma.user.findFirst({
      where: isEmail ? { email: cleanIdentifier } : { phone: cleanIdentifier },
      select: { id: true, email: true, phone: true, password: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = "mock-jwt-token";

    return NextResponse.json({
      success: true,
      userId: user.id,
      token,
    });
  } catch (error) {
    console.error("LOGIN_ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
