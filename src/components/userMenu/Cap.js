import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { userMenuContext } from '../Main'
import { chatMenuContext } from '../Main'


export default function Cap() {
    const [isUserMenuOpen] = useContext(userMenuContext)
    const [isChatMenuOpen] = useContext(chatMenuContext)

    const divVariants = {
        hidden: {
            display: 'none',
            opacity: 0,
            backgroundColor: 'var(--color2-dr-th)'
        },
        visible: {
            display: 'block',
            opacity: 0.6,
            backgroundColor: 'var(--backgr-color-dr-th)'
        }
    }

    return (
        <motion.div
            variants={divVariants}
            initial='hidden'
            animate={isChatMenuOpen || isUserMenuOpen ? 'visible' : 'hidden'}
            className='cap'>
        </motion.div>
    )
}
