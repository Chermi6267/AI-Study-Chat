import React, { useRef, useState, useContext } from "react";
import Camera from "../svg/Camera";
import "./input.css";
import Submit from "../svg/Submit";
import ChatService from "../../services/chatServices";
import { SelectedChatContext } from "../providers/SelectedChatProvider";
import { IMGMenuContext } from "../providers/IMGMenuProvider";
import IMGMenu from "../IMGMenu/IMGMenu";
import { v4 as uuidv4 } from "uuid";

export default function Input({
  inputContRef,
  messages,
  setMessages,
  setChatsMenuTrigger,
  messagesError,
}) {
  // References to DOM elements and component states
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isIMGMenuOpen, setIsIMGMenuOpen] = useContext(IMGMenuContext);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [selectedChat, selectChat] = useContext(SelectedChatContext);
  const [loading, setLoading] = useState(false);

  // Preloader object template
  const preLoader = {
    id: "preLoader",
    img_path: "",
    text_for_user: "",
    type: "preloader",
  };

  // Handle file input change
  const handleChange = (event) => {
    setFile(event.target.files[0]);
    event.target.value = null; // Reset the input value to allow same file selection
  };

  // Handle text message submission
  const handleSubmitText = async () => {
    if (inputValue === "") {
      console.log("NO INPUT VALUE");
      return;
    }

    const id = uuidv4();
    const element = {
      id: id,
      text_for_user: inputValue,
      img_path: "",
    };

    // Temporarily set messages with the new message and preloader
    setMessages([...messages, element, preLoader]);

    // Send text message via ChatService
    await ChatService.sendText(selectedChat, inputValue)
      .then((res) => {
        console.log(res.data);
        if (res.data["chat_id"] === undefined) {
          selectChat(false);
        } else {
          if (!selectedChat) {
            setChatsMenuTrigger(true);
          }
          selectChat(res.data["chat_id"]);
        }
        setMessages([...messages, element, res.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        const errorElement = {
          id: id,
          type: "assistant",
          text_for_user:
            "<p style='color: rgb(255, 66, 32)'>Что-то пошло не так!</p>",
          img_path: "",
        };
        setMessages([...messages, element, errorElement]);
        setFile();
        setLoading(false);
      });
  };

  // Handle image upload button click
  const imgUploadHandler = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle image message submission
  const handleSubmitIMG = async () => {
    const id = uuidv4();
    const element = {
      id: id,
      text_for_user: inputValue,
      img_path: URL.createObjectURL(file),
    };

    setMessages([...messages, element, preLoader]);

    await ChatService.sendIMG(file, inputValue, selectedChat)
      .then((res) => {
        console.log(res);
        if (res.data["chat_id"] === undefined) {
          selectChat(false);
        } else {
          selectChat(res.data["chat_id"]);
        }
        setMessages([...messages, element, res.data]);
        setFile();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        const errorElement = {
          id: id,
          type: "assistant",
          text_for_user:
            "<p style='color: rgb(255, 66, 32)'>Что-то пошло не так!</p>",
          img_path: "",
        };
        setMessages([...messages, element, errorElement]);
        setFile();
        setLoading(false);
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file && inputValue === "") {
      return;
    }

    if (messagesError) {
      return;
    } else {
      setLoading(true);
      if (file) {
        handleSubmitIMG();
        setInputValue("");
        setFile();
        if (inputRef && inputRef.current) {
          inputRef.current.innerText = "";
        }
      } else {
        handleSubmitText();
        setInputValue("");

        if (inputRef && inputRef.current) {
          inputRef.current.innerText = "";
        }
      }
    }
  };

  // Render the input component
  return (
    <div className="input-wrapper" ref={inputContRef}>
      <IMGMenu imgUploadHandler={() => imgUploadHandler()} file={file} />
      <div className={"inputbox"}>
        <div className="input-container">
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
            ref={fileInputRef}
            id="file"
            hidden
          />

          <div
            ref={inputRef}
            className="new-input"
            contentEditable
            autoComplete="off"
            placeholder="Сообщение"
            onInput={(ev) => {
              setInputValue(ev.target.innerText);
            }}
          />

          <div className="tools-container">
            <button
              className="input-tool-btn"
              onClick={() => {
                setIsIMGMenuOpen(!isIMGMenuOpen);
              }}
            >
              <Camera file={file} />
            </button>

            <button
              style={
                (!file && inputValue === "") || loading
                  ? {
                      opacity: 0.5,
                      pointerEvents: "none",
                      userSelect: "none",
                    }
                  : {}
              }
              className="input-tool-btn"
              onClick={(e) => handleSubmit(e)}
            >
              <Submit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
