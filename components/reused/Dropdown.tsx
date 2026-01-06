"use client";

import { useState } from "react";
import { countries } from "@/utils/countries";

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  label?: string;
  className?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  variant?: "countries" | "custom";
  options?: Option[];
  placeholder?: string;
  size?: "small" | "medium" | "large" | "input";
  error?: string;
  fullWidth?: boolean;
  isError?: boolean;
  isDark?: boolean;
  defaultValue?: string | number;
  isUpdate?: boolean;
}

const VARIANTS = {
  countries: "bg-[#262626] border border-[#616674] rounded w-full",
  custom: "bg-transparent",
};

const SIZES = {
  small: "px-4 py-2.5 text-sm",
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
  fullWidth = true,
  isError = false,
  isDark = false,
  isUpdate = false,
  defaultValue = "",
}: DropdownProps) => {
  const [selected, setSelected] = useState(
    isUpdate ? defaultValue || "" : value || (options[0]?.value ?? "")
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  const variantClasses = VARIANTS[variant] || "";
  const sizeClasses = SIZES[size] || "";

  if (isUpdate) {
    return (
      <label className="flex flex-col items-center w-full">
        <div className="flex w-full justify-between items-center">
          {label && <span className="font-medium text-[18px]">{label}</span>}
          <select
            value={selected}
            onChange={handleChange}
            className={`${variantClasses} ${sizeClasses} ${className} w-full max-w-[400px] outline-none`}
          >
            <option disabled value="">
              {placeholder}
            </option>

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
                  className={`${isDark ? "text-[#262626]" : ""}`}
                >
                  {opt.label}
                </option>
              ))}
          </select>
        </div>

        {isError ? (
          <p
            className={`${
              error ? "opacity-100" : "opacity-0"
            } text-[#EF4444] text-[12px] self-end h-5`}
          >
            {error || ""}
          </p>
        ) : (
          ""
        )}
      </label>
    );
  }

  return (
    <label className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
      {label && <span className="font-medium text-[18px]">{label}</span>}
      <select
        value={selected}
        onChange={handleChange}
        className={`${variantClasses} ${sizeClasses} ${className} ${
          fullWidth ? "w-full" : ""
        } outline-none`}
      >
        <option disabled value="">
          {placeholder}
        </option>

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
              className={`${isDark ? "text-[#262626]" : ""}`}
            >
              {opt.label}
            </option>
          ))}
      </select>
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

export default Dropdown;
