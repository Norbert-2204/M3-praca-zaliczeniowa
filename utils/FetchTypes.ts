// import { cookies } from "next/headers";
// import { headers } from "next/headers";

// const getBaseUrl = async () => {
// const h = await headers();
// const host = h.get("host");
// const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

// return `${protocol}://${host}`;
//   return "https://ecommerce-ie32769y3-norberts-projects-db3d64fd.vercel.app/";
// };

// const safeFetch = async (path: string, options?: RequestInit) => {
//   try {
//     const baseUrl = await getBaseUrl();
//     const url = `${baseUrl}${path}`;

//     const res = await fetch(url, options);

//     if (!res.ok) {
//       console.log("res", res);
//       console.error("Fetch not ok:", url, res.status);
//       if (res.status === 401) {
//         console.log("Unauthorized access:", res);
//       }
//       return [];
//     }

//     return await res.json();
//   } catch (e) {
//     console.error(`Fetch failed for ${path}`, e);
//     return [];
//   }
// };

// const FetchTypes = async () => {
// const cookieStore = await cookies();
// const cookieHeader = cookieStore.toString();

// const [categoryRes, productRes, brandRes] = await Promise.all([
//   safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`, {
//     cache: "no-store",
//   }),
//   safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/product`, {
//     cache: "no-store",
//   }),
//   safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/brand`, {
//     cache: "no-store",
//   }),
// safeFetch(`/api/cart`, {
//   cache: "no-store",
//   headers: { cookie: cookieHeader },
// }),
// safeFetch(`/api/order/latest`, {
//   cache: "no-store",
//   headers: { cookie: cookieHeader },
// }),
// ]);

//   return { categoryRes, productRes, brandRes };
// };

// export default FetchTypes;

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

const baseUrl = getBaseUrl();

const safeFetch = async (path: string) => {
  try {
    const res = await fetch(`${baseUrl}${path}`);
    console.log("Fetching:", path, "Status:", res.status);

    if (!res.ok) {
      console.error(`Fetch failed: ${path}`, res.status);
      return [];
    }

    return res.json();
  } catch (e) {
    console.error(`Fetch error: ${path}`, e);
    return [];
  }
};

const FetchTypes = async () => {
  const [categoryRes, productRes, brandRes] = await Promise.all([
    safeFetch("/api/categories"),
    safeFetch("/api/product"),
    safeFetch("/api/brand"),
  ]);

  return { categoryRes, productRes, brandRes };
};

export default FetchTypes;
