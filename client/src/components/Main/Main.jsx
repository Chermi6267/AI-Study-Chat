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

// Main page component
export default function Main() {
  const { isAuth } = useAuth();
  const inputContRef = useRef();
  const [navBarIsRight] = useContext(OrientationContext);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesError, setMessagesError] = useState(false);
  const [chatsMenuTrigger, setChatsMenuTrigger] = useState();
  const [selectedChat] = useContext(SelectedChatContext);
  const { id } = useAuth();
  const messageNavRef = useRef();

  // Uploading messages from the server
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

  // Messages component wrapped in useMemo
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

  // Navigation component wrapped in useMemo
  const navigationMenuComponent = useMemo(
    () => <NavigationMenu parentRef={messageNavRef} />,
    []
  );

  // Checking if the user is logged in
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
                ref={messageNavRef}
                className="message-navbar"
                style={{
                  flexDirection: navBarIsRight ? "row" : "row-reverse",
                }}
              >
                {messagesComponent}
                {navigationMenuComponent}
              </div>

              <Input
                messagesError={messagesError}
                inputContRef={inputContRef}
                messages={messages}
                setChatsMenuTrigger={(v) => setChatsMenuTrigger(v)}
                setMessages={(v) => setMessages(v)}
              />
            </div>
          </IMGMenuProvider>
        </ChatMenuProvider>
      </UserMenuProvider>
    </div>
  );
}
