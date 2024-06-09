import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatMenuContext } from "../providers/ChatMenuProvider";
import { useClickOutside } from "../hooks/useClickOutside";
import { OrientationContext } from "../providers/OrientationProvider";
import { motion } from "framer-motion";
import Chat from "./Chat";
import "./chatsMenu.css";
import ChatService from "../../services/chatServices";
import { useAuth } from "../hooks/useAuth";
import PreLoader from "../svg/PreLoader";
import { SelectedChatContext } from "../providers/SelectedChatProvider";

export default function ChatsMenu({ chatsMenuTrigger, setChatsMenuTrigger }) {
  const [isChatMenuOpen, setIsChatMenuOpen] = useContext(ChatMenuContext);
  const [navBarIsRight] = useContext(OrientationContext);
  const { id } = useAuth();
  const [chatsData, setChatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, selectChat] = useContext(SelectedChatContext);
  const [error, setError] = useState(null);

  const loadChatsHandler = () => {
    ChatService.chatList()
      .then((res) => {
        setChatsData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    loadChatsHandler();
  }, [id, selectedChat]);

  useEffect(() => {
    if (chatsMenuTrigger) {
      loadChatsHandler();
    }
  }, [chatsMenuTrigger]);

  const divVariants1 = {
    hidden: {
      transform: navBarIsRight
        ? "translate(-500%, -75%)"
        : "translate(500%, -75%)",
      opacity: 0,
    },
    visible: {
      transform: "translate(-50%, -75%)",
      opacity: 1,
    },
  };

  const newChatVariants = {
    hidden: {
      translateY: -30,
      opacity: 0,
    },
    visible: {
      translateY: 0,
      opacity: 1,
    },
  };

  const chatMenuRef = useRef(null);
  useClickOutside(chatMenuRef, () => {
    if (isChatMenuOpen) {
      setTimeout(() => {
        setIsChatMenuOpen(false);
      }, 50);
    }
  });

  return (
    <motion.div
      ref={chatMenuRef}
      variants={divVariants1}
      initial="hidden"
      animate={isChatMenuOpen ? "visible" : "hidden"}
      transition={{ duration: 0.5 }}
      className="chats-wrapper"
    >
      <div className="chats-text-container">
        <h1 className="chats-text">
          Ваши чаты<br></br>
          AI Study Chat
        </h1>
      </div>
      {!loading ? (
        <>
          {!!error ? (
            <h1 className="chat-list-error">Ошибка загрузки чатов</h1>
          ) : null}

          {chatsData.length === 0 ? (
            <h1 className="chat-blank-list">¯\_(ツ)_/¯</h1>
          ) : null}

          <div className="chats-container">
            {chatsData.map((element, index) => (
              <Chat key={element.id} element={element} />
            ))}
          </div>
        </>
      ) : (
        <div className="preloader-chat-menu-container">
          <PreLoader />
        </div>
      )}
      <div className="new-chat-btn-container">
        <motion.div
          style={{ width: "80%" }}
          initial="hidden"
          variants={newChatVariants}
          animate={isChatMenuOpen ? "visible" : "hidden"}
          transition={{ delay: 0.35, type: "just" }}
        >
          <button
            onClick={() => {
              setChatsMenuTrigger(false);
              selectChat(false);
              setIsChatMenuOpen(false);
            }}
            className="new-chat-btn"
          >
            Новый чат
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
