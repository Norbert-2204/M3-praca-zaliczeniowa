import Success from "@/components/checkout/Success";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectPage from "@/components/ProtectPage";
import fetchAuthData from "@/utils/AuthFetch";
import { OrderType } from "@/utils/Types";

const SuccessPage = async () => {
  const { orderRes } = await fetchAuthData();
  const order: OrderType = await orderRes.json();

  return (
    <>
      <Header />
      <Success order={order} />
      <Footer />
    </>
  );
};

export default SuccessPage;
