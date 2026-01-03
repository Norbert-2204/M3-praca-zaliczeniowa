const FetchTypes = async () => {
  const [categoryRes, productRes, brandRes] = await Promise.all([
    fetch("http://localhost:3000/api/categories", { cache: "no-store" }),
    fetch("http://localhost:3000/api/product", { cache: "no-store" }),
    fetch("http://localhost:3000/api/brand", { cache: "no-store" }),
  ]);

  if (!categoryRes.ok) throw new Error("Failed to fetch categories");
  if (!productRes.ok) throw new Error("Failed to fetch products");
  if (!brandRes.ok) throw new Error("Failed to fetch brands");

  return { categoryRes, productRes, brandRes };
};

export default FetchTypes;
