"use client";

import { ChangeEventHandler, useState } from "react";
import Button from "./Button";
import EyeOpen from "@/icons/eyeOpen";
import EyeClosed from "@/icons/eyeClosed";

interface InputProps {
  label?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  checked?: boolean;
  type?: string;
  variant?: "box" | "underline" | "checkbox";
  name?: string;
  placeholder?: string;
  error?: string;
  sizes?: "small" | "medium" | "large" | "dropdown";
  isError?: boolean;
}

const VARIANTS = {
  box: "border border-[#616674] rounded px-3 py-2 outline-none",
  underline:
    "border-0 border-b border-[#616674] px-1 py-2 outline-none rounded-none",
  checkbox: `w-6 h-6 cursor-pointer relative 
             border border-[#616674] rounded 
             checked:bg-[#F29145] checked:border-[#F29145] 
             after:content-['✔'] after:absolute after:inset-0 
             after:flex after:items-center after:justify-center 
             after:text-[#262626] after:text-sm after:font-bold 
             after:opacity-0 checked:after:opacity-100`,
};

const SIZES = {
  small: "px-2 py-2",
  medium: "px-3 py-3",
  large: "px-5 py-[14px]",
  dropdown: "px-4.5 py-3.5 rounded-tl-md rounded-bl-md",
};

const Input = ({
  label = "",
  className = "",
  onChange = () => {},
  value,
  checked,
  type = "text",
  variant = "box",
  name,
  placeholder,
  error,
  sizes = "large",
  isError = false,
}: InputProps) => {
  const variantClasses = VARIANTS[variant] || VARIANTS.box;
  const sizesClasses = SIZES[sizes] || SIZES.large;
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (variant === "checkbox") {
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`${variantClasses} ${className} appearance-none`}
        />
        {label && <span>{label}</span>}
      </label>
    );
  }

  const isPassword = type === "password";

  return (
    <label className="flex flex-col gap-1 relative">
      {label && <span>{label}</span>}
      <input
        name={name}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        className={`${variantClasses} ${sizesClasses} ${className}`}
        placeholder={placeholder}
      />
      {isPassword && (
        <Button
          onClick={handlePassword}
          className="absolute top-10.5 right-4"
          variant="icon"
          icon={showPassword ? <EyeOpen /> : <EyeClosed />}
          bgColors="none"
        />
      )}
      {isError ? (
        <p
          className={`${
            error ? "opacity-100" : "opacity-0"
          } text-[#EF4444] text-[12px] h-5`}
        >
          {error || ""}
        </p>
      ) : (
        ""
      )}
    </label>
  );
};

export default Input;
