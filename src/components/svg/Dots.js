import React, { useState } from 'react'
import { motion } from "framer-motion"

export default function Dots({ toggleVisibility, showAll, dotsRef, divVariants }) {

    const [animate, setAnimate] = useState(false)

    const openNavBar = () => {
        setAnimate(!animate);
        toggleVisibility();
        setTimeout(() => {
            setAnimate(animate);
        }, 150)
    }

    const svgVariants = {
        hidden: {
            scale: 1,
        },
        visible: {
            scale: 1.2,
        }
    }

    const firstSecondThirdPathOnOpen = {
        hidden: {
            translateY: 0
        },
        visible: {
            translateY: 3
        }
    }

    const firstSecondThirdPathOnClose = {
        hidden: {
            translateY: 0
        },
        visible: {
            translateY: -3
        }
    }

    const firstSecondThirdPath = showAll ? firstSecondThirdPathOnOpen : firstSecondThirdPathOnClose

    const fourthPath = {
        hidden: {
            rotate: 0
        },
        visible: {
            rotate: -90
        }
    }
    return (
        <motion.div
            ref={dotsRef}
            variants={divVariants}
            initial='hidden'
            animate={showAll ? 'visible' : 'hidden'}
        >
            <motion.svg
                onClick={openNavBar}
                variants={svgVariants}
                initial='hidden'
                animate={animate ? 'visible' : 'hidden'}
                className='navigation-menu-tool' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <motion.path
                    variants={firstSecondThirdPath}
                    initial='hidden'
                    animate={animate ? 'visible' : 'hidden'}
                    d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z" />
                <motion.path
                    variants={firstSecondThirdPath}
                    initial='hidden'
                    animate={animate ? 'visible' : 'hidden'}
                    d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" />
                <motion.path
                    variants={firstSecondThirdPath}
                    initial='hidden'
                    animate={animate ? 'visible' : 'hidden'}
                    d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z" />
                <motion.path
                    variants={fourthPath}
                    initial="hidden"
                    animate={animate ? "visible" : "hidden"}
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
        </motion.div>
    )
}