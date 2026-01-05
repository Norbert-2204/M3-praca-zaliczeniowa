import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../lib/prisma";
import { getUserId } from "../../lib/getId";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            category: { select: { id: true, name: true } },
            brand: { select: { id: true, name: true } },
            categoryId: true,
            brandId: true,
          },
        },
      },
      orderBy: { addedAt: "desc" },
    });

    return NextResponse.json(
      cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        imageUrl: item.product.imageUrl,
        category: item.product.category.name,
        brand: item.product.brand.name,
        brandId: item.product.brand.id,
        categoryId: item.product.category.id,
      }))
    );
  } catch (error) {
    console.error("CART_GET_ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { productId, quantity } = await req.json();

    const qty = quantity && quantity > 0 ? quantity : 1;

    const existingItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + qty },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              imageUrl: true,
              category: { select: { id: true, name: true } },
              brand: { select: { id: true, name: true } },
              categoryId: true,
              brandId: true,
            },
          },
        },
      });
      return NextResponse.json(updatedItem);
    }

    const newItem = await prisma.cartItem.create({
      data: { userId, productId, quantity: qty },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            category: { select: { id: true, name: true } },
            brand: { select: { id: true, name: true } },
            categoryId: true,
            brandId: true,
          },
        },
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Cart error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
