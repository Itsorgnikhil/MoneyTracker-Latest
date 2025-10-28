import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({ activeMenu }) => {
  const [openSidemenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
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
    <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* Left Side - menu button and title */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu(!openSidemenu)}
          className="lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSidemenu ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
        </button>
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="w-10 h-10" />
          <span className="text-lg font-medium text-black truncate">Money Manager</span>
        </div>
      </div>

      {/* Right Side - Avatar photo */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2"
        >
          <User className="text-purple-500" />
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 py-1">
            {/* User info */}
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                  <User className="w-4 h-4 text-purple-500" />
                </div>
                <div className="flex min-w-0 flex-col">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user?.fullName || user?.name || "No Name"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "No Email"}
                  </p>
                </div>
              </div>
            </div>

            {/* Dropdown options */}
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile side menu */}
      {openSidemenu && (
        <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px] p-4">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Menubar;