"use client";
import Image from "next/image";
import Address from "./Address";
import CheckoutItem from "./CheckoutItem";
import Shield from "@/icons/shield";
import { CartItemProps } from "@/utils/Types";
import EmptyCheckout from "./EmptyCheckout";
import { usePayment, PaymentOption } from "@/context/PaymentContext";
import { useState } from "react";

interface CheckoutChildProps {
  selectedItems: CartItemProps[];
}

const paymentOptions: PaymentOption[] = [
  {
    id: "apple",
    name: "Apple Pay",
    image: "https://i.ibb.co/Hpk67781/Badge-3.png",
  },
  {
    id: "paypal",
    name: "PayPal",
    image: "https://i.ibb.co/6Cg4Jt8/Badge-2.png",
  },
  {
    id: "google",
    name: "Google Pay",
    image: "https://i.ibb.co/5xc71v94/Badge-4.png",
  },
  {
    id: "visa",
    name: "Visa",
    image: "https://i.ibb.co/HDL3hc3j/Badge.png",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    image: "https://i.ibb.co/JR3Z4DpJ/Badge-1.png",
  },
];

const Order = ({ selectedItems }: CheckoutChildProps) => {
  const { paymentMethod, setPaymentMethod } = usePayment();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col w-full flex-1 gap-4.5">
        <h2 className="text-lg">Your Order</h2>
        {selectedItems.length === 0 ? (
          <EmptyCheckout />
        ) : (
          selectedItems.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))
        )}
      </div>
      <div className="flex flex-col w-full flex-1 gap-4.5">
        <h2 className="text-lg">Address</h2>
        <Address />
      </div>
      <div className="flex flex-col gap-4 ">
        <h2 className="text-lg">Shipping</h2>
        <div className="flex gap-4 bg-[#262626] rounded border border-[#383B42] p-6">
          <Shield />
          <h3 className="text-lg">NexusHub Courier</h3>
        </div>
      </div>
      <div className="flex flex-col gap-4 relative">
        <h2 className="text-lg">Payment Method</h2>
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex gap-4 bg-[#262626] rounded border border-[#383B42] p-6 cursor-pointer"
        >
          <Image
            src={paymentMethod?.image || paymentOptions[0].image}
            alt={paymentMethod?.name || paymentOptions[0].name}
            width={46}
            height={30}
          />
          <h3 className="text-lg">
            {paymentMethod?.name || paymentOptions[0].name}
          </h3>
        </div>

        {isOpen && (
          <div className="absolute -top-[140px] left-0 flex flex-col gap-2 bg-[#262626] border border-[#383B42] rounded w-full z-50 p-2">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className="flex gap-4 p-2 rounded hover:bg-[#383B42] cursor-pointer items-center"
                onClick={() => {
                  setPaymentMethod(option);
                  setIsOpen(false);
                }}
              >
                <Image
                  src={option.image}
                  alt={option.name}
                  width={46}
                  height={30}
                />
                <h3 className="text-lg">{option.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Order;
