import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          padding: "12px",
          border: "1px solid #f3f4f6",
          minWidth: "180px",
        }}
      >
        <p style={{ fontSize: "14px", fontWeight: "600", color: "#dc2626", marginBottom: "8px" }}>
          {data.month}
        </p>
        <p style={{ fontSize: "14px", fontWeight: "700", color: "#1f2937", marginBottom: "4px" }}>
          Total: ₹{data.expense?.toLocaleString()}
        </p>
        
        {data.name && (
          <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
            {data.name}
          </p>
        )}
        
        {data.category && (
          <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
            Category: {data.category}
          </p>
        )}
        
        {data.description && (
          <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px", fontStyle: "italic" }}>
            {data.description}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const CustomExpenseChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-sm text-gray-400">No expense data available</p>
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

  return (
    <div className="w-full h-80" style={{ outline: 'none' }} tabIndex={-1}>
      <ResponsiveContainer width="100%" height="100%">
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
            stroke="#e5e7eb" 
            vertical={false}
            horizontal={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            dy={30}
            height={60}
          />
          <YAxis
            domain={[yMin, yMax]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            dx={-30}
            width={60}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: "#dc2626", strokeWidth: 1, strokeDasharray: "3 3" }} 
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#dc2626"
            strokeWidth={3}
            fill="url(#colorExpense)"
            dot={{ r: 5, fill: "#dc2626", strokeWidth: 0 }}
            activeDot={{ r: 7, fill: "#dc2626", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomExpenseChart;