import TransactionCart from "@/icons/transactionCart";

export interface OrderItemProps {
  id: number;
  productName: string;
  quantity: number;
  productProtection: boolean;
}

export interface OrderProps {
  id: number;
  orderNumber: string | null;
  createdAt: string | Date;
  orderItems: OrderItemProps[];
}

interface TransactionCardProps {
  order: OrderProps;
}

const TransactionCard = ({ order }: TransactionCardProps) => {
  if (!order) return null;

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleString()
    : "-";
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-[#262626] border border-[#383B42] rounded">
      <div className="flex flex-row sm:hidden gap-3.5">
        <TransactionCart />
        <h2>{date}</h2>
      </div>
      <TransactionCart className="hidden sm:block" />
      <div className="flex flex-col gap-3.5">
        <h2 className="hidden sm:block">{date}</h2>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <span>Your order nr {order.orderNumber}</span>
          {order.orderItems.map((item) => (
            <li key={item.id}>
              {item.productName} x{item.quantity}{" "}
              {item.productProtection && <span>(Protection)</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TransactionCard;
