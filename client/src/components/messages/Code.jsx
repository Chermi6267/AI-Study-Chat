import React, { useContext } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  duotoneDark,
  duotoneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { ThemeContext } from "../providers/ThemeProvider";

export default function Code({ item }) {
  const [isDarkMode] = useContext(ThemeContext);

  var lang = item.split("\n")[0].toLowerCase();
  if (lang === "c++") {
    lang = "cpp";
  }
  return (
    <SyntaxHighlighter
      language={lang}
      style={isDarkMode ? duotoneDark : duotoneLight}
    >
      {item.substring(lang.length + 1)}
    </SyntaxHighlighter>
  );
}
