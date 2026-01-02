"use client";

import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  desc?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary" | "ghost" | "icon" | "iconBig";
  sizes?:
    | "big"
    | "medium"
    | "average"
    | "small"
    | "verySmall"
    | "pagination"
    | "icon"
    | "iconBig";
  icon?: ReactNode;
  type?: "button" | "submit";
}

const VARIANTS = {
  primary:
    "bg-[#F29145] text-[#262626] rounded font-semibold cursor-pointer max-w-[174px] max-h-[60px] text-nowrap",
  secondary:
    "text-[#F29145] text-[#F29145] rounded font-semibold border border-orange-500 cursor-pointer max-w-[174px] max-h-[60px] text-nowrap",
  ghost:
    "bg-transparent text-[#F29145] rounded font-semibold cursor-pointer max-w-[174px] max-h-[60px] text-nowrap",
  icon: " cursor-pointer flex justify-center items-center",
  iconBig:
    "bg-[#F29145] text-[#262626] cursor-pointer flex justify-center items-center w-11 h-[74px] rounded",
};

const SIZE = {
  big: "px-5 py-4",
  medium: "px-3 py-4",
  average: "px-2.5 py-5",
  small: "px-2 py-4 text-sm",
  verySmall: "px-1.5 py-2 text-xs",
  pagination: "p-2.5",
  icon: "w-6 h-6",
  iconBig: "w-[7px] h-1",
};

const Button = ({
  desc = "",
  className = "",
  type = "button",
  onClick = () => {},
  variant = "primary" as "primary" | "secondary" | "ghost" | "icon",
  sizes = "medium",
  icon,
}: ButtonProps) => {
  const variantClasses = VARIANTS[variant] || VARIANTS.primary;
  const sizeClasses =
    variant === "icon" ? SIZE.icon : SIZE[sizes] || SIZE.medium;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${variantClasses} ${sizeClasses} ${className} flex justify-center items-center`}
    >
      {desc && <span>{desc}</span>}
      {icon && <span className="flex">{icon}</span>}
    </button>
  );
};
export default Button;
