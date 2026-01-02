"use client";

import { useState } from "react";
import { useFilters } from "@/context/FilterContext";
import Button from "../reused/Button";
import Input from "../reused/Input";
import Dropdown from "../reused/Dropdown";
import PlusSmall from "@/icons/plusSmall";
import MinusSmall from "@/icons/minusSmall";

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

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
  } = useFilters();

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
    </aside>
  );
};

export default SideBar;
