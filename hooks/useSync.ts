"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFilters } from "@/context/FilterContext";

export const useSync = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { selectedCategories, selectedBrands, priceFrom, priceTo, sort } =
    useFilters();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    } else {
      params.delete("category");
    }

    if (selectedBrands.length > 0) {
      params.set("brand", selectedBrands.join(","));
    } else {
      params.delete("brand");
    }

    if (priceFrom !== null) {
      params.set("priceFrom", String(priceFrom));
    } else {
      params.delete("priceFrom");
    }

    if (priceTo !== null) {
      params.set("priceTo", String(priceTo));
    } else {
      params.delete("priceTo");
    }

    if (sort !== "latest") {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [
    selectedCategories,
    selectedBrands,
    priceFrom,
    priceTo,
    sort,
    router,
    searchParams,
  ]);
};
