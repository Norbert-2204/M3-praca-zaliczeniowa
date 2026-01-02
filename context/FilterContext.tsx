"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  brandId: number;
}

interface FiltersContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  selectedCategories: number[];
  selectedBrands: number[];
  setSelectedCategories: (ids: number[]) => void;
  setSelectedBrands: (ids: number[]) => void;
  filteredProducts: Product[];
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.categoryId);
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(p.brandId);
      return categoryMatch && brandMatch;
    });
  }, [products, selectedCategories, selectedBrands]);

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
