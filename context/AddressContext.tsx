"use client";
import { createContext, useContext, useState } from "react";

interface CheckoutAddress {
  mode: "exist" | "new";
  country: string;
  address: string;
  saveAsMain?: boolean;
}

interface AddressContextType {
  checkoutAddress: CheckoutAddress;
  setCheckoutAddress: (data: CheckoutAddress) => void;
}

const AddressContext = createContext<AddressContextType | null>(null);

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checkoutAddress, setCheckoutAddress] = useState<CheckoutAddress>({
    mode: "exist",
    country: "",
    address: "",
    saveAsMain: false,
  });

  return (
    <AddressContext.Provider value={{ checkoutAddress, setCheckoutAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useCheckoutAddress = () => {
  const ctx = useContext(AddressContext);
  if (!ctx)
    throw new Error("useCheckoutAddress must be used inside AddressProvider");
  return ctx;
};
