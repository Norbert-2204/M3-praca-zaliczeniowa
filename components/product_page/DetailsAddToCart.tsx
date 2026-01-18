import { useState } from "react";
import { addToCart } from "@/utils/AddToCart";

import { Product } from "@/utils/Types";
import PlusSmall from "@/icons/plusSmall";
import Button from "../reused/Button";
import ShopCartIcon from "@/icons/ShopCart";
import MinusSmall from "@/icons/minusSmall";
import OkArrow from "@/icons/okArrow";
import { useAlert } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";

type Props = {
  product: Product;
};

const DetailsAddToCart = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [colorType, setColorType] = useState("black");
  const { addAlert } = useAlert();
  const { isLoggedIn } = useAuth();

  const subtotal = (product.price * quantity).toFixed(2);

  const increase = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    try {
      if (!isLoggedIn) {
        addAlert("You need to be logged in to add products to cart", "warning");
        return;
      }

      const result = await addToCart(product.id, quantity);
      if (result.status === 409 && result.addedQuantity === 0) {
        addAlert(
          `Cannot add more of ${product.name} to cart, stock limit reached or empty.`,
          "warning",
        );
        return;
      }

      if (result.addedQuantity < quantity) {
        addAlert(
          `Only ${result.addedQuantity} of ${product.name} were added to cart due to stock limit.`,
          "warning",
        );
      } else {
        addAlert(`${product.name} added to cart!`, "success");
      }
    } catch (error) {
      console.error("Add to cart failed", error);
      addAlert("Failed to add product to cart", "fail");
    }
  };
  return (
    <div className="flex flex-col w-full max-w-[423px] bg-[#262626] border rounded border-[#383B42] p-6 gap-8 h-fit">
      <div className="flex flex-col gap-3.5 ">
        <h3>Colors</h3>
        <div className="flex gap-4">
          <div
            onClick={() => setColorType("white")}
            className="bg-white w-[54px] h-[54px] rounded text-[#262626] relative cursor-pointer"
          >
            <OkArrow
              className={`absolute top-5 right-5.5 ${
                colorType === "white" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div
            onClick={() => setColorType("black")}
            className="bg-[#222327] w-[54px] h-[54px] rounded relative text-white cursor-pointer"
          >
            <OkArrow
              className={`absolute top-5 right-5.5 ${
                colorType === "black" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3>Quantity</h3>
        <div className="flex flex-col sm:flex-row gap-6 justify-center sm:justify-start items-center">
          <div className="flex gap-3.5 justify-center sm:items-start border rounded px-5 py-2.5 sm:w-[125px] w-full">
            <Button
              variant="icon"
              icon={<MinusSmall />}
              className="sm:flex-0"
              bgColors="none"
              onClick={decrease}
            />
            <p>{quantity}</p>
            <Button
              variant="icon"
              icon={<PlusSmall />}
              className="sm:flex-0"
              bgColors="none"
              onClick={increase}
            />
          </div>
          <p className="text-nowrap">Stock : {product.stock}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <h3>Subtotal</h3>
        <h1>${subtotal}</h1>
      </div>
      <Button
        variant="secondary"
        colors="orange"
        desc="Add to cart"
        bgColors="none"
        className="max-w-full! gap-4"
        icon={<ShopCartIcon />}
        onClick={handleAddToCart}
      />
    </div>
  );
};
export default DetailsAddToCart;
