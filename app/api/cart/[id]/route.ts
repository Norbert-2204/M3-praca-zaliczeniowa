import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getUserId } from "../../../lib/getId";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    console.log("params", params);
    const cartItemId = Number(params.id);
    console.log("Parsed ID:", cartItemId);
    if (isNaN(cartItemId)) {
      return NextResponse.json(
        { error: "Invalid cart item id" },
        { status: 400 }
      );
    }

    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.cartItem.deleteMany({
      where: {
        id: cartItemId,
        userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
