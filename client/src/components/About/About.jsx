import React, { useState } from 'react'
import { FaReact } from "react-icons/fa";
import { IoLogoHtml5 } from "react-icons/io5";
import { IoLogoCss3 } from "react-icons/io5";
import { FaNode } from "react-icons/fa6";
import Sber from '../svg/Sber';
import { motion } from 'framer-motion'
import { GiBackForth } from "react-icons/gi";
import { FaRegSmileWink } from "react-icons/fa";
import './about.css'


export default function About(target) {
    const [showMe, setShowMe] = useState(false)
    const [dragMe, setDragMe] = useState(false)

    const dragEvent = (e, info) => {
        setDragMe(!dragMe)
    }

    return (
        <div>
            <motion.div
                style={{ position: 'absolute', x: window.innerWidth - 70, y: 30 }}
                drag={true}

                dragConstraints={{ top: 3, left: 3, right: window.innerWidth - 46, bottom: window.innerHeight - 46 }}
                onDragStart={dragEvent}
                onDragEnd={dragEvent}>
                <button
                    type='button'
                    onClick={() => { window.location.href = "/"; }}
                    className='submit-btn about-btn'>
                    {dragMe ? <FaRegSmileWink /> : <GiBackForth />}
                </button>
            </motion.div>
            <motion.div
                className='about-me-container'
                initial={{ opacity: 0 }}
                animate={showMe ? { opacity: 1 } : { opacity: 0 }}>
                <img onLoad={() => setShowMe(!showMe)} className='this-is-me' src={'/img/meTheGreatest.jpg'} alt='This is me' />
                <h1 className='this-is-me-text'>
                    Автор:<br></br>
                    Черников Виктор<br></br>
                    Класс: 10A
                </h1>
            </motion.div>
            <div className='about'>
                <div className='about-text'>
                    <h1>O проекте</h1>
                    <motion.h2
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{ overflow: 'hidden' }}>
                        AI Study Chat был создан с целью помощи школьникам и студентам
                        в выполнении домашних, тестовых и контрольных работ. Его отлич
                        ительной особенностью является анализ текста с изображений а
                        также голосовой ввод
                    </motion.h2>
                </div>
                <h1>Основные технологии</h1>
                <motion.div className='stack-container'>
                    <FaReact className='icon react' />
                    <IoLogoCss3 className='icon css' />
                    <IoLogoHtml5 className='icon html' />
                    <FaNode className='icon node' />
                    <Sber />
                </motion.div>
            </div>
        </div>
    )
}
