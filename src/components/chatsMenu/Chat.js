import React from 'react'
import { motion } from 'framer-motion'

export default function Chat({ element }) {
    return (
        <motion.li
            className='chat-container'>
            <h1>
                {element.title}
            </h1>
        </motion.li>
    )
}
