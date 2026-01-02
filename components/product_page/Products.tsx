"use client";

import { useState } from "react";

import Button from "../reused/Button";
import Dropdown from "../reused/Dropdown";
import ItemCard from "../reused/itemCard";
import ArrowLeft from "@/icons/arrowLeft";
import ArrowRight from "@/icons/arrowRight";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  brandId: number;
}

interface Category {
  id: number;
  name: string;
}

interface ProductPops {
  products: Product[];
  category: Category[];
}

const Products = ({ products, category }: ProductPops) => {
  const [quantity, setQuantity] = useState("9");

  return (
    <div className="flex flex-col p-10 border-l border-[#383B42] gap-12">
      <div className="flex gap-15">
        <div className="flex justify-center items-center gap-4">
          <h2 className="text-nowrap text-xl font-semibold">Sort by</h2>
          <Dropdown
            variant="custom"
            size="small"
            options={[
              { label: "Latest", value: "latest" },
              { label: "Cheapest", value: "cheapest" },
              { label: "Priciest", value: "priciest" },
            ]}
            className="bg-[#262626]! rounded"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <h2 className="text-nowrap text-xl font-semibold">Show</h2>
          <Dropdown
            variant="custom"
            size="small"
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
              { label: "6", value: "6" },
              { label: "7", value: "7" },
              { label: "8", value: "8" },
              { label: "9", value: "9" },
            ]}
            value={quantity}
            onChange={(val) => setQuantity(val)}
            className="bg-[#262626]! rounded"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-12">
        {products.map((p) => {
          const categoryName = category.find(
            (cat) => cat.id === p.categoryId
          )?.name;
          return (
            <ItemCard
              key={p.id}
              item={p}
              shop={true}
              price={p.price}
              itemName={categoryName}
              id={p.id}
              bg={true}
            />
          );
        })}
      </div>
      <div className="flex justify-between">
        <div>Placeholder</div>
        <div className="flex gap-8">
          <Button
            variant="ghost"
            desc="Previous"
            icon={<ArrowLeft />}
            sizes="average"
            className="text-[#FCFCFC] flex-row-reverse border "
          />
          <Button
            variant="ghost"
            desc="Next"
            icon={<ArrowRight />}
            sizes="average"
            className="text-[#FCFCFC] border w-[110px]"
          />
        </div>
      </div>
    </div>
  );
};
export default Products;
