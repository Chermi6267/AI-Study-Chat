import React, { useMemo } from "react";
import BotChatArrow from "../svg/BotChatArrow";
import Code from "./Code";
import Dots from "../Dots/Dots";

// AI assistant message component
export default function BotMessage({ element, setMessageScrollHeight }) {
  // Checking if message text contain code
  const isCodeCheck = (text) => {
    // List of keywords of programming languages
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
      if (text.trim().startsWith(keyword)) {
        return true;
      }
    }
    return false;
  };

  // Separating message text from code fragments
  const message = useMemo(() => {
    const result = [];
    if (element.text_for_user.indexOf("```") >= 0) {
      const textList = element.text_for_user.split("```");

      for (var y = 0; y < textList.length; y++) {
        if (isCodeCheck(textList[y])) {
          result.push({ result: textList[y], type: "code" });
        } else {
          // Replacing \n with <br> in HTML
          const textWithLineBreaks = textList[y].replace(/\n/g, "<br>");
          result.push({ result: textWithLineBreaks, type: "text" });
        }
      }
    } else {
      // Replacing \n with <br> in HTML
      const textWithLineBreaks = element.text_for_user.replace(/\n/g, "<br>");
      result.push({ result: textWithLineBreaks, type: "text" });
    }

    return result;
  }, [element.text_for_user]);

  // Creating a URL for an image
  const imgSrc =
    process.env.REACT_APP_API_URL + "/chat/images/" + element.img_path;

  return (
    <div className="bot-message-wrapper">
      <div className="bot-message-container">
        {element.type === "preloader" ? (
          <h1 style={{ width: "15vw" }}>
            {<Dots text="Думаю" intervalTime={300} />}
          </h1>
        ) : element.img_path === "" || element.img_path === undefined ? null : (
          <img
            style={{ width: "100%", borderRadius: 20, padding: "3% 0" }}
            src={imgSrc}
            alt={"Здесь должна быть красивая картинка"}
            onLoad={() => setMessageScrollHeight(element.id)}
          />
        )}
        {message.map((item, index) => (
          <div key={index} className="code-container">
            {item.type === "code" ? (
              <Code item={item.result} />
            ) : (
              // Compliance with HTML markup
              <h1 dangerouslySetInnerHTML={{ __html: item.result }} />
            )}
          </div>
        ))}
      </div>
      <BotChatArrow />
    </div>
  );
}
