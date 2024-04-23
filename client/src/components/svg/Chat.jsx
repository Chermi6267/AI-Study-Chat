import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { OrintationContext } from "../providers/OrintationProvider";
import { ChatMenuContext } from "../providers/ChatMenuProvider";

export default function Chat({ showAll, divVariants }) {
  const [animate, setAnimate] = useState(false);
  const [navBarIsRight] = useContext(OrintationContext);
  const [isChatMenuOpen, setIsChatMenuOpen] = useContext(ChatMenuContext);

  const openChats = () => {
    setAnimate(!animate);
    setTimeout(() => {
      setIsChatMenuOpen(!isChatMenuOpen);
      setAnimate(animate);
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

  const firstSecondPath = {
    hidden: {
      translateX: 0,
    },
    visible: {
      translateX: navBarIsRight ? 100 : -100,
      transition: { duration: 1 },
    },
  };

  return (
    <motion.div
      variants={divVariants}
      initial="hidden"
      animate={showAll ? "visible" : "hidden"}
    >
      <motion.svg
        onClick={openChats}
        variants={svgVariants}
        initial="hidden"
        animate={animate ? "visible" : "hidden"}
        className="navigation-menu-tool"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        fill="none"
      >
        <motion.path
          variants={firstSecondPath}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          d="M7 9.5H15"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          variants={firstSecondPath}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          d="M7 13H12.5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          d="M16 2.33782C14.5291 1.48697 12.8214 1 11 1C5.47715 1 1 5.47715 1 11C1 12.5997 1.37562 14.1116 2.04346 15.4525C2.22094 15.8088 2.28001 16.2161 2.17712 16.6006L1.58151 18.8267C1.32295 19.793 2.20701 20.677 3.17335 20.4185L5.39939 19.8229C5.78393 19.72 6.19121 19.7791 6.54753 19.9565C7.88837 20.6244 9.4003 21 11 21C16.5228 21 21 16.5228 21 11C21 9.1786 20.513 7.47087 19.6622 6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
}
