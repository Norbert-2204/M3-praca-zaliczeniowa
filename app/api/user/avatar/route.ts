import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getUserId } from "../../../lib/getId";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("avatar") as File;

  if (!file)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const allowedTypes = ["image/png", "image/jpeg"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Only PNG or JPEG allowed" },
      { status: 400 }
    );
  }

  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: "File too large (max 2MB)" },
      { status: 400 }
    );
  }

  const newAvatar = file.type === "image/png" ? ".png" : ".jpg";
  const fileName = `avatar_${userId}${newAvatar}`;
  const filePath = path.join(process.cwd(), "public", "avatars", fileName);

  const arrayBuffer = await file.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { avatar: `/avatars/${fileName}` },
    select: { avatar: true },
  });

  return NextResponse.json({ message: "Avatar updated", user: updatedUser });
}
