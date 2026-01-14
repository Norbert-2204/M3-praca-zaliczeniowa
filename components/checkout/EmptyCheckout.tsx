import EmptyCartIcon from "@/icons/emptyCart";

const EmptyCheckout = () => {
  return (
    <div className="flex gap-4 items-center">
      <h1 className="text-4xl">Select products to buy</h1>
      <EmptyCartIcon />
    </div>
  );
};
export default EmptyCheckout;
