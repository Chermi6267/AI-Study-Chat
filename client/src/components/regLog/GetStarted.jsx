import React from "react";
import Header from "./Header";

export default function GetStarted() {
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
              window.location.href = "/login";
            }}
          >
            Войти
          </button>
          <button
            className="log-reg-btn"
            onClick={() => {
              window.location.href = "/reg";
            }}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
      <div style={{ height: "10%", textAlign: "center" }}>
        30.03.2024<br></br>
        &copy; AI Study Chat
      </div>
    </div>
  );
}
