import { createContext, useEffect, useState, type PropsWithChildren } from "react";

export const ScreenSizeContext = createContext<
  { isMobile: boolean } | undefined
>(undefined);

export function ScreenProvider({ children, }: PropsWithChildren) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ isMobile }}>
      {children}
    </ScreenSizeContext.Provider>
  );
}


