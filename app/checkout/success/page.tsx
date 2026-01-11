import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CheckCircle from "@/icons/checkCircle";

const SuccesPage = () => {
  return (
    <>
      <Header />
      <div className="flex w-full items-center justify-center p-10 pb-20">
        <div className="flex flex-col w-full max-w-[640px] p-6 gap-6 bg-[#262626] border rounded border-[#383B42] items-center justify-center">
          <div className="flex flex-col items-center">
            <CheckCircle />
            <h1 className="text-nowrap">Thanks for Your Order</h1>
          </div>
          <h2>INV/208421205/TSR/3385-B54</h2>
          <div className="flex flex-col w-full gap-4">
            <h2>Transaction Date</h2>
            <h2>Wednesday, August 9, 2023</h2>
          </div>
          <div className="flex flex-col w-full gap-4">
            <h2>Payment method</h2>
            <h2>Apple pay</h2>
          </div>
          <div className="flex flex-col w-full gap-4">
            <h2>Shipping method</h2>
            <h2>NexusHub Courier</h2>
          </div>
          <div className="flex flex-col w-full gap-4">
            <h2>Your Order</h2>
            <div className="flex p-4 gap-6">
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default SuccesPage;
