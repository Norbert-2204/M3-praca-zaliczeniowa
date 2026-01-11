"use client";
import { useCart } from "@/context/CartContext";
import Button from "../reused/Button";
import { CartItemProps } from "@/utils/Types";
import { useAuth } from "@/context/AuthContext";

interface CheckoutChildProps {
  selectedItems: CartItemProps[];
  checkoutAddress: {
    address: string;
    country: string;
  };
}

const CheckoutPriceFinal = ({
  selectedItems,
  checkoutAddress,
}: CheckoutChildProps) => {
  console.log(checkoutAddress);
  const { productProtectionSelected, cartItems, setCartItems } = useCart();
  const { user } = useAuth();

  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalProductPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const productProtection = selectedItems.reduce(
    (sum, item) =>
      productProtectionSelected.includes(item.id) ? sum + item.quantity : sum,
    0
  );

  const shippingPrice = 5;
  const shippingInsurance = 6;
  const serviceFees = 0.5;

  const grandTotal =
    totalProductPrice +
    productProtection +
    shippingPrice +
    shippingInsurance +
    serviceFees;

  const handlePayNow = async () => {
    if (!selectedItems.length) return;

    if (!user?.id) {
      alert("User not logged in");
      return;
    }

    try {
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          selectedItems,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      console.log("Order created:", data.order);

      const remainingItems = cartItems.filter(
        (item) => !selectedItems.find((sel) => sel.id === item.id)
      );
      setCartItems(remainingItems);

      alert("Order created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create order");
    }
  };

  return (
    <div className="flex flex-col p-6 bg-[#262626] rounded w-full max-w-[423px] gap-6 max-h-[572px] lg:self-start">
      <div className="flex flex-col gap-4.5">
        <h2 className="font-medium text-4.5">Total Product</h2>
        <div className="flex justify-between items-center flex-wrap">
          <h3 className="font-medium">
            Total Product Price ({totalQuantity} Item)
          </h3>
          <h3 className="font-medium text-4.5">
            ${totalProductPrice.toFixed(2)}
          </h3>
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
      <Button onClick={handlePayNow} desc="Pay now" className="max-w-full!" />
    </div>
  );
};
export default CheckoutPriceFinal;
