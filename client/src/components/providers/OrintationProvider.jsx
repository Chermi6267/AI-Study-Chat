import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const OrintationContext = createContext();

export const OrintationProvider = ({ children }) => {
  const [navBarIsRight, setNavBarIsRight] = useLocalStorage(
    "navBarOrintation",
    false
  );

  return (
    <OrintationContext.Provider value={[navBarIsRight, setNavBarIsRight]}>
      {children}
    </OrintationContext.Provider>
  );
};
