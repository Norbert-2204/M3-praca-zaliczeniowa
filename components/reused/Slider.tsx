"use client";

import { useState } from "react";
import Button from "./Button";
import ArrowRight from "@/icons/arrowRight";
import ArrowLeft from "@/icons/arrowLeft";

interface SliderProps {
  title: string;
}

const Slider = ({ title }: SliderProps) => {
  const [seeAll, setSeeAll] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-[28px]">{title}</h2>
      {seeAll ? (
        <Button
          onClick={() => setSeeAll(false)}
          desc="See less"
          variant="ghost"
          icon={<ArrowLeft />}
        />
      ) : (
        <Button
          onClick={() => setSeeAll(true)}
          desc="See all"
          variant="ghost"
          icon={<ArrowRight />}
        />
      )}
    </div>
  );
};
export default Slider;
