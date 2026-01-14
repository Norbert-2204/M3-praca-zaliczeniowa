"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CheckoutContextType {
  paymentMethod: PaymentOption;
  setPaymentMethod: (method: PaymentOption) => void;
}

export interface PaymentOption {
  id: string;
  name: string;
  image: string;
}

const defaultPayment: PaymentOption = {
  id: "apple",
  name: "Apple Pay",
  image: "https://i.ibb.co/Hpk67781/Badge-3.png",
};

const PaymentContext = createContext<CheckoutContextType>({
  paymentMethod: defaultPayment,
  setPaymentMethod: () => {},
});

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentOption>(defaultPayment);

  return (
    <PaymentContext.Provider value={{ paymentMethod, setPaymentMethod }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
