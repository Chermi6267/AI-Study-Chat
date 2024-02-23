import React from 'react'
import Sun from '../svg/Sun'
import Moon from '../svg/Moon';
import { motion } from 'framer-motion'

export default function Settings({ chatBottom, navBarOrintation, setNavBarOrintation, setTheme, isDarkMode, isSetOpen }) {

    const onClickLev = !navBarOrintation ? setNavBarOrintation : undefined
    const onClickPrav = navBarOrintation ? setNavBarOrintation : undefined

    const activePrav = navBarOrintation ? 'active' : 'inactive'
    const activeLev = !navBarOrintation ? 'active' : 'inactive'

    const theme = isDarkMode ? <Sun setTheme={setTheme} /> : <Moon setTheme={setTheme} />
    const animate = isSetOpen ? { visibility: 'visible', opacity: 1, translateY: "0px" } : { visibility: 'hidden', opacity: 0, translateY: "10px" }

    const orintation = navBarOrintation ? { right: "3%" } : { left: "3%" }

    return (
        <motion.div
            style={{ bottom: chatBottom, ...orintation }}
            className='settings-wrapper'
            initial={{ visibility: 'hidden', opacity: 0, translateY: "10px" }}
            animate={animate}
            exit={{ visibility: 'hidden', opacity: 0, translateY: "10px" }}>
            <div className='settings-container'>
                <button className='delete-all'>
                    <p>Удалить все чаты</p>
                </button>
                <div className='orintation-theme'>
                    <button className='change-theme-btn' onClick={setTheme}>
                        {theme}
                    </button>
                    <div className='orintation-btns-container'>
                        <div className={activeLev + ' lev'}>
                            <button className='orintation-btn lev' onClick={onClickPrav}>
                                <p>Левша</p>
                            </button>
                        </div>
                        <div className={activePrav + ' prav'}>
                            <button className='orintation-btn prav' onClick={onClickLev}>
                                <p>Правша</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
