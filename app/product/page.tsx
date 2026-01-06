import { FiltersProvider } from "@/context/FilterContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/product_page/Sidebar";
import Products from "@/components/product_page/Products";
import { Product, Category, Brand } from "@/utils/Types";
import FetchTypes from "@/utils/FetchTypes";
import ProductsInitializer from "@/components/product_page/ProductInitialize";
import { CurrencyProvider } from "@/context/CurrencyContext";
import ProtectPage from "@/components/ProtectPage";

const ProductPage = async () => {
  const { categoryRes, productRes, brandRes } = await FetchTypes();

  const products: Product[] = await productRes.json();

  const categories: Category[] = await categoryRes.json();

  const brands: Brand[] = await brandRes.json();

  return (
    <>
      <FiltersProvider>
        <ProductsInitializer products={products} />
        <ProtectPage>
          <Header />

          <div className="pt-10 pb-7">
            <div className="flex flex-col lg:flex-row border-t justify-center border-[#383B42]">
              <CurrencyProvider>
                <SideBar categories={categories} brands={brands} />
                <Products products={products} category={categories} />
              </CurrencyProvider>
            </div>
          </div>

          <Footer />
        </ProtectPage>
      </FiltersProvider>
    </>
  );
};
export default ProductPage;
