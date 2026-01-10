import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginAuth from "@/components/login/LoginAuth";
import ProtectPage from "@/components/ProtectPage";

const LoginPage = () => {
  return (
    <>
      <ProtectPage check={true}>
        <Header />
        <main className="flex flex-col justify-center items-center gap-8 py-20">
          <h1 className="text-4xl font-bold ">
            <span className="text-[#F29145]">Nexus</span>
            <span>Hub</span>
          </h1>
          <LoginAuth
            label="Email or phone number"
            placeholder="Email or phone number"
          />
        </main>
        <Footer />
      </ProtectPage>
    </>
  );
};
export default LoginPage;
