import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import UserMenu from "../userMenu/UserMenu";
import Messages from "../messages/Messages";
import Input from "../Input/Input";
import { OrintationContext } from "../providers/OrintationProvider";
import { UserMenuProvider } from "../providers/UserMenuProvider";
import { ChatMenuProvider } from "../providers/ChatMenuProvider";
import { IMGMenuProvider } from "../providers/IMGMenuProvider";
import ChatsMenu from "../chatsMenu/ChatsMenu";
import Cap from "../Cap/Cap";
import "./main.css";
import { useAuth } from "../hooks/useAuth";
import GetStarted from "../regLog/GetStarted";
import { SelectedChatProvider } from "../providers/SelectedChatProvider";

export default function Main() {
  const { isAuth } = useAuth();
  const inputRef = useRef();
  const [navBarIsRight, setNavBarIsRight] = useContext(OrintationContext);
  const [messageNavbarHeight, setMessageNavbarHeight] = useState(0);
  const [messages, setMessages] = useState();
  useEffect(() => {
    if (inputRef.current) {
      const resizeHandler = () => {
        setMessageNavbarHeight(
          window.innerHeight - inputRef.current.clientHeight
        );
      };
      window.addEventListener("resize", resizeHandler);
      resizeHandler();
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, [inputRef, isAuth]);

  const messagesComponent = useMemo(
    () => <Messages messages={messages} setMessages={(v) => setMessages(v)} />,
    [messages]
  );
  const navigationMenuComponent = useMemo(
    () => (
      <NavigationMenu
        messageNavbarHeight={messageNavbarHeight}
        navBarOrintation={navBarIsRight}
        inputRef={inputRef}
        setNavBarIsRight={() => {
          setNavBarIsRight(!navBarIsRight);
        }}
      />
    ),
    [messageNavbarHeight, navBarIsRight, inputRef, setNavBarIsRight]
  );

  if (!isAuth) {
    return (
      <UserMenuProvider>
        <ChatMenuProvider>
          <GetStarted />
        </ChatMenuProvider>
      </UserMenuProvider>
    );
  }

  return (
    <UserMenuProvider>
      <ChatMenuProvider>
        <SelectedChatProvider>
          <IMGMenuProvider>
            <UserMenu />
            <ChatsMenu />
            <div className="main-page-container">
              <Cap />
              <div
                className="message-navbar"
                style={{
                  flexDirection: navBarIsRight ? "row" : "row-reverse",
                  height: messageNavbarHeight,
                }}
              >
                {messagesComponent}
                {navigationMenuComponent}
              </div>
              {
                <Input
                  inputRef={inputRef}
                  messages={messages}
                  setMessages={(v) => setMessages(v)}
                />
              }
            </div>
          </IMGMenuProvider>
        </SelectedChatProvider>
      </ChatMenuProvider>
    </UserMenuProvider>
  );
}
