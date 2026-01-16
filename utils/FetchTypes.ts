import { cookies } from "next/headers";
import { headers } from "next/headers";

// const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const getBaseUrl = async () => {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocol}://${host}`;
};

const safeFetch = async (path: string, options?: RequestInit) => {
  try {
    const baseUrl = await getBaseUrl();
    const url = `${baseUrl}${path}`;

    const res = await fetch(url, options);

    if (!res.ok) {
      console.error("Fetch not ok:", url, res.status);
      return [];
    }

    return await res.json();
  } catch (e) {
    console.error(`Fetch failed for ${path}`, e);
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
