import { cookies } from "next/headers";
import { CartItemProps } from "@/utils/Types";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotLoggedIn from "@/components/NotLoggedIn";
import EmptyCart from "@/components/cart/EmptyCart";
import CartClient from "@/components/cart/CartClient";
import { CartProvider } from "@/context/CartContext";
import { FiltersProvider } from "@/context/FilterContext";
import ProtectPage from "@/components/ProtectPage";
import FetchTypes from "@/utils/FetchTypes";

const Cart = async () => {
  const { productRes } = await FetchTypes();
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth");

  if (!authCookie) {
    return <NotLoggedIn />;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cart`, {
    cache: "no-store",
    headers: {
      cookie: `auth=${authCookie.value}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch cart");

  const cartItems: CartItemProps[] = await res.json();

  const products = await productRes.json();

  return (
    <>
      <FiltersProvider>
        <CartProvider>
          <ProtectPage>
            <Header />
            {cartItems.length === 0 ? (
              <div className="flex items-center justify-center flex-wrap p-10">
                <EmptyCart />
              </div>
            ) : (
              <CartClient cartItems={cartItems} products={products} />
            )}
            <Footer />
          </ProtectPage>
        </CartProvider>
      </FiltersProvider>
    </>
  );
};
export default Cart;
