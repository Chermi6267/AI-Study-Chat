import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const OrientationContext = createContext();

// Provider for handling orientation in app, for right hand or for left
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
