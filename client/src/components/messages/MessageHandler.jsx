import React from "react";
import HumanMessage from "./HumanMessage";
import BotMessage from "./BotMessage";

// Messages handler
export default function MessageHandler({ element, setMessageScrollHeight }) {
  return element.type === "assistant" || element.type === "preloader" ? (
    <BotMessage
      element={element}
      setMessageScrollHeight={setMessageScrollHeight}
    />
  ) : (
    <HumanMessage
      element={element}
      setMessageScrollHeight={setMessageScrollHeight}
    />
  );
}
