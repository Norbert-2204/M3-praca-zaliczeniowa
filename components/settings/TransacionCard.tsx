import TransactionCart from "@/icons/transactionCart";

const placeholder = {
  date: "2022-09-24 18:31",
  order: "INV/208421205/TSR/3385-B5",
  name: "Rexus Xierra X16",
};

const TransactionCard = () => {
  return (
    <div className="flex gap-4 p-4 bg-[#262626] border border-[#383B42] rounded">
      <TransactionCart />
      <div className="flex flex-col gap-3.5">
        <h2>{placeholder.date}</h2>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <span>Your order nr {placeholder.order}</span>
          <li>{placeholder.name}</li>
        </ul>
      </div>
    </div>
  );
};
export default TransactionCard;
