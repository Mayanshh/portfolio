"use client";

import { useEffect, useState } from "react";

type DeviceType = {
  isMobile: boolean;
  isDesktop: boolean;
};

export function useDevice(breakpoint: number = 1024): DeviceType {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // SSR safety
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Initial check
    handleChange(mediaQuery);

    // Listen for changes (super efficient)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Safari fallback
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [breakpoint]);

  return {
    isMobile,
    isDesktop: !isMobile,
  };
}