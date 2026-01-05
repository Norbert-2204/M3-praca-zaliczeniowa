"use client";

import { useRouter, usePathname } from "next/navigation";
import { useFilters } from "@/context/FilterContext";

import Image from "next/image";
import Button from "../reused/Button";
import ShopCartIcon from "@/icons/ShopCart";
import { addToCart } from "@/utils/AddToCart";
import { useAlert } from "@/context/AlertContext";

const imageError = "https://i.ibb.co/twJkJxGK/pngaaa-com-5273700.png";

interface BaseItem {
  name: string;
  imageUrl: string;
  categoryId: number;
  brandId: number;
}

interface ItemCardProps {
  item: BaseItem;
  id?: number;
  shop?: boolean;
  itemName?: string;
  price?: number;
  brand?: boolean;
  bg?: boolean;
  currency?: string;
  filterType?: "category" | "brand";
}

const ItemCard = ({
  item,
  shop = false,
  itemName,
  brand = false,
  price,
  id,
  bg = false,
  currency = "USD",
  filterType = "category",
}: ItemCardProps) => {
  const { addAlert } = useAlert();
  const { setSelectedCategories, setSelectedBrands } = useFilters();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterClick = () => {
    const filterId = filterType === "category" ? item.categoryId : item.brandId;

    if (!filterId) return;

    if (pathname !== "/product") {
      router.push(`/product?${filterType}=${filterId}`);
    } else {
      if (filterType === "category") setSelectedCategories([filterId]);
      else setSelectedBrands([filterId]);
    }
  };

  const handleAddToCart = async () => {
    if (!id) return;

    try {
      await addToCart(id);
      addAlert(`${item.name} added to cart!`, "success");
      console.log("Product added to cart");
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };
  const handleBrandClick = (brandId: number) => {
    console.log(brandId);
    router.push(`/product?brand=${brandId}`);
  };
  console.log(item.brandId);

  return (
    <div
      key={id}
      className={`flex flex-col px-4 pb-5 pt-4 ${
        brand
          ? "gap-7 cursor-pointer items-center w-[220px] h-[190px]"
          : "gap-4.5 items-start w-[220px] lg:w-[300px] h-auto"
      } justify-center bg-[#262626] border border-[#383B42] rounded`}
    >
      <div
        onClick={brand ? () => handleBrandClick(item.brandId) : undefined}
        className={`relative flex items-center justify-center shrink-0 ${
          brand ? "w-[110px] h-[57px]" : "w-full h-40"
        }
         ${bg ? "bg-white" : "bg-[#262626]"}
         `}
      >
        <div
          onClick={brand ? () => handleBrandClick(item.brandId) : undefined}
          className="w-[220px] h-[190px] absolute z-10 -top-9"
        ></div>
        {brand ? (
          <Image
            loading="eager"
            src={item.imageUrl || imageError}
            alt={item.name}
            width={220}
            height={180}
            className="w-full h-full object-contain"
          />
        ) : (
          <Image
            loading="eager"
            src={item.imageUrl || imageError}
            alt={item.name}
            fill
            sizes="(max-width: 183px)"
            className="object-contain"
          />
        )}

        {shop && (
          <Button
            variant="icon"
            icon={<ShopCartIcon className="text-[#FCFCFC]" />}
            onClick={handleAddToCart}
            className=" absolute left-4 top-4 rounded p-4"
            bgColors="black"
          />
        )}
      </div>
      {brand && <p className="text-[20px]">{item.name}</p>}
      {shop && (
        <Button
          desc={itemName}
          sizes="verySmall"
          bgColors="dark"
          onClick={handleFilterClick}
        />
      )}
      {shop && (
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="whitespace-nowrap">{item.name}</p>
          <h3>{`${currency === "USD" ? "$" : "€"}${price}`}</h3>
        </div>
      )}
    </div>
  );
};
export default ItemCard;
