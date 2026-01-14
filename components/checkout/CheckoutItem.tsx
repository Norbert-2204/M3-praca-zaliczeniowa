"use client";

import Input from "../reused/Input";
import Button from "../reused/Button";
import Image from "next/image";
import PlusSmall from "@/icons/plusSmall";
import MinusSmall from "@/icons/minusSmall";

import { CartItemProps } from "@/utils/Types";
import { updateQuantity } from "@/utils/AddToCart";
import { useCart } from "@/context/CartContext";

interface CheckoutChildProps {
  item: CartItemProps;
}

const CheckoutItem = ({ item }: CheckoutChildProps) => {
  const {
    updateQuantityInCart,
    productProtectionSelected,
    toggleProductProtection,
  } = useCart();
  const isProtection = productProtectionSelected.includes(item.id);

  const handleUpdateQuantity = async () => {
    if (!item.id) return;

    try {
      const data = await updateQuantity(item.id, +1);
      updateQuantityInCart(item.id, data.newQuantity);
    } catch (error) {
      console.error("Update quantity failed", error);
    }
  };

  const handleDecrease = async () => {
    if (!item.id) return;

    try {
      const data = await updateQuantity(item.id, -1);
      if (data.newQuantity <= 0) {
        return;
      } else {
        updateQuantityInCart(item.id, data.newQuantity);
      }
    } catch (error) {
      console.error("Decrease quantity failed", error);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 w-full bg-[#262626] rounded border border-[#383B42] ">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="flex flex-col sm:flex-row p-3 rounded gap-8 flex-1 max-w-[172px] border border-[#383B42]">
          <div className="flex justify-center items-center p-3 relative bg-white w-[148px] h-[114px] rounded cursor-pointer">
            <Image
              loading="eager"
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 183px)"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-1">
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex">
                <h2 className="text-lg">{item.name}</h2>
              </div>
              <Button
                desc={"webcam"}
                sizes="verySmall"
                className=" text-[#FDEDD7] w-[66px]"
                bgColors="dark"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <h2 className="text-lg">${item.price}</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button variant="ghost" desc="Write note" colors="orange" />
                <hr className="block sm:hidden w-full border-[#848A97]" />
                <div className="hidden sm:block w-0 h-6 border border-[#848A97]"></div>
                <div className="flex gap-3.5 justify-center sm:items-center border rounded px-5 py-2.5 w-[125px] sm:w-full">
                  <Button
                    variant="icon"
                    icon={<MinusSmall />}
                    className="sm:flex-0"
                    bgColors="none"
                    onClick={handleDecrease}
                  />
                  {item.quantity}
                  <Button
                    variant="icon"
                    icon={<PlusSmall />}
                    className="sm:flex-0"
                    bgColors="none"
                    onClick={handleUpdateQuantity}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-[#383B42]" />
      <div>
        <div className="flex justify-between items-center">
          <Input
            variant="checkbox"
            label="Product protection"
            checked={isProtection}
            onChange={() => toggleProductProtection(item.id)}
          />
          <p className="text-lg">1$</p>
        </div>
        <p className="ml-[30px] text-lg">
          The claim process is easy and instant, valid for 6 months
        </p>
      </div>
    </div>
  );
};
export default CheckoutItem;
