"use client";

import Image from "next/image";
import DetailsAddToCart from "./DetailsAddToCart";
import ProductInfo from "./ProductInfo";

const ProductDetail = () => {
  return (
    <div className="flex w-full p-10 gap-8">
      <div className="flex w-full gap-10 max-w[889px] ">
        <div className="flex flex-col w-full gap-8">
          <div className="relative p-3 bg-[#262626] border border-[#383B42] rounded min-w-[300px] max-w[422px] h-[341px]">
            <div className="relative w-full h-full">
              <Image
                src={"https://i.ibb.co/PG0n8y7M/pngaaa-com-8043265.png"}
                alt="1"
                fill
                className=" rounded object-contain bg-white"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="border-2 border-[#F29145] rounded bg-white">
              <Image
                src={"https://i.ibb.co/PG0n8y7M/pngaaa-com-8043265.png"}
                alt="2"
                width={130}
                height={99}
              />
            </div>
            <div className="rounded bg-white">
              <Image
                src={"https://i.ibb.co/PG0n8y7M/pngaaa-com-8043265.png"}
                alt="3"
                width={130}
                height={99}
              />
            </div>
            <div className="rounded bg-white">
              <Image
                src={"https://i.ibb.co/PG0n8y7M/pngaaa-com-8043265.png"}
                alt="4"
                width={130}
                height={99}
              />
            </div>
          </div>
        </div>
        <ProductInfo />
      </div>
      <DetailsAddToCart />
    </div>
  );
};
export default ProductDetail;
