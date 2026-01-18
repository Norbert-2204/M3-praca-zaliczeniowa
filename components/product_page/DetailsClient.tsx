"use client";

import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import FetchTypes from "@/utils/FetchTypes";
import { Product, Category } from "@/utils/Types";
import Loading from "../reused/Loading";

type Props = {
  productId: number;
};

const ProductDetailClient = ({ productId }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { categoryRes } = await FetchTypes();

      const res = await fetch(`/api/product/${productId}`);
      if (!res.ok) return;

      const productData: Product = await res.json();

      const categories: Category[] = categoryRes;

      setProduct(productData);
      setCategory(categories.find((cat) => cat.id === productData.categoryId));
    };

    fetchData();
  }, [productId]);

  if (!product) return <Loading />;

  return <ProductDetail product={product} category={category} />;
};

export default ProductDetailClient;
