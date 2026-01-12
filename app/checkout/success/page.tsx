import { getUserId } from "@/app/lib/getId";
import { prisma } from "../../lib/prisma";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/reused/Button";
import CheckCircle from "@/icons/checkCircle";
import Image from "next/image";
import Link from "next/link";
import ProtectPage from "@/components/ProtectPage";

const SuccesPage = async () => {
  const userId = await getUserId();
  if (!userId) return <div>Please log in to see your order</div>;

  const order = await prisma.order.findFirst({
    where: { userId },
    include: { orderItems: true },
    orderBy: { createdAt: "desc" },
  });
  if (!order) return;

  const totalProductPrice = order.orderItems.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0
  );

  const productProtectionCost = order.orderItems.reduce(
    (sum, item) => sum + (item.productProtection ? item.quantity : 0),
    0
  );

  const totalProductProtection = 1 * order.orderItems.length;
  const totalShippingPrice = 5 * order.orderItems.length;
  const totalShippingInsurance = 6 * order.orderItems.length;
  const serviceFees = 0.5;

  const grandTotal =
    totalProductPrice +
    totalProductProtection +
    totalShippingPrice +
    totalShippingInsurance +
    serviceFees;

  return (
    <>
      <ProtectPage>
        <Header />
        <div className="flex w-full items-center justify-center p-10 pb-20">
          <div className="flex flex-col w-full max-w-[640px] p-6 gap-6 bg-[#262626] border rounded border-[#383B42] items-center justify-center">
            <div className="flex flex-col items-center">
              <CheckCircle />
              <h1 className="text-nowrap text-xl sm:text-[28px] font-medium ">
                Thanks for Your Order
              </h1>
            </div>
            <h2 className="text-sm sm:text-lg">{order.orderNumber}</h2>
            <div className="flex flex-col w-full gap-4">
              <h2 className="text-lg">Transaction Date</h2>
              <h2>{new Date(order.createdAt).toLocaleDateString()}</h2>
            </div>
            <hr className="w-full text-[#383B42]" />
            <div className="flex flex-col w-full gap-4">
              <h2 className="text-lg">Payment method</h2>
              <h2 className="text-lg">Apple pay</h2>
            </div>
            <hr className="w-full text-[#383B42]" />
            <div className="flex flex-col w-full gap-4">
              <h2 className="text-lg">Shipping method</h2>
              <h2 className="text-lg">NexusHub Courier</h2>
            </div>
            <hr className="w-full text-[#383B42]" />
            <div className="flex flex-col w-full gap-4">
              <h2 className="text-lg">Your Order</h2>
              <div className="flex flex-col gap-4 w-full">
                {order.orderItems.map((item) => {
                  return (
                    <div key={item.id} className="flex flex-col gap-8 w-full">
                      <div className="flex flex-col sm:flex-row gap-8  border rounded border-[#383B42] p-4">
                        <div className="flex flex-col sm:flex-row p-3 items-center rounded gap-8 flex-1 max-w-[172px] border border-[#383B42]">
                          <div className="flex justify-center items-center p-3 relative bg-white sm:w-[148px] w-[100px] h-[90px] sm:h-[114px] rounded cursor-pointer">
                            <Image
                              loading="eager"
                              src={item.imageUrl}
                              alt={item.productName}
                              fill
                              sizes="(max-width: 183px)"
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                          <div className="flex flex-col gap-3">
                            <h2 className="text-[20px]">{item.productName}</h2>
                            <Button
                              desc={item.category}
                              bgColors="dark"
                              colors="white"
                              sizes="verySmall"
                              className="max-w-[66px]! cursor-default!"
                            />
                          </div>
                          <div className="flex justify-between w-full">
                            <h2 className="text-lg">
                              ${item.priceAtPurchase.toFixed(2)}
                            </h2>
                            <h3 className="text-lg">x{item.quantity}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between w-full">
                    <h2 className="text-lg">
                      Total Product Price (
                      {order.orderItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}{" "}
                      Items)
                    </h2>
                    <h2 className="text-lg">${totalProductPrice.toFixed(2)}</h2>
                  </div>
                  <div className="flex justify-between w-full">
                    <h2 className="text-lg">Total Product Protection</h2>
                    <h2 className="text-lg">${productProtectionCost}</h2>
                  </div>
                  <div className="flex justify-between w-full">
                    <h2 className="text-lg">Total Shipping Price</h2>
                    <h2 className="text-lg">$5</h2>
                  </div>
                  <div className="flex justify-between w-full">
                    <h2 className="text-lg">Shipping Insurance</h2>
                    <h2 className="text-lg">$6</h2>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-full text-[#383B42]" />
            <div className="flex flex-col w-full gap-4">
              <h2 className="text-lg">Transaction fees</h2>
              <div className="flex justify-between w-full">
                <h2 className="text-lg">Service fees</h2>
                <h2 className="text-lg">${serviceFees}</h2>
              </div>
            </div>
            <hr className="w-full text-[#383B42]" />
            <div className="flex justify-between w-full">
              <h2 className="text-lg">Grand total</h2>
              <h2 className="text-lg">${grandTotal.toFixed(2)}</h2>
            </div>
            <div className="flex justify-between w-full">
              <h2 className="text-lg">Status</h2>
              <Button
                desc="Success"
                sizes="verySmall"
                className="max-w-[77px]! cursor-default! bg-[#295B40]! text-[#DCFCE8]!"
              />
            </div>
            <Button className="w-full! max-w-full!">
              <Link href={"/product"}>Continue shopping</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </ProtectPage>
    </>
  );
};
export default SuccesPage;
