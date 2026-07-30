import { useState, useEffect } from "react";

function getIsPortrait() {
  return window.innerHeight > window.innerWidth;
}

export function useOrientation() {
  const [isPortrait, setIsPortrait] = useState(() => getIsPortrait());

  useEffect(() => {
    function handleResize() {
      setIsPortrait(getIsPortrait());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isPortrait;
}
