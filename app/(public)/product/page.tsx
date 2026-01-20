"use client";

import { useEffect, useState } from "react";
import { FiltersProvider } from "@/context/FilterContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/product_page/Sidebar";
import Products from "@/components/product_page/Products";
import { Product, Category, Brand } from "@/utils/Types";
import FetchTypes from "@/utils/FetchTypes";
import ProductsInitializer from "@/components/product_page/ProductInitialize";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Loading from "@/components/reused/Loading";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { categoryRes, productRes, brandRes } = await FetchTypes();

      setProducts(productRes);
      setCategories(categoryRes);
      setBrands(brandRes);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <FiltersProvider>
      <ProductsInitializer products={products} />
      <Header />
      <div className="pb-7">
        <div className="flex flex-col lg:flex-row border-t justify-center items-start lg:items-stretch border-[#383B42]">
          <CurrencyProvider>
            <SideBar categories={categories} brands={brands} />
            <Products products={products} category={categories} />
          </CurrencyProvider>
        </div>
      </div>
      <Footer />
    </FiltersProvider>
  );
};

export default ProductPage;
