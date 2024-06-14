import React, { useContext, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { SelectedChatContext } from "../providers/SelectedChatProvider";
import { ChatMenuContext } from "../providers/ChatMenuProvider";
import { ThemeContext } from "../providers/ThemeProvider";
import ChatService from "../../services/chatServices";

// Changing the color based on the amount of chat dragging
const interpolateColor = (x, width) => {
  const percentage = Math.min(100, Math.max(0, (Math.abs(x) / width) * 100));
  const red = Math.min(255, Math.floor(255 * (percentage / 100)));
  const green = Math.max(0, Math.floor(255 * ((100 - percentage) / 100)));
  const blue = Math.max(0, Math.floor(255 * ((100 - percentage) / 100)));
  return `rgb(${red}, ${green}, ${blue})`;
};

// Chat component
export default function Chat({ element }) {
  const chatRef = useRef(null);
  const [isDarkMode] = useContext(ThemeContext);
  const [selectedChat, selectChat] = useContext(SelectedChatContext);
  const [, setIsChatMenuOpen] = useContext(ChatMenuContext);
  const [isDelete, setIsDelete] = useState(false);

  // Deleting chat animation processing
  const x = useMotionValue(0);
  const backgroundColor = useTransform(
    x,
    [-window.innerWidth, 0],
    [
      interpolateColor(-window.innerWidth, window.innerWidth),
      isDarkMode ? "#747182" : "#e2cbdb",
    ]
  );

  // Chat deleting handler
  const deleteChatHandler = async () => {
    if (chatRef && chatRef.current) {
      // Getting x value of the chat
      if (chatRef.current.style.transform) {
        const xRange = chatRef.current.style.transform
          .split("(")[1]
          .split("px)")[0];

        // Checking the drag value to delete a chat
        if (xRange < window.innerWidth * -0.35) {
          setIsDelete(true);
          await ChatService.deleteChat(element.id)
            .then((res) => {
              if (selectedChat === element.id) {
                selectChat(false);
              }
              setTimeout(() => {
                if (chatRef && chatRef.current) {
                  chatRef.current.style.display = "none";
                }
              }, 500);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  return (
    <motion.li
      initial="hidden"
      animate={isDelete ? "animate" : "hidden"}
      variants={{
        hidden: {
          x: 0,
          opacity: 1,
          outline: "2px solid transparent",
        },
        animate: {
          x: "-100%",
          opacity: 0,
          outline: "2px solid tomato",
        },
      }}
      ref={chatRef}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, backgroundColor }}
      onDragEnd={(e) => deleteChatHandler()}
      className="chat-container"
      onClick={() => {
        selectChat(element.id);
        setIsChatMenuOpen(false);
      }}
    >
      <h1 className="chat-container-text">{element.title}</h1>
    </motion.li>
  );
}
