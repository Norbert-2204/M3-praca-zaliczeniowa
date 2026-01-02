import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/product_page/Sidebar";
import Products from "@/components/product_page/Products";

const ProductPage = async () => {
  const productRes = await fetch("http://localhost:3000/api/product", {
    cache: "no-store",
  });
  if (!productRes.ok) {
    throw new Error("Failed to fetch products");
  }
  const products = await productRes.json();

  const categoryRes = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });
  if (!categoryRes.ok) {
    throw new Error("Failed to fetch categories");
  }
  const categories = await categoryRes.json();

  return (
    <>
      <Header />
      <div className="pt-10 pb-7">
        <div className="flex border-t border-[#383B42]">
          <SideBar />
          <Products products={products} category={categories} />
        </div>
      </div>

      <Footer />
    </>
  );
};
export default ProductPage;
