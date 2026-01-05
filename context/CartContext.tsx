"use client";

import { createContext, useContext, useState } from "react";
import { CartItemProps } from "@/utils/Types";

interface CartContextType {
  cartItems: CartItemProps[];
  setCartItems: (items: CartItemProps[]) => void;
  selectedId: number[];
  toggleItem: (id: number) => void;
  toggleAll: (ids: number[]) => void;
  isSelected: (id: number) => boolean;
  isSelectedAll: (ids: number[]) => boolean;
  updateQuantityInCart: (id: number, newQuantity: number) => void;
  removeItemFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setSelectedId((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleAll = (ids: number[]) => {
    setSelectedId((prev) => (prev.length === ids.length ? [] : ids));
  };

  const isSelected = (id: number) => selectedId.includes(id);
  const isSelectedAll = (ids: number[]) =>
    ids.length > 0 && ids.every((id) => selectedId.includes(id));

  const updateQuantityInCart = (id: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItemFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedId((prev) => prev.filter((selId) => selId !== id));
  };

  return (
    <CartContext.Provider
      value={{
        selectedId,
        toggleAll,
        toggleItem,
        isSelected,
        isSelectedAll,
        updateQuantityInCart,
        removeItemFromCart,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
