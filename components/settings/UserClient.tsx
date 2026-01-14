"use client";
import Settings from "./Settings";
import Transactions from "./Transactions";
import UserProfile from "./UserProfile";
import { useUserPanel } from "@/context/ProfileContext";

interface UserClientProps {
  user: {
    id: number;
    name: string;
    email: string;
    orders: {
      id: number;
      orderNumber: string | null;
      createdAt: string;
      orderItems: {
        id: number;
        productName: string;
        quantity: number;
        priceAtPurchase: number;
        productProtection: boolean;
      }[];
    }[];
  };
}

const UserClient = ({ user }: UserClientProps) => {
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
        {activePanel === "transactions" && (
          <Transactions orders={user.orders} />
        )}
        {activePanel === "settings" && <Settings />}
      </div>
    </>
  );
};
export default UserClient;
