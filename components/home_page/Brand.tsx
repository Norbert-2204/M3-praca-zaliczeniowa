import Slider from "../reused/Slider";
import ItemCard from "../reused/itemCard";

interface BrandItem {
  name: string;
  imageUrl: string;
}

interface BrandProps {
  brands: BrandItem[];
}

const Brand = ({ brands }: BrandProps) => {
  const allBrands = brands.slice(0, 6);
  return (
    <div className="flex flex-col gap-8 px-10 pt-[100px] pb-[88px]">
      <Slider title="Brands" />
      <div className="flex gap-8">
        {allBrands.map((brand: BrandItem, idx: number) => (
          <ItemCard key={idx} item={brand} brand={true} />
        ))}
      </div>
    </div>
  );
};
export default Brand;
