import Success from "@/components/checkout/Success";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectPage from "@/components/ProtectPage";
import FetchTypes from "@/utils/FetchTypes";
import { OrderType } from "@/utils/Types";

const SuccesPage = async () => {
  const { orderRes } = await FetchTypes();

  const order: OrderType = await orderRes.json();

  return (
    <>
      <ProtectPage>
        <Header />
        <Success order={order} />
        <Footer />
      </ProtectPage>
    </>
  );
};
export default SuccesPage;
