import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";

const LoggedInUser = () => {
  return (
    <>
      <Header />
      <div className="p-10 flex items-center justify-center">
        <h1 className="font-bold text-3xl">
          You are already logged in, please return to{" "}
          <Link href="/" className="text-[#F29145]">
            home page
          </Link>{" "}
        </h1>
      </div>
      <Footer />
    </>
  );
};
export default LoggedInUser;
