"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { AlertProvider } from "@/context/AlertContext";
import { PaymentProvider } from "@/context/PaymentContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <AlertProvider>
          <PaymentProvider>{children}</PaymentProvider>
        </AlertProvider>
      </CartProvider>
    </AuthProvider>
  );
}
