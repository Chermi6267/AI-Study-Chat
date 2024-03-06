import React, { useState } from 'react'
import { motion } from "framer-motion"


export default function Info({ showAll, divVariants }) {

    const [animate, setAnimate] = useState(false)

    const openInfo = () => {
        setAnimate(!animate);
        setTimeout(() => {
            setAnimate(animate);
            window.location.href = "/about";
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

    const secondPath = {
        hidden: {
            translateY: 0
        },
        visible: {
            translateY: -3
        }
    }

    const thirdPath = {
        hidden: {
            rotate: 0
        },
        visible: {
            rotate: -90
        }
    }

    return (
        <motion.div
            variants={divVariants}
            initial='hidden'
            animate={showAll ? 'visible' : 'hidden'}
        >
            <motion.svg
                onClick={openInfo}
                variants={svgVariants}
                initial="hidden"
                animate={animate ? "visible" : "hidden"}
                className='navigation-menu-tool' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none">
                <motion.path
                    d="M11 10L10.9965 16" strokeWidth="2" strokeLinecap="round" />
                <motion.path
                    variants={secondPath}
                    initial="hidden"
                    animate={animate ? "visible" : "hidden"}
                    d="M10.9988 8C11.5511 8.00031 11.9991 7.55286 11.9994 7.00057C11.9997 6.44829 11.5523 6.00031 11 6C10.4477 5.99968 9.99974 6.44714 9.99942 6.99942C9.99911 7.5517 10.4466 7.99968 10.9988 8Z" fill="white" />
                <motion.path
                    variants={thirdPath}
                    initial="hidden"
                    animate={animate ? "visible" : "hidden"}
                    d="M6 2.33782C7.47087 1.48697 9.1786 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 9.1786 1.48697 7.47087 2.33782 6" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
        </motion.div>
    )
}
