import React, { useContext, useRef } from 'react'
import { motion } from 'framer-motion'
import Ava from '../svg/Ava'
import { UserMenuContext } from '../providers/UserMenuProvider'
import { useClickOutside } from '../hooks/useClickOutside'
import Phone from '../svg/Phone'
import Email from '../svg/Email'
import './userMenu.css'


export default function UserMenu() {

    const [isUserMenuOpen, setIsUserMenuOpen] = useContext(UserMenuContext)

    const divVariants1 = {
        hidden: {
            transform: 'translate(-50%, -400%)',
        },
        visible: {
            transform: 'translate(-50%, -75%)',
        },
    }

    const userMenuRef = useRef(null)
    useClickOutside(userMenuRef, () => {
        if (isUserMenuOpen) {
            setTimeout(() => {
                setIsUserMenuOpen(false)
            }, 50)
        }
    })

    const newChatVariants = {
        hidden: {
            translateY: -30,
            opasity: 0
        },
        visible: {
            translateY: 1,
            opasity: 1
        },
    }

    const profInfo = {
        userName: 'Victor Chermi',
        userEmail: 'chermi6267@gmail.com',
        userPhone: '+79991730587'
    }

    return (
        <motion.div
            ref={userMenuRef}
            className='user-menu-wrapper'
            variants={divVariants1}
            initial='hidden'
            animate={isUserMenuOpen ? 'visible' : 'hidden'}>
            <motion.div className='user-menu-container'>
                <div className='ava-username-container'>
                    <Ava />
                    <p>{profInfo.userName}</p>
                </div>
                <div className='info-container'>
                    <Email />
                    <div style={{ maxWidth: 'calc(100% - 1.3em)' }}>
                        <h2>{profInfo.userEmail}</h2>
                        <p>Изменить email</p>
                    </div>
                </div>
                <div className='info-container'>
                    <Phone />
                    <div style={{ maxWidth: 'calc(100% - 1.3em)' }}>
                        <h2>{profInfo.userPhone}</h2>
                        <p>Изменить номер</p>
                    </div>
                </div>
            </motion.div>
            <div className='user-menu-btn-container'>
                <motion.div
                    style={{ width: '80%' }}
                    initial='hidden'
                    variants={newChatVariants}
                    animate={isUserMenuOpen ? 'visible' : 'hidden'}
                    transition={{ delay: 0.15, type: 'just' }}
                    onClick={() => {
                        window.location.href = '/reg'
                    }}>
                    <button className='user-menu-btn'
                        style={{ color: 'red' }}>
                        Выйти(reg/log)
                    </button>
                </motion.div>
            </div>
        </ motion.div >
    )
}
