import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

export const useLocomotiveScroll = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1,  // Adjust smoothness
    });

    return () => {
      scroll.destroy();  // Cleanup on unmount
    };
  }, []);

  return scrollRef;
};
