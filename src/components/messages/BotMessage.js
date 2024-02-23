import React, { useMemo } from 'react'
import BotChatArrow from '../svg/BotChatArrow'
import Code from './Code'


export default function BotMessage({ element }) {
    const isCodeCheck = (stroka) => {
        const codeKeywords = ["html", "css", "scss", "less", "sass", "stylus", "bash", "shell",
            "powershell", "markdown", "c", "cpp", "objective-c", "python", "javascript", "typescript",
            "java", "kotlin", "swift", "php", "ruby", "perl", "go", "rust",
            "c#", "f#", "scala", "dart", "r", "html", "xml", "json",
            "yaml", "sql", "asm", "plaintext", "vue", "react", "angular", "django",
            "flask", "express", "spring", "laravel", "rails", "node.js", "deno", "tensorflow",
            "pytorch", "html", "css", "scss", "less", "bash", "shell", "powershell",
            "markdown", "c", "cpp", "objective-c", "groovy", "haskell", "lua", "matlab",
            "pascal", "prolog", "smalltalk", "ada", "cobol", "forth", "fortran", "lisp",
            "scheme", "elixir", "ocaml", "racket", "erlang", "elm", "julia", "haxe",
            "rust", "clojure", "perl6", "kotlin", "coffeescript", "graphql", "html",
            "css", "scss", "less", "bash", "shell", "powershell", "markdown", "c", "cpp", "objective-c"];
        for (const keyword of codeKeywords) {
            if (stroka.trim().startsWith(keyword)) {
                return true;
            }
        }
        return false;
    };

    const otv = useMemo(() => {
        const result = [];

        if (element.text.indexOf('```') >= 0) {
            const textList = element.text.split('```');
            for (var y = 0; y < textList.length; y++) {
                if (isCodeCheck(textList[y])) {
                    result.push({ 'result': textList[y], 'type': 'code' });
                } else {
                    result.push({ 'result': textList[y], 'type': 'text' });
                }
            }
        } else {
            result.push({ 'result': element.text, 'type': 'text' });
        }
        return result;
    }, [element.text]);


    return (
        <div className='bot-message-wrapper'>
            <div className='bot-message-container'>
                {otv.map((item, index) => (
                    <div key={index} className='code-container'>
                        {item.type === 'code'
                            ?
                            <Code item={item.result} />
                            :
                            <h1>{item.result}</h1>
                        }
                    </div>
                ))}
            </div>
            <BotChatArrow />
        </div>
    )
}
