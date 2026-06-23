import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"; // Added Outlet and useLocation here
  import { Toaster } from "react-hot-toast";

  import Login from "./pages/Login";
  import Signup from "./pages/Signup";
  import Home from "./pages/Home";
  import Expense from "./pages/Expense";
  import Income from "./pages/Income";
  import Category from "./pages/Category";
  import Filter from "./pages/Filter";
  import Profile from "./components/Profile";
  import LandingPage from "./components/LandingPage";
  import AboutUs from "./pages/AboutUs";
  import FloatingLink from "./components/FloatingLink";
  import './App.css';

  // Layout component with FloatingLink
  const Layout = () => {
    const location = useLocation();
    return (
      <>
        <FloatingLink />
        <div key={location.pathname} className="animate-[fadeSlideIn_0.25s_ease-out]">
          <Outlet />
        </div>
      </>
    );
  };

  const App = () => {
    return (
      <>
        <Toaster />
         <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200">
        <BrowserRouter>
          <Routes>
            {/* Wrap all routes with Layout to show FloatingLink on all pages */}
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/income" element={<Income />} />
              <Route path="/category" element={<Category />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/protected" element={<Root />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </div>
      </>
    );
  };

  const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/login" />
    );
  };

  export default App;