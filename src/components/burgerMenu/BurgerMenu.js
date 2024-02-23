import React, { useEffect, useState, useRef } from 'react'
import Header from '../Header'
import NewChat from './NewChat'
import Profile from './Profile'
import Chats from './Chats'
import Settings from './Settings'
import { motion } from 'framer-motion'


export default function BurgerMenu({ isActive, setIsActive, isActiveUser, setIsActiveUser, navBarOrintation, setNavBarOrintation, setTheme, isDarkMode }) {

    useEffect(() => {
        let startTouchX = 0
        let endTouchX = 0
        let startTouchY = 0
        let endTouchY = 0

        const handleTouchStart = (event) => {
            startTouchX = event.changedTouches[0].pageX
            startTouchY = event.changedTouches[0].pageY
        }

        const handleTouchEnd = (event) => {
            endTouchX = event.changedTouches[0].pageX
            endTouchY = event.changedTouches[0].pageY
            if (((startTouchX - endTouchX) > 60) && (Math.abs(endTouchY - startTouchY) < 50) && isActive) {
                if (isActiveUser) {
                    setIsActiveUser(!isActiveUser)
                }
                setIsActive(!isActive)
            }
        }

        document.addEventListener('touchstart', handleTouchStart)
        document.addEventListener('touchend', handleTouchEnd)

        return () => {
            document.removeEventListener('touchstart', handleTouchStart)
            document.removeEventListener('touchend', handleTouchEnd)
        }
    }, [isActive, isActiveUser, setIsActive, setIsActiveUser])


    const [isSetOpen, setIsSetOpen] = useState(false)

    const [chatBottom, setChatBottom] = useState(0)
    const chatRef = useRef(null)
    const newChatRef = useRef(null)
    const profileRef = useRef(null)

    useEffect(() => {
        if (!isActive) {
            if (isSetOpen) {
                setIsSetOpen(!isSetOpen)
            }
        }
    }, [isActive, isSetOpen])

    // useEffect(() => {
    //     const resizeH = () => {
    //         const chatBottom = chatRef.current
    //         if (chatBottom) {
    //             if (chatBottom.getBoundingClientRect().bottom > window.innerHeight) {
    //                 const otv = (chatBottom ? (window.innerHeight - chatBottom.getBoundingClientRect().bottom) : 0)
    //                 setChatBottom(otv + otv * 0.04)
    //             }
    //             const otv = (chatBottom ? (window.innerHeight - chatBottom.getBoundingClientRect().bottom) : 0)
    //             setChatBottom(otv + otv * 0.04)
    //         }
    //     }
    //     window.addEventListener('orientationchange', resizeH);
    //     resizeH();
    //     return () => {
    //         window.removeEventListener('orientationchange', resizeH);
    //     }
    // }, [chatBottom])

    return (
        <motion.div
            className='burger-wrapper'
            initial={{ left: "-100%" }}
            animate={isActive ? { left: "0" } : { left: "-100%" }}
            exit={{ left: "-100%" }}>
            <motion.div
                className='burger-container'>
                <div className='header-container'>
                    <Header isActive={isActive} target={'for burger'} />
                </div>
                <NewChat newChatRef={newChatRef} isActive={isActive} />
                <div className='chat-profile-container'>
                    <Chats newChatRef={newChatRef} profileRef={profileRef} chatRef={chatRef} isActive={isActive} setIsActive={setIsActive} setIsActiveUser={setIsActiveUser} isActiveUser={isActiveUser} />
                    <Profile profileRef={profileRef} navBarOrintation={navBarOrintation} isActive={isActive} setIsSetOpen={() => { setIsSetOpen(!isSetOpen) }} isActiveUser={isActiveUser} />
                    <Settings chatBottom={chatBottom} isSetOpen={isSetOpen} isDarkMode={isDarkMode} setTheme={setTheme} navBarOrintation={navBarOrintation} setNavBarOrintation={setNavBarOrintation} />
                </div>
            </motion.div>
        </motion.div >
    )
}
