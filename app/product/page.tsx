import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/product_page/Sidebar";

const ProductPage = () => {
  return (
    <>
      <Header />
      <div className="pt-10">
        <div className="flex border-t border-[#383B42]">
          <SideBar />
        </div>
      </div>

      <Footer />
    </>
  );
};
export default ProductPage;
