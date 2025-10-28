import { useNavigate } from "react-router-dom";
import { ArrowRight, Wallet, TrendingUp, PieChart, Shield, BarChart3, Check, LayoutDashboard, List, Coins } from "lucide-react";
// Import your custom images
import logo from "../assets/logo.png";
import profilePhoto from "../assets/photo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page-wrapper">
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              {/* Using logo.png instead of emoji */}
              <img src={logo} alt="Money Manager Logo" className="w-10 h-10 object-contain" />
              {/* Changed text color to black */}
              <span className="text-xl font-bold text-black">Money Manager</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => navigate("/")} className="text-gray-700 hover:text-purple-600 font-medium transition">
                Home
              </button>
              <button onClick={() => navigate("/about")} className="text-gray-700 hover:text-purple-600 font-medium transition">
                About us
              </button>
              <button onClick={() => navigate("/login")} className="text-gray-700 hover:text-purple-600 font-medium px-4 py-2 transition">
                Login
              </button>
              <button 
                onClick={() => navigate("/signup")} 
                className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Take Control of Your
              <span className="block text-purple-600">Finances</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Your foundation for secure, intelligent financial management. Effortlessly track your income and expenses to achieve your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate("/signup")}
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg text-lg"
              >
                Start Tracking for Free
              </button>
              <button 
                onClick={() => navigate("/about")}
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 border-2 border-gray-200 text-lg"
              >
                Learn More <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Dashboard Preview - Matching your screenshot */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Dashboard Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Using logo.png instead of emoji */}
                  <img src={logo} alt="Money Manager Logo" className="w-10 h-10 object-contain" />
                  {/* Changed text color to black */}
                  <span className="font-bold text-black">Money Manager</span>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">N</span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="grid md:grid-cols-12 gap-0">
                {/* Sidebar */}
                <div className="md:col-span-3 bg-white border-r border-gray-100 p-6">
                  <div className="flex flex-col items-center mb-6">
                    {/* Using photo.png as profile image */}
                                <img
                                  src={profilePhoto}
                                  alt="Profile"
                                  className="w-20 h-20 rounded-full mb-4 shadow-sm object-cover bg-white"
                                />

                    <span className="font-semibold text-gray-800">Nikhil</span>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full bg-purple-600 text-white px-4 py-3 rounded-xl text-left font-semibold flex items-center gap-3 shadow-md">
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>
                    <button className="w-full text-gray-600 px-4 py-3 rounded-xl text-left hover:bg-gray-50 flex items-center gap-3 font-medium">
                      <List size={18} />
                      Category
                    </button>
                    <button className="w-full text-gray-600 px-4 py-3 rounded-xl text-left hover:bg-gray-50 flex items-center gap-3 font-medium">
                      <TrendingUp size={18} />
                      Income
                    </button>
                    <button className="w-full text-gray-600 px-4 py-3 rounded-xl text-left hover:bg-gray-50 flex items-center gap-3 font-medium">
                      <Coins size={18} />
                      Expense
                    </button>
                  </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-9 bg-gray-50 p-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl border border-purple-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-md">
                          <Wallet size={18} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Total Balance</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">₹84,200</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl border border-green-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                          <TrendingUp size={18} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Total Income</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">₹1,85,000</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-2xl border border-red-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-md">
                          <TrendingUp size={18} className="text-white rotate-180" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Total Expense</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">₹1,00,800</p>
                    </div>
                  </div>

                  {/* Recent Transactions & Financial Overview */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Recent Transactions */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">View →</button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full shadow-sm"></div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Freelance</p>
                              <p className="text-xs text-gray-500">Dec 10, 2025</p>
                            </div>
                          </div>
                          <span className="text-green-600 font-bold">+₹8,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-400 rounded-full shadow-sm"></div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Uber</p>
                              <p className="text-xs text-gray-500">Dec 10, 2025</p>
                            </div>
                          </div>
                          <span className="text-red-600 font-bold">-₹150</span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Overview - Donut Chart with RED, PURPLE, and GREEN */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4">Financial Overview</h3>
                      <div className="flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          <svg viewBox="0 0 100 100" className="transform -rotate-90">
                            {/* Background circle */}
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                            {/* Purple segment */}
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#9333ea" strokeWidth="12" 
                              strokeDasharray="220" strokeDashoffset="55" strokeLinecap="round"/>
                            {/* Red segment */}
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#ef4444" strokeWidth="12" 
                              strokeDasharray="220" strokeDashoffset="-90" strokeLinecap="round"/>
                            {/* Green segment - ADDED */}
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#22c55e" strokeWidth="12" 
                              strokeDasharray="220" strokeDashoffset="-165" strokeLinecap="round"/>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-xs text-gray-600 font-medium">Total Balance</p>
                            <p className="text-2xl font-bold text-gray-900">₹84,200</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features to help you manage your finances with ease
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Wallet className="text-purple-600" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Easy Tracking</h3>
                <p className="text-gray-600">Track all income and expenses in one place with intuitive interface</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <PieChart className="text-green-600" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Visual Reports</h3>
                <p className="text-gray-600">Beautiful charts and graphs for better financial insights</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="text-blue-600" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Smart Analytics</h3>
                <p className="text-gray-600">Get intelligent insights about your spending patterns</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="text-red-600" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">Secure & Safe</h3>
                <p className="text-gray-600">Your financial data is encrypted and fully protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Money Manager?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Get complete control over your finances with our comprehensive suite of tools designed for modern financial management.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Real-time Synchronization</h4>
                      <p className="text-gray-600">All your data syncs instantly across devices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Customizable Categories</h4>
                      <p className="text-gray-600">Create and manage categories that fit your lifestyle</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Export & Email Reports</h4>
                      <p className="text-gray-600">Download Excel reports or email them directly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Advanced Filtering</h4>
                      <p className="text-gray-600">Filter transactions by date, category, and amount</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Placeholder for image */}
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 h-96 flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <PieChart size={120} className="text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Feature Illustration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">10K+</p>
                <p className="text-gray-600 font-medium">Active Users</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">50K+</p>
                <p className="text-gray-600 font-medium">Transactions</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">₹100Cr+</p>
                <p className="text-gray-600 font-medium">Money Managed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-600 mb-2">4.8★</p>
                <p className="text-gray-600 font-medium">User Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-purple-100 mb-10">
              Join thousands of users who are already managing their money smarter
            </p>
            <button 
              onClick={() => navigate("/signup")}
              className="bg-white text-purple-600 px-10 py-4 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition text-lg"
            >
              Get Started Free Today
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-3">
                {/* Using logo.png in footer */}
                <img src={logo} alt="Money Manager Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold">Money Manager</span>
              </div>
              <div className="flex gap-8">
                <button onClick={() => navigate("/about")} className="text-gray-400 hover:text-white transition">About</button>
                <button onClick={() => navigate("/login")} className="text-gray-400 hover:text-white transition">Login</button>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400">© 2025 Money Manager. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;