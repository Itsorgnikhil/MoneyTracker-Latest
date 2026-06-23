import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";    
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu}) => {    
    const { user } = useContext(AppContext); 
    const navigate = useNavigate();

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-5 sticky top-[61px] z-20 transition-colors duration-200">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img
                        src={user?.profileImageUrl}
                        alt="profile image"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                ) : (
                    <User className="w-20 h-20 text-xl text-slate-400 dark:text-slate-500" />
                )}
                <h5 className="text-slate-900 dark:text-slate-50 font-semibold leading-6">{user?.fullName || ""}</h5>
            </div>

            {SIDE_BAR_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    onClick={() => navigate(item.path)}
                    className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all duration-200 ${activeMenu==item.label ? "text-white bg-violet-600 dark:bg-violet-500": "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60"}`}>
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};       

export default Sidebar;
