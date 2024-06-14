import React from "react";
import "./preLoader.css";
import PreLoader from "../svg/PreLoader";

// PreLoader spinning component
export default function Preloader() {
  return (
    <div className="preloader-container">
      <h1 className="preLoader-text">
        Пожалуйста подождите<br></br>буквально пару секунд
      </h1>
      <PreLoader />
    </div>
  );
}
