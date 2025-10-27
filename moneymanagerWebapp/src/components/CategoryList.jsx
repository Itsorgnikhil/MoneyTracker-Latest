import { Layers, Pencil } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Category Sources</h4>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-500">
          No categories added yet. Add some to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3 border border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => onEditCategory(category)}
            >
              {/* Icon / Emoji */}
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full flex-shrink-0">
            {category.icon ? (
              <img 
                src={category.icon} 
                alt={category.name}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <Layers className="text-purple-600" size={24} />
            )}
          </div>

              {/* Category Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-semibold truncate">
                  {category.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
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
                  className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-150"
                >
                  <Pencil size={16} className="text-blue-600" />
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