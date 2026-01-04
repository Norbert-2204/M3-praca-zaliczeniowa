const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const FetchTypes = async () => {
  const [categoryRes, productRes, brandRes] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/product`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/brand`, { cache: "no-store" }),
  ]);

  if (!categoryRes.ok) throw new Error("Failed to fetch categories");
  if (!productRes.ok) throw new Error("Failed to fetch products");
  if (!brandRes.ok) throw new Error("Failed to fetch brands");

  return { categoryRes, productRes, brandRes };
};

export default FetchTypes;
