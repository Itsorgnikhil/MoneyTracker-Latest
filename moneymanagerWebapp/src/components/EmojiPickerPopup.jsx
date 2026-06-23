import { useState } from 'react'
import { Image, X } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';
import { useTheme } from "../context/ThemeContext.jsx";

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    
    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    }
    
    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer"
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-violet-50 dark:bg-violet-950/30 text-violet-500 dark:text-violet-400 rounded-full">
                    {icon ? (
                        <img src={icon} alt="Icon" className="h-8 w-8 object-contain" />
                    ) : (
                        <Image />
                    )}
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>
            {isOpen && (
                <div className="relative">
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer text-slate-700 dark:text-slate-200">
                        <X size={14} />  
                    </button>
                    <EmojiPicker  
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                        theme={theme}
                    />
                </div>
            )}
        </div>
    )
}
export default EmojiPickerPopup;