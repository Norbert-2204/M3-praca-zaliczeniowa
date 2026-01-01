"use client";

import { useState } from "react";
import { countries } from "@/utils/countries";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "countries" | "custom";
  options?: Option[];
  placeholder?: string;
  size?: "small" | "medium" | "large" | "input";
  error?: string;
}

const VARIANTS = {
  countries: "bg-[#262626] border border-[#616674] rounded w-full",
  custom: "bg-transparent w-full",
};

const SIZES = {
  small: "px-2 py-2 text-sm",
  medium: "px-3 py-3",
  large: "px-3.5 py-4.5",
  input: "px-4.5 py-[16.5px] border-l-none rounded-tr-md rounded-br-md",
};

const Dropdown = ({
  label,
  className = "",
  value = "",
  onChange = () => {},
  variant = "countries",
  options = [],
  placeholder = "Select...",
  size = "medium",
  error,
}: DropdownProps) => {
  const [selected, setSelected] = useState(value || (options[0]?.value ?? ""));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  const variantClasses = VARIANTS[variant] || "";
  const sizeClasses = SIZES[size] || "";

  return (
    <label className="flex flex-col gap-1 w-full">
      {label && <span className="font-medium text-[18px]">{label}</span>}
      <select
        value={selected}
        onChange={handleChange}
        className={`${variantClasses} ${sizeClasses} ${className} outline-none`}
      >
        <option value="">{placeholder}</option>

        {variant === "countries" &&
          countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}

        {variant === "custom" &&
          options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="text-[#262626]"
            >
              {opt.label}
            </option>
          ))}
      </select>

      <p
        className={`${
          error ? "opacity-100" : "opacity-0"
        } text-[#EF4444] text-[12px] h-5`}
      >
        {error || ""}
      </p>
    </label>
  );
};

export default Dropdown;
