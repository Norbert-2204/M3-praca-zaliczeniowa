import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, password, region, avatar } = body;

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
        { message: "User with this email o phone already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Data: ", email, phone, hashedPassword, region);
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        region,
        avatar,
      },
    });
    console.log("user: ", user);

    return NextResponse.json(
      { message: "User successfully registered", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
