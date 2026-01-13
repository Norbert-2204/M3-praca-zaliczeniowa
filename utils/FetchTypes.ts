import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const FetchTypes = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [categoryRes, productRes, brandRes, orderRes] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/product`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/brand`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/order/latest`, {
      cache: "no-store",
      headers: {
        cookie: cookieHeader,
      },
    }),
    ,
  ]);

  if (!categoryRes.ok) throw new Error("Failed to fetch categories");
  if (!productRes.ok) throw new Error("Failed to fetch products");
  if (!brandRes.ok) throw new Error("Failed to fetch brands");
  if (!orderRes.ok) throw new Error("Failed to fetch orders");

  return { categoryRes, productRes, brandRes, orderRes };
};

export default FetchTypes;
