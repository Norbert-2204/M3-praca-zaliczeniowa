import CartItem from "@/components/cart/CartItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/reused/Input";

const Cart = () => {
  return (
    <>
      <Header />
      <div>
        <div className="flex flex-col gap-6">
          <Input variant="checkbox" label="Select all" />
          <CartItem />
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  );
};
export default Cart;
