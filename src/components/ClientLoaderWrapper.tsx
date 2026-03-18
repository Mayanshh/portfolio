"use client";

import { useEffect, useState } from "react";
import Loader3D from "./Loader3D"; // Ensure the path points to your Loader component

export default function ClientLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const navEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];

    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    // show loader ONLY on reload
    if (isReload) {
      setShowLoader(true);
    }
  }, []);

  return (
    <>
      {showLoader && (
        <Loader3D onFinish={() => setShowLoader(false)} />
      )}
      {children}
    </>
  );
}