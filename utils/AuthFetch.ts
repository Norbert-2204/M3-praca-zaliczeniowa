// import { cookies } from "next/headers";

// const safeFetchAuth = async (path: string) => {
//   const cookieStore = await cookies();
//   const cookieHeader = cookieStore.toString();

//   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}${path}`, {
//     cache: "no-store",
//     headers: { cookie: cookieHeader },
//   });

//   if (!res.ok) {
//     console.error("Fetch auth failed:", path, res.status);
//     return [];
//   }

//   return res.json();
// };

// export const fetchAuthData = async () => {
//   const [cartRes, orderRes] = await Promise.all([
//     safeFetchAuth("/api/cart"),
//     safeFetchAuth("/api/order/latest"),
//   ]);

//   return { cartRes, orderRes };
// };
// export default fetchAuthData;

import { cookies } from "next/headers";
import { headers } from "next/headers";

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
      console.log("res", res);
      console.error("Fetch not ok:", url, res.status);
      if (res.status === 401) {
        console.log("Unauthorized access:", res);
      }
      return [];
    }

    return await res.json();
  } catch (e) {
    console.error(`Fetch failed for ${path}`, e);
    return [];
  }
};

const fetchAuthData = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [cartRes, orderRes] = await Promise.all([
    // safeFetch(`/api/categories`, { cache: "no-store" }),
    // safeFetch(`/api/product`, { cache: "no-store" }),
    // safeFetch(`/api/brand`, { cache: "no-store" }),
    safeFetch(`/api/cart`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    }),
    safeFetch(`/api/order/latest`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    }),
  ]);
  console.log("test");

  return { cartRes, orderRes };
};

export default fetchAuthData;
