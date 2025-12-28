"use client";

import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import ArrowRight from "@/icons/arrowRight";
import ArrowLeft from "@/icons/arrowLeft";

interface SliderProps {
  title: string;
  children: React.ReactNode;
  shop?: boolean;
}

const Slider = ({ title, children }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [seeAll, setSeeAll] = useState(false);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      setOverflow(container.scrollWidth > container.clientWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  const handleToggle = () => {
    if (!containerRef.current) return;

    const scrollWidth =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;

    if (seeAll) {
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      containerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
    }

    setSeeAll(!seeAll);
  };

  return (
    <div className={`flex flex-col gap-4 `}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[20px] md:text-[28px]">{title}</h2>
        {overflow && (
          <Button
            onClick={handleToggle}
            desc={seeAll ? "See less" : "See all"}
            variant="ghost"
            icon={seeAll ? <ArrowLeft /> : <ArrowRight />}
          />
        )}
      </div>

      <div ref={containerRef} className="overflow-hidden">
        <div className={`flex transition-transform duration-300 gap-8 `}>
          {React.Children.map(children, (child, idx) => (
            <div key={idx} className={`shrink-0 `}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
