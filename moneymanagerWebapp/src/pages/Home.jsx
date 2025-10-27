import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { useUser } from "../hooks/useUser.jsx";
import {addThousandsSeparator} from "../util/util.js"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import RecentTransactions from "../components/RecentTranscations.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";



const Home = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async ()=> {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong while fetching dashboard data:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance  || 0)}
              color="bg-purple-800"
            />

            <InfoCard
              icon={<Wallet/>}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome  || 0)}
              color="bg-green-800"
            />

            <InfoCard
              icon={<Coins/>}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense  || 0)}
              color="bg-red-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Recent transactions - Now full width */}
          <div  >
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onMore={() => navigate("/expense")}
            />
          </div>

          
            {/* Finance overview chart */}
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
            {/*income transactions */}
            <Transactions
            transactions={dashboardData?.recent5Incomes || []}
            onMore={() => navigate("/income")}
            type="income"
            title="Recent Incomes"
          />
            {/* expence transactions */}
            <Transactions
            transactions={dashboardData?.recent5Incomes || []}
            onMore={() => navigate("/expense")}
            type="expense"
            title ="Recent Expences"
/>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;