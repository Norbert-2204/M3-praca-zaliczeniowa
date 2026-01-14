import CheckoutClient from "@/components/checkout/CheckoutClient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectPage from "@/components/ProtectPage";
import { AddressProvider } from "@/context/AddressContext";

const CheckoutPage = () => {
  return (
    <>
      <ProtectPage>
        <Header />
        <AddressProvider>
          <CheckoutClient />
        </AddressProvider>
        <Footer />
      </ProtectPage>
    </>
  );
};
export default CheckoutPage;
