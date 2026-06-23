import { X } from "lucide-react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      {/* Outer container for padding and width */}
      <div className="relative p-4 w-full max-w-2xl max-h-[90vh]">
        {/* Modal box */}
        <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 dark:border-slate-700 rounded-t-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              {title}
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg text-sm w-9 h-9 inline-flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
