"use client";
import { useAuth } from "@/context/AuthContext";
import TransactionCard from "./TransacionCard";

const Transactions = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col max-w-[470px]  items-center justify-center gap-3">
        <h2 className="text-[#F29145] font-semibold text-lg">Transaction</h2>
        <hr className="border-b-2 border-[#F29145] w-full" />
      </div>
      <div className="flex flex-col gap-4">
        {user?.orders && user.orders.length > 0 ? (
          user.orders.map((order, idx) => {
            return <TransactionCard key={idx} />;
          })
        ) : (
          <h1 className="font-bold text-4xl">No transactions made yet</h1>
        )}
      </div>
    </div>
  );
};
export default Transactions;
