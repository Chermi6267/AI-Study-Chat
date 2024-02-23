import React from 'react'
import { motion } from 'framer-motion'

export default function Chat({ element, isActive, setIsActive, setIsActiveUser, isActiveUser, needAnimate }) {
    const openChat = () => {
        if (isActiveUser) {
            setIsActiveUser();
        }
        setIsActive();
    }
    let initial = { opacity: 0, width: 0 }
    let animate = isActive ? { opacity: 1, width: "min(340px, 80.325%)" } : { opacity: 0, width: 0 }
    let transition = { delay: 0.1 }

    if (!needAnimate) {
        initial = { opacity: 1, width: "min(340px, 80.325%)" }
        animate = {}
        transition = {}
    }

    return (
        <motion.li
            className='chat-container'
            initial={initial}
            animate={animate}
            transition={transition}
            exit={{ opacity: 0, width: 0 }}
            onClick={openChat}>
            <h1>
                {element.title}
            </h1>
        </motion.li>
    )
}
