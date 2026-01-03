import { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Carousel from "@/components/home_page/Carousel";
import Category from "@/components/home_page/Category";
import Recomdendations from "@/components/home_page/Recomendations";
import Brand from "@/components/home_page/Brand";
import Loading from "@/components/reused/Loading";
import { Product } from "@/utils/Types";
import FetchTypes from "@/utils/FetchTypes";

export default async function Home() {
  const { categoryRes, productRes, brandRes } = await FetchTypes();

  const categories = await categoryRes.json();

  const products: Product[] = await productRes.json();
  const carouselProducts = products.filter((p) =>
    [4, 6, 13, 17, 21].includes(p.id)
  );

  const brands = await brandRes.json();

  return (
    <div>
      <main>
        <Header />
        <Suspense fallback={<Loading />}>
          <Carousel categories={categories} products={carouselProducts} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Category categories={categories} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Recomdendations products={products} categories={categories} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Brand brands={brands} />
        </Suspense>
        <Footer />
      </main>
    </div>
  );
}
