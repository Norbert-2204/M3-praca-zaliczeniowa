import Footer from "./components/Footer";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Category from "./components/Category";

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
  console.log(products);

  return (
    <div>
      <main>
        <Header />
        <Carousel categories={categories} />
        <Category categories={categories} />
        <Footer />
      </main>
    </div>
  );
}
