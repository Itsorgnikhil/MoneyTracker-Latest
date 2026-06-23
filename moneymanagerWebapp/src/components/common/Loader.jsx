import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/animations/loader.json";

const Loader = ({ size = "150px", overlay = false }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (overlay) {
      // Trigger fade-in transition in the next paint cycle
      const timeout = setTimeout(() => {
        setShow(true);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [overlay]);

  const sizeStyle = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };

  const animationContent = (
    <div style={sizeStyle} className="flex items-center justify-center">
      <Lottie animationData={loaderAnimation} loop={true} autoplay={true} />
    </div>
  );

  if (overlay) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center loader-backdrop ${
          show ? "show" : ""
        }`}
        aria-live="polite"
        aria-busy="true"
      >
        {animationContent}
      </div>
    );
  }

  return animationContent;
};

export default Loader;
