import { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories = [], onClose }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

const [loading,setLoading] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };


  const handleAddIncome = async ()=>{
    setLoading(true);
    try{
      await onAddIncome(income);
    }finally{
        setLoading(false);
    }
  }
  return (
    <div>
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      {/* Income Source Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Income Source
        </label>
        <input
          type="text"
          value={income.name}
          onChange={({ target }) => handleChange("name", target.value)}
          placeholder="Income Source (e.g., Salary, Freelance, Bonus)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
        />
      </div>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={income.categoryId}
          onChange={({ target }) => handleChange("categoryId", target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white appearance-none cursor-pointer"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B7280\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem",
          }}
        >
          <option value="">Select Category</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>
        <input
          type="number"
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          placeholder="e.g., 500.00"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
        />
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <input
          type="date"
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white placeholder:text-gray-400"
        />
      </div>

      {/* Add Income Button */}
      <div className="flex justify-end mt-6">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-3"
          >
            Cancel
          </button>
        )}

        <button
  type="button"
  onClick={handleAddIncome}
  disabled={loading}
  className={`px-6 py-3 rounded-lg text-white ${
    loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? (
    <>
      <LoaderCircle className="animate-spin inline-block mr-2" />
      Adding...
    </>
  ) : (
    "Add Income"
  )}
</button>

      </div>
    </div>
  );
};

export default AddIncomeForm;
