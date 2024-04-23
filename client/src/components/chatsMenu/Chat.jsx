import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { SelectedChatContext } from "../providers/SelectedChatProvider";
import { ChatMenuContext } from "../providers/ChatMenuProvider";

export default function Chat({ element }) {
  const [selectedChat, selectChat] = useContext(SelectedChatContext);
  const [isChatMenuOpen, setIsChatMenuOpen] = useContext(ChatMenuContext);

  return (
    <motion.li
      className="chat-container"
      onClick={() => {
        selectChat(element.id);
        setIsChatMenuOpen(false);
      }}
    >
      <h1>{element.title}</h1>
    </motion.li>
  );
}
