import React, { useRef, useState, useContext } from "react";
import Camera from "../svg/Camera";
import Micro from "../svg/Micro";
import "./input.css";
import Submit from "../svg/Submit";
import ChatService from "../../services/chatServices";
import { SelectedChatContext } from "../providers/SelectedChatProvider";
import { IMGMenuContext } from "../providers/IMGMenuProvider";
import IMGMenu from "../IMGMenu/IMGMenu";
import { v4 as uuidv4 } from "uuid";

export default function Input({ inputRef, messages, setMessages }) {
  const [inputValue, setInputValue] = useState("");
  const [isIMGMenuOpen, setIsIMGMenuOpen] = useContext(IMGMenuContext);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [selectedChat, selectChat] = useContext(SelectedChatContext);

  const preLoader = {
    id: "preLoader",
    img_path: "",
    text_for_user: "",
    type: "preloader",
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitText = async () => {
    if (inputValue === "") {
      console.log("НЕТ INPUT VALUE");
      return;
    }

    const id = uuidv4();
    const element = {
      id: id,
      text_for_user: inputValue,
      img_path: "",
    };

    setMessages([...messages, element, preLoader]);

    try {
      await ChatService.sendText(selectedChat, inputValue).then((res) => {
        console.log(res.data);
        if (res.data["chat_id"] === undefined) {
          selectChat(false);
        } else {
          selectChat(res.data["chat_id"]);
        }
        setMessages([...messages, element, res.data]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const imgUploadHandler = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmitIMG = async () => {
    const id = uuidv4();
    const element = {
      id: id,
      text_for_user: inputValue,
      img_path: URL.createObjectURL(file),
    };

    setMessages([...messages, element, preLoader]);

    try {
      await ChatService.sendIMG(file, inputValue, selectedChat).then((res) => {
        console.log(res);
        if (res.data["chat_id"] === undefined) {
          selectChat(false);
        } else {
          selectChat(res.data["chat_id"]);
        }
        setMessages([...messages, element, res.data]);
        setFile();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file && inputValue === "") {
      console.log("ПОШЁЛ НАХУЙ");
      return;
    }

    if (file) {
      handleSubmitIMG();
      setInputValue("");
    } else {
      handleSubmitText();
      setInputValue("");
    }
  };

  return (
    <div className="input-wrapper" ref={inputRef}>
      <IMGMenu imgUploadHandler={() => imgUploadHandler()} file={file} />
      <div className="inputbox">
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
          <input
            value={inputValue}
            onChange={(ev) => setInputValue(ev.target.value)}
            className="main-input"
            placeholder="Сообщение"
            autoComplete="off"
          />
        </div>
        <div className="tools-container">
          <>
            <button
              className="input-tool-btn"
              onClick={() => {
                setIsIMGMenuOpen(!isIMGMenuOpen);
              }}
            >
              <Camera file={file} />
            </button>
            <button className="input-tool-btn">
              <Micro />
            </button>
          </>
          <>
            <button className="input-tool-btn" onClick={(e) => handleSubmit(e)}>
              <Submit />
            </button>
          </>
        </div>
      </div>
    </div>
  );
}
