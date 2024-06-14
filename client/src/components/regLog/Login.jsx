import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./regLog.css";
import AuthServices from "../../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Dots from "../Dots/Dots";

// Login page component
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isPassword, setIsPassword] = useState(false);

  // Redirect processing to url
  const navigate = useNavigate();
  const redirect = (url) => {
    navigate(url);
  };

  // Show/hide password
  useEffect(() => {
    const password =
      document.querySelector("#password1") ||
      document.querySelector("#password");
    if (password) {
      if (password.type === "text") {
        password.type = "password";
        document.querySelector("#passwordLabel").textContent =
          "Показать пароль";
      } else {
        password.type = "text";
        document.querySelector("#passwordLabel").textContent = "Скрыть пароль";
      }
    }
  }, [isPassword]);

  // Setting and validating username in form
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
    if (e.target.value === "") {
      document.querySelector("#name").classList.add("error");
    } else {
      document.querySelector("#name").classList.remove("error");
    }
  };

  // Setting and validating password in form
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      document.querySelector("#password").classList.add("error");
    } else {
      document.querySelector("#password").classList.remove("error");
    }
  };

  // Handling user login
  const handleLogin = (username, password) => {
    setLoading(true);
    AuthServices.login(username, password)
      .then((response) => {
        setUsername("");
        setPassword("");
        setLoading(false);
        // Storing logged in user
        dispatch(
          setUser({
            id: response.data.data["id"],
            username: response.data.data["username"],
            email: response.data.data["email"],
            token: response.data.data["access_token"],
            phone: response.data.data["phone"],
          })
        );
        console.log(`${response.data.data["username"]} signed in`);
        // Storing access token
        localStorage.setItem("token", response.data.data["access_token"]);
        redirect("/");
      })
      .catch((error) => {
        if (!!error.response) {
          setErrors(error.response["data"]["message"]);
        } else {
          setErrors("Что-то не так с сервером");
        }
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <div className="header-container">
        <Header isActive={true} target={"for-reg-log"} />
      </div>

      <form className="form-container">
        <h1 className="log-reg-h1">Войти</h1>

        <div className="reg-log-container">
          <input
            autoComplete="off"
            name="name"
            onChange={(e) => usernameChangeHandler(e)}
            type="text"
            className="reg-log-input"
            id="name"
          />
          <div className="label-forget-password-container">
            <label htmlFor="name">Имя пользователя</label>
          </div>
        </div>

        <div className="reg-log-container">
          <input
            autoComplete="off"
            name="password"
            onChange={(e) => passwordChangeHandler(e)}
            type="password"
            className="reg-log-input"
            id="password"
          />

          <div className="label-forget-password-container">
            <label
              id="passwordLabel"
              onClick={() => setIsPassword(!isPassword)}
            >
              Показать пароль
            </label>
          </div>
        </div>

        {errors !== "" ? <h2 className="log-reg-error">{errors}</h2> : null}

        <h2 className="log-reg-h2">
          Если у вас нет аккаунта AI Study Chat,{" "}
          <a href="/reg">то зарегистрируйтесь</a>
        </h2>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleLogin(username, password);
          }}
          className="submit-btn"
        >
          {loading ? (
            <p className="dots">{<Dots text={"Вход"} intervalTime={300} />}</p>
          ) : (
            "Войти"
          )}
        </button>
      </form>
    </div>
  );
}
