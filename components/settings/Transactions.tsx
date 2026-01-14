import TransactionCard from "./TransacionCard";

interface OrderItemProps {
  id: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  productProtection: boolean;
}

interface OrderProps {
  id: number;
  orderNumber: string | null;
  createdAt: string | Date;
  orderItems: OrderItemProps[];
}

interface TransactionsProps {
  orders: OrderProps[];
}

const Transactions = ({ orders }: TransactionsProps) => {
  if (!orders || orders.length === 0)
    return <h1 className="font-bold text-4xl">No transactions made yet</h1>;

  return (
    <div className="flex flex-col items-center sm:items-stretch w-full gap-8">
      <div className="flex flex-col max-w-[470px]  items-center justify-center gap-3">
        <h2 className="text-[#F29145] font-semibold text-lg">Transaction</h2>
        <hr className="border-b-2 border-[#F29145] w-full" />
      </div>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <TransactionCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
export default Transactions;
