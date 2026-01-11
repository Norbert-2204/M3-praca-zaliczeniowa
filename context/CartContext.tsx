"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
  productProtectionSelected: number[];
  toggleProductProtection: (id: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [selectedId, setSelectedId] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedId");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [productProtectionSelected, setProductProtectionSelected] = useState<
    number[]
  >([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("selectedId", JSON.stringify(selectedId));
  }, [selectedId]);

  useEffect(() => {
    localStorage.setItem(
      "productProtectionSelected",
      JSON.stringify(productProtectionSelected)
    );
  }, [productProtectionSelected]);

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

  const toggleProductProtection = (id: number) => {
    setProductProtectionSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
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
        productProtectionSelected,
        toggleProductProtection,
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
