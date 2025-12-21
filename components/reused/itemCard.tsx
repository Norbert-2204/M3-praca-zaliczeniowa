"use client";

import Image from "next/image";
import Button from "../reused/Button";
import ShopCartIcon from "@/icons/ShopCart";

const imageError = "https://i.ibb.co/twJkJxGK/pngaaa-com-5273700.png";

interface BaseItem {
  name: string;
  imageUrl: string;
}

interface ItemCardProps {
  item: BaseItem;
  id?: number;
  shop?: boolean;
  itemName?: string;
  price?: number;
  brand?: boolean;
  bg?: boolean;
}

const ItemCard = ({
  item,
  shop = false,
  itemName,
  brand = false,
  price,
  id,
  bg = false,
}: ItemCardProps) => {
  return (
    <div
      key={id}
      className={`flex flex-col px-4 pb-5 pt-4 ${
        brand ? "gap-7" : "gap-[18px]"
      } justify-center ${brand ? "items-center" : "items-start"} ${
        brand ? "w-[220px]" : "w-[300px]"
      } ${
        brand ? "h-[190px]" : "h-auto"
      } bg-[#262626] border border-[#383B42] rounded`}
    >
      <div
        className={`relative flex items-center justify-center ${
          brand ? "w-[110px] h-[57px]" : "w-full aspect-4/3"
        }
         ${bg ? "bg-white" : "bg-[#262626]"}
         `}
      >
        <Image
          loading="eager"
          src={item.imageUrl || imageError}
          alt={item.name}
          width={brand ? 55 : undefined}
          height={brand ? 29 : undefined}
          fill={brand ? false : true}
          style={brand ? { width: "auto", height: "auto" } : {}}
          sizes="(max-width: 181px), height: auto"
          className="object-contain"
        />

        {shop && (
          <Button
            variant="icon"
            icon={<ShopCartIcon className="text-[#FCFCFC]" />}
            className="bg-[#262626] absolute left-4 top-4 rounded p-4"
          />
        )}
      </div>
      {brand && <p className="text-[20px]">{item.name}</p>}
      {shop && <Button desc={itemName} sizes="verySmall" />}
      {shop && (
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="whitespace-nowrap">{item.name}</p>
          <h3>{`$${price}`}</h3>
        </div>
      )}
    </div>
  );
};
export default ItemCard;
