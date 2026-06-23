import { useState } from "react";
import { Download, Mail } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactioninfoCard";
import { LoaderCircle } from "lucide-react"; // make sure you have this component
import { motion, AnimatePresence } from "framer-motion";

const IncomeList = ({ transactions, onDelete, onDownload,onEmail }) => {
    const[loading,setLoading] = useState(false);
    const handleEmail = async () =>{
        setLoading(true); 
        try{
        await onEmail();
        }
        finally{
            setLoading(false);
        }
    }

     const handleDownload = async () =>{
        setLoading(true); 
        try{
            await onDownload();
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Sources</h5>
                <div className="flex items-center justify-end gap-2">
                    <div className="flex gap-4">
                {/* Email Button */}
                <button
                    type="button"
                    disabled={loading} // separate state for email
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
                    disabled={loading} // separate state for download
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
                {/*display the incomes*/}
                <AnimatePresence initial={false}>
                    {transactions?.map((income) => (
                        <motion.div
                            key={income.id}
                            initial={{ opacity: 0, height: 0, x: -50 }}
                            animate={{ opacity: 1, height: "auto", x: 0 }}
                            exit={{ x: -100, opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: "hidden" }}
                        >
                            <TransactionInfoCard
                                title={income.name}
                                icon={income.icon}
                                date={moment(income.date).format("DD/MM/YYYY")}
                                amount={income.amount}
                                type="income"
                                onDelete={() => onDelete(income.id)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default IncomeList;