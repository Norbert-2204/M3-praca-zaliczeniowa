import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, options);
    if (!res.ok) return [];
    return await res.json();
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
      safeFetch(`/api/categories`, { cache: "no-store" }),
      safeFetch(`/api/product`, { cache: "no-store" }),
      safeFetch(`/api/brand`, { cache: "no-store" }),
      safeFetch(`/api/cart`, {
        cache: "no-store",
        headers: { cookie: cookieHeader },
      }),
      safeFetch(`/api/order/latest`, {
        cache: "no-store",
        headers: { cookie: cookieHeader },
      }),
    ]);

  return { categoryRes, productRes, brandRes, cartRes, orderRes };
};

export default FetchTypes;
