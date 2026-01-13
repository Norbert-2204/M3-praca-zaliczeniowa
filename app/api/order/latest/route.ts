import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getUserId } from "../../../lib/getId";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId)
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const order = await prisma.order.findFirst({
      where: { userId },
      include: { orderItems: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(order ?? null, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
