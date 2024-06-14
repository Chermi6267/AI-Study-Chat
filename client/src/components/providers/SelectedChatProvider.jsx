import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const SelectedChatContext = createContext();

// Provider for handling selected chat
export const SelectedChatProvider = ({ children }) => {
  const [selectedChat, selectChat] = useLocalStorage("selectedChat", false);

  return (
    <SelectedChatContext.Provider value={[selectedChat, selectChat]}>
      {children}
    </SelectedChatContext.Provider>
  );
};
