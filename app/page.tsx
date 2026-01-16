import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Carousel from "@/components/home_page/Carousel";
import Category from "@/components/home_page/Category";
import Recomdendations from "@/components/home_page/Recomendations";
import Brand from "@/components/home_page/Brand";
import { Product } from "@/utils/Types";
import FetchTypes from "@/utils/FetchTypes";
import { FiltersProvider } from "@/context/FilterContext";

export default async function Home() {
  const { categoryRes, productRes, brandRes } = await FetchTypes();

  const categories = categoryRes;

  const products: Product[] = productRes;
  const carouselProducts = products.filter((p) =>
    [4, 6, 13, 17, 21].includes(p.id)
  );

  const brands = brandRes;
  console.log("Brands on Home Page:", brands);
  console.log("Categories on Home Page:", categories);
  console.log("Products on Home Page:", products);

  return (
    <div>
      <main>
        <FiltersProvider>
          <Header />
          <Carousel categories={categories} products={carouselProducts} />
          <Category categories={categories} />
          <Recomdendations products={products} categories={categories} />
          <Brand brands={brands} />
          <Footer />
        </FiltersProvider>
      </main>
    </div>
  );
}
