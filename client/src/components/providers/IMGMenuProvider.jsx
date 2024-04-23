import React, { createContext, useState } from "react";

export const IMGMenuContext = createContext();

export const IMGMenuProvider = ({ children }) => {
  const [isIMGMenuOpen, setIsIMGMenuOpen] = useState(false);

  return (
    <IMGMenuContext.Provider value={[isIMGMenuOpen, setIsIMGMenuOpen]}>
      {children}
    </IMGMenuContext.Provider>
  );
};
