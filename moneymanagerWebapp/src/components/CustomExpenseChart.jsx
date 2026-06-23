import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../context/ThemeContext.jsx";
import { TrendingDown } from "lucide-react";

const CustomExpenseChart = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 py-8 px-4 transition-colors duration-200">
        <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500 dark:text-red-400 mb-3">
          <TrendingDown size={24} />
        </div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No expense data available</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Start adding expenses to visualize trends</p>
      </div>
    );
  }

  // Calculate min and max for better Y-axis scaling
  const expenseValues = data.map(item => item.expense);
  const minExpense = Math.min(...expenseValues);
  const maxExpense = Math.max(...expenseValues);
  
  // Add padding to the range
  const range = maxExpense - minExpense;
  const padding = range > 0 ? range * 0.2 : maxExpense * 0.2;
  
  const yMin = Math.max(0, Math.floor((minExpense - padding) / 5000) * 5000);
  const yMax = Math.ceil((maxExpense + padding) / 5000) * 5000;

  const gridStroke = isDark ? "#334155" : "#e5e7eb";
  const axisTickColor = isDark ? "#94a3b8" : "#9ca3af";

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const toolData = payload[0].payload;
      return (
        <div
          className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 min-w-[180px] transition-colors duration-200"
        >
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
            {toolData.month}
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
            Total: ₹{toolData.expense?.toLocaleString()}
          </p>
          
          {toolData.name && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              {toolData.name}
            </p>
          )}
          
          {toolData.category && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Category: {toolData.category}
            </p>
          )}
          
          {toolData.description && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 italic truncate">
              {toolData.description}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80" style={{ outline: 'none' }} tabIndex={-1}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={gridStroke} 
            vertical={false}
            horizontal={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: axisTickColor, fontSize: 12 }}
            dy={30}
            height={60}
          />
          <YAxis
            domain={[yMin, yMax]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: axisTickColor, fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            dx={-30}
            width={60}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: isDark ? "#ef4444" : "#dc2626", strokeWidth: 1, strokeDasharray: "3 3" }} 
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
            fill="url(#colorExpense)"
            dot={{ r: 5, fill: "#ef4444", strokeWidth: 0 }}
            activeDot={{ r: 7, fill: "#ef4444", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomExpenseChart;