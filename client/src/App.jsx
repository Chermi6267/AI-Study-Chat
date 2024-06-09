import React, { useEffect, useState, useContext } from "react";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/regLog/Registration";
import Login from "./components/regLog/Login";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import axios from "axios";
import Preloader from "./components/preLoader/Preloader";
import { ThemeContext } from "./components/providers/ThemeProvider";

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isDarkMode] = useContext(ThemeContext);

  const favicon = document.getElementById("favicon");
  useEffect(() => {
    if (isDarkMode) {
      favicon.href = "./logo/logo.png";
    } else {
      favicon.href = "./logo/logo_lg_th.png";
    }
  }, [isDarkMode, favicon]);

  useEffect(() => {
    if (!!localStorage.getItem("token")) {
      axios
        .post(
          process.env.REACT_APP_API_URL + "/authentication/refreshToken",
          undefined,
          { withCredentials: true }
        )
        .then((response) => {
          localStorage.setItem("token", response.data["accessToken"]);
          dispatch(
            setUser({
              id: response.data["id"],
              username: response.data["username"],
              email: response.data["email"],
              token: response.data["accessToken"],
              phone: response.data["phone"],
            })
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <div className="root-bg">
      <Router>
        <Routes>
          <Route exact path="/" element={loading ? <Preloader /> : <Main />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/reg" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}
