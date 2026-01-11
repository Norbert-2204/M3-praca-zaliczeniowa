import CheckoutClient from "@/components/checkout/CheckoutClient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AddressProvider } from "@/context/AddressContext";

const CheckoutPage = () => {
  return (
    <>
      <Header />
      <AddressProvider>
        <CheckoutClient />
      </AddressProvider>
      <Footer />
    </>
  );
};
export default CheckoutPage;
