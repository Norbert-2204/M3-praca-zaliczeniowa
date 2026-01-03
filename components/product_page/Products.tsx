"use client";

import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useFilters } from "@/context/FilterContext";
import { useCurrency } from "@/context/CurrencyContext";

import Button from "../reused/Button";
import Dropdown from "../reused/Dropdown";
import ItemCard from "../reused/itemCard";
import ArrowLeft from "@/icons/arrowLeft";
import ArrowRight from "@/icons/arrowRight";
import { Product, Category } from "@/utils/Types";
import Loading from "../reused/Loading";

interface ProductPops {
  category: Category[];
  products: Product[];
}

const Products = ({ category, products }: ProductPops) => {
  const [quantity, setQuantity] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const { setProducts, filteredProducts, setSort } = useFilters();
  const { currency, convertPrice } = useCurrency();
  const totalPages = Math.ceil(filteredProducts.length / quantity);

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  if (filteredProducts.length === 0) {
    return <Loading />;
  }

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * quantity,
    currentPage * quantity
  );

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleQuantityChange = (val: string | number) => {
    const qty = Number(val);
    setQuantity(qty);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col p-10 border-l border-[#383B42] gap-12 w-full">
      <div className="flex flex-col md:flex-row gap-15">
        <div className="flex justify-center items-center gap-4">
          <h2 className="text-nowrap text-xl font-semibold">Sort by</h2>
          <Dropdown
            variant="custom"
            size="small"
            options={[
              { label: "Latest", value: "latest" },
              { label: "Cheapest", value: "cheapest" },
              { label: "Priciest", value: "priciest" },
            ]}
            onChange={(val) =>
              setSort(val as "latest" | "cheapest" | "priciest")
            }
            className="bg-[#262626]! rounded max-w-[115px]"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <h2 className="text-nowrap text-xl font-semibold ">Show</h2>
          <Dropdown
            variant="custom"
            size="small"
            options={[
              { label: "3", value: 3 },
              { label: "4", value: 4 },
              { label: "5", value: 5 },
              { label: "6", value: 6 },
              { label: "7", value: 7 },
              { label: "8", value: 8 },
              { label: "9", value: 9 },
            ]}
            value={quantity}
            onChange={handleQuantityChange}
            className="bg-[#262626]! rounded max-w-[102px]"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-12">
        {paginatedProducts.map((p) => {
          const categoryName = category.find(
            (cat) => cat.id === p.categoryId
          )?.name;
          return (
            <ItemCard
              key={p.id}
              item={p}
              shop={true}
              price={convertPrice(p.price)}
              currency={currency}
              itemName={categoryName}
              id={p.id}
              bg={true}
            />
          );
        })}
      </div>
      <div className="flex flex-col sm:flex-row gap-5 md:gap-0 justify-between">
        <div className="flex gap-2.5">
          {Pagination(currentPage, totalPages).map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="text-[#FCFCFC] px-2">
                ...
              </span>
            ) : (
              <Button
                key={idx}
                desc={page.toString()}
                variant={page === currentPage ? "primary" : "ghost"}
                sizes="pagination"
                onClick={() => setCurrentPage(Number(page))}
                className="text-[#FCFCFC] w-11 h-11"
              />
            )
          )}
        </div>
        <div className="flex gap-8">
          <Button
            variant="ghost"
            desc="Previous"
            icon={<ArrowLeft />}
            sizes="average"
            onClick={handlePrevious}
            className="text-[#FCFCFC] flex-row-reverse border"
          />
          <Button
            variant="ghost"
            desc="Next"
            icon={<ArrowRight />}
            sizes="average"
            onClick={handleNext}
            className="text-[#FCFCFC] border w-[110px]"
          />
        </div>
      </div>
    </div>
  );
};
export default Products;
