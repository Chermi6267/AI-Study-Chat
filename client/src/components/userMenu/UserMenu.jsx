import React, { useContext, useRef } from 'react'
import { motion } from 'framer-motion'
import Ava from '../svg/Ava'
import { UserMenuContext } from '../providers/UserMenuProvider'
import { useClickOutside } from '../hooks/useClickOutside'
import Phone from '../svg/Phone'
import Email from '../svg/Email'
import './userMenu.css'
import { useAuth } from '../hooks/useAuth'
import AuthServices from '../../services/authServices'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../store/slices/userSlice'


export default function UserMenu() {
    const dispatch = useDispatch()
    const handleLogout = (username, password) => {
        AuthServices.logout(username, password)
            .then((response) => {
                dispatch(removeUser())
                console.log(`signed out`)
                localStorage.removeItem('token')
                // window.location.href = '/'
            })
            .catch(error => {
                console.log(error)
            })
    }

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
    const { isAuth, id, username, email } = useAuth()
    const profInfo = {
        userName: username,
        userEmail: email,
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
                        handleLogout()
                    }}>
                    <button className='user-menu-btn'
                        style={{ color: 'red' }}>
                        Выйти
                    </button>
                </motion.div>
            </div>
        </ motion.div >
    )
}
