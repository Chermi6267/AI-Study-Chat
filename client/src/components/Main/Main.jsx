import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import UserMenu from "../userMenu/UserMenu";
import Messages from "../messages/Messages";
import Input from "../Input/Input";
import { OrientationContext } from "../providers/OrientationProvider";
import { UserMenuProvider } from "../providers/UserMenuProvider";
import { ChatMenuProvider } from "../providers/ChatMenuProvider";
import { IMGMenuProvider } from "../providers/IMGMenuProvider";
import ChatsMenu from "../chatsMenu/ChatsMenu";
import Cap from "../Cap/Cap";
import "./main.css";
import { useAuth } from "../hooks/useAuth";
import GetStarted from "../regLog/GetStarted";
import ChatService from "../../services/chatServices";
import { SelectedChatContext } from "../providers/SelectedChatProvider";

export default function Main() {
  const { isAuth } = useAuth();
  const inputContRef = useRef();
  const [navBarIsRight, setNavBarIsRight] = useContext(OrientationContext);
  const [messageNavbarHeight, setMessageNavbarHeight] = useState(0);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesError, setMessagesError] = useState(false);
  const [chatsMenuTrigger, setChatsMenuTrigger] = useState();
  const [selectedChat] = useContext(SelectedChatContext);
  const { id } = useAuth();

  useEffect(() => {
    setMessagesLoading(true);
    ChatService.chatMessages(selectedChat, id)
      .then((res) => {
        setMessages(res.data);
        setMessagesLoading(false);
      })
      .catch((error) => {
        setMessagesError(true);
        setMessagesLoading(false);
        console.log(error);
      });
  }, [selectedChat, id]);

  useEffect(() => {
    if (inputContRef.current) {
      const resizeHandler = () => {
        setMessageNavbarHeight(
          window.innerHeight - inputContRef.current.clientHeight
        );
      };
      window.addEventListener("resize", resizeHandler);
      resizeHandler();
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, [inputContRef, isAuth]);

  const messagesComponent = useMemo(
    () => (
      <Messages
        messagesError={messagesError}
        messages={messages}
        loading={messagesLoading}
      />
    ),
    [messages, messagesLoading, messagesError]
  );

  const navigationMenuComponent = useMemo(
    () => (
      <NavigationMenu
        messageNavbarHeight={messageNavbarHeight}
        navBarOrientation={navBarIsRight}
        inputContRef={inputContRef}
        setNavBarIsRight={() => {
          setNavBarIsRight(!navBarIsRight);
        }}
      />
    ),
    [messageNavbarHeight, navBarIsRight, inputContRef, setNavBarIsRight]
  );

  if (!isAuth) {
    return <GetStarted />;
  }

  return (
    <div className="main-wrapper">
      <UserMenuProvider>
        <ChatMenuProvider>
          <IMGMenuProvider>
            <UserMenu />
            <ChatsMenu
              chatsMenuTrigger={chatsMenuTrigger}
              setChatsMenuTrigger={(v) => setChatsMenuTrigger(v)}
            />
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
                  messagesError={messagesError}
                  inputContRef={inputContRef}
                  messages={messages}
                  setChatsMenuTrigger={(v) => setChatsMenuTrigger(v)}
                  setMessages={(v) => setMessages(v)}
                />
              }
            </div>
          </IMGMenuProvider>
        </ChatMenuProvider>
      </UserMenuProvider>
    </div>
  );
}
