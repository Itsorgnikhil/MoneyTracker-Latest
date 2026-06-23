import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import { Sun, Moon, LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({ activeMenu }) => {
  const [openSidemenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // ✅ Handle logout - Redirect to landing page
  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    setShowDropdown(false);
    navigate("/", { replace: true }); // Changed from "/login" to "/"
  };

  // ✅ Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex items-center justify-between gap-5 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30 transition-colors duration-200">
      {/* Left Side - menu button and title */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu(!openSidemenu)}
          className="lg:hidden text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 p-1 rounded transition-colors"
        >
          {openSidemenu ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
        </button>
        <div 
          onClick={() => navigate("/dashboard")} 
          className="flex items-center gap-2 cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          <img src={assets.logo} alt="logo" className="w-10 h-10" />
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-50 truncate">Money Tracker</span>
        </div>
      </div>

      {/* Right Side - Avatar photo & Theme Toggle */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 text-slate-700 dark:text-slate-200 focus:outline-none"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-center w-10 h-10 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
          >
            <User className="text-violet-500" />
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-lg z-50 py-1">
              {/* User info */}
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <User className="w-4 h-4 text-violet-500" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                      {user?.fullName || user?.name || "No Name"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user?.email || "No Email"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dropdown options */}
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-150"
                >
                  <LogOut className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile side menu */}
      {openSidemenu && (
        <div className="fixed left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 lg:hidden z-20 top-[73px] p-4">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Menubar;