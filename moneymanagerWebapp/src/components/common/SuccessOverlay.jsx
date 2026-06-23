import Lottie from "lottie-react";
import successAnimation from "../../assets/animations/success.json";

const SuccessOverlay = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center success-overlay-backdrop"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center success-overlay-card border border-slate-100 dark:border-slate-700 max-w-sm w-full mx-4">
        <div className="w-[120px] h-[120px]">
          <Lottie animationData={successAnimation} loop={false} autoplay={true} />
        </div>
        <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg mt-2">
          Saved Successfully!
        </p>
      </div>
    </div>
  );
};

export default SuccessOverlay;
