const getBaseUrl = () => {
  // if (process.env.VERCEL_URL) {
  //   return `https://${process.env.VERCEL_URL}`;
  // }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }

  return "http://localhost:3000";
};

const baseUrl = getBaseUrl();

const safeFetch = async (path: string) => {
  try {
    const res = await fetch(`${baseUrl}${path}`);
    console.log("base url:", baseUrl);
    console.log("path:", path);
    console.log("NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);
    console.log("VERCEL_URL:", process.env.VERCEL_URL);

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
