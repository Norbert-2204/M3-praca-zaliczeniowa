import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailClient from "@/components/product_page/DetailsClient";

type Props = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return <p>Invalid product ID</p>;
  }

  return (
    <>
      <Header />
      <ProductDetailClient productId={productId} />
      <Footer />
    </>
  );
};
export default ProductDetailPage;
