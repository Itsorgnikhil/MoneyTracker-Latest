import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/chartUtils";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions ,onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/50 transition-transform duration-150 hover:scale-110 active:scale-95 mb-6 font-medium"
          onClick={onAddIncome}
        >
          <Plus size={15} />
          <span className="text-sm font-semibold">Add Income</span>
        </button>
      </div>

      <div className="mt-6">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;