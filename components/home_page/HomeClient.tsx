"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Carousel from "@/components/home_page/Carousel";
import Category from "@/components/home_page/Category";
import Recomdendations from "@/components/home_page/Recomendations";
import Brand from "@/components/home_page/Brand";
import {
  FetchTypesResult,
  Product,
  Category as CategoryProp,
  BrandItem,
} from "@/utils/Types";
import FetchTypes from "@/utils/FetchTypes";
import { FiltersProvider } from "@/context/FilterContext";
import { useEffect, useState } from "react";
import Loading from "../reused/Loading";

const HomeClient = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchTypesResult>({
    categoryRes: [],
    productRes: [],
    brandRes: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await FetchTypes();
      setData(res);
      setLoading(false);
    };

    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }
  const categoryRes = data.categoryRes;
  const productRes = data.productRes;
  const brandRes = data.brandRes;

  const categories: CategoryProp[] = categoryRes;

  const products: Product[] = productRes;
  const carouselProducts = products.filter((p) =>
    [4, 6, 13, 17, 21].includes(p.id)
  );

  const brands: BrandItem[] = brandRes.map((b) => ({
    ...b,
    type: "brand",
  }));

  return (
    <>
      <FiltersProvider>
        <Header />
        <Carousel categories={categories} products={carouselProducts} />
        <Category categories={categories} />
        <Recomdendations products={products} categories={categories} />
        <Brand brands={brands} />
        <Footer />
      </FiltersProvider>
    </>
  );
};
export default HomeClient;
