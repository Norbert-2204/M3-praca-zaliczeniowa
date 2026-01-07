import PlusSmall from "@/icons/plusSmall";
import Button from "../reused/Button";
import ShopCartIcon from "@/icons/ShopCart";
import MinusSmall from "@/icons/minusSmall";

const DetailsAddToCart = () => {
  return (
    <div className="flex flex-col w-full max-w-[423px] bg-[#262626] border rounded border-[#383B42] p-6 gap-8">
      <div className="flex flex-col gap-3.5 ">
        <h3>Colors</h3>
        <div className="flex gap-4">
          <div className="bg-white w-[54px] h-[54px] rounded"></div>
          <div className="bg-[#222327] w-[54px] h-[54px] rounded"></div>
        </div>
      </div>
      <div className="fle flex-col">
        <h3>Quantity</h3>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="flex gap-3.5 justify-center sm:items-center border rounded px-5 py-2.5 w-[125px] sm:w-full">
            <Button
              variant="icon"
              icon={<MinusSmall />}
              className="sm:flex-0"
              bgColors="none"
            />
            <p>10</p>
            <Button
              variant="icon"
              icon={<PlusSmall />}
              className="sm:flex-0"
              bgColors="none"
            />
          </div>
          <p className="text-nowrap">Stock : 120</p>
        </div>
      </div>
      <div className="flex justify-between">
        <h3>Subtotal</h3>
        <h1>$239.99</h1>
      </div>
      <Button
        variant="secondary"
        colors="orange"
        desc="Add to cart"
        bgColors="none"
        className="max-w-full! gap-4"
        icon={<ShopCartIcon />}
      />
    </div>
  );
};
export default DetailsAddToCart;
