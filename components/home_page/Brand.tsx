import Slider from "../reused/Slider";
import ItemCard from "../reused/itemCard";

interface BrandItem {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
  brandId: number;
}

interface BrandProps {
  brands: BrandItem[];
}

const Brand = ({ brands }: BrandProps) => {
  const visibleBrands = brands.slice(0, 6);
  return (
    <div className="flex flex-col gap-8 px-10 pt-[100px] pb-[88px]">
      <Slider title="Brands">
        {visibleBrands.map((brand: BrandItem, idx: number) => (
          <ItemCard key={idx} item={brand} brand={true} />
        ))}
      </Slider>
    </div>
  );
};
export default Brand;
