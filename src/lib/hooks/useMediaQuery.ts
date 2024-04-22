import { useEffect, useState } from "react";

const useMediaQuery = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(min-width: 768px)");

    const updateViewportStatus = () => {
      setIsDesktop(mediaQueryList.matches);
    };

    updateViewportStatus(); // Initial check
    mediaQueryList.addEventListener("change", updateViewportStatus);

    return () => {
      mediaQueryList.removeEventListener("change", updateViewportStatus);
    };
  }, []);

  return { isDesktop };
};

export default useMediaQuery;
