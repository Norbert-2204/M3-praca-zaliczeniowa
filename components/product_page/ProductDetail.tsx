"use client";

import Image from "next/image";
import DetailsAddToCart from "./DetailsAddToCart";
import ProductInfo from "./ProductInfo";
import { Product, Category } from "@/utils/Types";
import { useState } from "react";
import { FiltersProvider } from "@/context/FilterContext";

type Props = {
  product: Product;
  category?: Category;
};

const ProductDetail = ({ product, category }: Props) => {
  const productImages = [product.imageUrl, product.imageUrl, product.imageUrl];
  const [thisImage, setThisImage] = useState<string>(productImages[0]);
  const [isSelected, setIsSelected] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setThisImage(productImages[index]);
    setIsSelected(index);
  };

  return (
    <>
      <FiltersProvider>
        <div className="flex flex-col lg:flex-row items-center w-full p-10 gap-8">
          <div className="flex w-full gap-10 flex-col md:flex-row items-center">
            <div className="flex flex-col w-full gap-8 min-w-[300px] max-w-[422px]">
              <div className="relative p-3 bg-[#262626] border border-[#383B42] rounded min-w-[300px] max-w-[422px] h-[341px] w-full">
                <div className="relative w-full h-full">
                  <Image
                    src={thisImage}
                    alt={product.name}
                    fill
                    className=" rounded object-contain bg-white"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`rounded bg-white cursor-pointer border-2 ${
                      isSelected === index
                        ? "border-[#F29145]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={product.name}
                      width={130}
                      height={99}
                    />
                  </div>
                ))}
              </div>
            </div>
            <ProductInfo product={product} category={category} />
          </div>
          <DetailsAddToCart product={product} />
        </div>
      </FiltersProvider>
    </>
  );
};
export default ProductDetail;
