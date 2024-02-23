import React from 'react'
import UserChatArrow from '../svg/UserChatArrow'

export default function HumanMessage({ element }) {
    return (
        <div className='human-message-wrapper'>
            <div className='human-message-container'>
                <p>
                    {element.text}
                </p>
            </div>
            <UserChatArrow />
        </div>
    )
}
