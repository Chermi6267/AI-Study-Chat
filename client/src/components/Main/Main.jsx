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
import api from '../../http';
import { useAuth } from '../hooks/useAuth';
import GetStarted from '../regLog/GetStarted';



export default function Main() {
    const { isAuth } = useAuth()
    const inputRef = useRef();

    const [navBarIsRight, setNavBarIsRight] = useContext(OrintationContext)

    const [messageNavbarHeight, setMessageNavbarHeight] = useState(0)
    useEffect(() => {
        if (inputRef.current) {
            const resizeHandler = () => {
                setMessageNavbarHeight(window.innerHeight - inputRef.current.clientHeight)
            }
            window.addEventListener('resize', resizeHandler)
            resizeHandler()
            return () => {
                window.removeEventListener('resize', resizeHandler)
            }
        }
    }, [inputRef, isAuth])


    const messagesComponent = useMemo(() => <Messages />, []);
    const navigationMenuComponent = useMemo(() => (
        <NavigationMenu
            messageNavbarHeight={messageNavbarHeight}
            navBarOrintation={navBarIsRight}
            inputRef={inputRef}
            setNavBarIsRight={() => { setNavBarIsRight(!navBarIsRight) }}
        />
    ), [messageNavbarHeight, navBarIsRight, inputRef, setNavBarIsRight]);


    const test = () => {
        try {
            api.get('authentication/all_users')
                .then((res) => {
                    console.log('ХОЧУ ЮЗЕРОВ');
                    console.log(res.data.data[0])
                })
                .catch(error => {
                    window.location.href = '/login'
                })
        } catch (error) {
            window.location.href = '/login'
        }
    }


    if (!isAuth) {
        return (
            <UserMenuProvider>
                <ChatMenuProvider>
                    <GetStarted />
                </ChatMenuProvider>
            </UserMenuProvider>
        )
    }


    return (
        <UserMenuProvider>
            <ChatMenuProvider>
                <UserMenu />
                <ChatsMenu />
                <button style={{ position: 'absolute', zIndex: 100, width: "80px", height: '50px', backgroundColor: 'var(--color1-dr-th)', right: 0 }} onClick={test}>
                    testAPI
                </button>
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
