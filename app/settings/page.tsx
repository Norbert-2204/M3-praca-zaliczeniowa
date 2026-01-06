import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectPage from "@/components/ProtectPage";
import UserProfile from "@/components/settings/UserProfile";

const UserProfilePage = () => {
  return (
    <>
      <ProtectPage>
        <Header />
        <div>
          <UserProfile />
        </div>
        <Footer />
      </ProtectPage>
    </>
  );
};
export default UserProfilePage;
