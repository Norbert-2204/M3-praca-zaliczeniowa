import { CartItemProps } from "@/utils/Types";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CartClient from "@/components/cart/CartClient";
import { FiltersProvider } from "@/context/FilterContext";
import ProtectPage from "@/components/ProtectPage";
import FetchTypes from "@/utils/FetchTypes";

const Cart = async () => {
  const { productRes, cartRes } = await FetchTypes();

  const cartItems: CartItemProps[] = cartRes;

  const products = productRes;

  return (
    <>
      <FiltersProvider>
        <ProtectPage>
          <Header />
          <CartClient cartItems={cartItems} products={products} />
          <Footer />
        </ProtectPage>
      </FiltersProvider>
    </>
  );
};
export default Cart;
