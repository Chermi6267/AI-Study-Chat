import { React, useEffect, useState } from 'react'
import Chat from './Chat'

export default function Chats({ isActive, setIsActive, isActiveUser, setIsActiveUser, chatRef, profileRef, newChatRef }) {
    const [newChatBottom, setNewChatBottom] = useState(0)
    const [profH, setProfH] = useState(0)
    const [profRG, setProfRG] = useState(0)
    const [chatWrH, setChatWrH] = useState(0)
    const [animatingChats, setAnimatingChats] = useState(0)

    const chatsData = [
        { id: 0, title: 'Chat1' },
        { id: 1, title: 'Chat2' },
        { id: 2, title: 'Chat3' },
        { id: 3, title: 'Chat4' },
        { id: 4, title: 'Chat5' },
        { id: 5, title: 'Chat6' },
        { id: 6, title: 'Chat7' },
        { id: 7, title: 'Chat8' },
        { id: 8, title: 'Chat9' },
        { id: 9, title: 'Chat10' },
        { id: 10, title: 'Chat11' },
        { id: 11, title: 'Chat12' },
        { id: 12, title: 'Chat13' },
        { id: 13, title: 'Chat14' },
        { id: 14, title: 'Chat15' },
        { id: 15, title: 'Chat16' },
        { id: 16, title: 'Chat17' },
        { id: 17, title: 'Chat18' },
        { id: 18, title: 'Chat19' },
        { id: 19, title: 'Chat20' },
        { id: 20, title: 'Chat21' },
        { id: 21, title: 'Chat22' },
        { id: 22, title: 'Chat23' },
        { id: 23, title: 'Chat24' },
        { id: 24, title: 'Chat25' },
        { id: 25, title: 'Chat26' },
        { id: 26, title: 'Chat27' },
        { id: 27, title: 'Chat28' },
        { id: 28, title: 'Chat29' },
        { id: 29, title: 'Chat30' },
        { id: 30, title: 'Chat31' },
        { id: 31, title: 'Chat32' },
        { id: 32, title: 'Chat33' },
        { id: 33, title: 'Chat34' },
        { id: 34, title: 'Chat35' },
        { id: 35, title: 'Chat36' },
        { id: 36, title: 'Chat37' },
        { id: 37, title: 'Chat38' },
        { id: 38, title: 'Chat39' },
        { id: 39, title: 'Chat40' },
        { id: 40, title: 'Chat41' },
        { id: 41, title: 'Chat42' },
        { id: 42, title: 'Chat43' },
        { id: 43, title: 'Chat44' },
        { id: 44, title: 'Chat45' },
        { id: 45, title: 'Chat46' },
        { id: 46, title: 'Chat47' },
        { id: 47, title: 'Chat48' },
        { id: 48, title: 'Chat49' },
        { id: 49, title: 'Chat50' },
    ];

    // useEffect(() => {
    //     const resizeHandler = () => {
    //         const prof = profileRef.current
    //         const newChat = newChatRef.current
    //         const chats = chatRef.current
    //         if (newChat && prof) {
    //             const newChatMarign = parseFloat(getComputedStyle(newChat).marginBottom)
    //             setNewChatBottom((newChat.getBoundingClientRect().bottom + newChatMarign) || 0);
    //             const profHeight = parseFloat(window.getComputedStyle(prof).height)
    //             const profPadding = parseFloat(getComputedStyle(prof).paddingTop) * 2
    //             setProfRG(parseFloat(getComputedStyle(chats).rowGap))
    //             setProfH(profHeight + profPadding)
    //             setChatWrH((35 * chatsData.length) + (profRG * (chatsData.length - 1)) <
    //                 (window.innerHeight - newChatBottom - profH) ?
    //                 (35 * chatsData.length) + (profRG * (chatsData.length - 1)) :
    //                 (window.innerHeight - newChatBottom - profH));

    //             setAnimatingChats(Math.ceil((chatWrH / (35 + profRG))));
    //         }
    //     };

    //     window.addEventListener("resize", resizeHandler);
    //     resizeHandler();
    //     return () => {
    //         window.removeEventListener("resize", resizeHandler);
    //     };
    // }, [newChatBottom, chatWrH, profH, profRG, chatsData.length, chatRef, newChatRef, profileRef]);

    return (
        <ul className='chat-wrapper' ref={chatRef}>
            {chatsData.map((element, index) => (
                <Chat
                    key={element.id}
                    element={element}
                    needAnimate={index < 5}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    setIsActiveUser={setIsActiveUser}
                    isActiveUser={isActiveUser} />
            ))}
        </ul>
    )
}
