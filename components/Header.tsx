"use client";

// import { ShopCartIcon } from "../icons/ShopCart";
import Button from "./reused/Button";
import ShopCartIcon from "@/icons/ShopCart";

const Header = () => {
  return (
    <header className="flex flex-col px-10 py-8 gap-10">
      <div className="flex justify-between ">
        <h1 className="text-xl font-bold md:text-4xl ">
          <span className="text-[#F29145]">Devstock</span>
          <span>Hub</span>
        </h1>
        <div className="flex justify-between items-center gap-5 md:gap-7">
          <Button
            variant="icon"
            icon={<ShopCartIcon className="text-[#FCFCFC]" />}
          />
          <div className="bg-gray-700 p-4 w-10 h-10 rounded-full"></div>
        </div>
      </div>
      <nav className="flex gap-10 md:gap-12 text-sm  md:text-[16px]">
        <a className="text-[#F29145]">Home</a>
        <a>Product</a>
        <a>Contact</a>
      </nav>
      <hr className="text-[#383B42]" />
    </header>
  );
};

export default Header;
