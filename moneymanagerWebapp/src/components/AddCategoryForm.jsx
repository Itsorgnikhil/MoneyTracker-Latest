import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, onClose, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    id: "",
    name: "",
    type: "income",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory({
        id: initialCategoryData.id || "",
        name: initialCategoryData.name || "",
        type: initialCategoryData.type || "income",
        icon: initialCategoryData.icon || "",
      });
    } else {
      setCategory({ id: "", name: "", type: "income", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = () => {
    if (!category.name.trim()) {
      alert("Please enter a category name");
      return;
    }

    if (onAddCategory) {
      onAddCategory(category);

      // Reset form after successful submission
      setCategory({
        id: "",
        name: "",
        type: "income",
        icon: "",
      });

      // Close the modal/popup
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name
        </label>
        <input
          value={category.name}
          onChange={({ target }) => handleChange("name", target.value)}
          placeholder="e.g., Freelance, Salary, Groceries"
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Type
        </label>
        <select
          value={category.type}
          onChange={({ target }) => handleChange("type", target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-white appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem",
          }}
        >
          {categoryTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200"
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-3 ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" size={18} />
              Saving...
            </span>
          ) : isEditing ? (
            "Update Category"
          ) : (
            "Add Category"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;