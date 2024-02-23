import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Settings({ setIsSetOpen }) {

    const [animate, setAnimate] = useState(false)

    const openSettings = () => {
        setAnimate(!animate);
        setIsSetOpen();
        setTimeout(() => {
            setAnimate(animate);
        }, 200)
    }

    const svgVariants = {
        hidden: {
            scale: 1,
        },
        visible: {
            scale: 1.2,
        }
    }

    const firstPath = {
        hidden: {
            scale: 1
        },
        visible: {
            scale: 0.7
        }
    }

    const secondPath = {
        hidden: {
            rotate: 0
        },
        visible: {
            rotate: 360,
            transition: { duration: 1 }
        }
    }

    return (
        <motion.svg
            onClick={openSettings}
            variants={svgVariants}
            initial='hidden'
            animate={animate ? 'visible' : 'hidden'}
            className='navigation-menu-tool profile'
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none">
            <motion.path
                variants={firstPath}
                initial="hidden"
                animate={animate ? "visible" : "hidden"}
                d="M11.0023 14C12.7596 14 14.1842 12.6569 14.1842 11C14.1842 9.34315 12.7596 8 11.0023 8C9.24492 8 7.82031 9.34315 7.82031 11C7.82031 12.6569 9.24492 14 11.0023 14Z" strokeWidth="2" />
            <motion.path
                variants={secondPath}
                initial="hidden"
                animate={animate ? "visible" : "hidden"}
                d="M2.15552 9.6392C2.65673 9.9361 2.97922 10.4419 2.97922 10.9999C2.97921 11.558 2.65672 12.0638 2.15552 12.3607C1.81445 12.5627 1.59471 12.7242 1.43837 12.9163C1.09587 13.3372 0.944719 13.869 1.01816 14.3949C1.07323 14.7893 1.32033 15.1928 1.81453 15.9999C2.30874 16.8069 2.55584 17.2104 2.89059 17.4526C3.33693 17.7755 3.90105 17.918 4.45885 17.8488C4.71344 17.8172 4.97161 17.7185 5.32765 17.5411C5.85106 17.2803 6.477 17.2699 6.98968 17.549C7.50232 17.8281 7.80566 18.3443 7.82778 18.902C7.84284 19.2815 7.8813 19.5417 7.97958 19.7654C8.19488 20.2554 8.60785 20.6448 9.12759 20.8478C9.51748 21 10.0116 21 11.0001 21C11.9885 21 12.4826 21 12.8725 20.8478C13.3923 20.6448 13.8053 20.2554 14.0206 19.7654C14.1188 19.5417 14.1573 19.2815 14.1724 18.9021C14.1944 18.3443 14.4978 17.8281 15.0105 17.549C15.5231 17.27 16.149 17.2804 16.6723 17.5412C17.0285 17.7186 17.2867 17.8173 17.5412 17.8489C18.099 17.9182 18.6632 17.7756 19.1095 17.4527C19.4442 17.2106 19.6914 16.807 20.1856 16C20.4056 15.6407 20.5767 15.3614 20.7035 15.1272M19.8445 12.3608C19.3434 12.0639 19.0209 11.5581 19.0208 11.0001C19.0208 10.442 19.3434 9.9361 19.8445 9.6392C20.1856 9.4372 20.4053 9.2757 20.5616 9.0836C20.9041 8.66278 21.0553 8.13092 20.9819 7.60502C20.9268 7.2106 20.6797 6.80708 20.1854 6.00005C19.6913 5.19301 19.4441 4.7895 19.1094 4.54732C18.6631 4.22441 18.0989 4.0819 17.5411 4.15113C17.2865 4.18274 17.0284 4.2814 16.6723 4.45883C16.1489 4.71964 15.523 4.73004 15.0104 4.45096C14.4978 4.1719 14.1944 3.6557 14.1724 3.09803C14.1573 2.71852 14.1188 2.45835 14.0206 2.23463C13.8053 1.74458 13.3923 1.35523 12.8725 1.15224C12.4826 1 11.9885 1 11.0001 1C10.0116 1 9.51748 1 9.12759 1.15224C8.60785 1.35523 8.19488 1.74458 7.97958 2.23463C7.8813 2.45833 7.84284 2.71848 7.82778 3.09794C7.80565 3.65566 7.5023 4.17191 6.98964 4.45096C6.47698 4.73002 5.8511 4.71959 5.32775 4.4588C4.97166 4.28136 4.71347 4.18269 4.45886 4.15108C3.90106 4.08185 3.33695 4.22436 2.8906 4.54727C2.55585 4.78945 2.30875 5.19297 1.81454 6C1.59453 6.35929 1.42349 6.63859 1.29656 6.87273" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
    )
}
