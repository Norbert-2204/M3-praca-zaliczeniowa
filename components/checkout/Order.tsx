import Image from "next/image";
import Address from "./Address";
import CheckoutItem from "./CheckoutItem";
import Shield from "@/icons/shield";
import { CartItemProps } from "@/utils/Types";
import EmptyCheckout from "./EmptyCheckout";

interface CheckoutChildProps {
  selectedItems: CartItemProps[];
}

const Order = ({ selectedItems }: CheckoutChildProps) => {
  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col w-full flex-1 gap-4.5">
        <h2>Your Order</h2>
        {selectedItems.length === 0 ? (
          <EmptyCheckout />
        ) : (
          selectedItems.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))
        )}
      </div>
      <div className="flex flex-col w-full flex-1 gap-4.5">
        <h2>Address</h2>
        <Address />
      </div>
      <div className="flex flex-col gap-4 ">
        <h2>Shipping</h2>
        <div className="flex gap-4 bg-[#262626] rounded border border-[#383B42] p-6">
          <Shield />
          <h3>NexusHub Courier</h3>
        </div>
      </div>
      <div className="flex flex-col gap-4 ">
        <h2>Shipping</h2>
        <div className="flex gap-4 bg-[#262626] rounded border border-[#383B42] p-6">
          <Image
            src="https://i.ibb.co/Hpk67781/Badge-3.png"
            alt="apple"
            width={46}
            height={30}
          />
          <h3>Apple pay</h3>
        </div>
      </div>
    </div>
  );
};
export default Order;
