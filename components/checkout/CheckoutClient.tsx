"use client";

import Order from "./Order";
import { useCart } from "@/context/CartContext";
import CheckoutPriceFinal from "./CheckoutPriceFinal";
import { useEffect, useState } from "react";

const CheckoutClient = () => {
  const { cartItems, selectedId } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) {
    return null;
  }

  const selectedItems = cartItems.filter((item) =>
    selectedId.includes(item.id)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-full p-10 pt-0 items-center">
      <Order selectedItems={selectedItems} />
      <CheckoutPriceFinal
        selectedItems={cartItems.filter((item) => selectedId.includes(item.id))}
      />
    </div>
  );
};
export default CheckoutClient;
