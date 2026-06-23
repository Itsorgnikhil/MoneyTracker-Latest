import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactioninfoCard";

const Transactions = ({transactions, onMore, type, title}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button className="card-btn transition-transform duration-150 hover:scale-110 active:scale-95" onClick={onMore}>
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map(item => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default Transactions;