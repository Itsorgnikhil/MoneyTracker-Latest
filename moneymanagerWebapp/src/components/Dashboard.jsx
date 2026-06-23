import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Menubar activeMenu={activeMenu} />
      {user && (
        <div className="flex flex-1 overflow-hidden">
          <div className="max-[1080px]:hidden">
            <Sidebar activeMenu={activeMenu} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="mx-5">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;