import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  desc?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary" | "ghost" | "icon";
  sizes?: "big" | "medium" | "small";
  icon?: ReactNode;
}

const VARIANTS = {
  primary: "bg-orange-500 text-white rounded font-semibold cursor-pointer",
  secondary:
    "text-orange-500 rounded font-semibold border border-orange-500 cursor-pointer",
  ghost: "bg-transparent text-orange-500 rounded font-semibold cursor-pointer ",
  icon: "bg-transparent cursor-pointer",
};

const SIZE = {
  big: "px-5 py-4",
  medium: "px-3 py-4",
  small: "px-2 py-4",
  icon: "w-6 h-6",
};

const Button = ({
  desc = "",
  className = "",
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
      className={`${variantClasses} ${sizeClasses} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {variant !== "icon" && desc}
    </button>
  );
};
export default Button;
