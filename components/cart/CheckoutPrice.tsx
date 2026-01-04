import Button from "../reused/Button";

interface CheckoutPriceProps {
  totalPrice: number;
  totalQuantity: number;
}

const CheckoutPrice = ({ totalPrice, totalQuantity }: CheckoutPriceProps) => {
  return (
    <div className="flex flex-col p-6 bg-[#262626] rounded w-full max-w-[423px] gap-6 max-h-[330px]">
      <div className="flex flex-col gap-4.5">
        <h2 className="font-medium text-4.5">Total Product</h2>
        <div className="flex justify-between items-center flex-wrap">
          <h3 className="font-medium">
            Total Product Price ({totalQuantity} Item)
          </h3>
          <h3 className="font-medium text-4.5">${totalPrice.toFixed(2)}</h3>
        </div>
      </div>
      <hr className="text-[#383B42]" />
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-4.5">Subtotal</h3>
        <h2 className="font-medium text-[28px]">${totalPrice.toFixed(2)}</h2>
      </div>
      <Button desc="Checkout" className="max-w-full!" />
    </div>
  );
};
export default CheckoutPrice;
