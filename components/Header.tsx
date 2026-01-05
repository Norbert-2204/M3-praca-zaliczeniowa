"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import Image from "next/image";

import Button from "./reused/Button";
import ShopCartIcon from "@/icons/ShopCart";
import Alert from "./alert/Alert";

const Header = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const { alert, removeAlert } = useAlert();
  const isVisible = Boolean(alert);

  const homePage = () => router.push("/");
  const loginPage = () => router.push("/login");
  const cartPage = () => router.push("/cart");

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <header className="flex flex-col px-10 py-8 gap-10 relative overflow-hidden">
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
              onClick={cartPage}
              icon={<ShopCartIcon className="text-[#FCFCFC]" />}
              bgColors="none"
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

      <div
        className={`flex flex-col gap-2 transition-all duration-300 ease-out
              ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }
            `}
      >
        {alert && (
          <Alert
            pDesc={alert.message}
            alertType={alert.alertType}
            onClick={() => removeAlert()}
            buttonType="button"
            desc="X"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
