import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const brands = await prisma.brand.findMany();
  console.log(brands);
  return NextResponse.json(brands);
}
