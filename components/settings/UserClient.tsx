"use client";
import Settings from "./Settings";
import Transactions from "./Transactions";
import UserProfile from "./UserProfile";
import { useUserPanel } from "@/context/ProfileContext";

const UserClient = () => {
  const { activePanel } = useUserPanel();
  return (
    <>
      <div
        className={`flex flex-col ${
          activePanel === "transactions"
            ? "md:flex-row md:items-start"
            : "lg:flex-row lg:items-stretch"
        } items-center  gap-12 p-10 pt-0`}
      >
        <UserProfile />
        {activePanel === "transactions" && <Transactions />}
        {activePanel === "settings" && <Settings />}
      </div>
    </>
  );
};
export default UserClient;
