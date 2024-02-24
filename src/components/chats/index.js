import React, { useContext, useRef } from 'react'
import { chatMenuContext } from '../Main'
import { useClickOutside } from '../hooks/useClickOutside'
import { OrintationContext } from '../providers/OrintationProvider'
import { motion } from 'framer-motion'
import Chat from './Chat'


export default function Chats() {
    const [isChatMenuOpen, setIsChatMenuOpen] = useContext(chatMenuContext)
    const [navBarIsRight] = useContext(OrintationContext)


    const chatsData = [
        { id: 0, title: 'Chat1' },
        { id: 1, title: 'Chat2' },
        { id: 2, title: 'Chat3' },
        { id: 3, title: 'Chat4' },
        { id: 4, title: 'Chat5' },
        { id: 5, title: 'Chat6' },
        { id: 6, title: 'Chat7' },
        { id: 7, title: 'Chat8' },
        { id: 8, title: 'Chat9' },
        { id: 9, title: 'Chat10' },
        { id: 10, title: 'Chat11' },
        { id: 11, title: 'Chat12' },
        { id: 12, title: 'Chat13' },
        { id: 13, title: 'Chat14' },
        { id: 14, title: 'Chat15' },
        { id: 15, title: 'Chat16' },
        { id: 16, title: 'Chat17' },
        { id: 17, title: 'Chat18' },
        { id: 18, title: 'Chat19' },
        { id: 19, title: 'Chat20' },
        { id: 20, title: 'Chat21' },
        { id: 21, title: 'Chat22' },
        { id: 22, title: 'Chat23' },
        { id: 23, title: 'Chat24' },
        { id: 24, title: 'Chat25' },
        { id: 25, title: 'Chat26' },
        { id: 26, title: 'Chat27' },
        { id: 27, title: 'Chat28' },
        { id: 28, title: 'Chat29' },
        { id: 29, title: 'Chat30' },
        { id: 30, title: 'Chat31' },
        { id: 31, title: 'Chat32' },
        { id: 32, title: 'Chat33' },
        { id: 33, title: 'Chat34' },
        { id: 34, title: 'Chat35' },
        { id: 35, title: 'Chat36' },
        { id: 36, title: 'Chat37' },
        { id: 37, title: 'Chat38' },
        { id: 38, title: 'Chat39' },
        { id: 39, title: 'Chat40' },
        { id: 40, title: 'Chat41' },
        { id: 41, title: 'Chat42' },
        { id: 42, title: 'Chat43' },
        { id: 43, title: 'Chat44' },
        { id: 44, title: 'Chat45' },
        { id: 45, title: 'Chat46' },
        { id: 46, title: 'Chat47' },
        { id: 47, title: 'Chat48' },
        { id: 48, title: 'Chat49' },
        { id: 49, title: 'Chat50' },
    ];


    const divVariants1 = {
        hidden: {
            transform: navBarIsRight ? 'translate(-500%, -75%)' : 'translate(500%, -75%)',
            opacity: 0

        },
        visible: {
            transform: 'translate(-50%, -75%)',
            opacity: 1
        },
    }

    const newChatVariants = {
        hidden: {
            translateY: -30,
            opasity: 0
        },
        visible: {
            translateY: 0,
            opasity: 1
        },
    }

    const chatMenuRef = useRef(null)
    useClickOutside(chatMenuRef, () => {
        if (isChatMenuOpen) {
            setTimeout(() => {
                setIsChatMenuOpen(false)
            }, 50)
        }
    })

    return (
        <motion.div
            ref={chatMenuRef}
            variants={divVariants1}
            initial='hidden'
            animate={isChatMenuOpen ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className='chats-wrapper'>
            <div className='chats-text-container'>
                <h1 className='chats-text'>
                    Ваши чаты<br></br>
                    AI Study Chat
                </h1>
            </div>
            <div className='chats-container'>
                {chatsData.map((element, index) => (
                    <Chat
                        key={element.id}
                        element={element} />
                ))}
            </div>
            <div className='new-chat-btn-container'>
                <motion.div
                    style={{ width: '80%' }}
                    initial='hidden'
                    variants={newChatVariants}
                    animate={isChatMenuOpen ? 'visible' : 'hidden'}
                    transition={{ delay: 0.35, type: 'just' }}>
                    <button className='new-chat-btn'>
                        Новый чат
                    </button>
                </motion.div>
            </div>
        </motion.div >
    )
}
