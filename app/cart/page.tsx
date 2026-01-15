import { CartItemProps } from "@/utils/Types";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CartClient from "@/components/cart/CartClient";
import { FiltersProvider } from "@/context/FilterContext";
import ProtectPage from "@/components/ProtectPage";
import FetchTypes from "@/utils/FetchTypes";

const Cart = async () => {
  const { productRes, cartRes } = await FetchTypes();

  const cartItems: CartItemProps[] = await cartRes.json();

  // const products = await productRes.json();

  return (
    <>
      <FiltersProvider>
        <ProtectPage>
          <Header />
          <CartClient cartItems={cartItems} products={productRes} />
          <Footer />
        </ProtectPage>
      </FiltersProvider>
    </>
  );
};
export default Cart;
