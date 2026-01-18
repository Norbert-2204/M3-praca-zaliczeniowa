import { prisma } from "../../../lib/prisma";
import { getUserId } from "../../../lib/getId";
import Success from "@/components/checkout/Success";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrderType } from "@/utils/Types";

const SuccessPage = async () => {
  const userId = await getUserId();
  if (!userId) {
    return <div>Not logged in</div>;
  }

  const orderData = await prisma.order.findFirst({
    where: { userId },
    include: { orderItems: true },
    orderBy: { createdAt: "desc" },
  });

  if (!orderData) {
    return <div>No orders found</div>;
  }

  const order: OrderType = {
    id: orderData.id,
    orderNumber: orderData.orderNumber,
    createdAt: orderData.createdAt.toString(),
    orderItems: orderData.orderItems.map((item) => ({
      id: item.id,
      productName: item.productName,
      imageUrl: item.imageUrl,
      category: item.category,
      priceAtPurchase: item.priceAtPurchase,
      quantity: item.quantity,
      productProtection: item.productProtection,
    })),
  };

  return (
    <>
      <Header />
      <Success order={order} />
      <Footer />
    </>
  );
};

export default SuccessPage;
