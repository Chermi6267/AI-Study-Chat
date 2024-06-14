import React, { useContext, useRef } from "react";
import logo_dr_th from "./img/logo.png";
import logo_lg_th from "./img/logo_lg_th.png";
import Me from "./img/meTheGreatest.jpg";
import rainbowMan from "./img/rainbowMan.jpg";
import potential from "./img/potentialAbstraction.jpeg";
import { SiMysql } from "react-icons/si";
import { IoLogoReact } from "react-icons/io5";
import { IoLogoJavascript } from "react-icons/io5";
import { SiExpress } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { PiFileHtmlFill } from "react-icons/pi";
import { PiFileCssFill } from "react-icons/pi";
import Sber from "../svg/Sber";
import "./about.css";
import { ThemeContext } from "../providers/ThemeProvider";
import { useNavigate } from "react-router-dom";
import Sun from "../svg/Sun";
import Moon from "../svg/Moon";
import { motion, useInView } from "framer-motion";

// About page component
export default function About() {
  const [isDarkMode, setIsDarkMode] = useContext(ThemeContext);

  // Redirect processing to the main page
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/");
  };

  // Animation processing during scrolling
  const logoRef = useRef(null);
  const isLogoInView = useInView(logoRef, {
    once: true,
    amount: 0.2,
  });

  const opportunitiesRef = useRef(null);
  const isOpportunitiesInView = useInView(opportunitiesRef, {
    once: true,
    amount: 0.2,
  });

  const stackRef = useRef(null);
  const isStackInView = useInView(stackRef, {
    once: true,
    amount: 0.2,
  });

  const AIStudyChatRef = useRef(null);
  const isAIStudyChatInView = useInView(AIStudyChatRef, {
    once: true,
    amount: 0.2,
  });

  const meRef = useRef(null);
  const isMeInView = useInView(meRef, {
    once: true,
    amount: 0.2,
  });

  // Animation variant for the info element leaving on the left
  const leftVariants = {
    hidden: {
      opacity: 0,
      x: "90%",
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  // Animation variant for the info element leaving on the right
  const rightVariants = {
    hidden: {
      opacity: 0,
      x: "-90%",
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  // Animation variant for theme toggle
  const divVariants = {
    hidden: {
      visibility: "hidden",
      height: 0,
      translateY: 5,
      translateX: 5,
    },
    visible: {
      visibility: "visible",
      height: "auto",
      translateY: 0,
      translateX: 0,
    },
  };

  return (
    <div className="about-cont">
      <ul
        className="about-theme-toggle"
        onClick={() => {
          setIsDarkMode(!isDarkMode);
        }}
      >
        {isDarkMode ? (
          <Sun divVariants={divVariants} showAll={true} />
        ) : (
          <Moon divVariants={divVariants} showAll={true} />
        )}
      </ul>

      <motion.h1
        initial="hidden"
        animate={isLogoInView ? "animate" : "hidden"}
        variants={{
          hidden: {
            opacity: 0,
            scale: 0,
          },
          animate: {
            opacity: 1,
            scale: 1,
          },
        }}
        ref={logoRef}
        className="about-title"
      >
        AI Study Chat
      </motion.h1>

      <motion.div
        initial="hidden"
        animate={isLogoInView ? "animate" : "hidden"}
        variants={{
          hidden: {
            opacity: 0,
            scale: 0,
          },
          animate: {
            opacity: 1,
            scale: 1,
          },
        }}
        ref={logoRef}
        className="about-img-cont"
        onClick={() => {
          redirect();
        }}
      >
        <img
          className="about-img"
          src={isDarkMode ? logo_dr_th : logo_lg_th}
          alt="logo"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isOpportunitiesInView ? "animate" : "hidden"}
        variants={rightVariants}
        ref={opportunitiesRef}
        className="about-data-cont"
      >
        <div className="about-gradient-line" />
        <h1 className="about-data-title">Возможности</h1>

        <div className="about-data-img-cont">
          <img className="about-data-img" src={potential} alt="IMG" />
        </div>

        <div className="about-data-text">
          <p>
            В чате вы взаимодействуете с нейросетью GigaChat от Сбера. Вы также
            можете отправлять изображения с текстом, который будет распознан, и
            нейросеть предоставит вам ответ
          </p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isStackInView ? "animate" : "hidden"}
        variants={leftVariants}
        ref={stackRef}
        className="about-stack-cont"
      >
        <div className="about-gradient-line" />
        <h1 className="about-stack-title">Использованные технологии</h1>
        <div className="stack">
          <IoLogoReact className="about-icon" />
          <IoLogoJavascript className="about-icon" />
          <SiExpress className="about-icon" />
          <SiMysql className="about-icon" />
          <TbBrandFramerMotion className="about-icon framer" />
          <PiFileHtmlFill className="about-icon" />
          <PiFileCssFill className="about-icon" />
          <Sber />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isAIStudyChatInView ? "animate" : "hidden"}
        variants={rightVariants}
        ref={AIStudyChatRef}
        className="about-data-cont reverse"
      >
        <div className="about-gradient-line" />
        <h1 className="about-data-title reverse">AI Study Chat</h1>

        <div className="about-data-img-cont reverse">
          <img className="about-data-img reverse" src={rainbowMan} alt="IMG" />
        </div>

        <div className="about-data-text reverse">
          <p>
            AI Study Chat — это pet-проект, который я создал для улучшения своих
            навыков программирования на JavaScript
          </p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isMeInView ? "animate" : "hidden"}
        variants={leftVariants}
        ref={meRef}
        className="about-author-cont"
      >
        <div className="about-gradient-line" />
        <h1 className="about-author-title">Автор</h1>
        <div className="author-ava-cont">
          <img className="author-ava" src={Me} alt="IMG" />
        </div>
        <ul className="author-data-cont">
          <li className="author-data">
            Привет! Я Черников Виктор, мне 16 лет. Я разработчик с двухлетним
            опытом. За это время я развил навыки в разработке на Python и
            JavaScript, а также изучил CSS, HTML и SQL. Кроме того, владею
            английским языком. В своей работе я стремлюсь к качественному коду и
            эффективным решениям задач
          </li>
        </ul>
      </motion.div>

      <button
        onClick={() => {
          redirect();
        }}
        className="about-btn"
      >
        AI Study Chat
      </button>

      <footer className="about-footer">
        05.06.2024<br></br>
        &copy; AI Study Chat<br></br>
        <a href="https://t.me/chermi6267">@chermi6267</a>
      </footer>
    </div>
  );
}
