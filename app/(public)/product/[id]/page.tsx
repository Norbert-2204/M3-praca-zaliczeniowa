import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectPage from "@/components/ProtectPage";
import ProductDetail from "@/components/product_page/ProductDetail";
import FetchTypes from "@/utils/FetchTypes";
import { Category } from "@/utils/Types";

type Props = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return <p>Invalid product ID</p>;
  }

  const { categoryRes } = await FetchTypes();

  const res = await fetch(`$/api/product/${productId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await res.json();

  const categories: Category[] = categoryRes;
  const category = categories.find((cat) => cat.id === product.categoryId);

  return (
    <>
      <Header />
      <ProductDetail product={product} category={category} />
      <Footer />
    </>
  );
};
export default ProductDetailPage;
