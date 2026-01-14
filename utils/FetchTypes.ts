// import { cookies } from "next/headers";

// const FetchTypes = async () => {
//   const cookieStore = await cookies();
//   const cookieHeader = cookieStore.toString();

//   const [categoryRes, productRes, brandRes, orderRes, cartRes] =
//     await Promise.all([
//       fetch(`/api/categories`, { cache: "no-store" }),
//       fetch(`/api/product`, { cache: "no-store" }),
//       fetch(`/api/brand`, { cache: "no-store" }),
//       fetch(`/api/order/latest`, {
//         cache: "no-store",
//         headers: { cookie: cookieHeader },
//       }).then(async (res) => {
//         if (!res.ok) return { json: async () => null, ok: true };
//         return res;
//       }),
//       fetch(`/api/cart`, {
//         cache: "no-store",
//         headers: { cookie: cookieHeader },
//       }).then(async (res) => {
//         if (!res.ok) return { json: async () => null, ok: true };
//         return res;
//       }),
//       ,
//     ]);

//   if (!categoryRes.ok) throw new Error("Failed to fetch categories");
//   if (!productRes.ok) throw new Error("Failed to fetch products");
//   if (!brandRes.ok) throw new Error("Failed to fetch brands");
//   if (!orderRes.ok) throw new Error("Failed to fetch orders");
//   if (!cartRes.ok) throw new Error("Failed to fetch cart");

//   return { categoryRes, productRes, brandRes, orderRes, cartRes };
// };

// export default FetchTypes;

// const safeFetch = async (url: string, options?: RequestInit) => {
//   try {
//     const res = await fetch(url, options);
//     if (!res.ok) return null;
//     return await res.json();
//   } catch (e) {
//     console.error(`Fetch failed for ${url}`, e);
//     return null;
//   }
// };

// const FetchTypes = async () => {
//   const cookieStore = await cookies();
//   const cookieHeader = cookieStore.toString();

//   const [categoryRes, productRes, brandRes, orderRes, cartRes] =
//     await Promise.all([
//       safeFetch("/api/categories"),
//       safeFetch("/api/product"),
//       safeFetch("/api/brand"),
//       safeFetch("/api/order/latest", {
//         headers: { cookie: cookieHeader },
//       }),
//       safeFetch("/api/cart", {
//         headers: { cookie: cookieHeader },
//       }),
//     ]);

//   return { categoryRes, productRes, brandRes, orderRes, cartRes };
// };

// export default FetchTypes;

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

// Supabase client dla publicznych danych
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error(`Fetch failed for ${url}`, e);
    return null;
  }
};

const FetchTypes = async () => {
  // Publiczne dane z Supabase
  const { data: categoriesData, error: catError } = await supabase
    .from("categories")
    .select("*");
  if (catError) console.error("Categories fetch error:", catError);
  const categoryRes = categoriesData ?? []; // <- zawsze tablica

  const { data: productsData, error: prodError } = await supabase
    .from("products")
    .select("*");
  if (prodError) console.error("Products fetch error:", prodError);
  const productRes = productsData ?? [];

  const { data: brandsData, error: brandError } = await supabase
    .from("brands")
    .select("*");
  if (brandError) console.error("Brands fetch error:", brandError);
  const brandRes = brandsData ?? [];

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [cartRes, orderRes] = await Promise.all([
    safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`, {
      headers: { cookie: cookieHeader },
    }),
    safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/order/latest`, {
      headers: { cookie: cookieHeader },
    }),
  ]);

  return { categoryRes, productRes, brandRes, cartRes, orderRes };
};

export default FetchTypes;
