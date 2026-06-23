import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../util/chartUtils";
import CustomExpenseChart from "./CustomExpenseChart";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending over time and analyze your expense trends.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 transition-transform duration-150 hover:scale-110 active:scale-95 mb-6 font-medium"
          onClick={onAddExpense}
        >
          <Plus size={15} />
          <span className="text-sm font-semibold">Add Expense</span>
        </button>
      </div>

      <div className="mt-6">
        <CustomExpenseChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;