import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectPage from "@/components/ProtectPage";
import UserClient from "@/components/settings/UserClient";
import { UserPanelProvider } from "@/context/ProfileContext";

const UserProfilePage = () => {
  return (
    <>
      <ProtectPage>
        <Header />
        <UserPanelProvider>
          <UserClient />
        </UserPanelProvider>
        <Footer />
      </ProtectPage>
    </>
  );
};
export default UserProfilePage;
