"use client";

import { useRouter, usePathname } from "next/navigation";
import { useFilters } from "@/context/FilterContext";

import Image from "next/image";
import Button from "../reused/Button";
import ShopCartIcon from "@/icons/ShopCart";
import { addToCart } from "@/utils/AddToCart";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import { Product, Brand } from "@/utils/Types";

const imageError = "https://i.ibb.co/twJkJxGK/pngaaa-com-5273700.png";

type ItemCardItem = Product | Brand;

interface ItemCardProps {
  item: ItemCardItem;
  shop?: boolean;
  brand?: boolean;
  bg?: boolean;
  currency?: string;
  filterType?: "category" | "brand";
  categoryName?: string;
}

const ItemCard = ({
  item,
  shop = false,
  bg = false,
  currency = "USD",
  filterType = "category",
  categoryName,
}: ItemCardProps) => {
  const { addAlert } = useAlert();
  const { setSelectedCategories, setSelectedBrands } = useFilters();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, refreshUser } = useAuth();
  console.log("item name", item.name);

  const imgSrc = "imageUrl" in item ? item.imageUrl : imageError;
  const imgAlt = "name" in item ? item.name : "brand";

  const isProduct = (item: ItemCardItem): item is Product => {
    return (item as Product).price !== undefined;
  };

  const isBrand = (item: ItemCardItem): item is Brand => {
    return "brandId" in item && !("price" in item);
  };

  const handleFilterClick = () => {
    const filterId =
      filterType === "category"
        ? isProduct(item)
          ? item.categoryId
          : undefined
        : item.id;

    if (!filterId) return;

    if (pathname !== "/product") {
      router.push(`/product?${filterType}=${filterId}`);
    } else {
      if (filterType === "category") setSelectedCategories([filterId]);
      else setSelectedBrands([filterId]);
    }
  };

  const handleAddToCart = async () => {
    if (!isProduct(item)) return;

    if (!isLoggedIn) {
      addAlert("You must be logged in to add items to your cart", "warning");
      return;
    }

    try {
      const result = await addToCart(item.id);

      if (result.status === 409 && result.addedQuantity === 0) {
        addAlert(
          `Cannot add more of ${item.name} to cart, stock limit reached.`,
          "warning",
        );
        return;
      }

      refreshUser();
      addAlert(`${item.name} added to cart!`, "success");
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  const handleBrandClick = (brandId: number) => {
    router.push(`/product?brand=${brandId}`);
  };

  const handleProductDetail = () => {
    if (!isProduct(item)) return;
    router.push(`/product/${item.id}`);
  };

  return (
    <div
      className={`flex flex-col px-4 pb-5 pt-4 justify-center bg-[#262626] border border-[#383B42] rounded
      ${
        isBrand(item)
          ? "gap-4 items-center w-[220px] h-[210px] cursor-pointer"
          : "gap-4.5 items-start w-[220px] lg:w-[300px] h-auto"
      }`}
      onClick={isBrand(item) ? () => handleBrandClick(item.id) : undefined}
    >
      <div
        className={`relative flex items-center justify-center shrink-0
        ${isBrand(item) ? "w-[180px] h-[110px]" : "w-full h-40"}
        ${bg ? "bg-white" : "bg-[#262626]"}`}
      >
        {isBrand(item) ? (
          <Image
            loading="eager"
            src={item.imageUrl || imageError}
            alt={item.name}
            width={180}
            height={110}
            className="object-contain"
          />
        ) : (
          <div
            onClick={handleProductDetail}
            className="relative w-full h-full z-10 cursor-pointer"
          >
            <Image
              loading="eager"
              src={imgSrc || imageError}
              alt={imgAlt}
              fill
              sizes="(max-width: 183px)"
              className="object-contain"
            />
          </div>
        )}

        {isProduct(item) && item.stock === 0 && (
          <div className="absolute z-50 cursor-pointer">
            <div className="w-[150px] h-[150px] relative">
              <Image
                src="https://i.ibb.co/yn5QgGp1/Sold-PNG-Image.png"
                alt="sold"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}

        {shop && isProduct(item) && (
          <Button
            variant="icon"
            icon={<ShopCartIcon className="text-[#FCFCFC]" />}
            onClick={handleAddToCart}
            className=" absolute left-4 top-4 rounded p-4 z-50"
            bgColors="black"
          />
        )}
      </div>

      {isBrand(item) && <p className="text-[20px]">{item.name}</p>}

      {shop && (
        <Button
          desc={isProduct(item) ? categoryName : "Brand"}
          sizes="verySmall"
          bgColors="dark"
          onClick={handleFilterClick}
        />
      )}

      {shop && isProduct(item) && (
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="whitespace-nowrap text-lg">{item.name}</p>
          <h3 className="text-lg">{`${currency === "USD" ? "$" : "€"}${item.price}`}</h3>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
