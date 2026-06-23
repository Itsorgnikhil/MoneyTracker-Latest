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
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Income Source
        </label>
        <input
          type="text"
          value={income.name}
          onChange={({ target }) => handleChange("name", target.value)}
          placeholder="Income Source (e.g., Salary, Freelance, Bonus)"
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Category
        </label>
        <select
          value={income.categoryId}
          onChange={({ target }) => handleChange("categoryId", target.value)}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B7280\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem",
          }}
        >
          <option value="" className="bg-white dark:bg-slate-900">Select Category</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-white dark:bg-slate-900">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Amount
        </label>
        <input
          type="number"
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          placeholder="e.g., 500.00"
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Date
        </label>
        <input
          type="date"
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Add Income Button */}
      <div className="flex justify-end mt-6">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg mr-3 transition-colors duration-200"
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          onClick={handleAddIncome}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-violet-400 dark:bg-violet-800 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
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
