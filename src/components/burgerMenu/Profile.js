import React, { useEffect } from 'react'
import Ava from '../svg/Ava'
import UserInfo from './UserInfo'
import Settings from '../svg/Settings'
import Logout from '../svg/Logout'
import { motion } from 'framer-motion'

export default function Profile({ isActiveUser, setIsSetOpen, isActive, navBarOrintation, profileRef }) {
    const profInfo = {
        userName: 'Victor Chermi',
        userEmail: 'chermi6267@gmail.com'
    }
    var orintation = {
        flexDirection: "row-reverse"
    }
    if (navBarOrintation) {
        orintation.flexDirection = 'row'
    }

    useEffect(() => {
        if (isActiveUser) {
            profileRef.current.classList.add('for-user')
            setTimeout(() => {
                profileRef.current.classList.remove('for-user')
            }, 3000)
        }
    }, [isActiveUser, profileRef])

    let initial = { opacity: 0, translateY: "10px" }
    let animate = isActive ? { opacity: 1, translateY: "0" } : { opacity: 0, translateY: "10px" }
    let transition = { delay: 0.3 }

    return (
        <motion.div
            ref={profileRef}
            className='profile-wrapper'
            initial={initial}
            animate={animate}
            transition={transition}
            style={orintation}
        >
            <div className='info-container'>
                <Ava />
                <UserInfo profInfo={profInfo} />
            </div>
            <div className='profile-tools-container'>
                <Settings setIsSetOpen={setIsSetOpen} />
                <Logout />
            </div>
        </motion.div>
    )
}