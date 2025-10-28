import logo from "./logo.png";
import login_bg from "./login-bg.png";
export { default as logo } from "./logo.png";
export { default as login_bg } from "./login-bg.png";   
import {Coins,FunnelPlus,LayoutDashboard,List,Wallet,UserCircle} from "lucide-react";

export const assets = {
    logo,
    login_bg,
}

export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        id: "02",
        label: "Category",
        icon: List,
        path: "/category"
    },
    {
        id: "03",
        label: "Income",
        icon: Wallet,
        path: "/income"
    },
    {
        id: "04",
        label: "Expense",
        icon: Coins,
        path: "/expense"
    },
    {
        id: "05",
        label: "Filter",
        icon: FunnelPlus,
        path: "/filter"
    },
    {
        id: "06",
        label: "Profile",
        icon: UserCircle,
        path: "/profile"
    }
];