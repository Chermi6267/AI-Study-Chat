import React, { useContext, useRef } from "react";
import "./imgMenu.css";
import FileUpload from "../svg/FileUpload";
import Danger from "../svg/Danger";
import { IMGMenuContext } from "../providers/IMGMenuProvider";
import { useClickOutside } from "../hooks/useClickOutside";
import { motion } from "framer-motion";

// Image uploader menu component
function IMGMenu({ imgUploadHandler, file }) {
  const [isIMGMenuOpen, setIsIMGMenuOpen] = useContext(IMGMenuContext);
  const IMGMenuRef = useRef(null);

  // Handler for closing the image menu when the user clicks outside of it
  useClickOutside(IMGMenuRef, () => {
    if (isIMGMenuOpen) {
      setTimeout(() => {
        setIsIMGMenuOpen(false);
      }, 50);
    }
  });

  // Animation variant for image menu
  const imgMenuVariants = {
    hidden: {
      top: "150%",
    },
    visible: {
      top: "calc(-50vh + 3px)",
    },
  };

  return (
    <motion.div
      variants={imgMenuVariants}
      initial="hidden"
      animate={isIMGMenuOpen ? "visible" : "hidden"}
      className="img-menu-wrapper"
      ref={IMGMenuRef}
    >
      <div className="img-menu-cont">
        <div
          className="img-upload-btn"
          onClick={imgUploadHandler}
          style={
            // Uploading temporary file URL as background image
            file ? { backgroundImage: `url(${URL.createObjectURL(file)})` } : {}
          }
        >
          {file ? null : <FileUpload />}
        </div>
        <div className="img-menu-text">
          <Danger />
          <p className="img-menu-p">
            Эта нейросеть способна только анализировать текст, она не может
            определить содержание изображения.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default IMGMenu;
