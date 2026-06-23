import { useEffect, useState } from "react";

export const useCountUp = (targetValue, duration = 800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const numericTarget = typeof targetValue === "number" ? targetValue : parseFloat(targetValue) || 0;
    
    let startTimestamp = null;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing: easeOutQuad
      const easedProgress = progress * (2 - progress);
      
      const currentValue = Math.floor(startValue + easedProgress * (numericTarget - startValue));
      setCount(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericTarget);
      }
    };

    const animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, duration]);

  return count;
};
