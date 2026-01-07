import Shield from "@/icons/shield";
import Button from "../reused/Button";

const ProductInfo = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-[28px]">Myszka</h1>
      <Button
        desc="Mouse"
        sizes="verySmall"
        bgColors="dark"
        colors="white"
        className="max-w-[66px]!"
      />
      <h2 className="text-[32px]">$39.33</h2>
      <div className="flex flex-col">
        <p className="">
          The Xierra X16 mouse is a cutting-edge peripheral that combines
          precision and comfort. Its ergonomic design fits snugly in your hand,
          while its high-precision sensor ensures smooth and accurate{" "}
        </p>
        <Button
          variant="ghost"
          desc="View more"
          colors="orange"
          className="self-start p-0!"
        />
      </div>
      <div className="flex flex-col gap-3.5">
        <h3>Shipping available</h3>
        <div className="flex gap-2">
          <Shield />
          <div className="flex flex-col">
            <h3>NexusHub Courier</h3>
            <p>Estimated arrival 30 Sep - 3 Oct</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductInfo;
