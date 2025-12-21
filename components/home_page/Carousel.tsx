"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../reused/Button";
import ArrowRight from "@/icons/arrowRight";
import capitalize from "@/utils/Capitalize";
import Left from "@/icons/left";
import Right from "@/icons/rigth";

interface Category {
  name: string;
  description: string;
  image: string;
  exploreInfo: string;
}
interface CarouselProps {
  categories: Category[];
}

const categoryImages = [
  "https://i.ibb.co/gZrffcgH/pngaaa-com-2910757.png",
  "https://i.ibb.co/sdF5yKZw/pngaaa-com-1241714.png",
  "https://i.ibb.co/4n1fwtyZ/pngaaa-com-904170.png",
  "https://i.ibb.co/KcSVkJ9n/pngaaa-com-3429346.png",
  "https://i.ibb.co/1fH1t4Wt/pngaaa-com-2946337.png",
];

const Carousel = ({ categories }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = categories.length;

  const prev = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((currentIndex - 1 + total) % total);
  };

  const next = () => {
    if (currentIndex === total - 1) {
      return;
    }
    setCurrentIndex((currentIndex + 1) % total);
  };

  return (
    <div className="px-10 flex flex-col justify-center items-center">
      <div className="pl-[120px] relative w-full h-[452px] overflow-hidden bg-[#222327] flex items-center rounded border border-[#383B42]">
        <Button
          variant="iconBig"
          onClick={prev}
          icon={<Left />}
          className="absolute left-0 z-10"
        />
        <div
          className="flex transition-transform duration-500 ease-in-out h-full "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="shrink-0 w-full h-full flex justify-between items-center gap-20"
            >
              <div className="flex flex-col max-w-[450px] gap-6">
                <h2 className="text-[32px]">{capitalize(cat.name)}</h2>
                <p className="text-[#E7E7E7]">{capitalize(cat.exploreInfo)}</p>
                <Button desc="Explore category" icon={<ArrowRight />} />
              </div>

              <div className="flex relative w-full h-full">
                <Image
                  loading="eager"
                  src={categoryImages[idx]}
                  alt={`category-${idx}`}
                  width={600}
                  height={800}
                  style={{ width: "80%", height: "auto" }}
                />
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="iconBig"
          onClick={next}
          icon={<Right />}
          className="absolute right-0 z-10"
        />
      </div>
      <div className="flex gap-4 pt-6">
        {categories.map((_, idx) => {
          return (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-orange-500" : "bg-[#383B42]"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
export default Carousel;
