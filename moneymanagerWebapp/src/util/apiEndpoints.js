//export const BASE_URL = "http://localhost:9090/api/v1.0";

export const BASE_URL = "https://money-manager-api-42n5.onrender.com/api/v1.0"

const CLOUDINARY_CLOUD_NAME = "dpp9xcj01";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  UPDATE_PROFILE: "/profile", // Added for profile updates
  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
  GET_ALL_INCOMES:"/api/v1.0/incomes",
  CATEGORY_BY_TYPE : (type) =>`/categories/${type}`,
  ADD_INCOME:"/api/v1.0/incomes",
  DELETE_INCOME:(incomeId) => `/api/v1.0/incomes/${incomeId}`,
  INCOME_EXCEL_DOWNLOAD:"excel/download/income",
  EMAIL_INCOME:"/email/income-excel",
  GET_ALL_EXPENSES:"/expenses",
  ADD_EXPENSE:"/expenses",
  DELETE_EXPENSE :(expenseId) => `/expenses/${expenseId}`,
  EXPENSE_EXCEL_DOWNLOAD:"excel/download/expense",
  EMAIL_EXPENSE:"/email/expense-excel",
  APPLY_FILTERS:"/filter",
  DASHBOARD_DATA:"/dashboard",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};