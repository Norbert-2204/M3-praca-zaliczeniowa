import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  res.cookies.set({
    name: "auth",
    value: "",
    path: "/",
    expires: new Date(0),
    httpOnly: true,
  });

  return res;
}
