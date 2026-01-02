import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoryParam = url.searchParams.get("category");
  const brandParam = url.searchParams.get("brand");

  const categoryIds = categoryParam
    ? categoryParam.split(",").map(Number)
    : undefined;
  const brandIds = brandParam ? brandParam.split(",").map(Number) : undefined;

  const products = await prisma.product.findMany({
    where: {
      ...(categoryIds ? { categoryId: { in: categoryIds } } : {}),
      ...(brandIds ? { brandId: { in: brandIds } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
