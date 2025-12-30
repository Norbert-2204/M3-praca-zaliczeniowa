import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CheckCircle from "@/icons/checkCircle";

const ThankYouRegister = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center py-20 px-10">
        <div className="text-[#4ADE80]">
          <CheckCircle />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-[44px] font-bold text-[#FCFCFC]">Thank you!</h1>
            <h3 className="text-2xl text-[#FCFCFC]">
              You have succesfully register
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-[19px]">
            <p className="text-lg">
              Please check your e-mail for further information. Let’s exploring
              our products and enjoy many gifts.
            </p>
            <p className="text-lg">
              Having problem? <a className="text-[#F7B87A]">Contact us</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ThankYouRegister;
