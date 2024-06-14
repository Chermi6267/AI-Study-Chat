import React from "react";
import UserChatArrow from "../svg/UserChatArrow";

// User message component
export default function HumanMessage({ element, setMessageScrollHeight }) {
  // Creating a URL for an image
  const imgSrc =
    element.img_path && element.img_path.startsWith("blob")
      ? element.img_path
      : `${process.env.REACT_APP_API_URL}/chat/images/${element.img_path}`;

  return (
    <div className="human-message-wrapper">
      <div className="human-message-container">
        {element.img_path === "" || element.img_path === undefined ? null : (
          <img
            style={{ width: "100%", borderRadius: 20, padding: "3% 0" }}
            src={imgSrc}
            alt={"Здесь должна быть красивая картинка"}
            onLoad={() => setMessageScrollHeight(element.id)}
          />
        )}
        <p>{element.text_for_user}</p>
      </div>
      <UserChatArrow />
    </div>
  );
}
