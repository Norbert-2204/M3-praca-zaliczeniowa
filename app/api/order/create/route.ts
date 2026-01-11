import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { CartItemProps } from "@/utils/Types";
import generateOrderNumber from "@/utils/GenerateOrderNumber";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, selectedItems } = body as {
      userId: number;
      selectedItems: CartItemProps[];
    };

    if (!selectedItems || selectedItems.length === 0) {
      return NextResponse.json({ error: "No items selected" }, { status: 400 });
    }

    const totalAmount = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "pending",
        orderNumber,
        orderItems: {
          create: selectedItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
            productName: item.name,
            imageUrl: item.imageUrl,
            category: item.category,
          })),
        },
      },
      include: { orderItems: true },
    });

    await prisma.cartItem.deleteMany({
      where: {
        userId,
        productId: { in: selectedItems.map((item) => item.productId) },
      },
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
