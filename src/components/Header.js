import React from 'react'
import Logo from './svg/Logo'
import { motion } from 'framer-motion'

export default function Header({ isActive, target }) {
    const className = "header " + target
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, columnGap: 0 }}
            animate={isActive ? { opacity: 1, columnGap: "20px" } : { opacity: 0, columnGap: 0 }}
            exit={{ opacity: 0, columnGap: 0 }}
            transition={{ delay: 0.1 }}>
            <Logo />
            <h1 className='logo-text'>AI Study Chat</h1>
        </motion.div>
    )
}
