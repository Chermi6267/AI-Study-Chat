import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { UserMenuContext } from "../providers/UserMenuProvider";

export default function User({ showAll, divVariants }) {
  const [animate, setAnimate] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useContext(UserMenuContext);

  const openUserMenu = () => {
    setAnimate(!animate);
    setTimeout(() => {
      setAnimate(animate);
      setIsUserMenuOpen(!isUserMenuOpen);
    }, 200);
  };

  const svgVariants = {
    hidden: {
      scale: 1,
    },
    visible: {
      scale: 1.2,
    },
  };

  const fisrtSecondPath = {
    hidden: {
      translateY: 0,
    },
    visible: {
      translateY: "-1px",
    },
  };

  const thirdPath = {
    hidden: {
      rotate: 360,
    },
    visible: {
      rotate: 270,
    },
  };

  return (
    <motion.li
      variants={divVariants}
      initial="hidden"
      animate={showAll ? "visible" : "hidden"}
    >
      <motion.svg
        className="navigation-menu-tool"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        fill="none"
        onClick={openUserMenu}
        variants={svgVariants}
        initial="hidden"
        animate={animate ? "visible" : "hidden"}
      >
        <motion.path
          variants={fisrtSecondPath}
          d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
          strokeWidth="2"
        />
        <motion.path
          variants={fisrtSecondPath}
          d="M16.9696 19C16.8105 16.1085 15.9252 14 11.0004 14C6.0757 14 5.1904 16.1085 5.03125 19"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          variants={thirdPath}
          d="M6 2.33782C7.47087 1.48697 9.1786 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 9.1786 1.48697 7.47087 2.33782 6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.li>
  );
}
