"use client";

import { useEffect, useState } from "react";
import ItemCard from "../reused/itemCard";
import Slider from "../reused/Slider";

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

interface ProductProps {
  products: Product[];
  categories: Category[];
}

const Recomdendations = ({ products, categories }: ProductProps) => {
  const [randomProducts, setRandomProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const ids = new Set<number>();
    while (ids.size < 6 && ids.size < products.length) {
      const randIndex = Math.floor(Math.random() * products.length);
      ids.add(products[randIndex].id);
    }
    const selected = products.filter((p) => ids.has(p.id));
    setTimeout(() => {
      setRandomProducts(selected);
    }, 0);
  }, [products]);

  if (!randomProducts) {
    return (
      <div className="flex flex-col gap-8 px-10">
        <h2 className="text-[28px]">Recomendation</h2>
        <div className="flex gap-8">
          {/* placeholdery */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col px-4 pb-5 pt-4 gap-[18px] justify-center items-start w-[300px] h-[300px] bg-gray-800 rounded"
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8 px-10">
      <Slider title="Recomendation" shop={true}>
        {randomProducts.map((product) => {
          const categoryName = categories.find(
            (cat) => cat.id === product.categoryId
          )?.name;

          return (
            <ItemCard
              key={product.id}
              item={product}
              shop={true}
              itemName={categoryName}
              price={product.price}
              id={product.id}
              bg={true}
            />
          );
        })}
      </Slider>
    </div>
  );
};
export default Recomdendations;
