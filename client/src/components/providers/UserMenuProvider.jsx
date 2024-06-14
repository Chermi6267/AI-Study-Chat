import React, { createContext, useState } from "react";

export const UserMenuContext = createContext();

// Provider for handling user menu if it is open or not
export const UserMenuProvider = ({ children }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <UserMenuContext.Provider value={[isUserMenuOpen, setIsUserMenuOpen]}>
      {children}
    </UserMenuContext.Provider>
  );
};
