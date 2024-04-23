import React, { useRef, useEffect, useState, useContext } from "react";
import MessageHandler from "./MessageHandler";
import "./messages.css";
import ChatService from "../../services/chatServices";
import { SelectedChatContext } from "../providers/SelectedChatProvider";
import { useAuth } from "../hooks/useAuth";
import PreLoader from "../svg/PreLoader";

export default function Messages({ messages, setMessages }) {
  const [selectedChat] = useContext(SelectedChatContext);
  const { id } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messageScrollHeight, setMessageScrollHeight] = useState(0);

  useEffect(() => {
    setLoading(true);
    ChatService.chatMessages(selectedChat, id)
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedChat, id]);

  const messageRef = useRef(null);
  useEffect(() => {
    if (messageRef.current && messageRef) {
      const element = messageRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [messageRef, loading, messageScrollHeight, messages]);

  return (
    <div ref={messageRef} className="messages-wrapper">
      <div className="messages-container">
        {!loading ? (
          messages.length === 0 ? (
            <h1
              style={{
                position: "absolute",
                left: "20%",
                top: "50%",
                lineHeight: "2.5vh",
                width: "50vw",
                transform: "translateX: -50% translateY: -50%",
              }}
            >
              Здесь, пока что, пусто, но Вам под силу это исправить (●'◡'●)
            </h1>
          ) : (
            messages.map((element) => (
              <MessageHandler
                setMessageScrollHeight={(v) => setMessageScrollHeight(v)}
                key={element.id}
                element={element}
              />
            ))
          )
        ) : (
          <div className="preloader-chat-menu-container">
            <PreLoader />
          </div>
        )}
      </div>
    </div>
  );
}
