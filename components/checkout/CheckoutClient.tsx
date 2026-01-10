"use client";

import Order from "./Order";
import { useCart } from "@/context/CartContext";
import CheckoutPriceFinal from "./CheckoutPriceFinal";

const CheckoutClient = () => {
  const { cartItems, selectedId } = useCart();

  const selectedItems = cartItems.filter((item) =>
    selectedId.includes(item.id)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-full p-10 pt-0 items-center">
      <Order selectedItems={selectedItems} />
      <CheckoutPriceFinal />
    </div>
  );
};
export default CheckoutClient;
