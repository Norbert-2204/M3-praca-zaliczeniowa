"use client";
import Settings from "./Settings";
import Transactions from "./Transactions";
import UserProfile from "./UserProfile";
import { useUserPanel } from "@/context/ProfileContext";

const UserClient = () => {
  const { activePanel } = useUserPanel();
  return (
    <>
      <div className="flex gap-12 p-10 pt-0">
        <UserProfile />
        {activePanel === "transactions" && <Transactions />}
        {activePanel === "settings" && <Settings />}
      </div>
    </>
  );
};
export default UserClient;
