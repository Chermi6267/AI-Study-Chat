import React, { createContext, useState } from "react";

export const ChatMenuContext = createContext();

// Provider for handling chat menu if it is open or not
export const ChatMenuProvider = ({ children }) => {
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);

  return (
    <ChatMenuContext.Provider value={[isChatMenuOpen, setIsChatMenuOpen]}>
      {children}
    </ChatMenuContext.Provider>
  );
};
