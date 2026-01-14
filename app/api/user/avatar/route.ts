import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getUserId } from "../../../lib/getId";

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("avatar") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PNG or JPEG allowed" },
        { status: 400 }
      );
    }

    const maxSize = 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large (max 1MB)" },
        { status: 400 }
      );
    }

    const imgbbForm = new FormData();
    imgbbForm.append("image", file);
    imgbbForm.append("album", "w7P6vX");

    const imgbbRes = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: imgbbForm,
      }
    );

    const imgbbData = await imgbbRes.json();

    if (!imgbbRes.ok) {
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 }
      );
    }

    const imageUrl = imgbbData.data.url;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatar: imageUrl },
      select: { avatar: true },
    });

    return NextResponse.json({
      message: "Avatar updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("AVATAR_UPLOAD_ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
