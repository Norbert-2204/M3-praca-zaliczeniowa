"use client";

import { useState } from "react";
import { useFilters } from "@/context/FilterContext";
import { useCurrency } from "@/context/CurrencyContext";
import Button from "../reused/Button";
import Input from "../reused/Input";
import Dropdown from "../reused/Dropdown";
import PlusSmall from "@/icons/plusSmall";
import MinusSmall from "@/icons/minusSmall";
import { Category, Brand } from "@/utils/Types";

interface SideBarProps {
  categories: Category[];
  brands: Brand[];
}

const SideBar = ({ categories, brands }: SideBarProps) => {
  const {
    selectedCategories,
    selectedBrands,
    setSelectedCategories,
    setSelectedBrands,
    priceFrom,
    priceTo,
    setPriceFrom,
    setPriceTo,
  } = useFilters();

  const { currency, setCurrency } = useCurrency();

  const [loadMore, setLoadMore] = useState(false);
  const [mode, setMode] = useState<"category" | "brand">("category");

  const items = mode === "category" ? categories : brands;
  const selectedItems =
    mode === "category" ? selectedCategories : selectedBrands;
  const setSelectedItems =
    mode === "category" ? setSelectedCategories : setSelectedBrands;

  const toggle = (id: number) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((x) => x !== id)
        : [...selectedItems, id]
    );
  };

  const handlePriceFrom = (val: string | number) => {
    const num = Number(val);
    setPriceFrom(isNaN(num) ? null : num);
  };
  const handlePriceTo = (val: string | number) => {
    const num = Number(val);
    setPriceTo(isNaN(num) ? null : num);
  };

  return (
    <aside className="max-w-[363px] min-w-[320px] p-4 sm:p-10 flex flex-col gap-10">
      <Dropdown
        variant="custom"
        options={[
          { label: "Category", value: "category" },
          { label: "Brand", value: "brand" },
        ]}
        value={mode}
        onChange={(val) => setMode(val as "category" | "brand")}
        isDark
      />

      <div className="flex flex-col gap-4 px-2">
        <Input
          variant="checkbox"
          label="All"
          checked={selectedItems.length === 0}
          onChange={() => setSelectedItems([])}
        />

        {items.slice(0, loadMore ? undefined : 4).map((item) => (
          <Input
            key={item.id}
            variant="checkbox"
            label={item.name}
            checked={selectedItems.includes(item.id)}
            onChange={() => toggle(item.id)}
          />
        ))}

        <Button
          variant="ghost"
          desc={loadMore ? "Load less" : "Load more"}
          icon={loadMore ? <MinusSmall /> : <PlusSmall />}
          onClick={() => setLoadMore((p) => !p)}
          className="justify-start p-0 text-[#E7E7E7]"
        />
      </div>
      <div className="flex flex-col gap-4 px-2.5">
        <Dropdown
          variant="custom"
          options={[{ label: "Price", value: "price" }]}
        />
        <div className="flex items-start w-full">
          <Input
            className="bg-[#262626] rounded-none max-w-[145px]"
            sizes="dropdown"
            placeholder="$ 10.00"
            value={priceFrom ?? ""}
            onChange={(e) => handlePriceFrom(e.target.value)}
          />
          <Dropdown
            variant="custom"
            size="input"
            options={[
              { label: "USD", value: "USD" },
              { label: "EUR", value: "EUR" },
            ]}
            value={currency}
            onChange={(val) => setCurrency(val as "USD" | "EUR")}
            fullWidth={false}
            className="bg-[#262626]! border border-[#616674]"
          />
        </div>
        <div className="flex items-start w-full">
          <Input
            className="bg-[#262626] rounded-none max-w-[145px]"
            sizes="dropdown"
            placeholder="$ 20.00"
            value={priceTo ?? ""}
            onChange={(e) => handlePriceTo(e.target.value)}
          />
          <Dropdown
            variant="custom"
            size="input"
            options={[
              { label: "USD", value: "USD" },
              { label: "EUR", value: "EUR" },
            ]}
            value={currency}
            onChange={(val) => setCurrency(val as "USD" | "EUR")}
            fullWidth={false}
            className="bg-[#262626]! border border-[#616674] "
          />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
