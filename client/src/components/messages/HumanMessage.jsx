import React from "react";
import UserChatArrow from "../svg/UserChatArrow";

export default function HumanMessage({ element, setMessageScrollHeight }) {
  const test =
    element.img_path && element.img_path.startsWith("blob")
      ? element.img_path
      : `${process.env.REACT_APP_API_URL}/chat/images/${element.img_path}`;

  return (
    <div className="human-message-wrapper">
      <div className="human-message-container">
        {element.img_path === "" || element.img_path === undefined ? null : (
          <img
            style={{ width: "100%", borderRadius: 20, padding: "3% 0" }}
            src={test}
            alt=""
            onLoad={() => setMessageScrollHeight(element.id)}
          />
        )}
        <p>{element.text_for_user}</p>
      </div>
      <UserChatArrow />
    </div>
  );
}
