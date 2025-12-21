import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Carousel from "@/components/home_page/Carousel";
import Category from "@/components/home_page/Category";
import Recomdendations from "@/components/home_page/Recomendations";
import Brand from "@/components/home_page/Brand";

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
  const products = await productRes.json();

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
        <Carousel categories={categories} />
        <Category categories={categories} />
        <Recomdendations products={products} categories={categories} />
        <Brand brands={brands} />
        <Footer />
      </main>
    </div>
  );
}
