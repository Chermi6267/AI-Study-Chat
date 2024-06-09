import React, { useContext } from "react";
import logo_dr_th from "../About/img/logo.png";
import logo_lg_th from "../About/img/logo_lg_th.png";
import { motion } from "framer-motion";
import { ThemeContext } from "../providers/ThemeProvider";

export default function Header({ isActive, target }) {
  const className = "header " + target;

  const [isDarkMode] = useContext(ThemeContext);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, columnGap: 0 }}
      animate={
        isActive
          ? { opacity: 1, columnGap: "20px" }
          : { opacity: 0, columnGap: 0 }
      }
      exit={{ opacity: 0, columnGap: 0 }}
      transition={{ delay: 0.1 }}
    >
      <img
        style={{ width: "15vw" }}
        src={isDarkMode ? logo_dr_th : logo_lg_th}
        alt="IMG"
      />
      <h1 className="logo-text">AI Study Chat</h1>
    </motion.div>
  );
}
