"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Product } from "@/utils/Types";

type SortType = "latest" | "cheapest" | "priciest";

interface FiltersContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  selectedCategories: number[];
  selectedBrands: number[];
  setSelectedCategories: (ids: number[]) => void;
  setSelectedBrands: (ids: number[]) => void;
  filteredProducts: Product[];
  sort: SortType;
  setSort: (s: SortType) => void;
  priceFrom: number | null;
  priceTo: number | null;
  setPriceFrom: (v: number | null) => void;
  setPriceTo: (v: number | null) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [sort, setSort] = useState<SortType>("latest");
  const [priceFrom, setPriceFrom] = useState<number | null>(null);
  const [priceTo, setPriceTo] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    const result = products.filter((p) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.categoryId);

      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(p.brandId);

      const priceFromMatch = priceFrom === null || p.price >= priceFrom;

      const priceToMatch = priceTo === null || p.price <= priceTo;

      return categoryMatch && brandMatch && priceFromMatch && priceToMatch;
    });

    if (sort === "cheapest") {
      return [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "priciest") {
      return [...result].sort((a, b) => b.price - a.price);
    }

    return [...result].sort((a, b) => b.id - a.id);
  }, [products, selectedCategories, selectedBrands, priceFrom, priceTo, sort]);

  return (
    <FiltersContext.Provider
      value={{
        products,
        setProducts,
        selectedCategories,
        selectedBrands,
        setSelectedCategories,
        setSelectedBrands,
        filteredProducts,
        setSort,
        sort,
        priceFrom,
        priceTo,
        setPriceFrom,
        setPriceTo,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context)
    throw new Error("useFilters must be used within FiltersProvider");
  return context;
};
