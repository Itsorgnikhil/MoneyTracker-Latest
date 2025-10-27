import { useState } from "react";
import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import axiosConfig from "../util/axiosConfig.jsx"; 
import { API_ENDPOINTS } from "../util/apiEndpoints";
import moment from "moment";
import { toast } from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard"; // Make sure this import exists

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
          <h2 className="text-2xl font-semibold">Filter Transactions</h2>
        </div>

        {/* Filters Form */}
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Select the filters</h5>
          </div>

          <form
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4"
            onSubmit={handleSearch}
          >
            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                value={type}
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startdate" className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                id="startdate"
                type="date"
                value={startDate}
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="enddate" className="block text-sm font-medium mb-1">
                End Date
              </label>
              <input
                id="enddate"
                type="date"
                value={endDate}
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Sort Field */}
            <div>
              <label htmlFor="sortfield" className="block text-sm font-medium mb-1">
                Sort Field
              </label>
              <select
                id="sortfield"
                value={sortField}
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label htmlFor="sortorder" className="block text-sm font-medium mb-1">
                Sort Order
              </label>
              <select
                id="sortorder"
                value={sortOrder}
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div className="sm:col-span-2 md:col-span-1 flex items-end">
              <div className="w-full">
                <label htmlFor="keyword" className="block text-sm font-medium mb-1">
                  Search
                </label>
                <input
                  id="keyword"
                  type="text"
                  value={keyword}
                  placeholder="Search..."
                  className="w-full border rounded px-3 py-2"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-900 text-white rounded flex items-center justify-center cursor-pointer"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Transactions List */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Transactions</h5>
          </div>

          {transactions.length === 0 && !loading && (
            <p className="text-gray-500">
              Select the filters and click apply to filter the transactions
            </p>
          )}

          {loading && <p className="text-gray-500">Loading Transactions...</p>}

          {transactions.map((transaction) => (
            <TransactionInfoCard
              key={transaction.id}
              title={transaction.name}
              icon={transaction.icon}
              date={moment(transaction.date).format("Do MMM YYYY")}
              amount={transaction.amount}
              type={type}
              hideDeleteBtn
            />
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
