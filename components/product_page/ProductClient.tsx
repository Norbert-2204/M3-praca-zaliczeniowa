"use client";

import { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import Products from "./Products";
import { Category, Brand, Product } from "@/utils/Types";
import FetchTypes from "@/utils/FetchTypes";
import { CurrencyProvider } from "@/context/CurrencyContext";

const ProductClient = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { categoryRes, productRes, brandRes } = await FetchTypes();

      setCategories(categoryRes);
      setProducts(productRes);
      setBrands(brandRes);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row border-t justify-center border-[#383B42]">
      <CurrencyProvider>
        <SideBar categories={categories} brands={brands} />
        <Products products={products} category={categories} />
      </CurrencyProvider>
    </div>
  );
};

export default ProductClient;
