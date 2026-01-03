import Input from "../reused/Input";
import Button from "../reused/Button";
import Image from "next/image";
import Trash from "@/icons/trash";

const itemPlaceholder = {
  name: "Myszka X33-R",
  imageUrl: "https://i.ibb.co/jPjq6vXq/pngaaa-com-2946152.png",
  price: 33.55,
};

const CartItem = () => {
  return (
    <div className="flex gap-6">
      <Input variant="checkbox" />
      <div className="flex bg-[#383B42] p-6 rounded">
        <div className="flex justify-center items-center p-3 relative bg-white w-[172px] h-[138px] rounded">
          <Image
            src={itemPlaceholder.imageUrl}
            alt="1"
            width={148}
            height={114}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <h2>{itemPlaceholder.name}</h2>
            <Button variant="icon" icon={<Trash />} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
