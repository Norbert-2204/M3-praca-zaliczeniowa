"use client";
import Input from "../reused/Input";
import Button from "../reused/Button";
import Image from "next/image";
import Trash from "@/icons/trash";
import PlusSmall from "@/icons/plusSmall";
import MinusSmall from "@/icons/minusSmall";
import { CartItemProps } from "@/utils/Types";
import { updateQuantity } from "@/utils/AddToCart";
import deleteFromCart from "@/utils/DeleteFromCart";

const CartItem = ({
  id,
  name,
  price,
  imageUrl,
  category,
  quantity,
}: CartItemProps) => {
  const handleUpdateQuantity = async () => {
    if (!id) return;

    try {
      await updateQuantity(id, +1);
      window.location.reload();
      console.log("Product quantity updated");
    } catch (error) {
      console.error("Update quantity failed", error);
    }
  };

  const handleRemove = async () => {
    await deleteFromCart(id);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-6 w-full ">
      <Input variant="checkbox" />
      <div className="flex flex-col sm:flex-row bg-[#262626] p-6 rounded gap-8 flex-1">
        <div className="flex justify-center items-center p-3 relative bg-white w-[172px] h-[138px] rounded">
          <Image src={imageUrl} alt="1" width={148} height={114} />
        </div>
        <div className="flex flex-1">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <h2>{name}</h2>
                <Button
                  variant="icon"
                  icon={<Trash />}
                  onClick={handleRemove}
                />
              </div>
              <Button
                desc={category}
                sizes="verySmall"
                className="bg-[#E5610A]! text-[#FDEDD7] w-[66px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <h2>${price}</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button variant="ghost" desc="Write note" />
                <hr className="block sm:hidden w-full border-[#848A97]" />
                <div className="hidden sm:block w-0 h-6 border border-[#848A97]"></div>
                <div className="flex gap-3.5 justify-center sm:items-center border rounded px-5 py-2.5 w-[125px] sm:w-full">
                  <Button
                    variant="icon"
                    icon={<MinusSmall />}
                    className="sm:flex-0"
                  />
                  {quantity}
                  <Button
                    variant="icon"
                    icon={<PlusSmall />}
                    className="sm:flex-0"
                    onClick={handleUpdateQuantity}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
