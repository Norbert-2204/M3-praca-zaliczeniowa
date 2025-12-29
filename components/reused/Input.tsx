"use client";

import { ChangeEventHandler } from "react";

interface InputProps {
  label?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  checked?: boolean;
  type?: string;
  variant?: "box" | "underline" | "checkbox";
  name?: string;
  placeholder?: string;
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
}: InputProps) => {
  const variantClasses = VARIANTS[variant] || VARIANTS.box;

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

  return (
    <label className="flex flex-col gap-1">
      {label && <span>{label}</span>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${variantClasses} ${className}`}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
