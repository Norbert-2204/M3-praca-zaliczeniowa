import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const FetchTypes = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [categoryRes, productRes, brandRes, orderRes, cartRes] =
    await Promise.all([
      fetch(`${baseUrl}/api/categories`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/product`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/brand`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/order/latest`, {
        cache: "no-store",
        headers: { cookie: cookieHeader },
      }).then(async (res) => {
        if (!res.ok) return { json: async () => null, ok: true };
        return res;
      }),
      fetch(`${baseUrl}/api/cart`, {
        cache: "no-store",
        headers: { cookie: cookieHeader },
      }).then(async (res) => {
        if (!res.ok) return { json: async () => null, ok: true };
        return res;
      }),
      ,
    ]);

  if (!categoryRes.ok) throw new Error("Failed to fetch categories");
  if (!productRes.ok) throw new Error("Failed to fetch products");
  if (!brandRes.ok) throw new Error("Failed to fetch brands");
  if (!orderRes.ok) throw new Error("Failed to fetch orders");
  if (!cartRes.ok) throw new Error("Failed to fetch cart");

  return { categoryRes, productRes, brandRes, orderRes, cartRes };
};

export default FetchTypes;
