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

    if (!order)
      return NextResponse.json({ error: "No orders found" }, { status: 404 });

    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
