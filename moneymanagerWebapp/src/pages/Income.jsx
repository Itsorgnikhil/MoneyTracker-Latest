import { useEffect, useState, useCallback } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import IncomeList from "../components/IncomeList.jsx";
import axiosConfig from "../util/axiosConfig";

import Modal from "../components/Modal";
import { toast } from "react-hot-toast";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Validation helper function
  const validateIncome = (income) => {
    const { name, amount, date, categoryId } = income;

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

  // Fetch income details from api
  const fetchIncomeDetails = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200 || response.status === 201) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch income details", error);
      toast.error(error.response?.data?.message || "Failed to fetch income details");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories for income
  const fetchIncomeCategories = useCallback(async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
      if (response.status === 200 || response.status === 201) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch income categories:", error);
      toast.error(error.response?.data?.message || "Failed to fetch income categories");
    }
  }, []);

  // Save the income details
  const handleAddIncome = async (income) => {
    const validationError = validateIncome(income);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const { name, amount, date, icon, categoryId } = income;

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  // Delete income details
  const deleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income", error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

const handleDownloadIncomeDetails = async () => {

  try {
    const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, { responseType: "blob" });
    let filename = "income_details.xlsx";
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // Set filename for download

    // Append link to DOM and trigger click
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);

    // Show success message
    toast.success("Download income details successfully");
  } catch (error) {
    console.error("Error downloading income details:", error);
    toast.error(error.response?.data?.message || "Failed to download income");
  }
 
}

const handleEmailIncomeDetails = async () => {

  try {
    const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);

    if (response.status === 200) {
      toast.success("Income details emailed successfully");
    }
  } catch (error) {
    console.error("Error emailing income details:", error);
    toast.error(error.response?.data?.message || "Failed to email income");
  }
};


  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, [fetchIncomeDetails, fetchIncomeCategories]);

  return (
    <Dashboard activeMenu="Income">
      <div className="h-full overflow-y-auto">
        <div className="py-5 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              {/* Overview for income with line chart */}
              
              <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
            </div>

            <div className="mt-4">
              <IncomeList
                transactions={incomeData}
                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadIncomeDetails}
              onEmail={handleEmailIncomeDetails}
              />
            </div>

            {/* Add income modal */}
            <Modal
              isOpen={openAddIncomeModal}
              onClose={() => setOpenAddIncomeModal(false)}
              title="Add Income"
            >
              <AddIncomeForm
                onAddIncome={(income) => handleAddIncome(income)}
                categories={categories}
              />
            </Modal>

            {/* Delete income modal */}
            <Modal
              isOpen={openDeleteAlert.show}
              onClose={() => setOpenDeleteAlert({ show: false, data: null })}
              title="Delete Income"
            >
              <DeleteAlert
                content="Are you sure you want to delete this income details?"
                onDelete={() => deleteIncome(openDeleteAlert.data)}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;