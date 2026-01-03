"use client";

import { useEffect } from "react";
import { useFilters } from "@/context/FilterContext";
import { Product } from "@/utils/Types";

interface Props {
  products: Product[];
}

const ProductsInitializer = ({ products }: Props) => {
  const { setProducts } = useFilters();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return null;
};

export default ProductsInitializer;
