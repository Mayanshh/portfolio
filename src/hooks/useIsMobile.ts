"use client"
import { useEffect , useState } from "react";

// how to use : const isMobile = useIsMobile();

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${breakpoint - 1}px)`
    );

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isMobile;
}
