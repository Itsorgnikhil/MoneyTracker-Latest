import { useState } from "react";
import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import axiosConfig from "../util/axiosConfig.jsx"; 
import { API_ENDPOINTS } from "../util/apiEndpoints";
import moment from "moment";
import { toast } from "react-hot-toast";
import TransactionInfoCard from "../components/TransactioninfoCard.jsx"; // Make sure this import exists
import Loader from "../components/common/Loader";
import { motion, AnimatePresence } from "framer-motion";

const Filter = () => {
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error(error.message || "Failed to fetch transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filter">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Filter Transactions</h2>
        </div>

        {/* Filters Form */}
        <div className="card p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-slate-850 dark:text-slate-200">Select the filters</h5>
          </div>

          <form
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4"
            onSubmit={handleSearch}
          >
            {/* Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                value={type}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income" className="bg-white dark:bg-slate-900">Income</option>
                <option value="expense" className="bg-white dark:bg-slate-900">Expense</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startdate" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Start Date
              </label>
              <input
                id="startdate"
                type="date"
                value={startDate}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="enddate" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                End Date
              </label>
              <input
                id="enddate"
                type="date"
                value={endDate}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Sort Field */}
            <div>
              <label htmlFor="sortfield" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Sort Field
              </label>
              <select
                id="sortfield"
                value={sortField}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date" className="bg-white dark:bg-slate-900">Date</option>
                <option value="amount" className="bg-white dark:bg-slate-900">Amount</option>
                <option value="category" className="bg-white dark:bg-slate-900">Category</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label htmlFor="sortorder" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Sort Order
              </label>
              <select
                id="sortorder"
                value={sortOrder}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc" className="bg-white dark:bg-slate-900">Ascending</option>
                <option value="desc" className="bg-white dark:bg-slate-900">Descending</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div className="sm:col-span-2 md:col-span-1 flex items-end">
              <div className="w-full">
                <label htmlFor="keyword" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Search
                </label>
                <input
                  id="keyword"
                  type="text"
                  value={keyword}
                  placeholder="Search..."
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="ml-2 mb-0.5 p-2.5 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95 shadow-sm"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Transactions List */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-slate-850 dark:text-slate-200">Transactions</h5>
          </div>

          {transactions.length === 0 && !loading && (
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Select the filters and click apply to filter the transactions
            </p>
          )}

          {loading && <Loader overlay={true} />}

          <AnimatePresence initial={false}>
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, height: 0, x: -50 }}
                animate={{ opacity: 1, height: "auto", x: 0 }}
                exit={{ x: -100, opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                <TransactionInfoCard
                  title={transaction.name}
                  icon={transaction.icon}
                  date={moment(transaction.date).format("Do MMM YYYY")}
                  amount={transaction.amount}
                  type={type}
                  hideDeleteBtn
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
