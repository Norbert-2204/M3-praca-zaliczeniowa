"use client";
import { useCart } from "@/context/CartContext";
import Button from "../reused/Button";

const CheckoutPriceFinal = () => {
  const { selectedId, cartItems, productProtectionSelected } = useCart();

  const selectedItems = cartItems.filter((item) =>
    selectedId.includes(item.id)
  );

  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const productProtection = productProtectionSelected.length * 1;
  const shippingPrice = 5;
  const shippingInsurance = 6;
  const serviceFees = 0.5;

  const grandTotal =
    totalPrice +
    productProtection +
    shippingPrice +
    shippingInsurance +
    serviceFees;

  return (
    <div className="flex flex-col p-6 bg-[#262626] rounded w-full max-w-[423px] gap-6 max-h-[572px] lg:self-start">
      <div className="flex flex-col gap-4.5">
        <h2 className="font-medium text-4.5">Total Product</h2>
        <div className="flex justify-between items-center flex-wrap">
          <h3 className="font-medium">
            Total Product Price ({totalQuantity} Item)
          </h3>
          <h3 className="font-medium text-4.5">${totalPrice.toFixed(2)}</h3>
        </div>
      </div>
      <div className="flex justify-between items center">
        <h3>Total product protection</h3>
        <h3>${productProtection}</h3>
      </div>
      <div className="flex justify-between items center">
        <h3>Total shipping price</h3>
        <h3>${shippingPrice}</h3>
      </div>
      <div className="flex justify-between items center">
        <h3>Shipping insurance</h3>
        <h3>${shippingInsurance}</h3>
      </div>
      <hr className="text-[#383B42]" />
      <div className="flex flex-col gap-4.5">
        <h2 className="font-medium text-4.5">Transaction fees</h2>
        <div className="flex justify-between items center">
          <h3>Service fees</h3>
          <h3>${serviceFees}</h3>
        </div>
      </div>
      <hr className="text-[#383B42]" />
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-4.5">Grand total</h3>
        <h2 className="font-medium text-[28px]">${grandTotal.toFixed(2)}</h2>
      </div>
      <Button desc="Pay now" className="max-w-full!" />
    </div>
  );
};
export default CheckoutPriceFinal;
