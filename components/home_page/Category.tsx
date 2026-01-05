"use client";

import Image from "next/image";
import capitalize from "@/utils/Capitalize";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  exploreInfo: string;
}
interface CategoryProps {
  categories: Category[];
}

const Category = ({ categories }: CategoryProps) => {
  const router = useRouter();
  const handleClick = (categoryId: number) => {
    router.push(`/product?category=${categoryId}`);
  };

  return (
    <div className="flex flex-col items-start justify-center px-10 gap-8 py-[100px] w-full">
      <h2 className="text-[28px]">Category</h2>
      <div className="flex justify-center gap-16 w-full flex-wrap">
        {categories.map((cat, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col justify-evenly items-center w-[220] h-[180] bg-[#262626] rounded border border-[#616674] relative group cursor-pointer"
              onClick={() => handleClick(cat.id)}
            >
              <Image src={cat.image} alt={cat.name} width={80} height={80} />
              <h3 className="text-xl">{capitalize(cat.name)}</h3>
              <p className="absolute text-xs bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {capitalize(cat.description)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Category;
