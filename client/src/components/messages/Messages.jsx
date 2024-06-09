import React, { useRef, useEffect, useState } from "react";
import MessageHandler from "./MessageHandler";
import "./messages.css";
import PreLoader from "../svg/PreLoader";

export default function Messages({ messages, loading, messagesError }) {
  const [messageScrollHeight, setMessageScrollHeight] = useState(0);

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
          messagesError ? (
            <h1
              style={{
                position: "absolute",
                left: "20%",
                top: "50%",
                lineHeight: "2.5vh",
                width: "50vw",
                color: "tomato",
                textAlign: "center",
                transform: "translateX: -50% translateY: -50%",
              }}
            >
              Бля, что-то пошло не так (●'◡'●)
            </h1>
          ) : messages.length === 0 ? (
            <h1
              style={{
                position: "absolute",
                left: "20%",
                top: "50%",
                lineHeight: "2.5vh",
                width: "50vw",
                textAlign: "center",
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
