import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, password, region } = body;

    if (!email || !password || !phone || !region) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const userExist = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
  } catch (error) {}
}
