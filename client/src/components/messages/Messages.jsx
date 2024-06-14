import React, { useRef, useEffect, useState } from "react";
import MessageHandler from "./MessageHandler";
import "./messages.css";
import PreLoader from "../svg/PreLoader";

// Messages component
export default function Messages({ messages, loading, messagesError }) {
  const [messageScrollHeight, setMessageScrollHeight] = useState(0);
  const messageRef = useRef(null);

  // Scroll processing for the message component
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
          messagesError ? (
            <h1 className="messages-error">Бля, что-то пошло не так (●'◡'●)</h1>
          ) : messages.length === 0 ? (
            <h1 className="blank-message-list">
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
