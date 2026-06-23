const InfoCard = ({ icon, label, value, color, className = "" }) => {
  return (
    <div className={`flex gap-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200 ${className}`}>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full shadow-lg shadow-violet-500/20 transition-transform duration-150 hover:scale-110 active:scale-95`}>
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</h6>
        <span className="text-[22px] font-bold text-slate-900 dark:text-slate-50">&#8377;{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;