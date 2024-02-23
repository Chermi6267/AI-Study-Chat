import React, { useContext, useRef } from 'react'
import { motion } from 'framer-motion'
import Ava from '../svg/Ava'
import UserInfo from '../burgerMenu/UserInfo'
import { userMenuContext } from '../Main'
import { useClickOutside } from '../hooks/useClickOutside'


export default function UserMenu() {

    const [isUserMenuOpen, setIsUserMenuOpen] = useContext(userMenuContext)

    const divVariants1 = {
        hidden: {
            transform: 'translate(-50%, -400%)',
            width: ['70%', '110%']
        },
        visible: {
            transform: 'translate(-50%, -75%)',
            width: ['110%', '70%']
        }
    }

    const userMenuRef = useRef(null)
    useClickOutside(userMenuRef, () => {
        if (isUserMenuOpen) {
            setTimeout(() => {
                setIsUserMenuOpen(false)
            }, 50)
        }
    })

    const profInfo = {
        userName: 'Victor Chermi',
        userEmail: 'chermi6267@gmail.com'
    }

    return (
        <motion.div
            ref={userMenuRef}
            className='user-menu-wrapper'
            variants={divVariants1}
            initial='hidden'
            animate={isUserMenuOpen ? 'visible' : 'hidden'}>
            <motion.div
                className='user-menu-container'>
                <div className='info-container'>
                    <Ava />
                    <UserInfo profInfo={profInfo} />
                </div>
                <button className='delete-all'>
                    <p>Выйти</p>
                </button>
            </motion.div>
        </ motion.div >
    )
}
