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
        <p style={{ fontSize: "14px", fontWeight: "600", color: "#9333ea", marginBottom: "8px" }}>
          {data.month}
        </p>
        <p style={{ fontSize: "14px", fontWeight: "700", color: "#1f2937", marginBottom: "4px" }}>
          Total: ₹{data.income?.toLocaleString()}
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
        
        {data.bonus && (
          <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #f3f4f6" }}>
            <p style={{ fontSize: "12px", color: "#10b981", fontWeight: "600" }}>
              Bonus: ₹{data.bonus.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-sm text-gray-400">No income data available</p>
      </div>
    );
  }

  // Calculate min and max for better Y-axis scaling
  const incomeValues = data.map(item => item.income);
  const minIncome = Math.min(...incomeValues);
  const maxIncome = Math.max(...incomeValues);
  
  // Add padding to the range
  const range = maxIncome - minIncome;
  const padding = range > 0 ? range * 0.2 : maxIncome * 0.2;
  
  const yMin = Math.max(0, Math.floor((minIncome - padding) / 5000) * 5000);
  const yMax = Math.ceil((maxIncome + padding) / 5000) * 5000;

  return (
    <div className="w-full h-80" style={{ outline: 'none' }} tabIndex={-1}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c084fc" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#c084fc" stopOpacity={0.1} />
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
            cursor={{ stroke: "#9333ea", strokeWidth: 1, strokeDasharray: "3 3" }} 
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#9333ea"
            strokeWidth={3}
            fill="url(#colorIncome)"
            dot={{ r: 5, fill: "#9333ea", strokeWidth: 0 }}
            activeDot={{ r: 7, fill: "#9333ea", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;