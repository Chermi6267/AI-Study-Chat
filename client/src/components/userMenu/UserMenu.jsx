import React, { useContext, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Ava from "../svg/Ava";
import Phone from "../svg/Phone";
import Email from "../svg/Email";
import AuthServices from "../../services/authServices";
import { useClickOutside } from "../hooks/useClickOutside";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../../store/slices/userSlice";
import { UserMenuContext } from "../providers/UserMenuProvider";
import { SelectedChatContext } from "../providers/SelectedChatProvider";
import "./userMenu.css";

// User menu component
const UserMenu = () => {
  const { id, email, username, phone, token } = useAuth();
  const [profInfo, setProfInfo] = useState({
    userName: username,
    userEmail: email,
    userPhone: phone,
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useContext(UserMenuContext);
  const [, selectChat] = useContext(SelectedChatContext);
  const dispatch = useDispatch();
  const [phoneValue, setPhoneValue] = useState("");
  const phoneInputRef = useRef(null);
  const userMenuRef = useRef(null);

  // Uploading user's phone number
  useEffect(() => {
    if (!profInfo.userPhone) {
      AuthServices.getUserInfo()
        .then((res) => {
          setProfInfo((prevInfo) => ({
            ...prevInfo,
            userPhone: res.data["phone"],
          }));
        })
        .catch(console.error);
    }
  }, [profInfo.userPhone]);

  // User logout handler
  const handleLogout = () => {
    selectChat(false);
    AuthServices.logout(username, token)
      .then(() => {
        dispatch(removeUser());
        console.log("signed out");
        localStorage.removeItem("token");
      })
      .catch(console.error);
  };

  // Processing the addition of a user's phone number
  const handleAddPhone = (e) => {
    AuthServices.addPhone(phoneValue)
      .then((response) => {
        const updatedPhone = response.data["data"];
        // Updating user info
        dispatch(setUser({ phone: updatedPhone, id, email, username, token }));
        setProfInfo((prevInfo) => ({
          ...prevInfo,
          userPhone: updatedPhone,
        }));

        // Showing the user that everything is fine
        if (phoneInputRef.current) {
          phoneInputRef.current.style.outline = "2px solid greenyellow";
          setTimeout(() => {
            phoneInputRef.current.style.outline = "none";
          }, 800);
        }
      })
      .catch((error) => {
        if (phoneInputRef.current) {
          phoneInputRef.current.style.outline = "2px solid tomato";
          if (e.code === "Enter") {
            phoneInputRef.current.focus();
          }
        }
        console.error(error);
      });
  };

  // Handler for closing the user menu when the user clicks outside of it
  useClickOutside(userMenuRef, () => {
    if (isUserMenuOpen) {
      setTimeout(() => {
        setIsUserMenuOpen(false);
        if (phoneInputRef.current) {
          phoneInputRef.current.style.outline = "none";
        }
      }, 50);
    }
  });

  // Animation variant for user menu
  const divVariants1 = {
    hidden: { transform: "translate(-50%, -400%)" },
    visible: { transform: "translate(-50%, -75%)" },
  };

  // Animation variant for logout button
  const userLogoutVariants = {
    hidden: { translateY: -30, opacity: 0 },
    visible: { translateY: 1, opacity: 1 },
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
            <h2 style={{ padding: "1.5vw" }}>{profInfo.userEmail}</h2>
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
                if (phoneInputRef.current) {
                  phoneInputRef.current.style.outline = "none";
                }
              }}
              onBlur={handleAddPhone}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();
                  if (phoneInputRef.current) {
                    phoneInputRef.current.blur();
                  }
                  handleAddPhone(e);
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
          variants={userLogoutVariants}
          animate={isUserMenuOpen ? "visible" : "hidden"}
          transition={{ delay: 0.15, type: "just" }}
          onClick={handleLogout}
        >
          <button className="user-menu-btn" style={{ color: "tomato" }}>
            Выйти
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserMenu;
