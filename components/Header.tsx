"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

import Button from "./reused/Button";
import ShopCartIcon from "@/icons/ShopCart";
import Alert from "./alert/Alert";
import Close from "@/icons/close";

const Header = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  const homePage = () => {
    router.push("/");
  };
  const loginPage = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <header className="flex flex-col px-10 py-8 gap-10">
      <div className="flex justify-between ">
        <h1
          onClick={homePage}
          className="text-xl font-bold md:text-4xl cursor-pointer "
        >
          <span className="text-[#F29145]">Devstock</span>
          <span>Hub</span>
        </h1>
        {isLoggedIn ? (
          <div className="flex justify-between items-center gap-5 md:gap-7">
            <div>
              <Button onClick={handleLogout} desc="Logout" />
            </div>
            <Button
              variant="icon"
              icon={<ShopCartIcon className="text-[#FCFCFC]" />}
            />
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="object-cover rounded-full"
              />
            ) : (
              <div className="bg-gray-700 p-4 w-10 h-10 rounded-full"></div>
            )}
          </div>
        ) : (
          <Button
            onClick={loginPage}
            sizes="small"
            desc="Sign in"
            className="md:px-5 md:py-4"
          />
        )}
      </div>
      <nav className="flex gap-10 md:gap-12 text-sm  md:text-[16px]">
        <Link href="/" className="text-[#F29145]">
          Home
        </Link>
        <Link href="/product">Product</Link>
        <Link href="/">Contact</Link>
      </nav>
      <hr className="text-[#383B42]" />
      {/* <Alert
        variant="primary"
        types="success"
        icon={<Close />}
        pDesc="Product successfully added"
      /> */}
    </header>
  );
};

export default Header;
