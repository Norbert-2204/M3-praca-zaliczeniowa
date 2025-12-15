"use client";

// import { ShopCartIcon } from "../icons/ShopCart";
import Button from "./reused/Button";
import ShopCartIcon from "../icons/ShopCart";

const Header = () => {
  return (
    <header className="flex flex-col px-10 py-8 gap-10">
      <div className="flex justify-between ">
        <h1 className="text-4xl font-bold ">
          <span className="text-[#F29145]">Devstock</span>
          <span>Hub</span>
        </h1>
        <div className="flex justify-between items-center gap-7">
          <Button
            variant="icon"
            icon={<ShopCartIcon className="text-white" />}
          />
          <div className="bg-gray-700 p-4 w-10 h-10 rounded-full"></div>
        </div>
      </div>
      <nav className="flex gap-12 ">
        <a className="text-[#F29145]">Home</a>
        <a>Product</a>
        <a>Contact</a>
      </nav>
      <hr className="text-[#383B42]" />
    </header>
  );
};

export default Header;
