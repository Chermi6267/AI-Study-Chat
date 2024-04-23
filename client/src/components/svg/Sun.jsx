import React from "react";
import { motion } from "framer-motion";

export default function Sun({ setTheme, showAll, divVariants }) {
  return (
    <motion.div
      variants={divVariants}
      initial="hidden"
      animate={showAll ? "visible" : "hidden"}
    >
      <svg
        className="navigation-menu-tool"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        fill="none"
        onClick={setTheme}
      >
        <path
          d="M6.28451 9.3333C6.10026 9.8546 6 10.4156 6 11C6 13.7614 8.23858 16 11 16C13.7614 16 16 13.7614 16 11C16 8.23858 13.7614 6 11 6C10.4156 6 9.8546 6.10026 9.3333 6.28451"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M11 1V3" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 19V21" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 11H1" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 11H19" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M18.7767 3.22266L16.5547 5.25424"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M3.21875 3.22266L5.44076 5.25424"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5.44098 16.5557L3.21875 18.7779"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18.7767 18.7773L16.5547 16.5551"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
