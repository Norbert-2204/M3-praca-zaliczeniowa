import CartItem from "@/components/cart/CartItem";
import CheckoutPrice from "@/components/cart/CheckoutPrice";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotLoggedIn from "@/components/NotLoggedIn";
import Input from "@/components/reused/Input";
import { cookies } from "next/headers";
import { CartItemProps } from "@/utils/Types";
import EmptyCart from "@/components/cart/EmptyCart";

const Cart = async () => {
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

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center flex-wrap p-10">
          <EmptyCart />
        </div>
      ) : (
        <div className="flex flex-col-reverse xl:flex-row items-center xl:items-start p-10 gap-12">
          <div className="flex flex-col gap-6 flex-1">
            <Input variant="checkbox" label="Select all" />
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} {...cartItem} />
            ))}
          </div>
          <CheckoutPrice
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
          />
        </div>
      )}

      <Footer />
    </>
  );
};
export default Cart;
