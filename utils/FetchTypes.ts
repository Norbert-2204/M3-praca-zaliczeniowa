import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, options);

    if (!res || typeof res.json !== "function") return [];

    if (!res.ok) return [];

    return (await res.json()) || [];
  } catch (e) {
    console.error(`Fetch failed for ${url}`, e);
    return [];
  }
};
const FetchTypes = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [categoryRes, productRes, brandRes, cartRes, orderRes] =
    await Promise.all([
      safeFetch(`${BASE_URL}/api/categories`, { cache: "no-store" }),
      safeFetch(`${BASE_URL}/api/product`, { cache: "no-store" }),
      safeFetch(`${BASE_URL}/api/brand`, { cache: "no-store" }),
      safeFetch(`${BASE_URL}/api/cart`, {
        cache: "no-store",
        headers: { cookie: cookieHeader },
      }),
      safeFetch(`${BASE_URL}/api/order/latest`, {
        cache: "no-store",
        headers: { cookie: cookieHeader },
      }),
    ]);

  return { categoryRes, productRes, brandRes, cartRes, orderRes };
};

export default FetchTypes;
