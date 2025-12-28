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
  "https://i.ibb.co/kVFq6yFb/pngaaa-com-3429402.png",
  "https://i.ibb.co/1fH1t4Wt/pngaaa-com-2946337.png",
];

const Carousel = ({ categories }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = categories.length;

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const next = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <div className="px-6 xl:px-10 flex flex-col items-center">
      {/* VIEWPORT */}
      <div className="relative w-full h-[452px] overflow-hidden bg-[#222327] rounded border border-[#383B42]">
        {/* ARROWS */}
        <Button
          variant="iconBig"
          onClick={prev}
          icon={<Left />}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
        />

        <Button
          variant="iconBig"
          onClick={next}
          icon={<Right />}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
        />

        {/* TRACK */}
        <div
          className="flex h-[452px] transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="
                w-full h-full shrink-0
                flex flex-col md:flex-row
                items-center justify-center
                gap-10
                px-6 xl:px-[120px]
              "
            >
              {/* TEXT */}
              <div className="flex flex-col gap-6 max-w-[450px] text-center sm:text-left ">
                <h2 className="text-[32px]">{capitalize(cat.name)}</h2>
                <p className="text-[#E7E7E7]">{capitalize(cat.exploreInfo)}</p>
                <div className="flex justify-center xl:justify-start">
                  <Button desc="Explore category" icon={<ArrowRight />} />
                </div>
              </div>

              {/* IMAGE */}
              <div className="relative w-full max-w-[300px] xl:max-w-[450px] md:aspect-3/5 ">
                <Image
                  src={categoryImages[idx]}
                  alt={`category-${idx}`}
                  fill
                  className="object-contain max-h-full"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="flex gap-4 pt-6">
        {categories.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-orange-500" : "bg-[#383B42]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
