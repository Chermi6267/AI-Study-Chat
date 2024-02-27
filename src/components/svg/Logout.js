import React, { useState } from 'react'
import { motion } from 'framer-motion'


export default function Logout() {
    const [animate, setAnimate] = useState(false)

    const openSettings = () => {
        setAnimate(!animate);
        setTimeout(() => {
            setAnimate(animate);
            window.location.href = "/reg";
        }, 200)
    }

    const svgVariants = {
        hidden: {
            scale: 1,
        },
        visible: {
            scale: 1.2,
        }
    }

    const firstPath = {
        hidden: {
            translateX: 0
        },
        visible: {
            translateX: 20
        }
    }

    return (
        <motion.svg
            onClick={openSettings}
            variants={svgVariants}
            initial='hidden'
            animate={animate ? 'visible' : 'hidden'}
            className='navigation-menu-tool profile' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none">
            <motion.path
                variants={firstPath}
                initial="hidden"
                animate={animate ? "visible" : "hidden"}
                d="M8.5 11H21M21 11L17.25 7.25M21 11L17.25 14.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <motion.path
                d="M1 11C1 5.47715 5.47715 1 11 1M11 21C7.84202 21 5.02594 19.5361 3.19329 17.25" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
    )
}
