"use client";

import { CartItemProps, Product } from "@/utils/Types";
import Input from "../reused/Input";
import CartItem from "./CartItem";
import CheckoutPrice from "./CheckoutPrice";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import EmptyCart from "./EmptyCart";

interface CartClientProps {
  products: Product[];
  cartItems: CartItemProps[];
}

const CartClient = ({ products, cartItems }: CartClientProps) => {
  const {
    cartItems: contextItems,
    setCartItems,
    toggleAll,
    isSelectedAll,
  } = useCart();

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems, setCartItems]);

  return (
    <>
      {contextItems.length === 0 ? (
        <div className="flex items-center justify-center flex-wrap p-10">
          <EmptyCart />
        </div>
      ) : (
        <div className="flex flex-col-reverse xl:flex-row items-center xl:items-start p-10 gap-12">
          <div className="flex flex-col gap-6 flex-1">
            <Input
              variant="checkbox"
              label="Select all"
              checked={isSelectedAll(contextItems.map((item) => item.id))}
              onChange={() => toggleAll(contextItems.map((item) => item.id))}
            />
            {contextItems.map((cartItem) => {
              const product = products.find((p) => p.id === cartItem.productId);
              if (!product) return null;

              return (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  product={product}
                />
              );
            })}
          </div>
          <CheckoutPrice cartItems={contextItems} />
        </div>
      )}
    </>
  );
};
export default CartClient;
