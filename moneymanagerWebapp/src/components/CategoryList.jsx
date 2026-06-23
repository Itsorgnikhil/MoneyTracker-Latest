import { Layers, Pencil } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Category Sources</h4>
      </div>

      {categories.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">
          No categories added yet. Add some to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => onEditCategory(category)}
            >
              {/* Icon / Emoji */}
              <div className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full flex-shrink-0">
                {category.icon ? (
                  <img 
                    src={category.icon} 
                    alt={category.name}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <Layers className="text-violet-600 dark:text-violet-400" size={24} />
                )}
              </div>

              {/* Category Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-800 dark:text-slate-100 font-semibold truncate">
                  {category.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {category.type}
                </p>
              </div>

              {/* Edit Button */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditCategory(category);
                  }}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150"
                >
                  <Pencil size={16} className="text-blue-600 dark:text-blue-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;