import React from 'react'
import { motion } from 'framer-motion'

export default function NewChat({ isActive, newChatRef }) {
    return (
        <motion.div
            ref={newChatRef}
            className='new-chat-container'
            initial={{ opacity: 0, width: 0 }}
            animate={isActive ? { opacity: 1, width: "min(400px, 94.5%)" } : { opacity: 0, width: 0 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ delay: 0.1 }}></motion.div>
    )
}
