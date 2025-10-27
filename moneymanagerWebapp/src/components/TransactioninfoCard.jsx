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
      ? "bg-green-50 text-green-800"
      : "bg-red-50 text-red-800";

  const getIconBgStyles = () => "bg-white";

  const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Check if icon is a URL or emoji
  const isUrl = icon && (icon.startsWith('http') || icon.startsWith('data:'));

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className={`w-12 h-12 flex items-center justify-center ${getIconBgStyles()} rounded-full`}>
        {icon ? (
          isUrl ? (
            <img src={icon} alt={title} className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-3xl leading-none">{icon}</span>
          )
        ) : (
          <UtensilsCrossed className="text-purple-800" size={24} />
        )}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
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