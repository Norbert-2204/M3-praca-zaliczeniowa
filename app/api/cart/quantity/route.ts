import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getUserId } from "../../../lib/getId";
export async function PATCH(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { cartItemId, delta } = body;

    if (!cartItemId || typeof delta !== "number") {
      return NextResponse.json(
        { error: "cartItemId and delta are required" },
        { status: 400 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: cartItemId, userId },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    const newQuantity = cartItem.quantity + delta;

    if (newQuantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: newQuantity },
      });
    }

    return NextResponse.json({ success: true, newQuantity });
  } catch (error) {
    console.error("Update quantity error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
