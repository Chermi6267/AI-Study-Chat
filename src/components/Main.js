import React, { useRef, useState, useEffect, useMemo, useContext, createContext } from 'react'
import NavigationMenu2V from './NavigationMenu2V'
import UserMenu from './userMenu';
import Messages from './messages/Messages';
import Input from './Input'
import { OrintationContext } from './providers/OrintationProvider';
import Chats from './chats';


export const userMenuContext = createContext()
export const chatMenuContext = createContext()


export default function Main() {
    const inputRef = useRef();

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isChatMenuOpen, setIsChatMenuOpen] = useState(false)

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
        <NavigationMenu2V
            messageNavbarHeight={messageNavbarHeight}
            navBarOrintation={navBarIsRight}
            inputRef={inputRef}
            setNavBarIsRight={() => { setNavBarIsRight(!navBarIsRight) }}
        />
    ), [messageNavbarHeight, navBarIsRight, inputRef, setNavBarIsRight]);


    return (
        <userMenuContext.Provider value={[isUserMenuOpen, setIsUserMenuOpen]}>
            <chatMenuContext.Provider value={[isChatMenuOpen, setIsChatMenuOpen]}>
                <UserMenu />
                <Chats />
                <div className='main-page-container'>
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
            </chatMenuContext.Provider >
        </userMenuContext.Provider>
    )
}

// isActive={() => setIsActive(!isActive)}
// {/* {<BurgerMenu
//     isActive={isActive}
//     setIsActive={() => setIsActive(!isActive)}
//     isActiveUser={isActiveUser}
//     setIsActiveUser={() => setIsActiveUser(!isActiveUser)}
//     navBarOrintation={navBarIsRight}
//     setNavBarOrintation={() => setNavBarOrintation()}
//     isDarkMode={isDarkMode}
//     setTheme={() => setTheme()}
// />} */}
// const [isActive, setIsActive] = useState(false)