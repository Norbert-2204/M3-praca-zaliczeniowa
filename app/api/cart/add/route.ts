import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getUserId } from "../../../lib/getId";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    if (!productId || typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json(
        { error: "Invalid product or quantity" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const maxAddable = product.stock - currentQuantity;

    if (maxAddable <= 0) {
      return NextResponse.json(
        { cartItem: existingItem ?? null, addedQuantity: 0 },
        { status: 409 }
      );
    }

    const quantityToAdd = Math.min(quantity, maxAddable);

    const cartItem = existingItem
      ? await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantityToAdd },
          include: { product: true },
        })
      : await prisma.cartItem.create({
          data: { userId, productId, quantity: quantityToAdd },
          include: { product: true },
        });

    return NextResponse.json({ cartItem, addedQuantity: quantityToAdd });
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
