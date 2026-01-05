"use client";

import Button from "../reused/Button";
import { MouseEventHandler, ReactNode } from "react";
import Check from "@/icons/check";
import Denied from "@/icons/denied";

interface AlertProps {
  desc?: string;
  pDesc?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "primary";
  alertType?: "success" | "fail";
  icon?: ReactNode;
  iconType?: "success" | "fail";
  buttonType?: "button" | "submit";
  bgColors?: "none";
  colors?: "white";
}

const DIVARIANTS = {
  primary: "flex justify-between items-center p-4 border rounded w-full",
};

const TYPES = {
  success: "bg-[#295B40] border border-[#22C55E] text-[#86EFAD]",
  fail: "bg-[#FEF2F2] border border-[#F87171] text-[#DC2626]",
};

const ICONS = {
  success: <Check />,
  fail: <Denied />,
};

const Alert = ({
  desc = "Zamknij",
  pDesc = "",
  className = "",
  onClick = () => {},
  variant = "primary",
  alertType = "success",
  iconType,
  icon,
  buttonType = "button",
}: AlertProps) => {
  const variantClasses = DIVARIANTS[variant];
  const typeClasses = TYPES[alertType];
  const typeIcon = iconType ? ICONS[iconType] : ICONS[alertType];

  return (
    <div className={`${variantClasses} ${typeClasses} ${className}`}>
      <div className="flex gap-4 items-center">
        <div>{icon || typeIcon}</div>
        <p>{pDesc}</p>
      </div>
      <Button
        desc={desc}
        icon={icon}
        type={buttonType}
        onClick={onClick}
        variant="icon"
        sizes="small"
        bgColors="none"
        colors="white"
      />
    </div>
  );
};

export default Alert;
