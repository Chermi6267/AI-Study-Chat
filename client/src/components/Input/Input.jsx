import React, { useRef, useState, useContext, useEffect } from "react";
import Camera from "../svg/Camera";
import "./input.css";
import Submit from "../svg/Submit";
import ChatService from "../../services/chatServices";
import { SelectedChatContext } from "../providers/SelectedChatProvider";
import { IMGMenuContext } from "../providers/IMGMenuProvider";
import IMGMenu from "../IMGMenu/IMGMenu";
import { v4 as uuidv4 } from "uuid";
import { resizeImage } from "./resize";

// Input component
export default function Input({
  inputContRef,
  messages,
  setMessages,
  setChatsMenuTrigger,
  messagesError,
}) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isIMGMenuOpen, setIsIMGMenuOpen] = useContext(IMGMenuContext);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [selectedChat, selectChat] = useContext(SelectedChatContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Handler of the paste event
    const handlePaste = (e) => {
      e.preventDefault();

      // Getting text from the clipboard
      const text = (e.clipboardData || window.clipboardData).getData("text");

      // Inserting text without formatting
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();

      const textNode = document.createTextNode(text);
      range.insertNode(textNode);

      // Placing the cursor at the end of the inserted text
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);

      setInputValue(inputRef.current.innerText);
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("paste", handlePaste);

    return () => {
      inputElement.removeEventListener("paste", handlePaste);
    };
  }, []);

  // Preloader object template
  const preLoader = {
    id: "preLoader",
    img_path: "",
    text_for_user: "",
    type: "preloader",
  };

  // Error object template
  const errorElement = {
    id: "error",
    type: "assistant",
    text_for_user:
      "<p style='color: rgb(255, 66, 32)'>Что-то пошло не так!</p>",
    img_path: "",
  };

  // Handle file input change
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Reduce the image resolution
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        const resizedImage = await resizeImage(img, 1280, 720);
        setFile(resizedImage);
      };
    }

    event.target.value = null; // Reset the input value to allow same file selection
  };

  // Handle text message submission
  const handleSubmitText = async () => {
    if (inputValue === "") {
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

    await ChatService.sendText(selectedChat, inputValue)
      .then((res) => {
        // console.log(res.data);
        if (res.data["chat_id"] === undefined) {
          selectChat(false);
        } else {
          if (!selectedChat) {
            setChatsMenuTrigger(true);
          }
          selectChat(res.data["chat_id"]);
        }
        // Set messages with message and AI response
        setMessages([...messages, element, res.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Set messages with message and error notification
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

    // Temporarily set messages with the new message and preloader
    setMessages([...messages, element, preLoader]);

    await ChatService.sendIMG(file, inputValue, selectedChat)
      .then((res) => {
        // console.log(res);
        if (res.data["chat_id"] === undefined) {
          selectChat(false);
        } else {
          selectChat(res.data["chat_id"]);
        }
        // Set messages with message and AI response
        setMessages([...messages, element, res.data]);
        setFile();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // Set messages with message and error notification
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
