"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFilters } from "@/context/FilterContext";
import { Product } from "@/utils/Types";

interface Props {
  products: Product[];
}

const ProductsInitializer = ({ products }: Props) => {
  const searchParams = useSearchParams();
  const {
    setProducts,
    setSelectedCategories,
    setSelectedBrands,
    setPriceFrom,
    setPriceTo,
    setSort,
  } = useFilters();

  useEffect(() => {
    setProducts(products);

    const category = searchParams.get("category");
    setSelectedCategories(category ? category.split(",").map(Number) : []);

    const brand = searchParams.get("brand");
    setSelectedBrands(brand ? brand.split(",").map(Number) : []);

    const priceFrom = searchParams.get("priceFrom");
    setPriceFrom(priceFrom ? Number(priceFrom) : null);

    const priceTo = searchParams.get("priceTo");
    setPriceTo(priceTo ? Number(priceTo) : null);

    const sort = searchParams.get("sort");
    setSort(
      sort === "cheapest" || sort === "priciest" || sort === "latest"
        ? sort
        : "latest"
    );
  }, [
    products,
    searchParams,
    setProducts,
    setSelectedCategories,
    setSelectedBrands,
    setPriceFrom,
    setPriceTo,
    setSort,
  ]);

  return null;
};

export default ProductsInitializer;
