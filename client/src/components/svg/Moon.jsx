import React from "react";
import { motion } from "framer-motion";

export default function Moon({ setTheme, showAll, divVariants }) {
  return (
    <motion.div
      variants={divVariants}
      initial="hidden"
      animate={showAll ? "visible" : "hidden"}
    >
      <svg
        className="navigation-menu-tool"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 21"
        fill="none"
        onClick={setTheme}
      >
        <path
          d="M6.28125 20H13.7231"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.49219 17.1084H16.5154"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.695312 14.2169H19.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.8889 13.9274C17.7347 14.2933 17.8959 14.7194 18.2489 14.8793C18.602 15.0391 19.0133 14.8721 19.1676 14.5063L17.8889 13.9274ZM0.832391 14.5063C0.98666 14.8721 1.39795 15.0391 1.75104 14.8793C2.10412 14.7194 2.26529 14.2933 2.11102 13.9274L0.832391 14.5063ZM2.54607 5.90414C2.739 5.55856 2.62503 5.11634 2.29151 4.91643C1.95797 4.71652 1.53118 4.83461 1.33825 5.1802L2.54607 5.90414ZM4.9995 1.38662C4.66596 1.58653 4.55199 2.02874 4.74493 2.37433C4.93786 2.71991 5.36465 2.83801 5.69818 2.6381L4.9995 1.38662ZM13.2558 12.5301C10.3018 12.5301 7.90698 10.0488 7.90698 6.98795H6.51163C6.51163 10.8473 9.53107 13.9759 13.2558 13.9759V12.5301ZM17.8375 9.84964C16.8997 11.4576 15.1983 12.5301 13.2558 12.5301V13.9759C15.7069 13.9759 17.8518 12.6206 19.0318 10.5973L17.8375 9.84964ZM7.90698 6.98795C7.90698 4.97525 8.94205 3.21234 10.494 2.24065L9.77237 1.00323C7.81962 2.22583 6.51163 4.44828 6.51163 6.98795H7.90698ZM18.6047 10.3614C18.6047 11.6307 18.349 12.8363 17.8889 13.9274L19.1676 14.5063C19.7033 13.2361 20 11.8337 20 10.3614H18.6047ZM2.11102 13.9274C1.65093 12.8363 1.39535 11.6307 1.39535 10.3614H0C0 11.8337 0.296781 13.2361 0.832391 14.5063L2.11102 13.9274ZM10 1.44578C9.91768 1.44578 9.82112 1.40731 9.75107 1.33174C9.69172 1.26773 9.67795 1.20717 9.6747 1.18268C9.67079 1.15265 9.67274 1.06561 9.77237 1.00323L10.494 2.24065C10.962 1.94761 11.1126 1.41107 11.0575 0.989176C11.0004 0.550612 10.6666 0 10 0V1.44578ZM19.0318 10.5973C18.9715 10.7005 18.8875 10.7026 18.8586 10.6985C18.835 10.6951 18.7765 10.6809 18.7147 10.6194C18.6418 10.5468 18.6047 10.4467 18.6047 10.3614H20C20 9.67075 19.4686 9.32492 19.0453 9.26574C18.6381 9.20868 18.1203 9.36463 17.8375 9.84964L19.0318 10.5973ZM1.39535 10.3614C1.39535 8.73629 1.81435 7.21478 2.54607 5.90414L1.33825 5.1802C0.486986 6.70497 0 8.47538 0 10.3614H1.39535ZM5.69818 2.6381C6.9631 1.87993 8.43153 1.44578 10 1.44578V0C8.17972 0 6.47107 0.504588 4.9995 1.38662L5.69818 2.6381Z"
          fill="#71727C"
        />
        <path d="M17.3527 1.01899C17.203 0.624204 16.6657 0.624204 16.5161 1.01899L16.1157 2.07468C16.07 2.19521 15.9783 2.29062 15.8624 2.33816L14.8472 2.75452C14.4676 2.91022 14.4676 3.46893 14.8472 3.62463L15.8624 4.04099C15.9783 4.08853 16.07 4.18393 16.1157 4.30446L16.5161 5.36016C16.6657 5.75494 17.203 5.75494 17.3527 5.36017L17.7531 4.30446C17.7988 4.18393 17.8905 4.08853 18.0064 4.04099L19.0215 3.62463C19.4012 3.46893 19.4012 2.91022 19.0215 2.75452L18.0064 2.33816C17.8905 2.29062 17.7988 2.19521 17.7531 2.07468L17.3527 1.01899Z" />
        <path d="M13.7424 6.63104C13.5927 6.23627 13.0554 6.23627 12.9057 6.63104L12.7597 7.01596C12.7141 7.13649 12.6223 7.23189 12.5064 7.27943L12.1363 7.43124C11.7567 7.58694 11.7567 8.14565 12.1363 8.30135L12.5064 8.45314C12.6223 8.50066 12.7141 8.59608 12.7597 8.71666L12.9057 9.10153C13.0554 9.49632 13.5927 9.49632 13.7424 9.10153L13.8884 8.71666C13.9341 8.59608 14.0258 8.50066 14.1417 8.45314L14.5118 8.30135C14.8914 8.14565 14.8914 7.58694 14.5118 7.43124L14.1417 7.27943C14.0258 7.23189 13.9341 7.13649 13.8884 7.01596L13.7424 6.63104Z" />
      </svg>
    </motion.div>
  );
}
