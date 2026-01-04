import { cookies } from "next/headers";

export async function getUserId() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth");
  if (!authCookie) return null;
  return Number(authCookie.value);
}
