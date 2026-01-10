"use client";
import { useCart } from "@/context/CartContext";

import Input from "../reused/Input";
import Button from "../reused/Button";
import Image from "next/image";
import Trash from "@/icons/trash";
import PlusSmall from "@/icons/plusSmall";
import MinusSmall from "@/icons/minusSmall";

import { CartItemProps, Product } from "@/utils/Types";
import { updateQuantity } from "@/utils/AddToCart";
import deleteFromCart from "@/utils/DeleteFromCart";
import { useFilters } from "@/context/FilterContext";
import { usePathname, useRouter } from "next/navigation";

interface CartItemFullProps {
  cartItem: CartItemProps;
  product: Product;
}

const CartItem = ({ cartItem, product }: CartItemFullProps) => {
  const { toggleItem, isSelected, updateQuantityInCart, removeItemFromCart } =
    useCart();

  const { setSelectedCategories, setSelectedBrands } = useFilters();
  const router = useRouter();
  const pathname = usePathname();

  const {
    id,
    name,
    price,
    imageUrl,
    category,
    brandId,
    categoryId,
    quantity,
    filterType = "category",
  } = cartItem;

  const handleFilterClick = () => {
    const filterId = filterType === "category" ? categoryId : brandId;

    if (!filterId) return;

    if (pathname !== "/product") {
      router.push(`/product?${filterType}=${filterId}`);
    } else {
      if (filterType === "category") setSelectedCategories([Number(filterId)]);
      else setSelectedBrands([Number(filterId)]);
    }
  };

  const handleUpdateQuantity = async () => {
    if (!id) return;

    try {
      const data = await updateQuantity(id, +1);
      if (data.newQuantity > product.stock) return;
      updateQuantityInCart(id, data.newQuantity);
    } catch (error) {
      console.error("Update quantity failed", error);
    }
  };

  const handleDecrease = async () => {
    if (!id) return;

    try {
      const data = await updateQuantity(id, -1);
      if (data.newQuantity <= 0) {
        removeItemFromCart(id);
      } else {
        updateQuantityInCart(id, data.newQuantity);
      }
    } catch (error) {
      console.error("Decrease quantity failed", error);
    }
  };

  const handleRemove = async () => {
    await deleteFromCart(id);
    removeItemFromCart(id);
  };

  const handleProductDetail = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full ">
      <Input
        variant="checkbox"
        checked={isSelected(id)}
        onChange={() => toggleItem(id)}
      />
      <div className="flex flex-col sm:flex-row bg-[#262626] p-6 rounded gap-8 flex-1">
        <div
          onClick={handleProductDetail}
          className="flex justify-center items-center p-3 relative bg-white w-[172px] h-[138px] rounded cursor-pointer"
        >
          <Image
            loading="eager"
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 183px)"
            className="object-contain"
          />
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
                  bgColors="none"
                />
              </div>
              <Button
                desc={category}
                sizes="verySmall"
                className=" text-[#FDEDD7] w-[66px]"
                bgColors="dark"
                onClick={handleFilterClick}
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
                    bgColors="none"
                    onClick={handleDecrease}
                  />
                  {quantity}
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
    </div>
  );
};
export default CartItem;
