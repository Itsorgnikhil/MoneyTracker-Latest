import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser.jsx";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCatagoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
  useUser();

  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200 || response.status === 201) {
        console.log("categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  // ---------------- ADD CATEGORY ----------------
  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }

    // Check for duplicates
    const isDuplicate = categoryData.some(
      (cat) => cat.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      toast.error("Category Name already exists");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Category added successfully");

        // Update list instantly
        setCategoryData((prev) => [...prev, response.data]);

        // Close modal
        setOpenAddCategoryModal(false);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };

  // ---------------- EDIT CATEGORY ----------------
  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory;

    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }

    if (!id) {
      toast.error("Category Id is missing for update");
      return;
    }

    // Check for duplicates (excluding current category being edited)
    const isDuplicate = categoryData.some(
      (cat) => cat.id !== id && cat.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      toast.error("Category Name already exists");
      return;
    }

    try {
      const endpoint = API_ENDPOINTS.UPDATE_CATEGORY(id);
      await axiosConfig.put(endpoint, { name, type, icon });

      // Update UI instantly
      setCategoryData((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, name, type, icon } : cat
        )
      );

      toast.success("Category updated successfully");
      setOpenEditCategoryModal(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error(
        "Error updating category:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Failed to update category");
    }
  };

  // ---------------- RETURN ----------------
  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto h-screen overflow-y-auto px-4">
        {/* Add button */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>

        {/* Category list */}
        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        />

        {/* Add Category Modal */}
        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add New Category"
        >
          <AddCatagoryForm
            onAddCategory={handleAddCategory}
            onClose={() => setOpenAddCategoryModal(false)}
          />
        </Modal>

        {/* Edit Category Modal */}
        <Modal
          isOpen={openEditCategoryModal}
          onClose={() => {
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
          }}
          title="Update Category"
        >
          <AddCatagoryForm
            initialCategoryData={selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
            onClose={() => setOpenEditCategoryModal(false)}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;