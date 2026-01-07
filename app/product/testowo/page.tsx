import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectPage from "@/components/ProtectPage";
import ProductDetail from "@/components/product_page/ProductDetail";

const ProductDetailPage = () => {
  return (
    <>
      <ProtectPage>
        <Header />
        <ProductDetail />
        <Footer />
      </ProtectPage>
    </>
  );
};
export default ProductDetailPage;
