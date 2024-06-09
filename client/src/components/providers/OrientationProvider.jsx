import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const OrientationContext = createContext();

export const OrientationProvider = ({ children }) => {
  const [navBarIsRight, setNavBarIsRight] = useLocalStorage(
    "navBarOrientation",
    false
  );

  return (
    <OrientationContext.Provider value={[navBarIsRight, setNavBarIsRight]}>
      {children}
    </OrientationContext.Provider>
  );
};
