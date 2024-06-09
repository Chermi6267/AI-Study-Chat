import React from "react";

export default function Camera({ file }) {
  return (
    <svg
      className="input-tool"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        style={file ? { fill: "var(--text-dr-th)" } : {}}
        d="M11 15C13.2091 15 15 13.2091 15 11C15 8.79086 13.2091 7 11 7C8.79086 7 7 8.79086 7 11C7 13.2091 8.79086 15 11 15Z"
        strokeWidth="2"
      />
      <path
        d="M21 11C21 15.714 21 18.0711 19.5355 19.5355C18.0711 21 15.714 21 11 21C6.28595 21 3.92893 21 2.46447 19.5355C1 18.0711 1 15.714 1 11C1 6.28595 1 3.92893 2.46447 2.46447C3.92893 1 6.28595 1 11 1C15.714 1 18.0711 1 19.5355 2.46447C20.5093 3.43821 20.8356 4.80655 20.9449 7"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
