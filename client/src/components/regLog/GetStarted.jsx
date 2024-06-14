import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  // Redirect processing to url
  const navigate = useNavigate();
  const redirect = (url) => {
    navigate(url);
  };

  return (
    <div className="get-started-wrapper">
      <div className="header-container">
        <Header isActive={true} target={"for-reg-log"} />
      </div>
      <div className="center-log-reg-container">
        <h1 className="log-reg-h1">Начало</h1>
        <div className="center-log-reg-btn-container">
          <button
            className="log-reg-btn"
            onClick={() => {
              redirect("/login");
            }}
          >
            Войти
          </button>
          <button
            className="log-reg-btn"
            onClick={() => {
              redirect("/reg");
            }}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
      <footer className="log-reg-footer">
        05.06.2024<br></br>
        &copy; AI Study Chat<br></br>
        <a href="https://t.me/chermi6267">@chermi6267</a>
      </footer>
    </div>
  );
}
