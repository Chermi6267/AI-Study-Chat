import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./regLog.css";
import AuthServices from "../../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Dots from "../Dots/Dots";

// Registration page component
export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const [isPassword, setIsPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect processing to url
  const navigate = useNavigate();
  const redirect = (url) => {
    navigate(url);
  };

  // Setting and validating username in form
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
    if (e.target.value === "") {
      document.querySelector("#name").classList.add("error");
    } else {
      document.querySelector("#name").classList.remove("error");
    }
  };

  // Setting and validating email in form
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      document.querySelector("#email").classList.add("error");
    } else {
      document.querySelector("#email").classList.remove("error");
    }
  };

  // Setting and validating password1 in form
  const password1ChangeHandler = (e) => {
    setPassword1(e.target.value);
    if (e.target.value === "") {
      document.querySelector("#password1").classList.add("error");
    } else {
      document.querySelector("#password1").classList.remove("error");
    }
  };

  // Setting and validating password2 in form
  const password2ChangeHandler = (e) => {
    setPassword2(e.target.value);
    if (e.target.value === "") {
      document.querySelector("#password2").classList.add("error");
    } else {
      document.querySelector("#password2").classList.remove("error");
    }
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

  // Handling user registration
  const handleRegister = (username, email, password1, password2) => {
    setLoading(true);
    if (password1 !== password2) {
      document.querySelector("#password2").classList.add("error");
      setLoading(false);
      return;
    }
    AuthServices.registration(username, email, password1)
      .then((response) => {
        setUsername("");
        setEmail("");
        setPassword1("");
        setPassword2("");
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
        console.log(`${response.data.data["username"]} signed up`);
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
        <h1 className="log-reg-h1">Регистрация</h1>

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
            name="email"
            onChange={(e) => emailChangeHandler(e)}
            type="text"
            className="reg-log-input"
            id="email"
          />
          <div className="label-forget-password-container">
            <label htmlFor="email">Электронная почта</label>
          </div>
        </div>

        <div className="reg-log-container">
          <input
            autoComplete="off"
            name="password1"
            onChange={(e) => password1ChangeHandler(e)}
            type="password"
            className="reg-log-input"
            id="password1"
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

        <div className="reg-log-container">
          <input
            autoComplete="off"
            name="password2"
            onChange={(e) => password2ChangeHandler(e)}
            type="password"
            className="reg-log-input"
            id="password2"
          />
          <div className="label-forget-password-container">
            <label htmlFor="password2">Повторите пароль</label>
          </div>
        </div>
        {errors !== "" ? <h2 className="log-reg-error">{errors}</h2> : null}
        <h2 className="log-reg-h2">
          Если у вас есть аккаунт AI Study Chat,{" "}
          <a href="/login"> то войдите в него</a>
        </h2>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleRegister(username, email, password1, password2);
          }}
          className="submit-btn"
        >
          {loading ? (
            <p className="dots">
              {<Dots text={"Регистрация"} intervalTime={300} />}
            </p>
          ) : (
            "Зарегистрироваться"
          )}
        </button>
      </form>
    </div>
  );
}
