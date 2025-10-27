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
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors mb-6"
          onClick={onAddExpense}
        >
          <Plus size={15} />
          <span className="text-sm font-medium">Add Expense</span>
        </button>
      </div>

      <div className="mt-6">
        <CustomExpenseChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;