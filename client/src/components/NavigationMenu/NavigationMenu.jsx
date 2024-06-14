import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sun from "../svg/Sun";
import Moon from "../svg/Moon";
import Info from "../svg/Info";
import Chat from "../svg/Chat";
import Dots from "../svg/Dots";
import OrientationArrow from "../svg/OrientationArrow";
import User from "../svg/User";
import { ThemeContext } from "../providers/ThemeProvider";
import { OrientationContext } from "../providers/OrientationProvider";
import "./navBar.css";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Navigation component
export default function NavigationMenu({ parentRef }) {
  const [showAll, setShowAll] = useState(false);
  const [isDarkMode, setIsDarkMode] = useContext(ThemeContext);
  const [navBarIsRight, setNavBarIsRight] = useContext(OrientationContext);
  const dotsRef = useRef(null);
  const [navHeight, setNavHeight] = useState(
    "calc(clamp(20px, 6vw, 25px) + clamp(4px, 1vh, 7px) + clamp(4px, 1vh, 7px) + 0.5%)"
  );
  const [navBarY, setNavBarY] = useLocalStorage(
    "navBarY",
    window.innerHeight * 0.05
  );
  const navBarRef = useRef(null);

  // Navigation menu switch
  const toggleVisibility = () => {
    setShowAll(!showAll);
  };

  // Drag limiter for the navigation menu
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });

  // Setting restrictions for the navigation menu
  useEffect(() => {
    const updateConstraints = () => {
      if (parentRef.current && dotsRef.current) {
        setNavHeight(dotsRef.current.offsetHeight);
        setConstraints({
          top: dotsRef.current.offsetHeight / 3, // Reducing the border from above
          left: 0,
          bottom:
            parentRef.current.offsetHeight -
            dotsRef.current.offsetHeight * 6 -
            dotsRef.current.offsetHeight / 2, // Reducing the border from bellow
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    return () => window.removeEventListener("resize", updateConstraints);
  }, [parentRef]);

  // Setting the Y position for the navigation menu
  const updateY = (info, event) => {
    setNavBarY(Math.abs(navBarRef.current.getBoundingClientRect().y));
  };

  // Animation variant for navigation menu
  const divVariants = {
    hidden: {
      visibility: "hidden",
      height: 0,
      translateY: 5,
      translateX: navBarIsRight ? 5 : -5,
    },
    visible: {
      visibility: "visible",
      height: "auto",
      translateY: 0,
      translateX: 0,
    },
  };

  return (
    <motion.div
      ref={navBarRef}
      onDragEnd={updateY}
      className={
        "navigation-wrapper" + (navBarIsRight ? " right-side" : " left-side")
      }
      drag="y"
      style={{
        // Setting and checking Y position for navigation menu
        y:
          navBarY > constraints.bottom || navBarY > window.innerHeight
            ? constraints.bottom
            : navBarY,
      }}
      dragElastic={0.2}
      dragConstraints={constraints}
      initial={{ height: navHeight }}
      animate={
        showAll
          ? { height: navHeight * 6 + window.innerHeight * 0.02 }
          : { height: navHeight }
      }
      dragMomentum={false}
    >
      <AnimatePresence initial={false}>
        <motion.ul className="navigation-box">
          <Dots
            dotsRef={dotsRef}
            toggleVisibility={toggleVisibility}
            showAll={showAll}
          />

          <User showAll={showAll} divVariants={divVariants} />

          <OrientationArrow
            navBarOrientation={navBarIsRight}
            setNavBarIsRight={() => {
              setNavBarIsRight(!navBarIsRight);
            }}
            divVariants={divVariants}
            showAll={showAll}
          />

          {isDarkMode ? (
            <Sun
              divVariants={divVariants}
              setTheme={() => {
                setIsDarkMode(!isDarkMode);
              }}
              showAll={showAll}
            />
          ) : (
            <Moon
              divVariants={divVariants}
              setTheme={() => {
                setIsDarkMode(!isDarkMode);
              }}
              showAll={showAll}
            />
          )}

          {<Info divVariants={divVariants} showAll={showAll} />}

          {<Chat divVariants={divVariants} showAll={showAll} />}
        </motion.ul>
      </AnimatePresence>
    </motion.div>
  );
}
