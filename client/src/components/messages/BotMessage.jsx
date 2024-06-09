import React, { useMemo, useState, useEffect } from "react";
import BotChatArrow from "../svg/BotChatArrow";
import Code from "./Code";

export default function BotMessage({ element, setMessageScrollHeight }) {
  const isCodeCheck = (stroka) => {
    const codeKeywords = [
      "html",
      "css",
      "scss",
      "less",
      "sass",
      "stylus",
      "bash",
      "shell",
      "powershell",
      "markdown",
      "c",
      "cpp",
      "objective-c",
      "python",
      "javascript",
      "typescript",
      "java",
      "kotlin",
      "swift",
      "php",
      "ruby",
      "perl",
      "go",
      "rust",
      "c#",
      "f#",
      "scala",
      "dart",
      "r",
      "html",
      "xml",
      "json",
      "yaml",
      "sql",
      "asm",
      "plaintext",
      "vue",
      "react",
      "angular",
      "django",
      "flask",
      "express",
      "spring",
      "laravel",
      "rails",
      "node.js",
      "deno",
      "tensorflow",
      "pytorch",
      "html",
      "css",
      "scss",
      "less",
      "bash",
      "shell",
      "powershell",
      "markdown",
      "c",
      "cpp",
      "objective-c",
      "groovy",
      "haskell",
      "lua",
      "matlab",
      "pascal",
      "prolog",
      "smalltalk",
      "ada",
      "cobol",
      "forth",
      "fortran",
      "lisp",
      "scheme",
      "elixir",
      "ocaml",
      "racket",
      "erlang",
      "elm",
      "julia",
      "haxe",
      "rust",
      "clojure",
      "perl6",
      "kotlin",
      "coffeescript",
      "graphql",
      "html",
      "css",
      "scss",
      "less",
      "bash",
      "shell",
      "powershell",
      "markdown",
      "c",
      "cpp",
      "objective-c",
    ];
    for (const keyword of codeKeywords) {
      if (stroka.trim().startsWith(keyword)) {
        return true;
      }
    }
    return false;
  };

  const otv = useMemo(() => {
    const result = [];
    if (element.text_for_user.indexOf("```") >= 0) {
      const textList = element.text_for_user.split("```");

      for (var y = 0; y < textList.length; y++) {
        if (isCodeCheck(textList[y])) {
          result.push({ result: textList[y], type: "code" });
        } else {
          const textWithLineBreaks = textList[y].replace(/\n/g, "<br>");
          result.push({ result: textWithLineBreaks, type: "text" });
        }
      }
    } else {
      const textWithLineBreaks = element.text_for_user.replace(/\n/g, "<br>");
      result.push({ result: textWithLineBreaks, type: "text" });
    }
    return result;
  }, [element.text_for_user]);

  const [dots, setDots] = useState(".");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        switch (prevDots) {
          case ".":
            return "..";
          case "..":
            return "...";
          case "...":
            return "....";
          case "....":
            return ".";
          default:
            return ".";
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, [dots]);

  const test =
    process.env.REACT_APP_API_URL + "/chat/images/" + element.img_path;

  return (
    <>
      <div className="bot-message-wrapper">
        <div className="bot-message-container">
          {element.type === "preloader" ? (
            <h1 style={{ width: "3.5vw" }}>{dots}</h1>
          ) : element.img_path === "" ||
            element.img_path === undefined ? null : (
            <img
              style={{ width: "100%", borderRadius: 20, padding: "3% 0" }}
              src={test}
              alt={element.img_path}
              onLoad={() => setMessageScrollHeight(element.id)}
            />
          )}
          {otv.map((item, index) => (
            <div key={index} className="code-container">
              {item.type === "code" ? (
                <Code item={item.result} />
              ) : (
                <h1 dangerouslySetInnerHTML={{ __html: item.result }} />
              )}
            </div>
          ))}
        </div>
        <BotChatArrow />
      </div>
    </>
  );
}
