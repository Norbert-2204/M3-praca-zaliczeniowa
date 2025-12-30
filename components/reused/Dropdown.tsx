"use client";

import { useState } from "react";
import { countries } from "@/utils/countries";

interface DropdownProps {
  label?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "countries"; // na razie tylko jeden wariant
  size?: "small" | "medium" | "large";
  placeholder?: string;
  error?: string;
}

const VARIANTS = {
  countries: "bg-[#262626] border border-[#616674] rounded w-full ",
};

const SIZES = {
  small: "px-2 py-2 text-sm",
  medium: "px-3 py-3",
  large: "px-[14px] py-[16px]",
};

const Dropdown = ({
  label,
  className = "",
  value = "",
  onChange = () => {},
  variant = "countries",
  size = "medium",
  placeholder = "Select...",
  error,
}: DropdownProps) => {
  const [selected, setSelected] = useState(value);

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
