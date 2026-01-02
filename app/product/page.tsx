import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/product_page/Sidebar";
import Products from "@/components/product_page/Products";

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

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

const ProductPage = async () => {
  const productsRes = await fetch("http://localhost:3000/api/product", {
    cache: "no-store",
  });
  const products: Product[] = await productsRes.json();

  const categoriesRes = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });
  const categories: Category[] = await categoriesRes.json();

  const brandsRes = await fetch("http://localhost:3000/api/brand", {
    cache: "no-store",
  });
  const brands: Brand[] = await brandsRes.json();

  return (
    <>
      <Header />
      <div className="pt-10 pb-7">
        <div className="flex flex-col lg:flex-row border-t justify-center border-[#383B42]">
          <SideBar categories={categories} brands={brands} />
          <Products products={products} category={categories} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProductPage;
