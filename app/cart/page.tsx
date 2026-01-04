import CartItem from "@/components/cart/CartItem";
import CheckoutPrice from "@/components/cart/CheckoutPrice";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/reused/Input";

const Cart = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col-reverse xl:flex-row items-center xl:items-start p-10 gap-12">
        <div className="flex flex-col gap-6 flex-1">
          <Input variant="checkbox" label="Select all" />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <CheckoutPrice />
      </div>
      <Footer />
    </>
  );
};
export default Cart;
