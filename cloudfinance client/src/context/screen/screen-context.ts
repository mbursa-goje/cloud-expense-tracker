import { createContext} from "react";

export const ScreenSizeContext = createContext<
  { isMobile: boolean } | undefined
>(undefined);