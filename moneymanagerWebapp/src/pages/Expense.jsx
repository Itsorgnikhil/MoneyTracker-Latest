import { useEffect, useState, useCallback } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import ExpenseList from "../components/ExpenseList.jsx";
import axiosConfig from "../util/axiosConfig";
import Modal from "../components/Modal";
import { toast } from "react-hot-toast";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import Loader from "../components/common/Loader";
import SuccessOverlay from "../components/common/SuccessOverlay";

const Expense = () => {
  useUser();
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Validation helper function
  const validateExpense = (expense) => {
    const { name, amount, date, categoryId } = expense;

    if (!name || !name.trim()) {
      return "Please enter a name";
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return "Amount should be a valid number greater than 0";
    }

    if (!date) {
      return "Please select a date";
    }

    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      return "Date cannot be in the future";
    }

    if (!categoryId) {
      return "Please select a category";
    }

    return null;
  };

  // Fetch expense details from api
  const fetchExpenseDetails = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200 || response.status === 201) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch expense details", error);
      toast.error(error.response?.data?.message || "Failed to fetch expense details");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories for expense
  const fetchExpenseCategories = useCallback(async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      if (response.status === 200 || response.status === 201) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch expense categories:", error);
      toast.error(error.response?.data?.message || "Failed to fetch expense categories");
    }
  }, []);

  // Save the expense details
  const handleAddExpense = async (expense) => {
    const validationError = validateExpense(expense);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const { name, amount, date, icon, categoryId } = expense;

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201 || response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => {
          setOpenAddExpenseModal(false);
          setShowSuccess(false);
          fetchExpenseDetails();
          fetchExpenseCategories();
        }, 1500);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  // Delete expense details
  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense", error);
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, { 
        responseType: "blob" 
      });
      let filename = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);

      // Append link to DOM and trigger click
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);

      // Show success message
      toast.success("Download expense details successfully");
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error(error.response?.data?.message || "Failed to download expense");
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);

      if (response.status === 200) {
        toast.success("Expense details emailed successfully");
      }
    } catch (error) {
      console.error("Error emailing expense details:", error);
      toast.error(error.response?.data?.message || "Failed to email expense");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, [fetchExpenseDetails, fetchExpenseCategories]);

  return (
    <Dashboard activeMenu="Expense">
      {loading && <Loader overlay={true} />}
      <div className="h-full overflow-y-auto">
        <div className="py-5 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              {/* Overview for expense with line chart */}
              <ExpenseOverview 
                transactions={expenseData} 
                onAddExpense={() => setOpenAddExpenseModal(true)} 
              />
            </div>

            <div className="mt-4">
              <ExpenseList
                transactions={expenseData}
                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                onDownload={handleDownloadExpenseDetails}
                onEmail={handleEmailExpenseDetails}
              />
            </div>

            {/* Add expense modal */}
            <Modal
              isOpen={openAddExpenseModal}
              onClose={() => setOpenAddExpenseModal(false)}
              title="Add Expense"
            >
              <AddExpenseForm
                onAddExpense={(expense) => handleAddExpense(expense)}
                categories={categories}
              />
            </Modal>

            {/* Delete expense modal */}
            <Modal
              isOpen={openDeleteAlert.show}
              onClose={() => setOpenDeleteAlert({ show: false, data: null })}
              title="Delete Expense"
            >
              <DeleteAlert
                content="Are you sure you want to delete this expense details?"
                onDelete={() => deleteExpense(openDeleteAlert.data)}
              />
            </Modal>
          </div>
        </div>
      </div>
      <SuccessOverlay visible={showSuccess} />
    </Dashboard>
  );
};

export default Expense;