import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import Ava from "../svg/Ava";
import { UserMenuContext } from "../providers/UserMenuProvider";
import { useClickOutside } from "../hooks/useClickOutside";
import Phone from "../svg/Phone";
import Email from "../svg/Email";
import "./userMenu.css";
import { useAuth } from "../hooks/useAuth";
import AuthServices from "../../services/authServices";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../../store/slices/userSlice";
import { SelectedChatContext } from "../providers/SelectedChatProvider";

export default function UserMenu() {
  const { id, email, username, phone, token } = useAuth();
  const profInfo = {
    userName: username,
    userEmail: email,
    userPhone: phone,
  };

  const [isUserMenuOpen, setIsUserMenuOpen] = useContext(UserMenuContext);
  const [, selectChat] = useContext(SelectedChatContext);
  const dispatch = useDispatch();
  const [phoneValue, setPhoneValue] = useState("");
  const phoneInputRef = useRef(null);

  const handlerLogout = (username, password) => {
    selectChat(false);
    AuthServices.logout(username, password)
      .then((response) => {
        dispatch(removeUser());
        console.log(`signed out`);
        localStorage.removeItem("token");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlerAddPhone = () => {
    AuthServices.addPhone(phoneValue)
      .then((response) => {
        localStorage.setItem("token", response.data["data"]["accessToken"]);
        dispatch(
          setUser({
            phone: response.data["data"]["phone"],
            id: id,
            email: email,
            username: username,
            token: response.data["data"]["accessToken"],
          })
        );
        if (phoneInputRef && phoneInputRef.current) {
          phoneInputRef.current.style.outline = "2px solid greenyellow";
          setTimeout(() => {
            phoneInputRef.current.style.outline = "0px solid greenyellow";
          }, 800);
        }
      })
      .catch((error) => {
        if (phoneInputRef && phoneInputRef.current) {
          phoneInputRef.current.style.outline = "2px solid tomato";
          phoneInputRef.current.focus();
        }
        console.log(error);
      });
  };

  const divVariants1 = {
    hidden: {
      transform: "translate(-50%, -400%)",
    },
    visible: {
      transform: "translate(-50%, -75%)",
    },
  };

  const userMenuRef = useRef(null);
  useClickOutside(userMenuRef, () => {
    if (isUserMenuOpen) {
      setTimeout(() => {
        setIsUserMenuOpen(false);
        if (phoneInputRef && phoneInputRef.current) {
          phoneInputRef.current.style.outline = "0px solid tomato";
          phoneInputRef.current.innerText =
            profInfo.userPhone !== "" && profInfo.userPhone !== null
              ? profInfo.userPhone
              : "";
        }
      }, 50);
    }
  });

  const newChatVariants = {
    hidden: {
      translateY: -30,
      opacity: 0,
    },
    visible: {
      translateY: 1,
      opacity: 1,
    },
  };

  return (
    <motion.div
      ref={userMenuRef}
      className="user-menu-wrapper"
      variants={divVariants1}
      initial="hidden"
      animate={isUserMenuOpen ? "visible" : "hidden"}
    >
      <motion.div className="user-menu-container">
        <div className="ava-username-container">
          <Ava />
          <p>{profInfo.userName}</p>
        </div>
        <div className="info-container">
          <Email />
          <div style={{ maxWidth: "calc(100% - 1.3em)" }}>
            <h2>{profInfo.userEmail}</h2>
          </div>
        </div>
        <div className="info-container">
          <Phone />
          <div style={{ maxWidth: "calc(100% - 1.3em)" }}>
            <div
              className="user-menu-phone-input"
              suppressContentEditableWarning={true}
              contentEditable
              ref={phoneInputRef}
              placeholder="Телефон"
              onInput={(e) => {
                setPhoneValue(e.target.innerText);

                if (phoneInputRef && phoneInputRef.current) {
                  phoneInputRef.current.style.outline = "0px solid tomato";
                }
              }}
              onBlur={() => {
                handlerAddPhone();
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();
                  if (phoneInputRef && phoneInputRef.current) {
                    phoneInputRef.current.blur();
                  }
                  handlerAddPhone();
                }
              }}
            >
              {profInfo.userPhone}
            </div>
          </div>
        </div>
      </motion.div>
      <div className="user-menu-btn-container">
        <motion.div
          style={{ width: "80%" }}
          initial="hidden"
          variants={newChatVariants}
          animate={isUserMenuOpen ? "visible" : "hidden"}
          transition={{ delay: 0.15, type: "just" }}
          onClick={() => {
            handlerLogout();
          }}
        >
          <button className="user-menu-btn" style={{ color: "tomato" }}>
            Выйти
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
