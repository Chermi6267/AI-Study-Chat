import React, { useContext } from "react";
import { motion } from "framer-motion";
import { UserMenuContext } from "../providers/UserMenuProvider";
import { ChatMenuContext } from "../providers/ChatMenuProvider";
import "./cap.css";

export default function Cap() {
  const [isUserMenuOpen] = useContext(UserMenuContext);
  const [isChatMenuOpen] = useContext(ChatMenuContext);

  const divVariants = {
    hidden: {
      display: "none",
      opacity: 0,
      backgroundColor: "var(--color2-dr-th)",
    },
    visible: {
      display: "block",
      opacity: 0.6,
      backgroundColor: "var(--backgr-color-dr-th)",
    },
  };

  return (
    <motion.div
      variants={divVariants}
      initial="hidden"
      animate={isChatMenuOpen || isUserMenuOpen ? "visible" : "hidden"}
      className="cap"
    ></motion.div>
  );
}
