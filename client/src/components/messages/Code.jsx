import React, { useContext } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  duotoneDark,
  duotoneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { ThemeContext } from "../providers/ThemeProvider";

// Code fragments component
export default function Code({ item }) {
  const [isDarkMode] = useContext(ThemeContext);

  // Special check for c++
  var lang = item.split("\n")[0].toLowerCase();
  if (lang === "c++") {
    lang = "cpp";
  }

  return (
    <SyntaxHighlighter
      language={lang}
      // There are a lot of different themes in react syntax highlighter for code
      style={isDarkMode ? duotoneDark : duotoneLight}
    >
      {item.substring(lang.length + 1)}
    </SyntaxHighlighter>
  );
}
