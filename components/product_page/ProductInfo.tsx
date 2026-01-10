import { useState } from "react";
import Shield from "@/icons/shield";
import Button from "../reused/Button";
import { Product } from "@/utils/Types";
import { Category } from "@/utils/Types";
import { ShippingDate, formatDate } from "@/utils/ShippingDate";
import { useFilters } from "@/context/FilterContext";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  product: Product;
  category?: Category;
};

const ProductInfo = ({ product, category }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const { startDate, endDate } = ShippingDate();
  const { setSelectedCategories } = useFilters();
  const { isLoggedIn } = useAuth();
  const { addAlert } = useAlert();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterClick = () => {
    if (!isLoggedIn) {
      addAlert("You must be logged in to see this page", "warning");
      return;
    }

    const filterType = "category";
    const filterId = product.categoryId;

    if (!filterId) return;

    if (pathname !== "/product") {
      router.push(`/product?${filterType}=${filterId}`);
    } else {
      if (filterType) setSelectedCategories([filterId]);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-[28px]">{product.name}</h1>
      <Button
        desc={category?.name}
        sizes="verySmall"
        bgColors="dark"
        colors="white"
        className="max-w-[66px]!"
        onClick={handleFilterClick}
      />
      <h2 className="text-[32px]">${product.price}</h2>
      <div className="flex flex-col">
        <p
          className={`transition-all duration-300 overflow-hidden ${
            expanded ? "max-h-full" : "max-h-[120px]"
          }`}
        >
          {product.description}
        </p>
        <Button
          variant="ghost"
          desc="View more"
          colors="orange"
          className="self-start p-0!"
          onClick={() => setExpanded(!expanded)}
        />
      </div>
      <div className="flex flex-col gap-3.5">
        <h3>Shipping available</h3>
        <div className="flex gap-2">
          <Shield />
          <div className="flex flex-col">
            <h3>NexusHub Courier</h3>
            <p className="text-nowrap">
              Estimated arrival {formatDate(startDate)} - {formatDate(endDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductInfo;
