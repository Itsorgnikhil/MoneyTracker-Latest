import { Trash2, UtensilsCrossed, TrendingUp, TrendingDown } from "lucide-react";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
      : "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400";

  const getIconBgStyles = () => "bg-slate-100 dark:bg-slate-700";

  const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Check if icon is a URL or emoji
  const isUrl = icon && (icon.startsWith('http') || icon.startsWith('data:'));

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-700/30 transition-colors duration-150">
      <div className={`w-12 h-12 flex items-center justify-center ${getIconBgStyles()} rounded-full transition-transform duration-150 hover:scale-110 active:scale-95`}>
        {icon ? (
          isUrl ? (
            <img src={icon} alt={title} className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-3xl leading-none">{icon}</span>
          )
        ) : (
          <UtensilsCrossed className="text-violet-600 dark:text-violet-400" size={24} />
        )}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-200 font-semibold">{title}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-gray-400 dark:text-gray-500 hover:text-red-800 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          )}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className="text-xs font-medium">
              {type === 'income' ? '+' : '-'} ₹{addThousandsSeparator(amount)}
            </h6>
            {type === 'income' ? (
              <TrendingUp size={15} />
            ) : (
              <TrendingDown size={15} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;