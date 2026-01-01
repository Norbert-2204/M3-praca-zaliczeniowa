import { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Carousel from "@/components/home_page/Carousel";
import Category from "@/components/home_page/Category";
import Recomdendations from "@/components/home_page/Recomendations";
import Brand from "@/components/home_page/Brand";
import Loading from "@/components/reused/Loading";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  brandId: number;
}

export default async function Home() {
  const categoryRes = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });
  if (!categoryRes.ok) {
    throw new Error("Failed to fetch categories");
  }
  const categories = await categoryRes.json();

  const productRes = await fetch("http://localhost:3000/api/product", {
    cache: "no-store",
  });
  if (!productRes.ok) {
    throw new Error("Failed to fetch products");
  }
  const products: Product[] = await productRes.json();

  const carouselProducts = products.filter((p) =>
    [4, 6, 13, 17, 21].includes(p.id)
  );

  const brandRes = await fetch("http://localhost:3000/api/brand", {
    cache: "no-store",
  });
  if (!brandRes.ok) {
    throw new Error("Failed to fetch brands");
  }
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
