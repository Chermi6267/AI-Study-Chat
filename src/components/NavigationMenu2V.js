import React, { useState, useRef, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sun from './svg/Sun';
import Moon from './svg/Moon';
import Info from './svg/Info';
import Chat from './svg/Chat';
import Dots from './svg/Dots';
import OrintationArrow from './svg/OrintationArrow';
import User from './svg/User'
import { ThemeContext } from './providers/ThemeProvider';
import { OrintationContext } from './providers/OrintationProvider';
import { userMenuContext } from './Main'


export default function NavigationMenu2V({ messageNavbarHeight }) {
    const [showAll, setShowAll] = useState(false);
    const toggleVisibility = () => {
        setShowAll(!showAll);
    };

    const [isDarkMode, setIsDarkMode] = useContext(ThemeContext)
    const [navBarIsRight, setNavBarIsRight] = useContext(OrintationContext)
    const [isUserMenuOpen] = useContext(userMenuContext)

    const dotsRef = useRef(null)
    const [navHeight, setNavHeight] = useState(48)
    useEffect(() => {
        const resizeHandler = () => {
            setNavHeight(dotsRef.current.clientHeight)
        }
        window.addEventListener('resize', resizeHandler)
        resizeHandler()
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [dotsRef])


    const [bottomConstraint, setBottomConstraint] = useState(0)
    const [navBarY, setNavBarY] = useState(parseInt(localStorage.getItem('navBarY')) || (window.innerHeight * 0.05))
    const navBarRef = useRef(null)

    useEffect(() => {
        setBottomConstraint(Math.abs(messageNavbarHeight - navHeight * 6))
    }, [messageNavbarHeight, navHeight])

    const updateY = (info, event) => {
        localStorage.setItem('navBarY', Math.abs(navBarRef.current.getBoundingClientRect().y))
        setNavBarY(Math.abs(navBarRef.current.getBoundingClientRect().y))
    }

    const divVariants = {
        hidden: {
            visibility: 'hidden',
            height: 0,
            translateY: 5,
            translateX: navBarIsRight ? 5 : -5
        },
        visible: {
            visibility: 'visible',
            height: 'auto',
            translateY: 0,
            translateX: 0
        }
    }

    const theme = isDarkMode
        ?
        <Sun divVariants={divVariants} setTheme={() => { setIsDarkMode(!isDarkMode) }} showAll={showAll} />
        :
        <Moon divVariants={divVariants} setTheme={() => { setIsDarkMode(!isDarkMode) }} showAll={showAll} />

    return (
        <motion.div
            ref={navBarRef}
            onDragEnd={updateY}
            className={'navigation-wrapper' + (navBarIsRight ? ' right-side' : ' left-side')}
            drag="y"
            style={{
                y: navBarY > bottomConstraint || navBarY > window.innerHeight ? bottomConstraint : navBarY,
                pointerEvents: isUserMenuOpen ? 'none' : 'auto'
            }}
            dragElastic={0.2}
            dragConstraints={{ top: (window.innerHeight * 0.05), bottom: bottomConstraint }}
            initial={{ height: navHeight }}
            animate={showAll ? { height: (navHeight * 6) } : { height: navHeight }}
            dragMomentum={false}>
            <AnimatePresence initial={false} >
                <motion.div className='navigationbox'>
                    <Dots
                        dotsRef={dotsRef}
                        toggleVisibility={toggleVisibility}
                        showAll={showAll} />
                    <User
                        showAll={showAll}
                        divVariants={divVariants} />
                    <OrintationArrow
                        navBarOrintation={navBarIsRight}
                        setNavBarIsRight={() => { setNavBarIsRight(!navBarIsRight) }}
                        divVariants={divVariants}
                        showAll={showAll} />
                    {theme}
                    {<Info
                        divVariants={divVariants}
                        showAll={showAll} />}
                    {<Chat
                        divVariants={divVariants}
                        showAll={showAll} />}
                </motion.div>
            </AnimatePresence >
        </motion.div >
    )
}
// var navBarYposition = parseFloat(/translateY\((-?\d+(\.\d+)?(px)?)\)/.exec(navBarRef.current.style.transform)?.[1], 10)