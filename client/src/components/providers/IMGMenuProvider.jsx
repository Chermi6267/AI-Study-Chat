import React, { createContext, useState } from "react";

export const IMGMenuContext = createContext();

// Provider for handling image menu if it is open or not
export const IMGMenuProvider = ({ children }) => {
  const [isIMGMenuOpen, setIsIMGMenuOpen] = useState(false);

  return (
    <IMGMenuContext.Provider value={[isIMGMenuOpen, setIsIMGMenuOpen]}>
      {children}
    </IMGMenuContext.Provider>
  );
};
