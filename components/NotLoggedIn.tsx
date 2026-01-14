import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";

const NotLoggedIn = () => {
  return (
    <>
      <Header />
      <div className="p-10 flex items-center justify-center">
        <h1 className="font-bold text-3xl">
          Please{" "}
          <Link href="/login" className="text-[#F29145]">
            Log in
          </Link>{" "}
          to see this page
        </h1>
      </div>
      <Footer />
    </>
  );
};
export default NotLoggedIn;
