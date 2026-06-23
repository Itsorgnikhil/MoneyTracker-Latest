import { useState } from "react";
import { Download, Mail } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactioninfoCard";
import { LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);
  
  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense Sources</h5>
        <div className="flex items-center justify-end gap-2">
          <div className="flex gap-4">
            {/* Email Button */}
            <button
              type="button"
              disabled={loading}
              className="card-btn flex items-center gap-2 transition-transform duration-150 hover:scale-110 active:scale-95"
              onClick={handleEmail}
            >
              {loading ? (
                <>
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  Emailing...
                </>
              ) : (
                <>
                  <Mail size={15} className="text-base" />
                  Email
                </>
              )}
            </button>

            {/* Download Button */}
            <button
              type="button"
              disabled={loading}
              className="card-btn flex items-center gap-2 transition-transform duration-150 hover:scale-110 active:scale-95"
              onClick={handleDownload}
            >
              {loading ? (
                <>
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={15} className="text-base" />
                  Download
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Display the expenses */}
        <AnimatePresence initial={false}>
          {transactions?.map((expense) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, height: 0, x: -50 }}
              animate={{ opacity: 1, height: "auto", x: 0 }}
              exit={{ x: -100, opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden" }}
            >
              <TransactionInfoCard
                title={expense.name}
                icon={expense.icon}
                date={moment(expense.date).format("DD/MM/YYYY")}
                amount={expense.amount}
                type="expense"
                onDelete={() => onDelete(expense.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpenseList;