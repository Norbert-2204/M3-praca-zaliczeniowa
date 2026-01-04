import EmptyCartIcon from "@/icons/emptyCart";

const EmptyCart = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full ">
      <h2 className="font-bold text-3xl text-nowrap">Your cart is empty</h2>
      <EmptyCartIcon className="w-[100px] h-[100px] sd:w-[50px] sd:h-[50px]" />
    </div>
  );
};
export default EmptyCart;
