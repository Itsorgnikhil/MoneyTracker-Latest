import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '../context/ThemeContext.jsx';

const CustomPieChart = ({ data = [], label = "", totalAmount = "₹0", colors = [], showTextAnchor = false }) => {
  const { theme } = useTheme();

  // Return early if no data
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 mt-4 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  const isAllZero = data.every(item => !item.amount || item.amount === 0);

  const chartData = isAllZero 
    ? [{ name: "No Data", amount: 1 }] 
    : data;

  const chartColors = isAllZero 
    ? [theme === "dark" ? "#27272a" : "#e2e8f0"] 
    : colors;

  // Custom label to show in the center of the pie chart
  const renderCenterLabel = () => {
    if (!showTextAnchor) return null;
    
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-center"
      >
        <tspan x="50%" dy="-0.5em" className="text-sm font-medium fill-gray-500 dark:fill-gray-400">
          {label}
        </tspan>
        <tspan x="50%" dy="1.5em" className="text-xl font-bold fill-gray-900 dark:fill-gray-100">
          {totalAmount}
        </tspan>
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && !isAllZero) {
      return (
        <div className="bg-white dark:bg-[#12121a] p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{payload[0].name}</p>
          <p className="text-gray-600 dark:text-gray-400">
            Amount: <span className="font-bold text-gray-900 dark:text-white">₹{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Generate legend payload from original data to preserve correct labels and colors
  const legendPayload = data.map((entry, index) => ({
    value: entry.name,
    color: colors[index % colors.length],
    type: "circle"
  }));

  return (
    <div className="w-full h-80 mt-4">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="amount"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} payload={legendPayload} />
          {showTextAnchor && renderCenterLabel()}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;