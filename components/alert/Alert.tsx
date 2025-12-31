import Button from "../reused/Button";
import { MouseEventHandler, ReactNode } from "react";
import Check from "@/icons/check";
import Denied from "@/icons/denied";

interface AlertProps {
  desc?: string;
  pDesc?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant: "primary" | "success" | "fail";
  types: "success" | "fail";
  icon?: ReactNode;
  iconType?: "success" | "fail";
  type?: "button" | "submit";
}

const DIVARIANTS = {
  primary: "flex justify-evenly items-center p-[18] border rounded w-full",
  success: "text-[#86EFAD]",
  fail: "text-[#DC2626]",
};

const TYPES = {
  success: "bg-[#295B40] border-[#22C55E]",
  fail: "bg-[#FEF2F2], border-[#F87171]",
};

const ICONS = {
  success: <Check />,
  fail: <Denied />,
};

const Alert = ({
  desc = "",
  pDesc = "",
  className = "",
  onClick = () => {},
  variant = "primary" as "primary" | "success" | "fail",
  types = "success",
  iconType,
  icon,
  type = "button",
}: AlertProps) => {
  const variantClasses = DIVARIANTS[variant] || DIVARIANTS.primary;
  const typeClasses = TYPES[types] || TYPES.success;
  const typeIcons = iconType ? ICONS[iconType] : ICONS.success;

  return (
    <div className={`${variantClasses} ${typeClasses} ${className}`}>
      <div>{typeIcons}</div>
      <p>{pDesc}</p>
      <Button desc={desc} icon={icon} type={type} onClick={onClick} />
    </div>
  );
};
export default Alert;
