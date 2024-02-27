import React, { useRef, useState, useEffect, useMemo, useContext } from 'react'
import NavigationMenu from '../NavigationMenu/NavigationMenu'
import UserMenu from '../userMenu/UserMenu';
import Messages from '../messages/Messages';
import Input from '../Input/Input';
import { OrintationContext } from '../providers/OrintationProvider';
import { UserMenuProvider } from '../providers/UserMenuProvider';
import { ChatMenuProvider } from '../providers/ChatMenuProvider';
import ChatsMenu from '../chatsMenu/ChatsMenu';
import Cap from '../Cap/Cap';
import './main.css'


export default function Main() {
    const inputRef = useRef();


    const [navBarIsRight, setNavBarIsRight] = useContext(OrintationContext)


    const [messageNavbarHeight, setMessageNavbarHeight] = useState(0)
    useEffect(() => {
        const resizeHandler = () => {
            setMessageNavbarHeight(window.innerHeight - inputRef.current.clientHeight)
        }
        window.addEventListener('resize', resizeHandler)
        resizeHandler()
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [inputRef])


    const messagesComponent = useMemo(() => <Messages />, []);
    const navigationMenuComponent = useMemo(() => (
        <NavigationMenu
            messageNavbarHeight={messageNavbarHeight}
            navBarOrintation={navBarIsRight}
            inputRef={inputRef}
            setNavBarIsRight={() => { setNavBarIsRight(!navBarIsRight) }}
        />
    ), [messageNavbarHeight, navBarIsRight, inputRef, setNavBarIsRight]);

    return (
        <UserMenuProvider>
            <ChatMenuProvider>
                <UserMenu />
                <ChatsMenu />
                <div className='main-page-container'>
                    <Cap />
                    <div className='message-navbar'
                        style={{
                            flexDirection: navBarIsRight ? 'row' : 'row-reverse',
                            height: messageNavbarHeight
                        }}>
                        {messagesComponent}
                        {navigationMenuComponent}
                    </div>
                    {<Input inputRef={inputRef} />}
                </div>
            </ChatMenuProvider>
        </UserMenuProvider>
    )
}
