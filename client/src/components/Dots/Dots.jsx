import { useState, useEffect } from "react";

// Preloader dots component
function Dots({ text, intervalTime }) {
  const [dots, setDots] = useState(`${text}.`);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        switch (prevDots) {
          case `${text}.`:
            return `${text}..`;
          case `${text}..`:
            return `${text}...`;
          case `${text}...`:
            return `${text}....`;
          case `${text}....`:
            return `${text}.`;
          default:
            return `${text}.`;
        }
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [dots, intervalTime, text]);

  return dots;
}

export default Dots;
